import { Suspense } from "react";
import NumbersClient from "./NumbersClient";

export default function NumbersPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 pt-28 pb-24">
      <Suspense fallback={<div className="text-white/30 text-center py-24">Loading...</div>}>
        <NumbersClient />
      </Suspense>
    </main>
  );
}
