"use client";

import { useActionState, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ImageSquare } from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/button";
import { describedBy, Field } from "@/components/ui/field";
import { Input, Select, Textarea } from "@/components/ui/input";
import type { Category } from "@/lib/database.types";
import { districts } from "@/lib/districts";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/validation/shop";

import { createShop, type CreateShopState } from "./actions";

const MAX_LOGO_BYTES = 2 * 1024 * 1024;
const LOGO_TYPES = ["image/jpeg", "image/png", "image/webp"];

type Props = {
  userId: string;
  categories: { id: string; name: string; type: Category["type"] }[];
  shopBaseUrl: string;
};

export function ShopForm({ userId, categories, shopBaseUrl }: Props) {
  const t = useTranslations("Onboarding");
  const tv = useTranslations("Validation");
  const td = useTranslations("Districts");

  const [state, action, pending] = useActionState<CreateShopState, FormData>(
    createShop,
    {},
  );
  const v = state.values ?? {};
  const err = (field: string) =>
    state.errors?.[field] ? tv(state.errors[field]!) : undefined;

  // The link follows the name until the merchant edits the link themselves.
  const [name, setName] = useState(v.name ?? "");
  const [slug, setSlug] = useState(v.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(v.slug));
  const shownSlug = slugTouched ? slug : slugify(name);

  // Logo: uploaded straight from the phone to the merchant's own folder.
  const fileInput = useRef<HTMLInputElement>(null);
  const [logoUrl, setLogoUrl] = useState(v.logoUrl ?? "");
  const [logoError, setLogoError] = useState<string>();
  const [uploading, setUploading] = useState(false);

  async function onLogoChosen(file: File | undefined) {
    if (!file) return;
    setLogoError(undefined);
    if (!LOGO_TYPES.includes(file.type)) return setLogoError("imageType");
    if (file.size > MAX_LOGO_BYTES) return setLogoError("imageSize");

    setUploading(true);
    const ext = file.type.split("/")[1].replace("jpeg", "jpg");
    const path = `${userId}/logo-${crypto.randomUUID()}.${ext}`;
    const storage = createClient().storage.from("shop-media");
    const { error } = await storage.upload(path, file, {
      contentType: file.type,
      cacheControl: "31536000",
    });
    setUploading(false);
    if (error) return setLogoError("uploadFailed");
    setLogoUrl(storage.getPublicUrl(path).data.publicUrl);
  }

  const categoryGroups = (["product", "service"] as const).map((type) => ({
    type,
    items: categories.filter((c) => c.type === type),
  }));
  const logoMessage = logoError ?? state.errors?.logoUrl;

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      {state.formError ? (
        <p role="alert" className="rounded-button bg-lime-100 p-3 text-body">
          {tv(state.formError)}
        </p>
      ) : null}

      <Field htmlFor="name" label={t("name")} error={err("name")}>
        <Input
          id="name"
          name="name"
          required
          maxLength={60}
          autoComplete="organization"
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(err("name"))}
          aria-describedby={describedBy("name", { error: err("name") })}
        />
      </Field>

      <Field
        htmlFor="slug"
        label={t("slug")}
        helper={t("slugHelper", { url: `${shopBaseUrl}/${shownSlug || "…"}` })}
        error={err("slug")}
      >
        <Input
          id="slug"
          name="slug"
          required
          maxLength={40}
          autoCapitalize="none"
          spellCheck={false}
          prefix="/s/"
          value={shownSlug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
          }}
          aria-invalid={Boolean(err("slug"))}
          aria-describedby={describedBy("slug", {
            error: err("slug"),
            helper: true,
          })}
        />
      </Field>

      <Field
        htmlFor="categoryId"
        label={t("category")}
        error={err("categoryId")}
      >
        <Select
          id="categoryId"
          name="categoryId"
          required
          defaultValue={v.categoryId ?? ""}
          aria-invalid={Boolean(err("categoryId"))}
          aria-describedby={describedBy("categoryId", {
            error: err("categoryId"),
          })}
        >
          <option value="" disabled>
            {t("categoryPlaceholder")}
          </option>
          {categoryGroups.map((group) => (
            <optgroup
              key={group.type}
              label={group.type === "product" ? t("products") : t("services")}
            >
              {group.items.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </Field>

      <Field htmlFor="district" label={t("district")} error={err("district")}>
        <Select
          id="district"
          name="district"
          required
          defaultValue={v.district ?? ""}
          aria-invalid={Boolean(err("district"))}
          aria-describedby={describedBy("district", { error: err("district") })}
        >
          <option value="" disabled>
            {t("districtPlaceholder")}
          </option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {td(d)}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        htmlFor="whatsappPhone"
        label={t("whatsapp")}
        helper={t("whatsappHelper")}
        error={err("whatsappPhone")}
      >
        <Input
          id="whatsappPhone"
          name="whatsappPhone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          prefix="+230"
          placeholder="5123 4567"
          defaultValue={v.whatsappPhone ?? ""}
          aria-invalid={Boolean(err("whatsappPhone"))}
          aria-describedby={describedBy("whatsappPhone", {
            error: err("whatsappPhone"),
            helper: true,
          })}
        />
      </Field>

      <Field
        htmlFor="description"
        label={t("description")}
        error={err("description")}
      >
        <Textarea
          id="description"
          name="description"
          maxLength={500}
          rows={3}
          placeholder={t("descriptionPlaceholder")}
          defaultValue={v.description ?? ""}
          aria-invalid={Boolean(err("description"))}
          aria-describedby={describedBy("description", {
            error: err("description"),
          })}
        />
      </Field>

      <Field
        htmlFor="logo"
        label={t("logo")}
        helper={t("logoHelper")}
        error={logoMessage ? tv(logoMessage) : undefined}
      >
        <input type="hidden" name="logoUrl" value={logoUrl} />
        <div className="flex items-center gap-3">
          <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-card bg-ink-100">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- user upload preview
              <img src={logoUrl} alt="" className="size-full object-cover" />
            ) : (
              <ImageSquare aria-hidden="true" className="size-8 text-ink-500" />
            )}
          </div>
          <input
            ref={fileInput}
            id="logo"
            type="file"
            accept={LOGO_TYPES.join(",")}
            className="sr-only"
            onChange={(e) => onLogoChosen(e.target.files?.[0])}
            aria-describedby={describedBy("logo", {
              error: logoMessage,
              helper: true,
            })}
          />
          <Button
            type="button"
            variant="secondary"
            loading={uploading}
            onClick={() => fileInput.current?.click()}
          >
            {uploading
              ? t("logoUploading")
              : logoUrl
                ? t("logoChange")
                : t("logoChoose")}
          </Button>
        </div>
      </Field>

      <Button
        type="submit"
        variant="cta"
        size="lg"
        loading={pending}
        disabled={uploading}
      >
        {t("submit")}
      </Button>
    </form>
  );
}
