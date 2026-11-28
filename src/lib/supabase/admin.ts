import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getPublicEnv } from "@/lib/env";
import { getServerEnv } from "@/lib/env.server";

/**
 * Supabase client with the SECRET key. It bypasses Row Level Security,
 * so use it only in server code for admin tasks (spec: "Admins act through
 * server routes using the service role key, never from the browser"),
 * and always check the caller is an admin first.
 */
export function createAdminClient() {
  const { NEXT_PUBLIC_SUPABASE_URL } = getPublicEnv();
  const { SUPABASE_SECRET_KEY } = getServerEnv();

  return createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
