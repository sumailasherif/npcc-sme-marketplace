import { fail, guardWrite, ok, readJson } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { emailSchema } from "@/lib/validation/auth";

/**
 * Step 1 of sign-in (from the old login action): email a 6-digit code.
 * Creates the account on first use. Body: { email, lang?: "en"|"fr"|"mfe" }
 */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;

  const body = await readJson(request);
  const parsed = emailSchema.safeParse(body.email);
  if (!parsed.success) return fail(400, "emailFormat");
  const lang = ["en", "fr", "mfe"].includes(String(body.lang)) ? String(body.lang) : "en";

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      shouldCreateUser: true,
      // Saved on the new profile by the handle_new_user() trigger.
      data: { preferred_language: lang },
    },
  });
  if (error) {
    const limited = error.status === 429 || error.code === "over_email_send_rate_limit";
    return fail(limited ? 429 : 400, limited ? "tooManyRequests" : "generic");
  }
  return ok({ email: parsed.data });
}
