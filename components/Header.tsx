"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/numbers", label: "Browse Numbers" },
  { href: "/numerology", label: "Numerology" },
  { href: "/sell", label: "Sell Your Number" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQs" },
];

export default function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest text-amber-400 uppercase">
          VIP Numbers
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-white/60">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-amber-400 transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative flex items-center text-white/80 hover:text-amber-400 transition-colors">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white/60 hover:text-white">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/10 px-4 py-4 space-y-1">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
              className="block py-3 text-white/70 hover:text-amber-400 transition-colors border-b border-white/5">
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
