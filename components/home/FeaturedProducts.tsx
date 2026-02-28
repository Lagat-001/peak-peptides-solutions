"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FeaturedProducts() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
            All Research Peptides
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Shop Our Full Collection
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            24 premium research-grade peptides — all independently verified
            for &gt;98% purity by HPLC and shipped from the USA.
          </p>
        </motion.div>

        {/* Grid — 1 col mobile / 2 col tablet / 4 col desktop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
