"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest text-amber-400 uppercase">
          VIP Numbers
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <Link href="/numbers" className="hover:text-amber-400 transition-colors">Browse</Link>
          <Link href="/admin" className="hover:text-amber-400 transition-colors">Admin</Link>
        </nav>

        <Link href="/cart" className="relative flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors">
          <ShoppingCart size={22} />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
