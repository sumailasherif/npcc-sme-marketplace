import { z } from "zod";

/**
 * Public settings. NEXT_PUBLIC_* values are copied into the browser bundle,
 * so only non-secret values may live here.
 *
 * Next.js only inlines NEXT_PUBLIC_* variables when they are written out in
 * full (process.env.NEXT_PUBLIC_X), so we list them one by one.
 */
const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
});

export type PublicEnv = z.infer<typeof publicSchema>;

/** Reads and checks the public settings. Throws a clear error if one is missing. */
export function getPublicEnv(): PublicEnv {
  const result = publicSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  });
  if (!result.success) {
    throw new Error(
      `Missing or invalid environment variables. Copy .env.example to .env.local and fill it in.\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

/** True when Supabase settings are present (lets pages render before setup). */
export function hasSupabaseEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
