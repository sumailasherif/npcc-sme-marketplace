import { safeNext } from "@/lib/auth";
import { fail, guardWrite, ok, readJson } from "@/lib/api";
import { sendResendOtpEmail } from "@/lib/resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { emailSchema, passwordSchema } from "@/lib/validation/auth";

/**
 * Email + Password Sign-In & Sign-Up handler.
 * On sign-up, sends a 6-digit verification code via Resend (when RESEND_API_KEY
 * is set) or Supabase Auth email confirmation.
 * Body: { email, password, mode?: "login"|"signup", fullName?, role?, lang?, next? }
 */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;

  const body = await readJson(request);
  const email = emailSchema.safeParse(body.email);
  if (!email.success) return fail(400, "emailFormat");
  const password = passwordSchema.safeParse(body.password);
  if (!password.success) return fail(400, "passwordShort");

  const mode = body.mode === "signup" ? "signup" : "login";
  const role = body.role === "business" ? "business" : "customer";
  const lang = ["en", "fr", "mfe"].includes(String(body.lang))
    ? String(body.lang)
    : "en";
  const fullName =
    typeof body.fullName === "string" ? body.fullName.trim().slice(0, 100) : "";

  const supabase = await createClient();

  if (mode === "login") {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.data,
      password: password.data,
    });
    if (error || !data.user) {
      if (error?.status === 429) return fail(429, "tooManyRequests");
      if (error?.code === "email_not_confirmed") {
        return fail(403, "emailUnconfirmed", { email: email.data });
      }
      return fail(401, "badCredentials");
    }

    const { data: shop } = await supabase
      .from("shops")
      .select("slug")
      .eq("owner_id", data.user.id)
      .maybeSingle();

    const defaultDest =
      role === "business"
        ? shop
          ? "/dashboard"
          : "/onboarding"
        : shop
          ? "/dashboard"
          : "/";

    return ok({
      next: safeNext(body.next, defaultDest),
      hasShop: Boolean(shop),
    });
  }

  // Sign-up flow: prefer Resend 6-digit verification email when RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY && process.env.SUPABASE_SECRET_KEY) {
    try {
      const admin = createAdminClient();
      const linkRes = await admin.auth.admin.generateLink({
        type: "signup",
        email: email.data,
        password: password.data,
        options: {
          data: {
            full_name: fullName || undefined,
            preferred_language: lang,
          },
        },
      });
      const otp = linkRes.data?.properties?.email_otp;
      if (!linkRes.error && otp) {
        const sent = await sendResendOtpEmail({
          to: email.data,
          code: otp,
          lang,
          mode: "signup",
        });
        if (sent.ok) {
          return ok({
            needsVerification: true,
            email: email.data,
            provider: "resend",
          });
        }
      }
    } catch {
      // Fall back to standard Supabase signUp below
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.data,
    password: password.data,
    options: {
      data: {
        full_name: fullName || undefined,
        preferred_language: lang,
      },
    },
  });

  if (error) {
    if (error.status === 429) return fail(429, "tooManyRequests");
    if (error.code === "user_already_exists") return fail(409, "userExists");
    return fail(400, "generic");
  }

  // When email confirmations are disabled in dev, a session is returned right away
  if (data.session && data.user) {
    if (fullName) {
      await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", data.user.id);
    }
    const defaultDest = role === "business" ? "/onboarding" : "/";
    return ok({
      needsVerification: false,
      next: safeNext(body.next, defaultDest),
      hasShop: false,
    });
  }

  return ok({
    needsVerification: true,
    email: email.data,
    provider: "supabase",
  });
}
