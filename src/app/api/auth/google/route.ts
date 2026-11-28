import { NextResponse } from "next/server";

import { safeNext } from "@/lib/auth";
import { fail, guardWrite, notConfigured, ok, readJson } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";

async function buildGoogleOAuthUrl(request: Request, nextRaw: unknown, roleRaw: unknown) {
  const origin = new URL(request.url).origin;
  const role = roleRaw === "business" ? "business" : "customer";
  const next = safeNext(nextRaw, "");
  const cb = new URL("/api/auth/callback", origin);
  if (next) cb.searchParams.set("next", next);
  cb.searchParams.set("role", role);

  const supabase = await createClient();
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: cb.toString(),
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
    },
  });
}

/**
 * Starts Google OAuth sign-in via Supabase Auth.
 * POST returns { ok: true, url } so client UI can navigate or show clear feedback.
 */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;

  const body = await readJson(request);
  const { data, error } = await buildGoogleOAuthUrl(request, body.next, body.role);
  if (error || !data?.url) {
    return fail(400, "googleNotEnabled");
  }
  return ok({ url: data.url });
}

/** Direct browser navigation fallback: GET /api/auth/google?role=customer&next=/ */
export async function GET(request: Request) {
  if (notConfigured()) {
    return NextResponse.redirect(new URL("/auth?error=notConfigured", request.url));
  }
  const url = new URL(request.url);
  const { data, error } = await buildGoogleOAuthUrl(
    request,
    url.searchParams.get("next"),
    url.searchParams.get("role"),
  );
  if (error || !data?.url) {
    return NextResponse.redirect(new URL("/auth?error=googleNotEnabled", request.url));
  }
  return NextResponse.redirect(data.url);
}
