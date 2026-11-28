import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type SessionUser = { id: string; email: string | null };

/**
 * The logged-in user, checked against Supabase's signing keys
 * (getClaims verifies the token; never trust getSession() on the server).
 */
export async function getUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) return null;
  return {
    id: data.claims.sub,
    email: (data.claims.email as string | undefined) ?? null,
  };
}

/** Sends logged-out visitors to the sign-in screen, then back to `next` afterwards. */
export async function requireUser(next = "/dashboard"): Promise<SessionUser> {
  const user = await getUser();
  if (!user) redirect(`/auth?next=${encodeURIComponent(next)}`);
  return user;
}

/** Only allow redirects to our own pages (blocks "//evil.com" tricks). */
export function safeNext(next: unknown, fallback = "/dashboard"): string {
  return typeof next === "string" && /^\/(?!\/)[\w\-/?=&%.]*$/.test(next)
    ? next
    : fallback;
}
