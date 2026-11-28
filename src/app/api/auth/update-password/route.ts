import { getUser } from "@/lib/auth";
import { fail, guardWrite, ok, readJson } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { passwordSchema } from "@/lib/validation/auth";

/**
 * Set or change the password of the signed-in account.
 * Used after "Forgot?" (the recovery code signs the person in first) and by
 * users who want a password instead of email codes.
 * Body: { password } → { ok }
 */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;

  const user = await getUser();
  if (!user) return fail(401, "notSignedIn");

  const body = await readJson(request);
  const password = passwordSchema.safeParse(body.password);
  if (!password.success) return fail(400, "passwordShort");

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: password.data });
  if (error) {
    if (error.status === 429) return fail(429, "tooManyRequests");
    return fail(400, "generic");
  }
  return ok({});
}
