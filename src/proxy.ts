import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

/** Next.js 16 "proxy" (formerly middleware): keeps Supabase sessions fresh. */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Skip static files and images; run on pages and API routes.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
