import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const ibm_plex_sans_arabic = IBM_Plex_Sans_Arabic({
  weight: "400",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Zikr AI: A Smart sebha",
  description:
    "A smart sebha that uses AI to count your zikr for you while you are working, studying, or focusing on something else. You say the zikr, and Zikr will count it for you.",
  keywords: [
    "zikr",
    "zikr AI",
    "sebha",
    "AI sebha",
    "counter",
    "tasbeeh",
    "voice zikr",
    "count my zikr",
    "zikr assistant",
    "zikr counter",
    "zikr app",
    "zikr counter app",
    "voice sebha",
    "smart zikr",
    "smart sebha",
  ],
  metadataBase: new URL("https://zikrvoice.vercel.app"),
  openGraph: {
    images: "/opengraph-image.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <body className={ibm_plex_sans_arabic.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
