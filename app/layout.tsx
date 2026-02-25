import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "BoostAI Editions — The Digital Builder Library",
  description:
    "A curated collection of thoughts on building thoughtful digital products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col"
        style={{
          backgroundColor: "#EAE0D5",
          color: "#0A0908",
        }}
      >
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
