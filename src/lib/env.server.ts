import "server-only";

import { z } from "zod";

/**
 * Secret settings. "server-only" makes the build fail if any browser code
 * imports this file, so these values can never reach the client.
 */
const serverSchema = z.object({
  SUPABASE_SECRET_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

export function getServerEnv(): ServerEnv {
  const result = serverSchema.safeParse({
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || undefined,
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
  });
  if (!result.success) {
    throw new Error(
      `Missing or invalid server environment variables. See .env.example.\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}
