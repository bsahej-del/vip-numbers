import fs from "fs";
import path from "path";
import type { VIPNumber } from "./types";

export type { VIPNumber } from "./types";
export type { Category } from "./types";

const dataPath = path.join(process.cwd(), "data", "numbers.json");

export function getAllNumbers(): VIPNumber[] {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

export function getNumberById(id: string): VIPNumber | undefined {
  return getAllNumbers().find((n) => n.id === id);
}

export function saveNumbers(numbers: VIPNumber[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(numbers, null, 2));
}

export function markAsSold(id: string): void {
  const numbers = getAllNumbers();
  const idx = numbers.findIndex((n) => n.id === id);
  if (idx !== -1) {
    numbers[idx].available = false;
    saveNumbers(numbers);
  }
}
