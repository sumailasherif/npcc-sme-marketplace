import { MapPin, Storefront, WhatsappLogo } from "@phosphor-icons/react/ssr";

import { buttonVariants } from "@/components/ui/button";
import { VerificationPill } from "@/components/ui/status-pill";

type Props = {
  name: string;
  logoUrl: string | null;
  verified: boolean;
  verifiedLabel: string;
  unverifiedLabel: string;
  categoryLabel: string | null;
  districtLabel: string;
  description: string | null;
  whatsappHref: string;
  chatLabel: string;
};

/** Shop header (spec: Components > Shop header). Cover image arrives later. */
export function ShopHeader(props: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-card bg-surface p-4 shadow-e1">
      <div className="flex items-start gap-3">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-card bg-lime-50 tablet:size-20">
          {props.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- Supabase storage image
            <img
              src={props.logoUrl}
              alt=""
              className="size-full object-cover"
              width={80}
              height={80}
            />
          ) : (
            <Storefront aria-hidden="true" className="size-8 text-lime-700" />
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-h1 break-words">{props.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <VerificationPill
              status={props.verified ? "verified" : "pending"}
              label={
                props.verified ? props.verifiedLabel : props.unverifiedLabel
              }
            />
            {props.categoryLabel ? (
              <span className="text-caption text-ink-700">
                {props.categoryLabel}
              </span>
            ) : null}
          </div>
          <p className="flex items-center gap-1 text-body text-ink-700">
            <MapPin aria-hidden="true" className="size-4 shrink-0" />
            {props.districtLabel}
          </p>
        </div>
      </div>

      {props.description ? (
        <p className="text-body-l text-ink-700">{props.description}</p>
      ) : null}

      <a
        href={props.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "primary", size: "lg" })}
      >
        <WhatsappLogo aria-hidden="true" weight="fill" />
        {props.chatLabel}
      </a>
    </section>
  );
}
