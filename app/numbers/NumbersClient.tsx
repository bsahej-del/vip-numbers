"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import NumberCard from "@/components/NumberCard";
import { VIPNumber, Category, Operator, STATES } from "@/lib/types";
import { SlidersHorizontal, X } from "lucide-react";

const DIGITS = ["0","1","2","3","4","5","6","7","8","9"];
const OPERATORS: { value: Operator | "all"; label: string }[] = [
  { value: "all", label: "All Operators" },
  { value: "airtel", label: "Airtel" },
  { value: "jio", label: "Jio" },
  { value: "bsnl", label: "BSNL" },
  { value: "vi", label: "Vi" },
  { value: "idea", label: "Idea" },
];

function digitSum(d: string) {
  return d.split("").reduce((a, c) => a + parseInt(c), 0);
}

export default function NumbersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [numbers, setNumbers] = useState<VIPNumber[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Basic filters
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState<Category | "all">((searchParams.get("category") as Category) || "all");
  const [operator, setOperator] = useState<Operator | "all">((searchParams.get("operator") as Operator) || "all");
  const [state, setState] = useState(searchParams.get("state") || "All India");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [showSold, setShowSold] = useState(false);

  // Price range
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Advanced digit filters
  const [mustContain, setMustContain] = useState<string[]>(
    searchParams.get("contain")?.split(",").filter(Boolean) || []
  );
  const [mustNotContain, setMustNotContain] = useState<string[]>(
    searchParams.get("not_contain")?.split(",").filter(Boolean) || []
  );
  const [digitSumFilter, setDigitSumFilter] = useState(searchParams.get("sum") || "");
  const [startsWith, setStartsWith] = useState(searchParams.get("starts") || "");
  const [endsWith, setEndsWith] = useState(searchParams.get("ends") || "");

  // Sort
  const [sort, setSort] = useState(searchParams.get("sort") || "featured");

  useEffect(() => {
    fetch("/api/numbers").then((r) => r.json()).then(setNumbers);
  }, []);

  const toggleDigit = (digit: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(digit) ? list.filter((d) => d !== digit) : [...list, digit]);
  };

  const clearFilters = () => {
    setSearch(""); setCategory("all"); setOperator("all"); setState("All India");
    setType("all"); setMinPrice(""); setMaxPrice("");
    setMustContain([]); setMustNotContain([]); setDigitSumFilter("");
    setStartsWith(""); setEndsWith("");
  };

  const filtered = numbers.filter((n) => {
    if (!showSold && !n.available) return false;
    if (category !== "all" && n.category !== category) return false;
    if (operator !== "all" && n.operator !== operator) return false;
    if (state !== "All India" && n.state !== state) return false;
    if (type !== "all" && n.type !== type) return false;
    if (minPrice && n.price < Number(minPrice)) return false;
    if (maxPrice && n.price > Number(maxPrice)) return false;
    if (search && !n.digits.includes(search.replace(/\D/g, ""))) return false;
    if (mustContain.length && !mustContain.every((d) => n.digits.includes(d))) return false;
    if (mustNotContain.length && mustNotContain.some((d) => n.digits.includes(d))) return false;
    if (digitSumFilter) {
      const allowed = digitSumFilter.split(",").map(Number);
      if (!allowed.includes(digitSum(n.digits))) return false;
    }
    if (startsWith && !n.digits.startsWith(startsWith)) return false;
    if (endsWith && !n.digits.endsWith(endsWith)) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  const activeFilterCount = [
    category !== "all", operator !== "all", state !== "All India",
    type !== "all", minPrice, maxPrice,
    mustContain.length > 0, mustNotContain.length > 0,
    digitSumFilter, startsWith, endsWith,
  ].filter(Boolean).length;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-2">Catalog</p>
        <h1 className="text-4xl font-black text-white mb-1">Browse VIP Numbers</h1>
        <p className="text-white/40">{filtered.length} of {numbers.filter(n=>n.available).length} available numbers shown</p>
      </div>

      {/* Search bar + sort */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search number e.g. 9999..."
          value={search}
          onChange={(e) => setSearch(e.target.value.replace(/\D/g, ""))}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 font-mono"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-amber-400/50"
        >
          <option value="featured">Featured First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-colors ${showAdvanced ? "bg-amber-400 text-black border-amber-400" : "border-white/10 text-white/60 hover:bg-white/5"}`}
        >
          <SlidersHorizontal size={16} />
          Filters {activeFilterCount > 0 && <span className="bg-black/30 rounded-full w-5 h-5 text-xs flex items-center justify-center">{activeFilterCount}</span>}
        </button>
      </div>

      {/* Quick category + operator pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["all","platinum","gold","silver"].map((c) => (
          <button key={c} onClick={() => setCategory(c as Category | "all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors capitalize ${category === c ? "bg-amber-400 text-black" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
            {c === "all" ? "All" : c}
          </button>
        ))}
        <div className="w-px bg-white/10 mx-1" />
        {OPERATORS.map((op) => (
          <button key={op.value} onClick={() => setOperator(op.value as Operator | "all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${operator === op.value ? "bg-amber-400 text-black" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
            {op.label}
          </button>
        ))}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold">Advanced Filters</h3>
            <button onClick={clearFilters} className="text-xs text-amber-400 hover:underline">Clear all</button>
          </div>

          {/* Must contain digits */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Must Contain Digits</p>
            <div className="flex gap-2 flex-wrap">
              {DIGITS.map((d) => (
                <button key={d} onClick={() => toggleDigit(d, mustContain, setMustContain)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${mustContain.includes(d) ? "bg-green-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Must NOT contain digits */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Must NOT Contain Digits</p>
            <div className="flex gap-2 flex-wrap">
              {DIGITS.map((d) => (
                <button key={d} onClick={() => toggleDigit(d, mustNotContain, setMustNotContain)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${mustNotContain.includes(d) ? "bg-red-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Digit Sum */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Digit Sum</p>
              <input placeholder="e.g. 9 or 9,18,27" value={digitSumFilter}
                onChange={(e) => setDigitSumFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50" />
            </div>

            {/* Starts With */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Starts With</p>
              <input placeholder="e.g. 98" value={startsWith}
                onChange={(e) => setStartsWith(e.target.value.replace(/\D/g,""))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50" />
            </div>

            {/* Ends With */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Ends With</p>
              <input placeholder="e.g. 0000" value={endsWith}
                onChange={(e) => setEndsWith(e.target.value.replace(/\D/g,""))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50" />
            </div>

            {/* State */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">State / City</p>
              <select value={state} onChange={(e) => setState(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/70 text-sm focus:outline-none focus:border-amber-400/50">
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Min Price */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Min Price (₹)</p>
              <input type="number" placeholder="0" value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50" />
            </div>

            {/* Max Price */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Max Price (₹)</p>
              <input type="number" placeholder="500000" value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50" />
            </div>

            {/* Type */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Number Type</p>
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/70 text-sm focus:outline-none focus:border-amber-400/50">
                <option value="all">All</option>
                <option value="prepaid">Prepaid</option>
                <option value="postpaid">Postpaid</option>
              </select>
            </div>

            {/* Show Sold */}
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-sm text-white/50 cursor-pointer">
                <input type="checkbox" checked={showSold} onChange={(e) => setShowSold(e.target.checked)} className="accent-amber-400" />
                Show sold numbers
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-white/30 text-lg">No numbers match your filters.</p>
          <button onClick={clearFilters} className="mt-4 text-amber-400 text-sm hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((num) => <NumberCard key={num.id} num={num} />)}
        </div>
      )}
    </>
  );
}
