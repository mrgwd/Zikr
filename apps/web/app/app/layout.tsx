import "../../globals.css";
import { Vazirmatn } from "next/font/google";
import { Metadata } from "next";
import { DynamicMetadata } from "@/components/DynamicMetadata";
import { AppBootstrapper } from "@/components/AppBootstrapper";
import { Providers } from "@/components/Providers";
import { FloatingMiniBarWrapper } from "@/components/FloatingMiniBarWrapper";
import { DevAudioDebugger } from "@workspace/ui/components/DevAudioDebugger";

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Katheera - Web App",
  description:
    "A smart sebha that uses AI to count your zikr for you while you are working, studying, or focusing on something else. You say the zikr, and Katheera will count it for you.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      lang="ar"
      dir="rtl"
      className={`${vazirmatn.variable} mx-auto max-w-xs p-2 font-sans antialiased`}
    >
      <AppBootstrapper />
      <Providers>
        <DynamicMetadata />
        {children}
        <DevAudioDebugger
          apiKey={process.env.NEXT_PUBLIC_EDGE_IMPULSE_API_KEY}
        />
        <FloatingMiniBarWrapper />
        <p className="text-muted-foreground absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs">
          v0.1.0-beta.2
        </p>
      </Providers>
    </main>
  );
}
