import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-28 pb-24">
      <div className="text-center mb-16">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">Our Story</p>
        <h1 className="text-4xl font-black text-white mb-4">About VIP Numbers</h1>
        <p className="text-white/50 max-w-2xl mx-auto">India&apos;s most trusted marketplace for premium VIP mobile numbers. Serving thousands of satisfied customers across the country.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: "10,000+", label: "Numbers Sold" },
          { value: "50,000+", label: "Happy Customers" },
          { value: "10+", label: "Years Experience" },
          { value: "4.9★", label: "Average Rating" },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-3xl font-black text-amber-400">{s.value}</p>
            <p className="text-white/40 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Why We Started</h2>
          <p className="text-white/50 leading-relaxed mb-4">
            We started with a simple belief — your mobile number is more than just a contact detail. It&apos;s your identity, your brand, and for many, it carries deep numerological significance.
          </p>
          <p className="text-white/50 leading-relaxed">
            Over a decade ago, we set out to make it easy for every Indian to own a number that truly represents them — whether for business success, personal luck, or simply standing out.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: "🔒", title: "100% Secure Transfers", desc: "Every transfer is legally documented and verified." },
            { icon: "⚡", title: "Fast Processing", desc: "Number transferred within 1-3 business days." },
            { icon: "🌟", title: "Verified Numbers", desc: "Every number is checked for authenticity before listing." },
            { icon: "💬", title: "Dedicated Support", desc: "WhatsApp support 6 days a week, 10AM to 6PM." },
          ].map((f) => (
            <div key={f.title} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <p className="text-white font-semibold">{f.title}</p>
                <p className="text-white/40 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operators we work with */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Operators We Work With</h2>
        <div className="flex gap-4 flex-wrap justify-center">
          {["Airtel", "Jio", "BSNL", "Vi", "Idea"].map((op) => (
            <div key={op} className="bg-white/5 border border-white/10 rounded-xl px-8 py-4 text-white font-bold text-lg">
              {op}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-amber-400/10 border border-amber-400/20 rounded-3xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to own your perfect number?</h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/numbers" className="px-8 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors">
            Browse Numbers
          </Link>
          <Link href="/numerology" className="px-8 py-4 border border-amber-400/40 text-amber-400 font-semibold rounded-xl hover:bg-amber-400/10 transition-colors">
            Free Numerology
          </Link>
        </div>
      </div>
    </main>
  );
}
