import { getNumberById, getAllNumbers } from "@/lib/numbers";
import { categoryColor, categoryLabel } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllNumbers().map((n) => ({ id: n.id }));
}

export default async function NumberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const num = getNumberById(id);
  if (!num) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-24">
      <Link href="/numbers" className="text-white/40 hover:text-amber-400 text-sm transition-colors mb-8 inline-block">
        ← Back to catalog
      </Link>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-xs font-semibold uppercase tracking-widest border px-3 py-1 rounded-full ${categoryColor[num.category]}`}>
            {categoryLabel[num.category]}
          </span>
          <span className="text-white/30 text-sm">{num.pattern}</span>
        </div>

        <p className="text-4xl md:text-5xl font-black tracking-widest text-white font-mono mb-4">
          {num.number}
        </p>

        <p className="text-white/50 text-lg mb-8 leading-relaxed">{num.description}</p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Price</p>
            <p className="text-4xl font-black text-amber-400">₹{num.price.toLocaleString("en-IN")}</p>
          </div>

          {num.available ? (
            <AddToCartButton num={num} />
          ) : (
            <div className="px-8 py-4 bg-white/5 rounded-xl text-white/30 font-semibold">
              Sold
            </div>
          )}
        </div>

        {num.available && (
          <p className="text-white/20 text-xs mt-6">
            * Transfer of number completed within 1-2 business days after payment confirmation.
          </p>
        )}
      </div>
    </main>
  );
}
