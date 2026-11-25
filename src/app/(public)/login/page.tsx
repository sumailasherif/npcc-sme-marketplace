import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { SiteHeader } from "@/components/site-header";
import { getUser, safeNext } from "@/lib/auth";

import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNext((await searchParams).next);
  if (await getUser()) redirect(next);

  const t = await getTranslations("Auth");

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h1">{t("title")}</h1>
          <p className="text-body-l text-ink-700">{t("subtitle")}</p>
        </div>
        <div className="rounded-card bg-surface p-4 shadow-e1">
          <LoginForm next={next} />
        </div>
      </main>
    </div>
  );
}
