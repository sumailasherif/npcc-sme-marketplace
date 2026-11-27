import { MapPin, Package, Users } from "@phosphor-icons/react/ssr";

import { ConsoleShell } from "@/components/console-shell";

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConsoleShell
      brand="Grabbit Express"
      caption="Delivery partner"
      tone="delivery"
      items={[
        {
          href: "/delivery",
          label: "Jobs",
          icon: <Package aria-hidden="true" className="size-5" />,
        },
        {
          href: "/delivery/partners",
          label: "Partners",
          icon: <Users aria-hidden="true" className="size-5" />,
        },
        {
          href: "/track/DEL_2026_119/NAJS4SYF",
          label: "Tracking",
          icon: <MapPin aria-hidden="true" className="size-5" />,
        },
      ]}
    >
      {children}
    </ConsoleShell>
  );
}
