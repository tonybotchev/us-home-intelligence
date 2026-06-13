"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#2a2a3a]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-[#00c2ff] font-bold text-lg">USHI</span>
          <span className="text-[#6b7280] text-sm ml-2">by NoFluff Marketing LLC</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/buy" className="text-[#9ca3af] hover:text-[#f0f0f5] text-sm transition-colors">Order Reports</Link>
          <Link href="/realtor" className="text-[#9ca3af] hover:text-[#f0f0f5] text-sm transition-colors">Realtor Partners</Link>
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
          <Link href="/buy" className="text-[#9ca3af] text-sm" onClick={() => setOpen(false)}>Order Reports</Link>
          <Link href="/realtor" className="text-[#9ca3af] text-sm" onClick={() => setOpen(false)}>Realtor Partners</Link>
          <Link href="/buy" className="bg-[#1a56db] text-white text-sm px-4 py-2 rounded-lg text-center" onClick={() => setOpen(false)}>Order Now</Link>
        </div>
      )}
    </nav>
  );
}
