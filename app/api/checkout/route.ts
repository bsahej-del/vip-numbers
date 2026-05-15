import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { VIPNumber } from "@/lib/types";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to environment variables." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-04-22.dahlia",
  });

  const { items }: { items: VIPNumber[] } = await req.json();
  const origin = req.headers.get("origin") || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items.map((num) => ({
      price_data: {
        currency: "inr",
        unit_amount: num.price * 100,
        product_data: {
          name: `VIP Number: ${num.number}`,
          description: num.description,
        },
      },
      quantity: 1,
    })),
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    metadata: {
      number_ids: items.map((n) => n.id).join(","),
    },
  });

  return NextResponse.json({ url: session.url });
}
