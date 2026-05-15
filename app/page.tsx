import Link from "next/link";
import { getAllNumbers } from "@/lib/numbers";
import NumberCard from "@/components/NumberCard";

export default function HomePage() {
  const all = getAllNumbers();
  const featured = all.filter((n) => n.featured && n.available);

  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.08)_0%,_transparent_70%)] pointer-events-none" />
        <p className="text-amber-400 uppercase tracking-[0.4em] text-sm font-semibold mb-6">
          Premium VIP Numbers
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          Own a Number<br />
          <span className="text-amber-400">Worth Remembering</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mb-10">
          Exclusive Indian VIP mobile numbers for individuals and businesses who demand the finest. Rare patterns, once sold — gone forever.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/numbers"
            className="px-8 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm uppercase tracking-widest"
          >
            Browse All Numbers
          </Link>
          <Link
            href="/numbers?category=platinum"
            className="px-8 py-4 border border-amber-400/50 text-amber-400 font-semibold rounded-xl hover:bg-amber-400/10 transition-colors text-sm uppercase tracking-widest"
          >
            View Platinum
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Numbers Available", value: `${all.filter((n) => n.available).length}+` },
            { label: "Sold This Month", value: "24+" },
            { label: "Happy Clients", value: "200+" },
            { label: "Years in Business", value: "10+" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-amber-400">{s.value}</p>
              <p className="text-white/40 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-amber-400 text-xs uppercase tracking-widest mb-2">Hand-picked</p>
            <h2 className="text-3xl font-bold text-white">Featured Numbers</h2>
          </div>
          <Link href="/numbers" className="text-sm text-white/40 hover:text-amber-400 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((num) => (
            <NumberCard key={num.id} num={num} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Looking for a specific pattern?</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Can&apos;t find what you&apos;re looking for? Contact us directly and we&apos;ll source the perfect VIP number for you.
          </p>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  );
}
