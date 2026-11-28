import { notConfigured, ok } from "@/lib/api";
import { getCategories } from "@/lib/shops";

/** All shop categories, with names in English, French and Kreol. */
export async function GET() {
  const blocked = notConfigured();
  if (blocked) return blocked;
  return ok({ categories: await getCategories() });
}
