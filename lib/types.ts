export type Category = "platinum" | "gold" | "silver";
export type Operator = "airtel" | "jio" | "bsnl" | "vi" | "idea";
export type NumberType = "prepaid" | "postpaid";

export interface VIPNumber {
  id: string;
  number: string;
  digits: string; // 10-digit string for filtering e.g. "9999999999"
  price: number;
  category: Category;
  pattern: string;
  description: string;
  available: boolean;
  featured: boolean;
  operator: Operator;
  state: string;
  type: NumberType;
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

export const operatorColor: Record<Operator, string> = {
  airtel: "bg-red-500/20 text-red-400",
  jio: "bg-blue-500/20 text-blue-400",
  bsnl: "bg-orange-500/20 text-orange-400",
  vi: "bg-purple-500/20 text-purple-400",
  idea: "bg-yellow-500/20 text-yellow-400",
};

export const STATES = [
  "All India", "Delhi", "Mumbai", "Bangalore", "Chennai",
  "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Jaipur",
  "Punjab", "Maharashtra", "Karnataka", "Kerala", "Gujarat",
  "Rajasthan", "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Haryana",
];
