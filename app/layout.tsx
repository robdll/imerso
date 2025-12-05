// FILE: @/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "imerso | Tours 360° Interativos para Imóveis",
  description: "Transforme espaços em experiências imersivas com os tours 360° da imerso.",
  openGraph: {
    title: "imerso | Tours 360° Interativos para Imóveis",
    description: "Transforme espaços em experiências imersivas com os tours 360° da imerso.",
    images: ["https://placehold.co/1200x630/png"],
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
