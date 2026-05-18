"use client";

import { useState } from "react";

const MEANINGS: Record<number, { title: string; desc: string; lucky: string[] }> = {
  1: { title: "The Leader", desc: "Independent, ambitious, and driven. Number 1 people are born leaders with strong willpower.", lucky: ["1","10","19","28"] },
  2: { title: "The Diplomat", desc: "Sensitive, cooperative, and intuitive. Number 2 brings harmony and balance in relationships.", lucky: ["2","11","20","29"] },
  3: { title: "The Creator", desc: "Creative, expressive, and joyful. Number 3 brings artistic energy and communication skills.", lucky: ["3","12","21","30"] },
  4: { title: "The Builder", desc: "Practical, stable, and hardworking. Number 4 represents foundation, discipline, and reliability.", lucky: ["4","13","22","31"] },
  5: { title: "The Adventurer", desc: "Dynamic, freedom-loving, and versatile. Number 5 thrives on change and new experiences.", lucky: ["5","14","23"] },
  6: { title: "The Nurturer", desc: "Caring, responsible, and loving. Number 6 is associated with family, harmony, and service.", lucky: ["6","15","24"] },
  7: { title: "The Seeker", desc: "Analytical, spiritual, and introspective. Number 7 seeks deeper truth and inner wisdom.", lucky: ["7","16","25"] },
  8: { title: "The Achiever", desc: "Powerful, ambitious, and business-minded. Number 8 is the number of material success.", lucky: ["8","17","26"] },
  9: { title: "The Humanitarian", desc: "Compassionate, wise, and universal. Number 9 represents completion and higher purpose.", lucky: ["9","18","27"] },
};

function reduce(n: number): number {
  while (n > 9) n = String(n).split("").reduce((a, c) => a + parseInt(c), 0);
  return n;
}

export default function NumerologyPage() {
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<null | { life: number; name: number; lucky: number }>(null);

  const calculate = () => {
    if (!dob) return;
    const digits = dob.replace(/\D/g, "");
    const life = reduce(digits.split("").reduce((a, c) => a + parseInt(c), 0));
    const nameNum = name
      ? reduce(name.toUpperCase().split("").filter(c => /[A-Z]/.test(c))
          .reduce((a, c) => a + (c.charCodeAt(0) - 64), 0))
      : 0;
    const lucky = reduce(life + (nameNum || life));
    setResult({ life, name: nameNum, lucky });
  };

  const m = result ? MEANINGS[result.life] : null;

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-24">
      <div className="text-center mb-12">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">Free Tool</p>
        <h1 className="text-4xl font-black text-white mb-4">Numerology Calculator</h1>
        <p className="text-white/50">Discover your life path number and find the perfect VIP number that aligns with your destiny.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="space-y-5">
          <div>
            <label className="text-white/60 text-sm mb-2 block">Date of Birth *</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50" />
          </div>
          <div>
            <label className="text-white/60 text-sm mb-2 block">Full Name (optional — for name number)</label>
            <input type="text" placeholder="e.g. Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50" />
          </div>
          <button onClick={calculate}
            className="w-full py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors uppercase tracking-widest">
            Calculate My Numbers
          </button>
        </div>
      </div>

      {result && m && (
        <div className="space-y-6">
          {/* Life Path */}
          <div className="bg-white/5 border border-amber-400/30 rounded-3xl p-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-amber-400 flex items-center justify-center text-4xl font-black text-black flex-shrink-0">
                {result.life}
              </div>
              <div>
                <p className="text-amber-400 text-xs uppercase tracking-widest mb-1">Life Path Number</p>
                <h2 className="text-2xl font-bold text-white">{m.title}</h2>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed mb-6">{m.desc}</p>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Your lucky dates</p>
              <div className="flex gap-2 flex-wrap">
                {m.lucky.map((l) => (
                  <span key={l} className="bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm font-bold px-3 py-1 rounded-full">{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Name + Lucky */}
          <div className="grid grid-cols-2 gap-4">
            {result.name > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Name Number</p>
                <p className="text-5xl font-black text-white mb-1">{result.name}</p>
                <p className="text-white/40 text-sm">{MEANINGS[result.name]?.title}</p>
              </div>
            )}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Lucky Number</p>
              <p className="text-5xl font-black text-amber-400 mb-1">{result.lucky}</p>
              <p className="text-white/40 text-sm">{MEANINGS[result.lucky]?.title}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-6 text-center">
            <p className="text-white font-semibold mb-2">Find a number ending in <span className="text-amber-400">{result.life}</span></p>
            <p className="text-white/50 text-sm mb-4">VIP numbers that match your life path are considered most auspicious.</p>
            <a href={`/numbers?ends=${result.life}`}
              className="inline-block px-6 py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm">
              Browse Matching Numbers →
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
