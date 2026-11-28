import { safeNext } from "@/lib/auth";
import { fail, guardWrite, ok, readJson } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { emailSchema, otpSchema } from "@/lib/validation/auth";

/**
 * Step 2 of sign-in (from the old login action): check the code and start
 * the session (Supabase sets the login cookies on this response).
 * Body: { email, code, next?, fullName? }  →  { ok, next, hasShop }
 */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;

  const body = await readJson(request);
  const email = emailSchema.safeParse(body.email);
  if (!email.success) return fail(400, "emailFormat");
  const token = otpSchema.safeParse(body.code);
  if (!token.success) return fail(400, "codeFormat");

  const supabase = await createClient();
  // New accounts get a "confirm sign up" code, returning users a "magic link"
  // code. "email" covers both on current Supabase; "signup" is a fallback.
  let { data, error } = await supabase.auth.verifyOtp({ email: email.data, token: token.data, type: "email" });
  if (error && error.status !== 429) {
    ({ data, error } = await supabase.auth.verifyOtp({ email: email.data, token: token.data, type: "signup" }));
  }
  if (error || !data.user) {
    return fail(error?.status === 429 ? 429 : 400, error?.status === 429 ? "tooManyRequests" : "codeWrong");
  }

  // Sign-up form's "Full name or Business name" goes on the profile.
  const fullName = typeof body.fullName === "string" ? body.fullName.trim().slice(0, 100) : "";
  if (fullName) await supabase.from("profiles").update({ full_name: fullName }).eq("id", data.user.id);

  const { data: shop } = await supabase.from("shops").select("slug").eq("owner_id", data.user.id).maybeSingle();
  return ok({ next: safeNext(body.next, shop ? "/dashboard" : "/"), hasShop: Boolean(shop) });
}
