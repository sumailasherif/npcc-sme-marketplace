import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Bazar Mauritius",
    template: "%s — Bazar Mauritius",
  },
  description:
    "Discover verified Mauritian SMEs, order with island-wide delivery, or open your own shop in 2 minutes.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e6" },
    { media: "(prefers-color-scheme: dark)", color: "#10120e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="text-scale" content="scale" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var _t=localStorage.getItem("bazar-theme");if(_t==="dark"||_t==="light"){document.documentElement.setAttribute("data-theme",_t);}}catch(e){}`,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/brand.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>
        {children}
        <Script src="/i18n.js" strategy="afterInteractive" />
        <Script src="/edit-text.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
