"use server";

import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

import { safeNext } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { emailSchema, otpSchema } from "@/lib/validation/auth";

export type LoginState =
  | { step: "email"; error?: string; email?: string }
  | { step: "code"; email: string; error?: string; resent?: boolean };

/** Maps Supabase auth errors to our translation keys. */
function authErrorKey(error: { status?: number; code?: string }): string {
  if (error.status === 429 || error.code === "over_email_send_rate_limit") {
    return "tooManyRequests";
  }
  return "generic";
}

/** Step 1: email a 6-digit code. Creates the account on first use. */
export async function sendCode(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  const rawEmail = String(formData.get("email") ?? "");
  if (!parsed.success) {
    return { step: "email", email: rawEmail, error: "emailFormat" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      shouldCreateUser: true,
      // Saved on the new profile by the handle_new_user() trigger.
      data: { preferred_language: await getLocale() },
    },
  });
  if (error) {
    return { step: "email", email: parsed.data, error: authErrorKey(error) };
  }
  return {
    step: "code",
    email: parsed.data,
    resent: formData.get("resend") === "1",
  };
}

/** Step 2: check the code, start the session, go to the dashboard. */
export async function verifyCode(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = emailSchema.safeParse(formData.get("email"));
  if (!email.success) return { step: "email", error: "emailFormat" };

  const token = otpSchema.safeParse(formData.get("code"));
  if (!token.success) {
    return { step: "code", email: email.data, error: "codeFormat" };
  }

  const supabase = await createClient();
  // New accounts get a "confirm sign up" code, returning users a
  // "magic link" code. "email" covers both on current Supabase; "signup"
  // is a fallback for first-time confirmations.
  let { error } = await supabase.auth.verifyOtp({
    email: email.data,
    token: token.data,
    type: "email",
  });
  if (error && error.status !== 429) {
    ({ error } = await supabase.auth.verifyOtp({
      email: email.data,
      token: token.data,
      type: "signup",
    }));
  }
  if (error) {
    return {
      step: "code",
      email: email.data,
      error: error.status === 429 ? "tooManyRequests" : "codeWrong",
    };
  }

  redirect(safeNext(formData.get("next")));
}
