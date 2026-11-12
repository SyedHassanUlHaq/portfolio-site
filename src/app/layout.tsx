import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { analytics, site } from "../../content/site";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const sans = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

const description = `${site.name} builds AI agents, voice agents, RAG systems and automations for businesses. Browse real projects with walkthrough videos, screenshots and tech stacks.`;

export const metadata: Metadata = {
  // origin only: Next adds the base path to generated image URLs itself
  metadataBase: new URL(new URL(site.url).origin),
  title: { default: `${site.name} — ${site.role}`, template: `%s | ${site.name}` },
  description,
  authors: [{ name: site.name }],
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${site.url.replace(/\/$/, "")}/` },
};

export const viewport: Viewport = { themeColor: "#faf7f2", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {analytics.umamiId && <script defer src="https://cloud.umami.is/script.js" data-website-id={analytics.umamiId} />}
      </body>
    </html>
  );
}
