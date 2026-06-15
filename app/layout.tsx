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
      <body className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5]">
        {children}
        <script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a2b31c595a221ced514bd8f"
          data-source="WEB_USER"
          data-active="true"
          async
        />
      </body>
    </html>
  );
}
