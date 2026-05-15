"use client";

import { useEffect, useState } from "react";
import { VIPNumber, categoryLabel } from "@/lib/types";
import { ExternalLink } from "lucide-react";

export default function AdminPage() {
  const [numbers, setNumbers] = useState<VIPNumber[]>([]);

  useEffect(() => {
    fetch("/api/numbers")
      .then((r) => r.json())
      .then(setNumbers);
  }, []);

  const available = numbers.filter((n) => n.available).length;
  const sold = numbers.filter((n) => !n.available).length;

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 pb-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-3xl font-black text-white">Admin Panel</h1>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm"
        >
          <ExternalLink size={16} />
          Edit on GitHub
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-3xl font-black text-white">{numbers.length}</p>
          <p className="text-white/40 text-sm mt-1">Total Numbers</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-3xl font-black text-green-400">{available}</p>
          <p className="text-white/40 text-sm mt-1">Available</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-3xl font-black text-white/30">{sold}</p>
          <p className="text-white/40 text-sm mt-1">Sold</p>
        </div>
      </div>

      {/* How to update */}
      <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-6 mb-8">
        <h2 className="text-amber-400 font-bold mb-2">How to add / remove numbers</h2>
        <p className="text-white/60 text-sm leading-relaxed">
          Edit the file <code className="bg-white/10 px-1.5 py-0.5 rounded text-amber-300">data/numbers.json</code> directly on GitHub.
          The site will automatically redeploy within ~30 seconds. Set <code className="bg-white/10 px-1.5 py-0.5 rounded text-amber-300">&quot;available&quot;: false</code> to mark a number as sold.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
              <th className="text-left px-6 py-4">Number</th>
              <th className="text-left px-4 py-4">Category</th>
              <th className="text-left px-4 py-4">Price</th>
              <th className="text-left px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((num) => (
              <tr key={num.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-white font-semibold">{num.number}</td>
                <td className="px-4 py-4 text-white/50">{categoryLabel[num.category]}</td>
                <td className="px-4 py-4 text-amber-400 font-semibold">₹{num.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-4">
                  {num.available ? (
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Available</span>
                  ) : (
                    <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full">Sold</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
