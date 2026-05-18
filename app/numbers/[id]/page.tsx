import { getNumberById, getAllNumbers } from "@/lib/numbers";
import { categoryColor, categoryLabel, operatorColor } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllNumbers().map((n) => ({ id: n.id }));
}

function digitSum(d: string) {
  return d.split("").reduce((a, c) => a + parseInt(c), 0);
}

export default async function NumberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const num = getNumberById(id);
  if (!num) notFound();

  const sum = digitSum(num.digits);
  const reduced = sum > 9 ? sum.toString().split("").reduce((a, c) => a + parseInt(c), 0) : sum;

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-24">
      <Link href="/numbers" className="text-white/40 hover:text-amber-400 text-sm transition-colors mb-8 inline-block">
        ← Back to catalog
      </Link>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
        {/* Badges */}
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <span className={`text-xs font-semibold uppercase tracking-widest border px-3 py-1 rounded-full ${categoryColor[num.category]}`}>
            {categoryLabel[num.category]}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${operatorColor[num.operator]}`}>
            {num.operator}
          </span>
          <span className="text-xs text-white/30 border border-white/10 px-3 py-1 rounded-full capitalize">{num.type}</span>
          <span className="text-xs text-white/30 border border-white/10 px-3 py-1 rounded-full">{num.state}</span>
        </div>

        {/* Number */}
        <p className="text-4xl md:text-5xl font-black tracking-widest text-white font-mono mb-3">
          {num.number}
        </p>
        <p className="text-white/40 mb-6">{num.pattern}</p>

        {/* Numerology */}
        <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white/5 rounded-2xl">
          <div className="text-center">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Digit Sum</p>
            <p className="text-2xl font-black text-amber-400">{sum}</p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Reduced</p>
            <p className="text-2xl font-black text-amber-400">{reduced}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Lucky For</p>
            <p className="text-2xl font-black text-amber-400">{reduced}</p>
          </div>
        </div>

        <p className="text-white/50 text-lg mb-8 leading-relaxed">{num.description}</p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Price</p>
            <p className="text-4xl font-black text-amber-400">₹{num.price.toLocaleString("en-IN")}</p>
          </div>
          {num.available ? (
            <div className="flex gap-3">
              <AddToCartButton num={num} />
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                className="px-6 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors text-sm">
                Buy via WhatsApp
              </a>
            </div>
          ) : (
            <div className="px-8 py-4 bg-white/5 rounded-xl text-white/30 font-semibold">Sold</div>
          )}
        </div>

        {num.available && (
          <p className="text-white/20 text-xs mt-6">
            * Transfer completed within 1–3 business days after payment confirmation. All operators supported including MNP.
          </p>
        )}
      </div>
    </main>
  );
}
