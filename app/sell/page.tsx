"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function SellPage() {
  const [form, setForm] = useState({ number: "", price: "", name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [rows, setRows] = useState([{ number: "", price: "" }]);

  const addRow = () => setRows([...rows, { number: "", price: "" }]);
  const updateRow = (i: number, field: string, val: string) => {
    const updated = [...rows];
    updated[i] = { ...updated[i], [field]: val };
    setRows(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="max-w-xl mx-auto px-4 pt-28 pb-24 text-center">
        <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-white mb-4">Submission Received!</h1>
        <p className="text-white/50 mb-4">We&apos;ll review your number and contact you within 24 hours if the price is acceptable.</p>
        <p className="text-white/30 text-sm mb-8">Contact us on WhatsApp for faster response.</p>
        <a href="https://wa.me/918968980650" target="_blank" rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors">
          Chat on WhatsApp
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 pt-28 pb-24">
      <div className="text-center mb-10">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">Earn Money</p>
        <h1 className="text-4xl font-black text-white mb-4">Sell Your VIP Number</h1>
        <p className="text-white/50">Have a fancy number? List it here and we&apos;ll find you a buyer. Fast, safe, and hassle-free.</p>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { step: "1", title: "Submit", desc: "Enter your number and desired price" },
          { step: "2", title: "We Review", desc: "Our team evaluates within 24 hours" },
          { step: "3", title: "Get Paid", desc: "Safe transfer and instant payment" },
        ].map((s) => (
          <div key={s.step} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-black text-sm flex items-center justify-center mx-auto mb-3">{s.step}</div>
            <p className="text-white font-semibold text-sm mb-1">{s.title}</p>
            <p className="text-white/40 text-xs">{s.desc}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
        {/* Numbers to sell */}
        <div>
          <p className="text-white/60 text-sm mb-3 font-semibold">Numbers You Want to Sell</p>
          <div className="space-y-3">
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <input required placeholder="+91 XXXXX XXXXX" value={row.number}
                  onChange={(e) => updateRow(i, "number", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 font-mono focus:outline-none focus:border-amber-400/50" />
                <input required type="number" placeholder="Your asking price (₹)" value={row.price}
                  onChange={(e) => updateRow(i, "price", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50" />
              </div>
            ))}
          </div>
          <button type="button" onClick={addRow}
            className="mt-3 text-amber-400 text-sm hover:underline">
            + Add another number
          </button>
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white/60 text-sm mb-2 block">Your Name</label>
            <input required placeholder="Rahul Sharma" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50" />
          </div>
          <div>
            <label className="text-white/60 text-sm mb-2 block">WhatsApp Number</label>
            <input required placeholder="+91 XXXXX XXXXX" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50" />
          </div>
        </div>

        <div>
          <label className="text-white/60 text-sm mb-2 block">Additional Info (optional)</label>
          <textarea rows={3} placeholder="Any details about your number..." value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 resize-none" />
        </div>

        <p className="text-white/30 text-xs">* If your price or number is not acceptable, we will not be able to respond. Thank you for understanding.</p>

        <button type="submit"
          className="w-full py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors uppercase tracking-widest">
          Submit Listing
        </button>
      </form>
    </main>
  );
}
