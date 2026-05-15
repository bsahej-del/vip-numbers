"use client";

import { useEffect, useState } from "react";
import { VIPNumber, Category, categoryLabel } from "@/lib/types";
import { Trash2, ToggleLeft, ToggleRight, Plus, X } from "lucide-react";

const emptyForm = {
  number: "",
  price: "",
  category: "gold" as Category,
  pattern: "",
  description: "",
  featured: false,
};

export default function AdminPage() {
  const [numbers, setNumbers] = useState<VIPNumber[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () =>
    fetch("/api/numbers")
      .then((r) => r.json())
      .then(setNumbers);

  useEffect(() => { load(); }, []);

  const toggle = async (num: VIPNumber) => {
    await fetch("/api/numbers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: num.id, available: !num.available }),
    });
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this number?")) return;
    await fetch("/api/numbers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/numbers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    setSaving(false);
    setForm(emptyForm);
    setShowForm(false);
    load();
  };

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 pb-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-3xl font-black text-white">Admin Panel</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Number
        </button>
      </div>

      {/* Add form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New Number</h2>
              <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <input
                required
                placeholder="Number (e.g. +91 99999 99999)"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 font-mono focus:outline-none focus:border-amber-400/50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="number"
                  placeholder="Price (₹)"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50"
                >
                  <option value="platinum">Platinum</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                </select>
              </div>
              <input
                required
                placeholder="Pattern (e.g. Repeating 5s)"
                value={form.pattern}
                onChange={(e) => setForm({ ...form, pattern: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50"
              />
              <textarea
                required
                placeholder="Description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 resize-none"
              />
              <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="accent-amber-400"
                />
                Featured on homepage
              </label>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : "Add Number"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
              <th className="text-left px-6 py-4">Number</th>
              <th className="text-left px-4 py-4">Category</th>
              <th className="text-left px-4 py-4">Price</th>
              <th className="text-left px-4 py-4">Status</th>
              <th className="px-4 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((num) => (
              <tr key={num.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-white font-semibold">{num.number}</td>
                <td className="px-4 py-4 text-white/50">{categoryLabel[num.category]}</td>
                <td className="px-4 py-4 text-amber-400 font-semibold">₹{num.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => toggle(num)}
                    className="flex items-center gap-2 text-xs"
                  >
                    {num.available ? (
                      <><ToggleRight size={20} className="text-green-400" /><span className="text-green-400">Available</span></>
                    ) : (
                      <><ToggleLeft size={20} className="text-white/30" /><span className="text-white/30">Sold</span></>
                    )}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => del(num.id)} className="text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
