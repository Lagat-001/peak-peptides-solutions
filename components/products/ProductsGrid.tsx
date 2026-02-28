"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { getAllCategories } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/products/Pagination";

interface ProductsGridProps {
  products: Product[];
}

const PAGE_SIZE = 24;

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
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    const matchesCategory =
      selectedCategory === "" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const rangeStart = filtered.length === 0 ? 0 : start + 1;
  const rangeEnd = Math.min(start + PAGE_SIZE, filtered.length);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
              {filtered.length === 0 ? "0" : `${rangeStart}–${rangeEnd}`}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {filtered.length}
            </span>{" "}
            products
          </p>
        </div>

        {/* Grid or Empty State */}
        {filtered.length > 0 ? (
          <>
            <motion.div
              key={`${searchQuery}-${selectedCategory}-${currentPage}`}
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginated.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
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
