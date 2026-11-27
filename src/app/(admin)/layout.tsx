import { ChartBar, ChatCircle, ShieldCheck } from "@phosphor-icons/react/ssr";

import { ConsoleShell } from "@/components/console-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConsoleShell
      brand="Bazar Trust"
      caption="Platform team"
      tone="admin"
      items={[
        {
          href: "/admin",
          label: "Overview",
          icon: <ChartBar aria-hidden="true" className="size-5" />,
        },
        {
          href: "/admin/verifications",
          label: "Verifications",
          icon: <ShieldCheck aria-hidden="true" className="size-5" />,
        },
        {
          href: "/admin/disputes",
          label: "Disputes",
          icon: <ChatCircle aria-hidden="true" className="size-5" />,
        },
      ]}
    >
      {children}
    </ConsoleShell>
  );
}
