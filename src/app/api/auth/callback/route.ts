import { NextResponse } from "next/server";

import { safeNext } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth & Magic-Link PKCE Callback handler.
 * Exchanges ?code=... for a Supabase SSR cookie session and redirects the user
 * to their requested page, Business Onboarding/Dashboard, or Customer Home.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const role = url.searchParams.get("role") === "business" ? "business" : "customer";
  const requestedNext = url.searchParams.get("next");

  if (!hasSupabaseEnv() || !code) {
    return NextResponse.redirect(new URL("/auth?error=oauthFailed", request.url));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) {
    return NextResponse.redirect(new URL("/auth?error=oauthFailed", request.url));
  }

  const { data: shop } = await supabase
    .from("shops")
    .select("slug")
    .eq("owner_id", data.user.id)
    .maybeSingle();

  const fallbackDest =
    role === "business"
      ? shop
        ? "/dashboard"
        : "/onboarding"
      : shop
        ? "/dashboard"
        : "/";

  const dest = safeNext(requestedNext, fallbackDest);
  return NextResponse.redirect(new URL(dest, request.url));
}
