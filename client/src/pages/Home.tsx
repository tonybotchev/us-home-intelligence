/* Kinetic Texas — Main Home Page
   W4: LocalBusiness + MortgageBroker + Person JSON-LD schema added
*/
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoanPrograms from "@/components/LoanPrograms";
import AboutTony from "@/components/AboutTony";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import PreApproval from "@/components/PreApproval";
import PreQualForm from "@/components/PreQualForm";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import AEOContent from "@/components/AEOContent";
import BookingWidget from "@/components/BookingWidget";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FinancialService"],
    "@id": "https://www.dfwhome.loans/#business",
    name: "DFW Homes & Loans",
    alternateName: "DFW Home Loans",
    description:
      "Tony Botchev, NMLS #114198, is a licensed Texas Mortgage Loan Originator serving North DFW. Conventional, FHA, VA, Jumbo, DSCR, and USDA loans. Sponsored by Loan Factory, Inc. NMLS #320841.",
    url: "https://www.dfwhome.loans",
    telephone: "+19453004002",
    email: "tony@dfwhome.loans",
    areaServed: [
      "Celina, TX", "Prosper, TX", "Frisco, TX", "McKinney, TX",
      "Plano, TX", "Allen, TX", "Denton, TX", "Little Elm, TX",
      "Aubrey, TX", "Anna, TX", "Melissa, TX", "Gunter, TX",
      "Wylie, TX", "Lewisville, TX", "The Colony, TX",
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mortgage Loan Programs",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "FinancialProduct", name: "FHA Loan", url: "https://www.dfwhome.loans/loans/fha" } },
        { "@type": "Offer", itemOffered: { "@type": "FinancialProduct", name: "VA Loan", url: "https://www.dfwhome.loans/loans/va" } },
        { "@type": "Offer", itemOffered: { "@type": "FinancialProduct", name: "Conventional Loan", url: "https://www.dfwhome.loans/loans/conventional" } },
        { "@type": "Offer", itemOffered: { "@type": "FinancialProduct", name: "Jumbo Loan", url: "https://www.dfwhome.loans/loans/jumbo" } },
        { "@type": "Offer", itemOffered: { "@type": "FinancialProduct", name: "DSCR Loan", url: "https://www.dfwhome.loans/loans/dscr" } },
        { "@type": "Offer", itemOffered: { "@type": "FinancialProduct", name: "USDA Loan", url: "https://www.dfwhome.loans/loans/usda" } },
      ],
    },
    sameAs: [
      "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/114198",
      "https://twitter.com/tonybotchev",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.dfwhome.loans/#tony",
    name: "Tony Botchev",
    alternateName: "Tony Botchev",
    jobTitle: "Licensed Mortgage Loan Originator",
    description:
      "Tony Botchev (NMLS #114198) is a Texas-licensed Mortgage Loan Originator with 18+ years of experience serving North DFW home buyers. Sponsored by Loan Factory, Inc. NMLS #320841.",
    url: "https://www.dfwhome.loans/about",
    telephone: "+19453004002",
    email: "tony@dfwhome.loans",
    identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" },
    sameAs: [
      "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/114198",
      "https://twitter.com/tonybotchev",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Loan Factory, Inc.",
      identifier: { "@type": "PropertyValue", name: "NMLS", value: "320841" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.dfwhome.loans/#website",
    name: "DFW Homes & Loans",
    url: "https://www.dfwhome.loans",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://www.dfwhome.loans/?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  },
];

export default function Home() {
  useSEO({
    title: "DFW Mortgage Lender | Tony Botchev NMLS #114198 | DFW Homes & Loans",
    description:
      "North DFW's trusted mortgage advisor. FHA, VA, Conventional, Jumbo, DSCR, USDA loans. Tony Botchev NMLS #114198, sponsored by Loan Factory Inc NMLS #320841. Pre-qualify in 3 minutes.",
    canonical: "https://www.dfwhome.loans/",
    schema: homeSchema,
  });

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.008 85)" }}>
      <Navbar />
      <Hero />
      <LoanPrograms />
      <AboutTony />
      <Process />
      <Testimonials />
      <PreApproval />
      <PreQualForm />
      <Calculator />
      <FAQ />
      <BookingWidget />
      <AEOContent />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
