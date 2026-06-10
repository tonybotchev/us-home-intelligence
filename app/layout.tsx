import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "US Home Intelligence | Investment-Grade Neighborhood Reports",
  description: "Investment-grade neighborhood intelligence. Any US address. Delivered in under an hour. Produced exclusively by NoFluff Marketing LLC.",
  metadataBase: new URL("https://intel.nofluffmarketing.io"),
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5]">{children}</body>
    </html>
  );
}
