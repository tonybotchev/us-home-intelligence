/* Kinetic Texas — Mortgage Calculator
   Interactive payment estimator
   Cream background with forest green accents
*/
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import NMLSDisclosure from "@/components/NMLSDisclosure";

export default function Calculator() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.875);
  const [taxes, setTaxes] = useState(7200);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);
  const [term, setTerm] = useState(30);

  const [payment, setPayment] = useState({ pi: 0, tax: 0, ins: 0, total: 0, loanAmt: 0, totalInterest: 0 });

  useEffect(() => {
    const loanAmt = homePrice * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const pi = monthlyRate === 0
      ? loanAmt / n
      : (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const tax = taxes / 12;
    const ins = insurance / 12;
    const total = pi + tax + ins + hoa;
    const totalInterest = pi * n - loanAmt;
    setPayment({ pi: Math.round(pi), tax: Math.round(tax), ins: Math.round(ins), total: Math.round(total), loanAmt: Math.round(loanAmt), totalInterest: Math.round(totalInterest) });
  }, [homePrice, downPct, rate, taxes, insurance, hoa, term]);

  const fmt = (n: number) => n.toLocaleString("en-US");

  const InputField = ({
    label, value, onChange, min, max, step, prefix, suffix
  }: {
    label: string; value: number; onChange: (v: number) => void;
    min: number; max: number; step: number; prefix?: string; suffix?: string;
  }) => (
    <div>
      <label className="font-['Outfit'] text-xs uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.45 0.02 80)" }}>
        {label}
      </label>
      <div className="flex items-center border-b-2 pb-1" style={{ borderColor: "oklch(0.26 0.065 155)" }}>
        {prefix && <span className="font-['Outfit'] font-600 mr-1" style={{ color: "oklch(0.26 0.065 155)" }}>{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 bg-transparent font-['Outfit'] font-600 text-lg outline-none"
          style={{ color: "oklch(0.26 0.065 155)" }}
        />
        {suffix && <span className="font-['Outfit'] font-600 ml-1" style={{ color: "oklch(0.26 0.065 155)" }}>{suffix}</span>}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-2 accent-[oklch(0.62_0.16_42)] h-1"
        style={{ accentColor: "oklch(0.62 0.16 42)" }}
      />
    </div>
  );

  return (
    <section id="calculator" className="py-24 md:py-32" style={{ background: "oklch(0.975 0.008 85)" }}>
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <p className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "oklch(0.62 0.16 42)" }}>
            Payment Estimator
          </p>
          <h2
            className="font-display leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "oklch(0.26 0.065 155)" }}
          >
            ESTIMATE YOUR
            <br />
            <span style={{ color: "oklch(0.62 0.16 42)" }}>MONTHLY PAYMENT</span>
          </h2>
          <p className="font-['Outfit'] text-sm" style={{ color: "oklch(0.45 0.02 80)" }}>
            Educational tool only. Not a commitment to lend. Actual rates and payments vary. All loans subject to qualification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8" style={{ background: "oklch(0.94 0.012 80)" }}>
            <InputField label="Home Price" value={homePrice} onChange={setHomePrice} min={100000} max={3000000} step={5000} prefix="$" />
            <InputField label="Down Payment %" value={downPct} onChange={setDownPct} min={0} max={50} step={1} suffix="%" />
            <InputField label="Interest Rate %" value={rate} onChange={setRate} min={2} max={15} step={0.125} suffix="%" />
            <div>
              <label className="font-['Outfit'] text-xs uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.45 0.02 80)" }}>
                Loan Term
              </label>
              <select
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full bg-transparent font-['Outfit'] font-600 text-lg outline-none border-b-2 pb-1"
                style={{ borderColor: "oklch(0.26 0.065 155)", color: "oklch(0.26 0.065 155)" }}
              >
                <option value={30}>30 Years</option>
                <option value={20}>20 Years</option>
                <option value={15}>15 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>
            <InputField label="Annual Property Taxes" value={taxes} onChange={setTaxes} min={0} max={50000} step={100} prefix="$" />
            <InputField label="Annual Home Insurance" value={insurance} onChange={setInsurance} min={0} max={20000} step={100} prefix="$" />
          </div>

          {/* Results */}
          <div>
            {/* Big number */}
            <div
              className="p-8 mb-4"
              style={{ background: "oklch(0.26 0.065 155)" }}
            >
              <p className="font-['Outfit'] text-xs uppercase tracking-widest mb-2" style={{ color: "oklch(0.62 0.16 42)" }}>
                Estimated Monthly Payment
              </p>
              <div className="font-display leading-none mb-1" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", color: "oklch(0.975 0.008 85)" }}>
                ${fmt(payment.total)}
              </div>
              <p className="font-['Outfit'] text-sm" style={{ color: "oklch(0.78 0.02 85)" }}>per month</p>
            </div>

            {/* Breakdown */}
            <div className="p-8 space-y-4" style={{ background: "oklch(0.94 0.012 80)" }}>
              {[
                { label: "Principal & Interest", value: payment.pi },
                { label: "Property Taxes", value: payment.tax },
                { label: "Home Insurance", value: payment.ins },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="font-['Outfit'] text-sm" style={{ color: "oklch(0.45 0.02 80)" }}>{item.label}</span>
                  <span className="font-['Outfit'] font-700 text-sm" style={{ color: "oklch(0.26 0.065 155)" }}>
                    ${fmt(item.value)}/mo
                  </span>
                </div>
              ))}
              <div className="pt-4 border-t" style={{ borderColor: "oklch(0.88 0.015 80)" }}>
                <div className="flex justify-between mb-2">
                  <span className="font-['Outfit'] text-sm" style={{ color: "oklch(0.45 0.02 80)" }}>Loan Amount</span>
                  <span className="font-['Outfit'] font-700 text-sm" style={{ color: "oklch(0.26 0.065 155)" }}>${fmt(payment.loanAmt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-['Outfit'] text-sm" style={{ color: "oklch(0.45 0.02 80)" }}>Total Interest</span>
                  <span className="font-['Outfit'] font-700 text-sm" style={{ color: "oklch(0.62 0.16 42)" }}>${fmt(payment.totalInterest)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/apply'}
              className="btn-primary-kt w-full text-base py-4 mt-4"
            >
              <span className="flex items-center justify-center gap-2">
                Get a Real Rate Quote <ArrowRight size={16} />
              </span>
            </button>
            <NMLSDisclosure variant="form" />
          </div>
        </div>
      </div>
    </section>
  );
}
