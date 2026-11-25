import { beforeAll, describe, expect, it } from "vitest";

import {
  adminClient,
  anonClient,
  createShopFor,
  createTestUser,
  hasTestDb,
  testPhone,
  testSlug,
  type TestUser,
} from "./helpers";

/**
 * Row Level Security tests (spec: "Every table gets RLS policies plus a test
 * proving a merchant cannot read another shop's data").
 *
 * Alice and Bob are two merchants. Each test proves one of them CANNOT touch
 * the other's data, and that nobody can promote themselves.
 */
describe.skipIf(!hasTestDb)("Row Level Security", () => {
  let alice: TestUser;
  let bob: TestUser;
  let aliceShop: { id: string; slug: string };
  let bobShop: { id: string; slug: string; name: string };

  beforeAll(async () => {
    [alice, bob] = await Promise.all([
      createTestUser("alice"),
      createTestUser("bob"),
    ]);
    aliceShop = await createShopFor(alice, { name: "Alice Gato" });
    bobShop = await createShopFor(bob, { name: "Bob Achards" });
  });

  describe("profiles", () => {
    it("a new user gets a profile automatically", async () => {
      const { data } = await alice.client
        .from("profiles")
        .select("id")
        .eq("id", alice.id)
        .single();
      expect(data?.id).toBe(alice.id);
    });

    it("creating a shop turns the account into a merchant", async () => {
      const { data } = await alice.client
        .from("profiles")
        .select("role")
        .eq("id", alice.id)
        .single();
      expect(data?.role).toBe("merchant");
    });

    it("a merchant cannot read another user's profile", async () => {
      const { data } = await alice.client
        .from("profiles")
        .select("*")
        .eq("id", bob.id);
      expect(data).toEqual([]);
    });

    it("a logged-out visitor cannot read any profile", async () => {
      const { data, error } = await anonClient().from("profiles").select("*");
      expect(data ?? []).toEqual([]);
      expect(error).not.toBeNull();
    });

    it("a user cannot make themselves admin", async () => {
      const { error } = await alice.client
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", alice.id);
      expect(error).not.toBeNull();

      const { data } = await adminClient()
        .from("profiles")
        .select("role")
        .eq("id", alice.id)
        .single();
      expect(data?.role).toBe("merchant");
    });

    it("a user can update their own name and language", async () => {
      const { error } = await alice.client
        .from("profiles")
        .update({ full_name: "Alice", preferred_language: "mfe" })
        .eq("id", alice.id);
      expect(error).toBeNull();
    });

    it("a user cannot update someone else's profile", async () => {
      await alice.client
        .from("profiles")
        .update({ full_name: "Hacked" })
        .eq("id", bob.id);
      const { data } = await adminClient()
        .from("profiles")
        .select("full_name")
        .eq("id", bob.id)
        .single();
      expect(data?.full_name).not.toBe("Hacked");
    });
  });

  describe("server secret key (service_role)", () => {
    it("can read and update every table (admin server code needs this)", async () => {
      const admin = adminClient();
      for (const table of ["profiles", "categories", "shops"]) {
        const { error } = await admin.from(table).select("id").limit(1);
        expect(error, `service_role select on ${table}`).toBeNull();
      }
      const { error } = await admin
        .from("shops")
        .update({ verification_status: "pending" })
        .eq("id", aliceShop.id);
      expect(error).toBeNull();
    });
  });

  describe("categories", () => {
    it("anyone can read categories", async () => {
      const { data, error } = await anonClient()
        .from("categories")
        .select("slug");
      expect(error).toBeNull();
      expect(data!.length).toBeGreaterThan(5);
    });

    it("a merchant cannot create categories", async () => {
      const { error } = await alice.client.from("categories").insert({
        slug: "hack",
        name_en: "x",
        name_fr: "x",
        name_mfe: "x",
      });
      expect(error).not.toBeNull();
    });
  });

  describe("shops", () => {
    it("anyone can read a shop by its link (public shop page)", async () => {
      const { data } = await anonClient()
        .from("shops")
        .select("name")
        .eq("slug", bobShop.slug)
        .single();
      expect(data?.name).toBe("Bob Achards");
    });

    it("a merchant cannot edit another merchant's shop", async () => {
      await alice.client
        .from("shops")
        .update({ name: "Hacked by Alice" })
        .eq("id", bobShop.id);
      const { data } = await adminClient()
        .from("shops")
        .select("name")
        .eq("id", bobShop.id)
        .single();
      expect(data?.name).toBe("Bob Achards");
    });

    it("a merchant cannot delete another merchant's shop", async () => {
      await alice.client.from("shops").delete().eq("id", bobShop.id);
      const { data } = await adminClient()
        .from("shops")
        .select("id")
        .eq("id", bobShop.id);
      expect(data).toHaveLength(1);
    });

    it("a merchant cannot create a shop in someone else's name", async () => {
      const carol = await createTestUser("carol");
      const { error } = await alice.client.from("shops").insert({
        owner_id: carol.id,
        name: "Fake shop",
        slug: testSlug("fake"),
        whatsapp_phone: testPhone(),
        district: "moka",
      });
      expect(error).not.toBeNull();
    });

    it("a merchant cannot mark their own shop as verified", async () => {
      const { error } = await alice.client
        .from("shops")
        .update({ verification_status: "verified" })
        .eq("id", aliceShop.id);
      expect(error).not.toBeNull();

      const { data } = await adminClient()
        .from("shops")
        .select("verification_status")
        .eq("id", aliceShop.id)
        .single();
      expect(data?.verification_status).toBe("pending");
    });

    it("a merchant cannot create a shop that starts verified", async () => {
      const dave = await createTestUser("dave");
      const { error } = await dave.client.from("shops").insert({
        owner_id: dave.id,
        name: "Sneaky",
        slug: testSlug("sneaky"),
        whatsapp_phone: testPhone(),
        district: "flacq",
        verification_status: "verified",
      });
      expect(error).not.toBeNull();
    });

    it("a merchant cannot hand their shop to another owner", async () => {
      const { error } = await alice.client
        .from("shops")
        .update({ owner_id: bob.id })
        .eq("id", aliceShop.id);
      expect(error).not.toBeNull();
    });

    it("a merchant can edit their own shop", async () => {
      const { error } = await alice.client
        .from("shops")
        .update({ description: "Fresh gato every morning" })
        .eq("id", aliceShop.id);
      expect(error).toBeNull();
    });

    it("one shop per account", async () => {
      const { error } = await alice.client.from("shops").insert({
        owner_id: alice.id,
        name: "Second shop",
        slug: testSlug("second"),
        whatsapp_phone: testPhone(),
        district: "moka",
      });
      expect(error?.code).toBe("23505");
    });

    it("rejects reserved and badly formed links", async () => {
      const erin = await createTestUser("erin");
      for (const slug of ["dashboard", "Bad Slug", "-x-", "ab"]) {
        const { error } = await erin.client.from("shops").insert({
          owner_id: erin.id,
          name: "Erin",
          slug,
          whatsapp_phone: testPhone(),
          district: "savanne",
        });
        expect(error, `slug "${slug}" should be rejected`).not.toBeNull();
      }
    });

    it("rejects a WhatsApp number that is not a Mauritius mobile", async () => {
      const fred = await createTestUser("fred");
      const { error } = await fred.client.from("shops").insert({
        owner_id: fred.id,
        name: "Fred",
        slug: testSlug("fred"),
        whatsapp_phone: "+2302123456",
        district: "moka",
      });
      expect(error).not.toBeNull();
    });

    it("a logged-out visitor cannot create a shop", async () => {
      const { error } = await anonClient()
        .from("shops")
        .insert({
          owner_id: alice.id,
          name: "Anon",
          slug: testSlug("anon"),
          whatsapp_phone: testPhone(),
          district: "moka",
        });
      expect(error).not.toBeNull();
    });
  });

  describe("shop-media storage", () => {
    const png = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);

    it("a merchant can upload into their own folder", async () => {
      const { error } = await alice.client.storage
        .from("shop-media")
        .upload(`${alice.id}/logo-test.png`, png, {
          contentType: "image/png",
          upsert: true,
        });
      expect(error).toBeNull();
    });

    it("a merchant cannot upload into another merchant's folder", async () => {
      const { error } = await alice.client.storage
        .from("shop-media")
        .upload(`${bob.id}/evil.png`, png, { contentType: "image/png" });
      expect(error).not.toBeNull();
    });

    it("a merchant cannot delete another merchant's files", async () => {
      await bob.client.storage
        .from("shop-media")
        .upload(`${bob.id}/logo.png`, png, {
          contentType: "image/png",
          upsert: true,
        });
      await alice.client.storage
        .from("shop-media")
        .remove([`${bob.id}/logo.png`]);
      const { data } = await adminClient()
        .storage.from("shop-media")
        .list(bob.id);
      expect(data?.map((f) => f.name)).toContain("logo.png");
    });

    it("a logged-out visitor cannot upload", async () => {
      const { error } = await anonClient()
        .storage.from("shop-media")
        .upload(`${alice.id}/anon.png`, png, { contentType: "image/png" });
      expect(error).not.toBeNull();
    });
  });
});
