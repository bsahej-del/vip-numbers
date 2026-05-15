export type Category = "platinum" | "gold" | "silver";

export interface VIPNumber {
  id: string;
  number: string;
  price: number;
  category: Category;
  pattern: string;
  description: string;
  available: boolean;
  featured: boolean;
}

export const categoryLabel: Record<Category, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
};

export const categoryColor: Record<Category, string> = {
  platinum: "text-cyan-300 border-cyan-300",
  gold: "text-amber-400 border-amber-400",
  silver: "text-slate-300 border-slate-300",
};
