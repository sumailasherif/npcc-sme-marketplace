import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Database tests talk to a LOCAL Supabase (started with `supabase start`),
 * never the real project. CI sets these from `supabase status -o env`.
 */
export const DB_URL = process.env.SUPABASE_TEST_URL ?? "";
const PUBLISHABLE = process.env.SUPABASE_TEST_PUBLISHABLE_KEY ?? "";
const SECRET = process.env.SUPABASE_TEST_SECRET_KEY ?? "";

export const hasTestDb = Boolean(DB_URL && PUBLISHABLE && SECRET);

const noSession = { auth: { persistSession: false, autoRefreshToken: false } };

/** Client with the secret key: bypasses RLS. Only for test setup. */
export function adminClient(): SupabaseClient {
  return createClient(DB_URL, SECRET, noSession);
}

/** Logged-out visitor. */
export function anonClient(): SupabaseClient {
  return createClient(DB_URL, PUBLISHABLE, noSession);
}

export type TestUser = { id: string; email: string; client: SupabaseClient };

/** Creates a confirmed user and returns a client logged in as them. */
export async function createTestUser(label: string): Promise<TestUser> {
  const email = `${label}-${crypto.randomUUID().slice(0, 8)}@test.bazar.local`;
  const password = `pw-${crypto.randomUUID()}`;

  const { data, error } = await adminClient().auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) throw error ?? new Error("createUser failed");

  const client = createClient(DB_URL, PUBLISHABLE, noSession);
  const { error: signInError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) throw signInError;

  return { id: data.user.id, email, client };
}

let phoneCounter = 1000000;
/** A valid, unique Mauritius mobile number for test shops. */
export function testPhone(): string {
  phoneCounter += 1;
  return `+2305${String(phoneCounter).padStart(7, "0").slice(-7)}`;
}

export function testSlug(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export async function createShopFor(user: TestUser, overrides = {}) {
  const { data, error } = await user.client
    .from("shops")
    .insert({
      owner_id: user.id,
      name: "Test Shop",
      slug: testSlug("shop"),
      whatsapp_phone: testPhone(),
      district: "port_louis",
      ...overrides,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}
