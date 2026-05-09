/**
 * DESIGN SYSTEM: Kinetic Texas
 * About Tony Botchev — NMLS #114198
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Phone, MapPin, Award, Clock, Users } from "lucide-react";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.dfwhome.loans/#tony",
    name: "Tony Botchev",
    alternateName: "Tony Botchev",
    jobTitle: "Licensed Mortgage Loan Originator",
    description: "Tony Botchev (NMLS #114198) is a Texas-licensed mortgage loan originator serving North DFW since 2006. Specializing in conventional, FHA, VA, jumbo, and DSCR loans. Sponsored by Loan Factory, Inc. NMLS #320841.",
    url: "https://www.dfwhome.loans/about",
    telephone: "+19452945020",
    email: "tony@dfwhome.loans",
    identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" },
    areaServed: ["Celina TX", "Prosper TX", "Frisco TX", "McKinney TX", "Anna TX", "Melissa TX", "Aubrey TX", "Gunter TX", "Little Elm TX", "Plano TX", "Allen TX", "Denton TX"],
    knowsAbout: ["Conventional Loans", "FHA Loans", "VA Loans", "Jumbo Loans", "DSCR Loans", "USDA Loans", "First-Time Homebuyer Programs", "Down Payment Assistance"],
    sameAs: [
      "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/114198",
      "https://twitter.com/tonybotchev",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Loan Factory, Inc.",
      legalName: "Loan Factory, Inc.",
      identifier: { "@type": "PropertyValue", name: "NMLS", value: "320841" },
    },
  },
];

const stats = [
  { icon: Clock, label: "Years in North DFW", value: "20+" },
  { icon: Users, label: "Families Helped", value: "500+" },
  { icon: Award, label: "NMLS License", value: "#114198" },
  { icon: MapPin, label: "Primary Markets", value: "Celina, Prosper, Frisco" },
];

const loanTypes = [
  { name: "Conventional", href: "/loans/conventional", desc: "3–20% down, best rates for 700+ credit" },
  { name: "FHA", href: "/loans/fha", desc: "3.5% down, 580+ credit score" },
  { name: "VA", href: "/loans/va", desc: "0% down for eligible veterans" },
  { name: "Jumbo", href: "/loans/jumbo", desc: "Loans above $766,550" },
  { name: "DSCR", href: "/loans/dscr", desc: "Investor loans, no tax returns" },
  { name: "First-Time Buyer", href: "/loans/first-time-buyer", desc: "Down payment assistance programs" },
];

export default function AboutPage() {
  useSEO({
    title: "About Tony Botchev | NMLS #114198 | DFW Homes & Loans",
    description: "Tony Botchev (NMLS #114198) is a North DFW mortgage loan originator with 20+ years of experience. Serving Celina, Prosper, Frisco, McKinney, and all of North DFW.",
    canonical: "https://www.dfwhome.loans/about",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              NMLS #114198 · TEXAS LICENSED MLO
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              MEET<br />
              <span className="text-[#C4521A]">TONY BOTCHEV</span>
            </h1>
            <p className="text-white/70 text-lg mb-4">
              North DFW's local mortgage expert since 2006. Not a call center. Not a bank. A real person who answers the phone.
            </p>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              Tony Botchev has helped over 500 North DFW families navigate the mortgage process — from first-time buyers in Anna to luxury buyers in Prosper. He specializes in the communities where he works: Celina, Prosper, Frisco, McKinney, and the surrounding North DFW corridor.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/apply" className="bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors text-center">
                Get Pre-Qualified Free →
              </Link>
              <a href="tel:+19453708656" className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
                <Phone size={16} /> (945) 370-8656
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/5 border border-white/10 p-5">
                <Icon size={20} className="text-[#C4521A] mb-2" />
                <div className="font-bebas text-3xl text-white">{value}</div>
                <div className="text-white/50 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-5 text-[#4A5568] leading-relaxed">
            <h2 className="font-bebas text-4xl text-[#1B2B1A]">THE NORTH DFW DIFFERENCE</h2>
            <p>
              Tony Botchev started his mortgage career in 2006 — right before one of the most challenging periods in real estate history. That experience shaped his approach: thorough underwriting, honest communication, and never promising what he can't deliver.
            </p>
            <p>
              Over the past two decades, Tony has watched North DFW transform from rural farmland into one of the fastest-growing regions in the country. He's closed loans in Celina when it was still a small town, helped buyers navigate the Prosper and Frisco boom years, and worked with investors building portfolios across Collin and Denton counties.
            </p>
            <p>
              Tony is licensed in Texas and operates through Loan Factory, Inc. (NMLS #320841), a wholesale mortgage broker that gives him access to rates and programs from dozens of lenders — not just one bank's product sheet.
            </p>
            <p>
              When you work with Tony, you get one point of contact from application to closing. No handoffs to processors you've never met. No unanswered calls. Just a straightforward mortgage process from someone who knows North DFW.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-[#1B2B1A] p-6">
              <h3 className="font-bebas text-xl text-white mb-4">LICENSING & CREDENTIALS</h3>
              <div className="space-y-3 text-sm">
                <div className="border-b border-white/10 pb-2">
                  <div className="text-white/50 text-xs">Personal NMLS</div>
                  <div className="text-white font-medium">#114198</div>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <div className="text-white/50 text-xs">Company NMLS</div>
                  <div className="text-white font-medium">Loan Factory, Inc. #320841</div>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <div className="text-white/50 text-xs">State License</div>
                  <div className="text-white font-medium">Texas MLO</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs">Equal Housing</div>
                  <div className="text-white font-medium">Equal Housing Lender</div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-5">
              <h3 className="font-bebas text-lg text-[#1B2B1A] mb-3">CONTACT TONY</h3>
              <div className="space-y-2 text-sm text-[#4A5568]">
                <div><a href="tel:+19453708656" className="text-[#C4521A] font-medium hover:underline">(945) 370-8656</a></div>
                <div><a href="mailto:tony@dfwhome.loans" className="text-[#C4521A] font-medium hover:underline">tony@dfwhome.loans</a></div>
                <div className="text-xs text-gray-400 pt-2">Serving Celina, Prosper, Frisco, McKinney, Anna, Melissa, Aubrey, Gunter, Little Elm, and all of North DFW.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-2">LOAN PROGRAMS</h2>
          <p className="text-[#4A5568] mb-8">Tony offers every major loan type available to Texas homebuyers and investors.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {loanTypes.map((lt) => (
              <Link key={lt.name} href={lt.href} className="border border-gray-200 p-5 hover:border-[#C4521A] hover:shadow-sm transition-all group">
                <h3 className="font-bebas text-xl text-[#1B2B1A] group-hover:text-[#C4521A] transition-colors mb-1">{lt.name}</h3>
                <p className="text-sm text-[#4A5568]">{lt.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B2B1A] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-white mb-3">READY TO GET STARTED?</h2>
          <p className="text-white/70 mb-6">No hard credit pull to start. Pre-approval in 24 hours. Tony answers the phone.</p>
          <Link href="/apply" className="inline-block bg-[#C4521A] text-white px-10 py-4 font-semibold text-lg hover:bg-[#A8431A] transition-colors">
            Get Pre-Qualified Free →
          </Link>
          <p className="text-white/40 text-xs mt-4">Tony Botchev · NMLS #114198 · Loan Factory, Inc. NMLS #320841 · Equal Housing Lender</p>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
