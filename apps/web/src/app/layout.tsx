import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const euclid = localFont({
  src: [
    { path: "./fonts/EuclidCircularB-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/EuclidCircularB-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/EuclidCircularB-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/EuclidCircularB-Bold.woff2", weight: "700", style: "normal" },
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
  title: "DriveScore",
  description:
    "AI-powered ownership advisor — know what it's really like to own a car before you buy it.",
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#6841E6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${euclid.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
