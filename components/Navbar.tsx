"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NFGFederationHeader from "@/components/NFGFederationHeader";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed top-0 left-0 right-0" style={{ zIndex: 70 }}>
        <NFGFederationHeader siteKey="ushi" />
      </div>
      <nav className="fixed left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#2a2a3a]" style={{ top: "40px" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L4 14v14h8v-8h8v8h8V14L16 4z" stroke="#00c9a7" strokeWidth="2" fill="none"/>
              <circle cx="16" cy="17" r="3" fill="#00c9a7"/>
              <path d="M16 20v4" stroke="#00c9a7" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 22 Q16 28 23 22" stroke="#1a56db" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M6 25 Q16 33 26 25" stroke="#1a56db" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: "18px", color: "#ffffff", letterSpacing: "-0.3px", lineHeight: 1 }}>
              US Home{" "}
              <span style={{ color: "#00c9a7" }}>Intelligence</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-[#9ca3af] hover:text-[#f0f0f5] text-sm transition-colors">About</Link>
            <Link href="/buy" className="text-[#9ca3af] hover:text-[#f0f0f5] text-sm transition-colors">Order Reports</Link>
            <Link href="/buy" className="bg-[#1a56db] hover:bg-[#1040b0] text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium">
              Order Now
            </Link>
          </div>
          <button className="md:hidden text-[#9ca3af]" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden bg-[#12121a] border-b border-[#2a2a3a] px-6 py-4 flex flex-col gap-4">
            <Link href="/about" className="text-[#9ca3af] text-sm" onClick={() => setOpen(false)}>About</Link>
            <Link href="/buy" className="text-[#9ca3af] text-sm" onClick={() => setOpen(false)}>Order Reports</Link>
            <Link href="/buy" className="bg-[#1a56db] text-white text-sm px-4 py-2 rounded-lg text-center" onClick={() => setOpen(false)}>Order Now</Link>
          </div>
        )}
      </nav>
    </>
  );
}
