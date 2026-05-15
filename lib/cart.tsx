"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { VIPNumber } from "./types";

interface CartItem {
  number: VIPNumber;
  quantity: 1;
}

interface CartContextValue {
  items: CartItem[];
  add: (number: VIPNumber) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vip-cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("vip-cart", JSON.stringify(items));
  }, [items]);

  const add = (number: VIPNumber) => {
    setItems((prev) =>
      prev.find((i) => i.number.id === number.id)
        ? prev
        : [...prev, { number, quantity: 1 }]
    );
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.number.id !== id));
  };

  const clear = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.number.price, 0);
  const count = items.length;

  return (
    <CartContext.Provider value={{ items, add, remove, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
