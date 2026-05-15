"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import NumberCard from "@/components/NumberCard";
import { VIPNumber, Category } from "@/lib/types";

const categories: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Platinum", value: "platinum" },
  { label: "Gold", value: "gold" },
  { label: "Silver", value: "silver" },
];

export default function NumbersClient() {
  const searchParams = useSearchParams();
  const [numbers, setNumbers] = useState<VIPNumber[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">(
    (searchParams.get("category") as Category) || "all"
  );
  const [showSold, setShowSold] = useState(false);

  useEffect(() => {
    fetch("/api/numbers")
      .then((r) => r.json())
      .then(setNumbers);
  }, []);

  const filtered = numbers.filter((n) => {
    if (!showSold && !n.available) return false;
    if (category !== "all" && n.category !== category) return false;
    if (search && !n.number.replace(/\s/g, "").includes(search.replace(/\s/g, ""))) return false;
    return true;
  });

  return (
    <>
      <div className="mb-10">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-2">Catalog</p>
        <h1 className="text-4xl font-black text-white mb-2">Browse VIP Numbers</h1>
        <p className="text-white/40">{numbers.filter((n) => n.available).length} numbers available</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 font-mono"
        />
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                category === c.value
                  ? "bg-amber-400 text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-white/50 cursor-pointer">
          <input
            type="checkbox"
            checked={showSold}
            onChange={(e) => setShowSold(e.target.checked)}
            className="accent-amber-400"
          />
          Show sold
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-white/30">No numbers found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((num) => (
            <NumberCard key={num.id} num={num} />
          ))}
        </div>
      )}
    </>
  );
}
