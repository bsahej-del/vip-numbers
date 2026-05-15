"use client";

import Link from "next/link";
import { VIPNumber, categoryColor, categoryLabel } from "@/lib/types";
import { useCart } from "@/lib/cart";

export default function NumberCard({ num }: { num: VIPNumber }) {
  const { add, items } = useCart();
  const inCart = items.some((i) => i.number.id === num.id);

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-400/40 transition-all duration-300">
      {!num.available && (
        <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center z-10">
          <span className="text-white/60 font-semibold tracking-widest uppercase text-sm">Sold</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-widest border px-2 py-0.5 rounded-full ${categoryColor[num.category]}`}>
          {categoryLabel[num.category]}
        </span>
        <span className="text-xs text-white/40">{num.pattern}</span>
      </div>

      <Link href={`/numbers/${num.id}`}>
        <p className="text-2xl font-bold tracking-widest text-white group-hover:text-amber-400 transition-colors font-mono">
          {num.number}
        </p>
      </Link>

      <p className="text-sm text-white/50 line-clamp-2">{num.description}</p>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        <span className="text-xl font-bold text-amber-400">
          ₹{num.price.toLocaleString("en-IN")}
        </span>
        <button
          disabled={!num.available || inCart}
          onClick={() => add(num)}
          className="text-sm px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
