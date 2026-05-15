import { NextRequest, NextResponse } from "next/server";
import { getAllNumbers, saveNumbers } from "@/lib/numbers";
import { VIPNumber } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getAllNumbers());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const numbers = getAllNumbers();
  const newNumber: VIPNumber = {
    id: String(Date.now()),
    number: body.number,
    price: Number(body.price),
    category: body.category,
    pattern: body.pattern,
    description: body.description,
    available: true,
    featured: body.featured ?? false,
  };
  numbers.push(newNumber);
  saveNumbers(numbers);
  return NextResponse.json(newNumber, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const numbers = getAllNumbers();
  const idx = numbers.findIndex((n) => n.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  numbers[idx] = { ...numbers[idx], ...body };
  saveNumbers(numbers);
  return NextResponse.json(numbers[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const numbers = getAllNumbers().filter((n) => n.id !== id);
  saveNumbers(numbers);
  return NextResponse.json({ ok: true });
}
