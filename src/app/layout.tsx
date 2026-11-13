import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { analytics, seo, site } from "../../content/site";
import { homeOgImageUrl } from "@/lib/seo";
import Footer from "@/components/Footer";
import AssistantWidget from "@/components/AssistantWidget";
import Header from "@/components/Header";
import "./globals.css";

const sans = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  // origin only: Next adds the base path to relative URLs itself
  metadataBase: new URL(new URL(site.url).origin),
  title: { default: seo.homeTitle, template: `%s | ${site.name}` },
  description: seo.homeDescription,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [{ url: homeOgImageUrl, width: 1200, height: 630, alt: `${site.name}: ${site.role}` }],
  },
  twitter: { card: "summary_large_image", images: [homeOgImageUrl] },
  ...(seo.googleVerification && { verification: { google: seo.googleVerification } }),
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
        <AssistantWidget />
        {analytics.umamiId && <script defer src="https://cloud.umami.is/script.js" data-website-id={analytics.umamiId} data-domains={new URL(site.url).hostname} />}
      </body>
    </html>
  );
}
