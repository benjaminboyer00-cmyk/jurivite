import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { createMetadata, siteConfig } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata({
  title:
    "JuriVite — Générateur CGV, mentions légales & documents juridiques PDF",
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "générateur cgv",
    "générateur mentions légales",
    "documents juridiques pdf",
    "rgpd modèle",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <AuthSessionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
