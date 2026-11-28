import { getUser } from "@/lib/auth";
import { fail, guardWrite, ok } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";

const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const MAX_BYTES = 2 * 1024 * 1024; // matches the shop-media bucket limit

/**
 * Upload a shop logo (multipart form field "file") into the seller's own
 * folder of the public "shop-media" bucket: <user id>/logo-<time>.<ext>.
 * Storage rules only allow a user to write inside their own folder.
 * → { ok, url }  (pass it as logoUrl when creating the shop)
 */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;

  const user = await getUser();
  if (!user) return fail(401, "notSignedIn");

  let file: File | null = null;
  try {
    const form = await request.formData();
    const f = form.get("file");
    file = f instanceof File ? f : null;
  } catch {
    return fail(400, "uploadFailed");
  }
  if (!file) return fail(400, "uploadFailed");
  const ext = TYPES[file.type];
  if (!ext) return fail(400, "imageType");
  if (file.size > MAX_BYTES) return fail(400, "imageTooBig");

  const supabase = await createClient();
  const path = `${user.id}/logo-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("shop-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return fail(500, "uploadFailed");

  const { data } = supabase.storage.from("shop-media").getPublicUrl(path);
  return ok({ url: data.publicUrl });
}
