import { guardWrite, ok } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";

/** Ends the session and clears the login cookies. */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;
  const supabase = await createClient();
  await supabase.auth.signOut();
  return ok({});
}
