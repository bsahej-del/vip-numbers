import Link from "next/link";
import { getAllNumbers } from "@/lib/numbers";
import NumberCard from "@/components/NumberCard";

const REVIEWS = [
  { name: "Rajesh Kumar", city: "Delhi", stars: 5, text: "Got my lucky number +91 99999 in 2 days. Smooth process and great support on WhatsApp. Highly recommended!" },
  { name: "Priya Sharma", city: "Mumbai", stars: 5, text: "I wanted a number that matches my numerology and they helped me find the perfect one. Very professional service." },
  { name: "Amit Patel", city: "Ahmedabad", stars: 5, text: "Best place for VIP numbers in India. The advanced search made it so easy to find what I wanted. 5 stars!" },
  { name: "Sneha Nair", city: "Bangalore", stars: 5, text: "Bought a platinum number for my business. The transfer was smooth and the team was helpful throughout." },
  { name: "Vikram Singh", city: "Jaipur", stars: 5, text: "The numerology calculator helped me find the right number for my life path. Very happy with my purchase!" },
  { name: "Meena Reddy", city: "Hyderabad", stars: 5, text: "Sold my old VIP number through them and got a great price. Quick payment and zero hassle." },
];

export default function HomePage() {
  const all = getAllNumbers();
  const featured = all.filter((n) => n.featured && n.available).slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.07)_0%,_transparent_70%)] pointer-events-none" />
        <p className="text-amber-400 uppercase tracking-[0.4em] text-sm font-semibold mb-6 border border-amber-400/30 px-4 py-1 rounded-full">
          🇮🇳 India&apos;s #1 VIP Number Store
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          Own a Number<br />
          <span className="text-amber-400">Worth Remembering</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mb-10">
          Exclusive VIP mobile numbers for Airtel, Jio, BSNL, Vi & Idea. Rare patterns, lucky digits, and numerology-matched numbers — once sold, gone forever.
        </p>
        <div className="flex gap-4 flex-wrap justify-center mb-12">
          <Link href="/numbers" className="px-8 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm uppercase tracking-widest">
            Browse All Numbers
          </Link>
          <Link href="/numerology" className="px-8 py-4 border border-amber-400/50 text-amber-400 font-semibold rounded-xl hover:bg-amber-400/10 transition-colors text-sm uppercase tracking-widest">
            Free Numerology Report
          </Link>
        </div>
        {/* Operator badges */}
        <div className="flex gap-3 flex-wrap justify-center">
          {[
            { name: "Airtel", color: "text-red-400 border-red-400/30" },
            { name: "Jio", color: "text-blue-400 border-blue-400/30" },
            { name: "BSNL", color: "text-orange-400 border-orange-400/30" },
            { name: "Vi", color: "text-purple-400 border-purple-400/30" },
            { name: "Idea", color: "text-yellow-400 border-yellow-400/30" },
          ].map((op) => (
            <span key={op.name} className={`border px-4 py-1.5 rounded-full text-xs font-bold ${op.color}`}>{op.name}</span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Numbers Available", value: `${all.filter(n => n.available).length}+` },
            { label: "Numbers Sold", value: "10,000+" },
            { label: "Happy Customers", value: "50,000+" },
            { label: "Years in Business", value: "10+" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-amber-400">{s.value}</p>
              <p className="text-white/40 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-3xl font-bold text-white">Everything You Need in One Place</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🔍", title: "Advanced Search", desc: "Filter by digit sum, specific digits, pattern type, operator, and state. Find your perfect number in seconds." },
            { icon: "🔮", title: "Free Numerology", desc: "Calculate your life path number and find a VIP number that aligns with your destiny and brings good luck." },
            { icon: "⚡", title: "Fast Transfer", desc: "Number transferred within 1-3 business days. We handle all telecom paperwork so you don't have to." },
            { icon: "📱", title: "All Operators", desc: "We stock numbers for Airtel, Jio, BSNL, Vi, and Idea. Prepaid and postpaid both available." },
            { icon: "💰", title: "Sell Your Number", desc: "Have a fancy number? List it with us and we'll find you a buyer. Safe, fast, and hassle-free." },
            { icon: "🔒", title: "100% Secure", desc: "Every transaction is legally documented. We've completed 10,000+ successful transfers with zero fraud." },
          ].map((f) => (
            <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 transition-colors">
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="text-white font-bold mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Numbers */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-amber-400 text-xs uppercase tracking-widest mb-2">Hand-picked</p>
            <h2 className="text-3xl font-bold text-white">Featured Numbers</h2>
          </div>
          <Link href="/numbers" className="text-sm text-white/40 hover:text-amber-400 transition-colors">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((num) => <NumberCard key={num.id} num={num} />)}
        </div>
      </section>

      {/* Browse by Operator */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">Shop by Operator</p>
          <h2 className="text-3xl font-bold text-white">Browse by Network</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { name: "Airtel", color: "border-red-400/30 hover:border-red-400/60 text-red-400", q: "airtel" },
            { name: "Jio", color: "border-blue-400/30 hover:border-blue-400/60 text-blue-400", q: "jio" },
            { name: "BSNL", color: "border-orange-400/30 hover:border-orange-400/60 text-orange-400", q: "bsnl" },
            { name: "Vi", color: "border-purple-400/30 hover:border-purple-400/60 text-purple-400", q: "vi" },
            { name: "Idea", color: "border-yellow-400/30 hover:border-yellow-400/60 text-yellow-400", q: "idea" },
          ].map((op) => (
            <Link key={op.name} href={`/numbers?operator=${op.q}`}
              className={`border rounded-2xl p-6 text-center font-bold text-lg transition-colors bg-white/5 ${op.color}`}>
              {op.name}
              <p className="text-xs text-white/30 font-normal mt-1">VIP Numbers</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl font-bold text-white">What Our Customers Say</h2>
          <p className="text-white/40 mt-2">4.9★ rating from 50,000+ happy customers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex gap-1 mb-3">
                {Array(r.stars).fill(0).map((_, i) => <span key={i} className="text-amber-400">★</span>)}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">&quot;{r.text}&quot;</p>
              <div>
                <p className="text-white font-semibold text-sm">{r.name}</p>
                <p className="text-white/30 text-xs">{r.city}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can&apos;t find the perfect number?</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Tell us your requirements and we&apos;ll source the ideal VIP number for you personally.
          </p>
          <a href="https://wa.me/918968980650" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
