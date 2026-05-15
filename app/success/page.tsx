"use client";

import { useCart } from "@/lib/cart";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, []);

  return (
    <main className="max-w-xl mx-auto px-4 pt-28 pb-24 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-black text-white mb-4">Payment Successful!</h1>
      <p className="text-white/50 mb-4">
        Thank you for your purchase. Your VIP number(s) will be transferred within 1-2 business days.
      </p>
      <p className="text-white/30 text-sm mb-10">
        You will receive a confirmation via WhatsApp or email shortly.
      </p>
      <Link
        href="/numbers"
        className="inline-block px-8 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors"
      >
        Browse More Numbers
      </Link>
    </main>
  );
}
