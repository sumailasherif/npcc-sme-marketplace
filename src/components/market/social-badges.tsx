import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/ssr";

import type { Social } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

const meta: Record<Social, { label: string; Icon: React.ElementType }> = {
  instagram: { label: "Instagram", Icon: InstagramLogo },
  facebook: { label: "Facebook", Icon: FacebookLogo },
  whatsapp: { label: "WhatsApp", Icon: WhatsappLogo },
};

/** Shows the channels a business already sells on. Bazar is their hub. */
export function SocialBadges({
  socials,
  className,
}: {
  socials: Social[];
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-caption text-ink-500",
        className,
      )}
    >
      <span>Also on</span>
      {socials.map((social) => {
        const { label, Icon } = meta[social];
        return (
          <Icon
            key={social}
            role="img"
            aria-label={label}
            className="size-4 text-ink-700"
          />
        );
      })}
    </span>
  );
}
