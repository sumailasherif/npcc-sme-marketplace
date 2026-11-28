import "server-only";

import { hasSupabaseEnv } from "@/lib/env";

/**
 * Small helpers shared by every /api route.
 * Errors are short codes (e.g. "codeWrong") that the screens turn into
 * words in English, French or Kreol.
 */

export function ok<T extends object>(data: T, init?: ResponseInit) {
  return Response.json({ ok: true, ...data }, init);
}

export function fail(status: number, error: string, extra?: object) {
  return Response.json({ ok: false, error, ...extra }, { status });
}

/** Before .env.local is filled in, answer clearly instead of crashing. */
export function notConfigured() {
  return hasSupabaseEnv() ? null : fail(503, "notConfigured");
}

/**
 * Only accept writes (POST) from our own pages. Browsers always send an
 * Origin header on cross-site POSTs, so this blocks other websites from
 * submitting forms on a signed-in user's behalf.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin navigations and server tools
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

/** Reads a JSON body safely; returns {} when the body is missing or broken. */
export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** Common guard for POST routes: configured + same origin. */
export function guardWrite(request: Request) {
  return notConfigured() ?? (sameOrigin(request) ? null : fail(403, "badOrigin"));
}
