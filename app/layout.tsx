// FILE: @/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL != null
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "imerso | Tours 360° Interativos para Imóveis",
  description: "Transforme espaços em experiências imersivas com os tours 360° da imerso.",
  openGraph: {
    title: "imerso | Tours 360° Interativos para Imóveis",
    description: "Transforme espaços em experiências imersivas com os tours 360° da imerso.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
