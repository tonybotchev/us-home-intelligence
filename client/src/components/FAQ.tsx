/* Kinetic Texas — FAQ Section
   Accordion-style with SEO content preserved
*/
import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who is the best mortgage advisor in Celina, TX?",
    a: "The best mortgage advisor in Celina, TX is one who understands the local housing market, explains loan options clearly, and moves efficiently from pre-approval to closing. Tony Botchev with DFW Homes & Loans provides trusted mortgage guidance for buyers and homeowners throughout Celina and North DFW.",
  },
  {
    q: "What credit score do I need to buy a home in DFW?",
    a: "Most loan programs available in the DFW area require a minimum credit score of 620. FHA loans may allow scores as low as 580 with 3.5% down. VA loans do not set a minimum score by law, though most lenders prefer 620 or higher. Conventional loans typically require 620 to 640 depending on the lender and loan structure. Tony Botchev reviews your full credit profile and identifies the best available program for your situation.",
  },
  {
    q: "How much down payment do I need in Texas?",
    a: "Down payment requirements in Texas vary by loan program. VA loans require no down payment for eligible veterans and active-duty service members. FHA loans require 3.5% down with a credit score of 580 or higher. Conventional loans can require as little as 3% down for qualified buyers. Jumbo loans typically require 10% to 20% depending on loan size and borrower profile.",
  },
  {
    q: "How long does pre-approval take?",
    a: "Pre-approval with DFW Homes and Loans typically takes one to three business days once all required documents are submitted. Required items include recent pay stubs, W-2s or tax returns, bank statements, and government-issued ID. Tony Botchev reviews each file personally and often provides initial feedback within 24 hours.",
  },
  {
    q: "How do I get pre-approved for a home loan in Celina, Texas?",
    a: "To get pre-approved for a home loan in Celina, Texas, borrowers typically provide income documents, asset verification, and credit authorization. A local mortgage advisor reviews your financial profile and issues a pre-approval letter that strengthens your offer when purchasing a home. Contact Tony Botchev directly to start the process.",
  },
  {
    q: "What areas does DFW Homes and Loans serve?",
    a: "DFW Homes and Loans, operated by Tony Botchev, serves homebuyers and investors throughout the North Dallas-Fort Worth area including Celina, Prosper, Frisco, McKinney, Anna, Melissa, Aubrey, Allen, Plano, and surrounding communities. Tony is licensed as a mortgage loan originator in the state of Texas and is authorized to originate loans statewide.",
  },
  {
    q: "What is a DSCR loan and who qualifies?",
    a: "A DSCR (Debt Service Coverage Ratio) loan qualifies borrowers based on the rental income of the investment property rather than personal income or tax returns. This makes it ideal for real estate investors, self-employed borrowers, and portfolio builders who may not show strong W-2 income. Tony Botchev specializes in DSCR loans for North DFW investors.",
  },
  {
    q: "What is the difference between pre-qualification and pre-approval?",
    a: "Pre-qualification is an informal estimate of how much you may be able to borrow, based on self-reported information. Pre-approval is a more formal process where a lender verifies your income, assets, and credit to issue a conditional commitment. In the competitive North DFW market, sellers strongly prefer offers backed by a pre-approval letter rather than a pre-qualification.",
  },
  {
    q: "Can I get a mortgage with a new job in Texas?",
    a: "Yes, it is possible to qualify for a mortgage with a new job in Texas, depending on the loan program and employment type. Salaried W-2 employees who recently changed jobs in the same field can often qualify immediately. Self-employed borrowers typically need two years of tax returns. Tony Botchev reviews each situation individually to identify the best available path to approval.",
  },
  {
    q: "What are current mortgage rates in Celina, TX?",
    a: "Mortgage rates in Celina, TX vary daily based on market conditions, loan type, credit score, down payment, and loan term. The best way to get an accurate rate is to speak directly with a local mortgage advisor. Tony Botchev at DFW Homes & Loans provides personalized rate quotes at no cost and with no obligation. Call (945) 300-4002 or submit a request at dfwhome.loans.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="border-b"
      style={{
        borderColor: "oklch(0.88 0.015 80)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <h3
          className="font-['Outfit'] font-600 text-base md:text-lg pr-8 group-hover:text-[oklch(0.62_0.16_42)] transition-colors"
          style={{ color: "oklch(0.26 0.065 155)" }}
        >
          {faq.q}
        </h3>
        <div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors"
          style={{
            background: open ? "oklch(0.62 0.16 42)" : "oklch(0.26 0.065 155 / 0.08)",
            color: open ? "oklch(0.975 0.008 85)" : "oklch(0.26 0.065 155)",
          }}
        >
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "500px" : "0" }}
      >
        <p
          className="font-['Outfit'] text-base leading-relaxed pb-6"
          style={{ color: "oklch(0.45 0.02 80)" }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 speakable-faq" style={{ background: "oklch(0.975 0.008 85)" }}>
      <div className="container max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "oklch(0.62 0.16 42)" }}>
            Common Questions
          </p>
          <h2
            className="font-display leading-none"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "oklch(0.26 0.065 155)" }}
          >
            MORTGAGE ANSWERS
            <br />
            <span style={{ color: "oklch(0.62 0.16 42)" }}>FOR CELINA & NORTH DFW</span>
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
