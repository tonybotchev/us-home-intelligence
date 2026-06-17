import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Dashboard | US Home Intelligence",
  description: "Realtor partner dashboard for US Home Intelligence. Manage cobranded reports and referral links.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
