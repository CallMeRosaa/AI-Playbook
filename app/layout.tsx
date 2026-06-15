import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Airman's AI Playbook",
  description: "Empowering every Airman to reclaim hours through AI — official prompts, tools, and your personal AI context file.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#003087",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${publicSans.variable} h-full`}>
      <body className="min-h-full bg-[#F4F6F9] text-[#002554] font-[family-name:var(--font-public-sans)]">
        <div className="max-w-lg mx-auto min-h-screen relative">
          <div className="bg-[#FFC72C] text-[#002554] text-center text-[10px] font-bold uppercase tracking-widest py-1.5 px-4">
            🚧 Beta — Content and features are actively being developed
          </div>
          <main className="page-content">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
