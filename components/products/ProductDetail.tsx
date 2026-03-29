"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

const categoryColors: Record<string, string> = {
  "GLP-1 Agonists": "bg-blue-100 text-blue-700",
  "Growth Hormone Peptides": "bg-green-100 text-green-700",
  "Healing & Recovery": "bg-orange-100 text-orange-700",
  "Cognitive & Nootropic": "bg-purple-100 text-purple-700",
  "Cosmetic Peptides": "bg-pink-100 text-pink-700",
  "Anti-Aging": "bg-teal-100 text-teal-700",
  "Fat Loss Research": "bg-red-100 text-red-700",
  "Immune Support": "bg-emerald-100 text-emerald-700",
  "Muscle Research": "bg-indigo-100 text-indigo-700",
  "Other Research Peptides": "bg-slate-100 text-slate-600",
};

const specsConfig: { label: string; key: keyof Product }[] = [
  { label: "CAS Number",        key: "casNumber" },
  { label: "Purity",            key: "purity" },
  { label: "Form",              key: "form" },
  { label: "Storage",           key: "storage" },
  { label: "Solubility",        key: "solubility" },
  { label: "Target",            key: "target" },
  { label: "Sequence",          key: "sequence" },
  { label: "Molecular Formula", key: "molecularFormula" },
  { label: "Molecular Weight",  key: "molecularWeight" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const rowVariant = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const badgeClass =
    categoryColors[product.category] ?? "bg-slate-100 text-slate-600";
  const savings = product.originalPrice - product.salePrice;

  function handleAddToCart() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const activeSpecs = specsConfig.filter(({ key }) => {
    const val = product[key];
    return val !== undefined && val !== null && String(val).trim() !== "";
  });

  return (
    <div className="bg-white min-h-screen">

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-700 transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back to Products
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
              <Image
                src={`/images/products/${product.imageFilename}`}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
              {product.inStock && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">
                  In Stock
                </span>
              )}
            </div>
          </motion.div>

          {/* RIGHT — Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Category badge */}
            <span className={`self-start px-3 py-1 text-xs font-bold rounded-full ${badgeClass}`}>
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-base text-slate-400 line-through">
                Was {formatPrice(product.originalPrice)}
              </span>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                Save ${savings}
              </span>
            </div>

            {/* Short description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Specs table */}
            {activeSpecs.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Specifications
                </h2>
                <motion.dl
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden"
                >
                  {activeSpecs.map(({ label, key }) => (
                    <motion.div
                      key={key}
                      variants={rowVariant}
                      className="flex gap-4 px-4 py-3 bg-white even:bg-slate-50"
                    >
                      <dt className="w-36 shrink-0 text-xs font-semibold text-slate-500 uppercase tracking-wide pt-0.5">
                        {label}
                      </dt>
                      <dd className="text-sm text-slate-800 break-words min-w-0">
                        {String(product[key])}
                      </dd>
                    </motion.div>
                  ))}
                </motion.dl>
              </div>
            )}

            {/* Quantity selector */}
            <div className="flex flex-col gap-2 pt-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors font-bold text-lg leading-none"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-base font-bold text-slate-900">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors font-bold text-lg leading-none"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <span className="text-sm text-slate-500 ml-1">
                  × {formatPrice(product.salePrice)} ={" "}
                  <strong className="text-slate-800">
                    {formatPrice(product.salePrice * qty)}
                  </strong>
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-700 text-white hover:bg-blue-800"
                }`}
              >
                {added ? (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
              >
                View Cart
              </Link>
              {product.coaUrl ? (
                <a
                  href={product.coaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  COA ↗
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed select-none">
                  COA Soon
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Full Research Description */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-20"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100">
            Research Overview
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {product.fullDescription}
          </div>
        </motion.section>

        {/* Research Use Only Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 p-5 rounded-2xl bg-amber-50 border border-amber-100"
        >
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong className="font-bold">Research Use Only — Important Notice.</strong>{" "}
            {product.disclaimer}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
