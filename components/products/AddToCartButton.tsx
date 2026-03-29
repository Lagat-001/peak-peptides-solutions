"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  qty?: number;
}

export default function AddToCartButton({ product, qty = 1 }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${
        added
          ? "bg-emerald-600 text-white"
          : "bg-slate-900 text-white hover:bg-slate-700"
      }`}
    >
      {added ? (
        <span className="flex items-center justify-center gap-1.5">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          Added to Cart
        </span>
      ) : (
        <span className="flex items-center justify-center gap-1.5">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Add to Cart
        </span>
      )}
    </button>
  );
}
