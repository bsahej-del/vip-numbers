"use client";

import Link from "next/link";
import { VIPNumber, categoryColor, categoryLabel, operatorColor } from "@/lib/types";
import { useCart } from "@/lib/cart";

function digitSum(d: string) {
  return d.split("").reduce((a, c) => a + parseInt(c), 0);
}

export default function NumberCard({ num }: { num: VIPNumber }) {
  const { add, items } = useCart();
  const inCart = items.some((i) => i.number.id === num.id);
  const sum = digitSum(num.digits);

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-amber-400/40 transition-all duration-300">
      {!num.available && (
        <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center z-10">
          <span className="text-white/60 font-semibold tracking-widest uppercase text-sm border border-white/20 px-4 py-1 rounded-full">Sold</span>
        </div>
      )}

      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className={`text-xs font-semibold uppercase tracking-widest border px-2 py-0.5 rounded-full ${categoryColor[num.category]}`}>
          {categoryLabel[num.category]}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${operatorColor[num.operator]}`}>
            {num.operator.toUpperCase()}
          </span>
          <span className="text-xs text-white/30 capitalize">{num.type}</span>
        </div>
      </div>

      {/* Number */}
      <Link href={`/numbers/${num.id}`}>
        <p className="text-2xl font-bold tracking-widest text-white group-hover:text-amber-400 transition-colors font-mono leading-tight">
          {num.number}
        </p>
      </Link>

      {/* Pattern + state */}
      <div className="flex items-center justify-between text-xs text-white/30">
        <span>{num.pattern}</span>
        <span>{num.state}</span>
      </div>

      {/* Digit sum */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-white/30">Digit sum:</span>
        <span className="text-amber-400 font-bold">{sum}</span>
        <span className="text-white/20">•</span>
        <span className="text-white/30">Reduced:</span>
        <span className="text-amber-400 font-bold">{sum > 9 ? sum.toString().split("").reduce((a,c)=>a+parseInt(c),0) : sum}</span>
      </div>

      <p className="text-sm text-white/40 line-clamp-2">{num.description}</p>

      {/* Price + CTA */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
        <span className="text-xl font-bold text-amber-400">
          ₹{num.price.toLocaleString("en-IN")}
        </span>
        <button
          disabled={!num.available || inCart}
          onClick={() => add(num)}
          className="text-sm px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {inCart ? "In Cart ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
