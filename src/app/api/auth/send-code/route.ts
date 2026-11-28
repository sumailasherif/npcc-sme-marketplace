import { fail, guardWrite, ok, readJson } from "@/lib/api";
import { sendResendOtpEmail } from "@/lib/resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { emailSchema } from "@/lib/validation/auth";

/**
 * Step 1 of passwordless / OTP sign-in: email a 6-digit code.
 * Uses Resend directly when RESEND_API_KEY + SUPABASE_SECRET_KEY are set,
 * otherwise uses Supabase Auth's configured SMTP / local Inbucket mailer.
 * Body: { email, lang?: "en"|"fr"|"mfe" }
 */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;

  const body = await readJson(request);
  const parsed = emailSchema.safeParse(body.email);
  if (!parsed.success) return fail(400, "emailFormat");
  const lang = ["en", "fr", "mfe"].includes(String(body.lang))
    ? String(body.lang)
    : "en";

  // Direct Resend delivery path when RESEND_API_KEY is present
  if (process.env.RESEND_API_KEY && process.env.SUPABASE_SECRET_KEY) {
    try {
      const admin = createAdminClient();
      const linkRes = await admin.auth.admin.generateLink({
        type: "magiclink",
        email: parsed.data,
        options: { data: { preferred_language: lang } },
      });

      const otp = linkRes.data?.properties?.email_otp;
      if (!linkRes.error && otp) {
        const sent = await sendResendOtpEmail({
          to: parsed.data,
          code: otp,
          lang,
          mode: "magiclink",
        });
        if (sent.ok) {
          return ok({ email: parsed.data, provider: "resend" });
        }
      }
    } catch {
      // Fall back to standard Supabase OTP mailer below
    }
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      shouldCreateUser: true,
      data: { preferred_language: lang },
    },
  });
  if (error) {
    const limited =
      error.status === 429 || error.code === "over_email_send_rate_limit";
    return fail(limited ? 429 : 400, limited ? "tooManyRequests" : "generic");
  }
  return ok({ email: parsed.data, provider: "supabase" });
}
