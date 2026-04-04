"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-700/20 border border-blue-600/30 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold text-blue-300 tracking-wide uppercase">
              HPLC Verified · USA-Sourced · Research Grade
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
          >
            Premium Research-Grade{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Peptides
            </span>
          </motion.h1>

          {/* Sub-brand */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-base font-semibold text-blue-400 tracking-widest uppercase mb-4"
          >
            Peak Peptides Solutions USA Sales
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Trusted by researchers for purity, consistency, and reliability.
            All peptides independently tested with &gt;98% purity by HPLC.
            Fast domestic shipping on every order.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/30"
            >
              Explore All Products
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-slate-300 border border-slate-600 rounded-xl hover:border-slate-400 hover:text-white transition-colors"
            >
              About Our Standards
            </Link>
          </motion.div>

          {/* Research disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-sm text-slate-400"
          >
            All products are sold strictly for research and laboratory use only.
            Not for human consumption.
          </motion.p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
