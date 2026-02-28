"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { getAllCategories } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";

interface ProductsGridProps {
  products: Product[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const categories = getAllCategories();

export default function ProductsGrid({ products }: ProductsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const total = products.length;

  const filtered = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    const matchesCategory =
      selectedCategory === "" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
            Research-Grade Quality
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            All Research Peptides
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            Browse our full collection of premium, HPLC-verified peptides —
            independently tested for &gt;98% purity and shipped from the USA.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search peptides…"
            aria-label="Search peptides"
            className="flex-1 min-w-[200px] border border-slate-200 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Counter */}
          <p className="text-sm text-slate-500 whitespace-nowrap ml-auto">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filtered.length}
            </span>{" "}
            of {total} products
          </p>
        </div>

        {/* Grid or Empty State */}
        {filtered.length > 0 ? (
          <motion.div
            key={`${searchQuery}-${selectedCategory}`}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center text-slate-400">
            <p className="text-lg font-semibold text-slate-600 mb-1">
              No products found
            </p>
            <p className="text-sm mb-6">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
              }}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Research Disclaimer */}
        <p className="text-xs text-slate-400 text-center mt-16 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-slate-500">Research Use Only.</strong> All
          products sold by Peak Peptides Solutions USA Sales are strictly for
          in-vitro and laboratory research purposes. Not for human or veterinary
          use. These statements have not been evaluated by the FDA. Consult a
          licensed professional before handling any research compound.
        </p>

      </div>
    </section>
  );
}
