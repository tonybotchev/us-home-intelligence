/* Kinetic Texas — Navbar
   Sticky with blur backdrop, forest green on scroll, orange CTA
   FIX: Logo navigates to /, scroll links use /#section when not on homepage
*/
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "wouter";
import NMLSDisclosure from "@/components/NMLSDisclosure";
import { trackPhoneClick } from "@/lib/analytics";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHomepage = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Loan Options", href: "#loans", type: "scroll" },
    { label: "Cities", href: "/cities", type: "link" },
    { label: "Process", href: "#process", type: "scroll" },
    { label: "About Tony", href: "#about", type: "scroll" },
    { label: "Book a Call", href: "#book-call", type: "scroll" },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (isHomepage) {
      // On homepage: smooth scroll to section
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // On any other page: navigate to homepage + section hash
      window.location.href = "/" + href;
    }
  };

  const handleGetPreQualified = () => {
    setMenuOpen(false);
    window.location.href = "/apply";
  };

  return (
    <>
      {/* NMLS Compliance Bar — SAFE Act required on all advertising */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NMLSDisclosure variant="bar" />
      </div>
      <nav
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.26_0.065_155/0.97)] backdrop-blur-md shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo — always navigates to homepage */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="font-display text-2xl md:text-3xl tracking-wider transition-colors"
              style={{ color: "oklch(0.975 0.008 85)" }}
            >
              DFW HOMES
            </span>
            <span
              className="font-display text-xl md:text-2xl tracking-widest transition-colors"
              style={{ color: "oklch(0.62 0.16 42)" }}
            >
              & LOANS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.type === "link" ? (
                <Link key={link.href} href={link.href}>
                  <span
                    className="font-['Outfit'] font-500 text-sm uppercase tracking-widest transition-colors hover:text-[oklch(0.62_0.16_42)] cursor-pointer"
                    style={{ color: "oklch(0.975 0.008 85)" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-['Outfit'] font-500 text-sm uppercase tracking-widest transition-colors hover:text-[oklch(0.62_0.16_42)]"
                  style={{ color: "oklch(0.975 0.008 85)" }}
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+19453708656"
              className="flex items-center gap-2 font-['Outfit'] font-600 text-sm tracking-wide transition-colors"
              style={{ color: "oklch(0.975 0.008 85)" }}
              onClick={() => trackPhoneClick()}
            >
              <Phone size={15} />
              (945) 370-8656
            </a>
            <button
              onClick={handleGetPreQualified}
              className="btn-primary-kt text-sm px-5 py-2.5"
            >
              <span>Get Pre-Qualified</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: "oklch(0.975 0.008 85)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "oklch(0.26 0.065 155 / 0.98)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            link.type === "link" ? (
              <Link key={link.href} href={link.href}>
                <span
                  className="font-display text-5xl tracking-wider transition-colors hover:text-[oklch(0.62_0.16_42)] cursor-pointer"
                  style={{ color: "oklch(0.975 0.008 85)", animationDelay: `${i * 0.07}s` }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ) : (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-5xl tracking-wider transition-colors hover:text-[oklch(0.62_0.16_42)]"
                style={{
                  color: "oklch(0.975 0.008 85)",
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                {link.label}
              </button>
            )
          ))}
          <div className="flex flex-col items-center gap-4 mt-4">
            <a
              href="tel:+19453708656"
              className="flex items-center gap-2 font-['Outfit'] font-600 text-lg"
              style={{ color: "oklch(0.62 0.16 42)" }}
              onClick={() => trackPhoneClick()}
            >
              <Phone size={18} />
              (945) 370-8656
            </a>
            <button
              onClick={handleGetPreQualified}
              className="btn-primary-kt text-base px-8 py-3 mt-2"
            >
              <span>Get Pre-Qualified Free</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
