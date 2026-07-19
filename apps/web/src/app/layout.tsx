import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryProvider } from "@/components/providers/query-provider";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const euclid = localFont({
  src: [
    {
      path: "./fonts/EuclidCircularB-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/EuclidCircularB-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/EuclidCircularB-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/EuclidCircularB-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-euclid",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "DriveScore",
    "E20",
    "E20 compatibility",
    "ethanol petrol",
    "Indian cars",
    "car score",
    "fuel blend",
    "Maruti",
    "Tata",
    "Hyundai",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "automotive",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt" },
        { url: "/llms-full.txt", title: "llms-full.txt" },
      ],
    },
  },
  other: {
    "llms-txt": "/llms.txt",
    "ai-content": "llms.txt",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0910" },
    { media: "(prefers-color-scheme: light)", color: "#6841E6" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      data-theme="dark"
      className={`${euclid.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface-starfield font-sans text-text-primary">
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
