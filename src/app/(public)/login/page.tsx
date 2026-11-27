import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CheckCircle } from "@phosphor-icons/react/ssr";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Photo } from "@/components/ui/photo";
import { getUser, safeNext } from "@/lib/auth";

import { LoginForm } from "./login-form";

/**
 * Sign in and sign up are one screen: the email code creates the account
 * the first time. Black brand panel + cream form, stacked on phones.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNext((await searchParams).next);
  if (await getUser()) redirect(next);

  const t = await getTranslations("Auth");
  const points = [t("panelPoint1"), t("panelPoint2"), t("panelPoint3")];

  return (
    <div className="grid min-h-dvh flex-1 grid-rows-[auto_1fr] bg-sand-50 desktop:grid-cols-[1fr_1fr] desktop:grid-rows-1">
      {/* Brand panel: full-bleed photo with the lime headline */}
      <section className="relative isolate flex min-h-[300px] flex-col overflow-hidden bg-ink-900 px-4 pb-8 pt-4 text-white tablet:min-h-[380px] tablet:px-10 desktop:min-h-0 desktop:px-14 desktop:py-12">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Photo
            name="hero-shopping-street"
            alt=""
            priority
            sizes="(max-width: 1280px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-ink-900/50" />
        </div>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Bazar home"
            className="flex min-h-11 items-center"
          >
            <Logo />
          </Link>
          <div className="desktop:hidden">
            <LanguageSwitcher compact tone="dark" />
          </div>
        </div>

        <p className="mt-auto max-w-[12ch] pt-10 font-heading text-[2.5rem] font-extrabold leading-[2.75rem] tracking-[-0.03em] text-lime-400 tablet:text-[3.5rem] tablet:leading-[3.75rem] desktop:text-[4rem] desktop:leading-[4.25rem]">
          {t("panelTitle")}
        </p>
        <ul className="mt-5 hidden flex-wrap gap-2 tablet:flex">
          {points.map((point) => (
            <li
              key={point}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/60 px-3 py-1.5 text-body text-white ring-1 ring-white/15 backdrop-blur"
            >
              <CheckCircle
                aria-hidden="true"
                className="size-4 shrink-0 text-lime-400"
                weight="fill"
              />
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Form */}
      <main className="flex flex-col px-4 py-8 tablet:px-10 desktop:px-14 desktop:py-12">
        <div className="hidden justify-end desktop:flex">
          <LanguageSwitcher />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-h1 text-ink-900 tablet:text-[2rem] tablet:leading-[2.5rem]">
              {t("title")}
            </h1>
            <p className="text-body-l text-ink-700">{t("subtitle")}</p>
          </div>
          <div className="rounded-sheet bg-white p-5 shadow-e2 ring-1 ring-ink-100 tablet:p-7 [&_button[type=submit]]:rounded-full [&_input]:rounded-full [&_input]:px-4">
            <LoginForm next={next} />
          </div>
          <p className="text-body text-ink-700">
            <span
              aria-hidden="true"
              className="mr-2 inline-block size-2 rounded-full bg-lime-400 align-middle"
            />
            {t("newHere")}
          </p>
        </div>
      </main>
    </div>
  );
}
