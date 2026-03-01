"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

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
  { label: "Purity", key: "purity" },
  { label: "Form", key: "form" },
  { label: "Storage", key: "storage" },
  { label: "Solubility", key: "solubility" },
  { label: "Sequence", key: "sequence" },
  { label: "Molecular Formula", key: "molecularFormula" },
  { label: "Molecular Weight", key: "molecularWeight" },
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
  const badgeClass =
    categoryColors[product.category] ?? "bg-slate-100 text-slate-600";
  const savings = product.originalPrice - product.salePrice;

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

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {product.coaUrl ? (
                <a
                  href={product.coaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Certificate of Analysis ↗
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed select-none">
                  COA — Coming Soon
                </span>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-700 transition-colors"
              >
                Contact to Order
              </Link>
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
