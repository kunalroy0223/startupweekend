import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Mr_Dafoe } from "next/font/google";
import "@/styles/globals.css";
import { SITE_URL, event } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { organizationLd, websiteLd, eventLd, placeLd, graph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { Cursor } from "@/components/animation/Cursor";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", axes: ["wdth", "opsz"], display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const script = Mr_Dafoe({ subsets: ["latin"], weight: "400", variable: "--font-dafoe", display: "swap" });

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: pageMeta.home.title, template: `%s | ${event.name}` },
  description: pageMeta.home.description,
  applicationName: event.name,
  keywords: [
    "Techstars Startup Weekend Siliguri 2027",
    "Startup Weekend Siliguri",
    "Startup Events in Siliguri",
    "AI Startup Event in Siliguri",
    "Startup Building Event in West Bengal",
    "Entrepreneurship Events in Siliguri",
    "AI Innovation Event",
    "Startup Events in India",
    "AI Startup Building Event",
  ],
  authors: [{ name: "Inhub E-Cell, Inspiria Knowledge Campus" }],
  creator: "Inhub E-Cell",
  openGraph: { siteName: event.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: gsc ? { google: gsc } : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${mono.variable} ${script.variable}`} suppressHydrationWarning>
      <head>

        <JsonLd data={graph(organizationLd, websiteLd, placeLd, eventLd)} />
      </head>
      <body className="bg-void text-white">
        <SmoothScroll>
          <SiteNav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <Cursor />
        </SmoothScroll>
        <div aria-hidden="true" className="grain" />
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
