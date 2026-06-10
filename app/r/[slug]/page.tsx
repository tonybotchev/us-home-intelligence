import { BuyForm } from "@/app/buy/page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface RealtorData {
  name: string; brokerage: string; headshot: string | null; accentColor: string;
}

async function getRealtorData(slug: string): Promise<RealtorData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://intel.nofluffmarketing.io";
    const res = await fetch(`${baseUrl}/api/realtor-lookup?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export default async function ReferralPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const realtor = await getRealtorData(slug);

  if (!realtor) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#f0f0f5] mb-3">Partner Link Not Found</h1>
            <p className="text-[#9ca3af] mb-6">This referral link may be invalid or the partner account may be inactive.</p>
            <a href="/buy" className="inline-flex items-center gap-2 bg-[#1a56db] text-white font-semibold px-8 py-4 rounded-xl">Order Directly</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <BuyForm
      referralSlug={slug}
      realtorName={realtor.name}
      realtorBrokerage={realtor.brokerage}
      realtorHeadshot={realtor.headshot}
      accentColor={realtor.accentColor}
    />
  );
}
