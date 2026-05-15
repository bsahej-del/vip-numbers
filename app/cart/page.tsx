"use client";

import { useCart } from "@/lib/cart";
import { categoryColor, categoryLabel } from "@/lib/types";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, remove, total, clear } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items.map((i) => i.number) }),
    });
    const { url, error } = await res.json();
    if (error) {
      alert(error);
      setLoading(false);
      return;
    }
    window.location.href = url;
  };

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-24 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
        <p className="text-white/40 mb-8">Add some VIP numbers to get started.</p>
        <Link
          href="/numbers"
          className="inline-block px-8 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors"
        >
          Browse Numbers
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-24">
      <h1 className="text-3xl font-black text-white mb-8">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map(({ number: num }) => (
          <div
            key={num.id}
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-white font-mono font-bold text-lg">{num.number}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs border px-2 py-0.5 rounded-full ${categoryColor[num.category]}`}>
                    {categoryLabel[num.category]}
                  </span>
                  <span className="text-white/30 text-xs">{num.pattern}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-amber-400 font-bold">₹{num.price.toLocaleString("en-IN")}</span>
              <button
                onClick={() => remove(num.id)}
                className="text-white/30 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-white/60">Total</span>
          <span className="text-2xl font-black text-amber-400">₹{total.toLocaleString("en-IN")}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 text-sm uppercase tracking-widest"
        >
          {loading ? "Redirecting…" : "Proceed to Checkout"}
        </button>
        <button
          onClick={clear}
          className="w-full mt-3 py-3 text-white/30 hover:text-white/60 text-sm transition-colors"
        >
          Clear cart
        </button>
      </div>
    </main>
  );
}
