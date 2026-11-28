import type { NextRequest } from "next/server";
import { z } from "zod";

import { fail, ok } from "@/lib/api";
import { getServerEnv, type ServerEnv } from "@/lib/env.server";

const requestSchema = z.object({
  image: z
    .string()
    .startsWith("data:image/")
    .max(4_500_000)
    .optional(),
  ocrText: z.string().max(2500).optional(),
  fileName: z.string().max(200).optional(),
  lang: z.enum(["en", "fr", "mfe"]).default("en"),
  town: z.string().max(80).default("Port Louis"),
});

const aiListingSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(1200),
  category: z
    .enum(["phones", "laptops", "audio", "watches", "fashion", "vehicles"])
    .catch("phones"),
  condition: z
    .enum(["Brand New", "Like New", "Gently Used", "Fair"])
    .catch("Like New"),
  priceMur: z.number().positive().max(50_000_000).nullable().optional(),
  detectedSummary: z.string().trim().max(200).optional(),
});

const LANG_NAMES: Record<"en" | "fr" | "mfe", string> = {
  en: "English",
  fr: "French",
  mfe: "Mauritian Kreol (Kreol Morisien)",
};

function extractJsonObject(raw: string): unknown {
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start > -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("invalid_json");
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "badRequest");
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return fail(400, "validation");
  }

  const { image, ocrText, fileName, lang, town } = parsed.data;
  if (!image && !ocrText) {
    return fail(400, "missingImage");
  }

  let env: ServerEnv;
  try {
    env = getServerEnv();
  } catch {
    return fail(503, "aiNotConfigured");
  }

  if (!env.AI_API_KEY) {
    return fail(503, "aiNotConfigured");
  }

  const apiKey = env.AI_API_KEY;
  const baseUrl = env.AI_BASE_URL.replace(/\/$/, "");
  const model = env.AI_MODEL || "gpt-4o-mini";
  const langLabel = LANG_NAMES[lang];

  const systemPrompt = [
    "You are Bazar Mauritius's AI listing assistant for local sellers.",
    `Write the title and description in ${langLabel}.`,
    "Examine the item photo (and any visible text/labels) carefully and return ONLY a JSON object with these exact keys:",
    '- "title": concise, specific listing title (brand, item type, color/model if visible, max 80 chars).',
    '- "description": clear 3-4 line buyer-friendly description mentioning visible condition, notable features, and safe pickup in ' +
      town +
      " or delivery with Bazar Escrow. Use '__' only for specs not visible in the photo (like battery % or exact size) so the seller can fill them in.",
    '- "category": one of ["phones", "laptops", "audio", "watches", "fashion", "vehicles"] (pick the closest match).',
    '- "condition": one of ["Brand New", "Like New", "Gently Used", "Fair"] based on visible wear/packaging.',
    '- "priceMur": number in Mauritian Rupees ONLY if a price tag/text is explicitly visible, otherwise null. NEVER invent a price.',
    '- "detectedSummary": short 1-sentence note of what you saw in the photo.',
  ].join("\n");

  const contextHints = [
    fileName ? `Filename hint: ${fileName}` : "",
    ocrText ? `Text detected on item/packaging: ${ocrText}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  async function callChatCompletion(useVision: boolean) {
    const userContent =
      useVision && image
        ? [
            {
              type: "text",
              text:
                "Read this item photo and generate the JSON listing draft." +
                (contextHints ? `\n${contextHints}` : ""),
            },
            {
              type: "image_url",
              image_url: { url: image },
            },
          ]
        : `Generate the JSON listing draft from these item clues:\n${contextHints || "Pre-loved item listed in Mauritius"}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 22_000);
    try {
      return await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          max_tokens: 550,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContent },
          ],
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  try {
    let response = await callChatCompletion(Boolean(image));

    // If the configured model is text-only and rejects image_url, either ask client for OCR or use provided OCR/filename
    if (!response.ok && image && !ocrText) {
      const errText = await response.text().catch(() => "");
      if (
        response.status === 400 ||
        response.status === 415 ||
        response.status === 422 ||
        /image|vision|multimodal|content/i.test(errText)
      ) {
        return fail(422, "needsOcrFallback");
      }
      return fail(502, "aiUpstreamError");
    }

    if (!response.ok && ocrText) {
      response = await callChatCompletion(false);
    }

    if (!response.ok) {
      return fail(502, "aiUpstreamError");
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const rawContent = payload.choices?.[0]?.message?.content ?? "";
    const jsonObj = extractJsonObject(rawContent);
    const validated = aiListingSchema.safeParse(jsonObj);
    if (!validated.success) {
      return fail(502, "aiInvalidOutput");
    }

    return ok({ listing: validated.data });
  } catch {
    return fail(502, "aiUpstreamError");
  }
}
