"use client";

import { useCart } from "@/lib/cart";
import { VIPNumber } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ num }: { num: VIPNumber }) {
  const { add, items } = useCart();
  const router = useRouter();
  const inCart = items.some((i) => i.number.id === num.id);

  const handleAdd = () => {
    add(num);
    router.push("/cart");
  };

  return (
    <button
      onClick={handleAdd}
      disabled={inCart}
      className="px-8 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {inCart ? "Already in Cart" : "Add to Cart"}
    </button>
  );
}
