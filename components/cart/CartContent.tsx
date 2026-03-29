"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartContent() {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart();
  const isEmpty = items.length === 0;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(30,58,138,0.18) 0%, transparent 60%, rgba(15,23,42,0.4) 100%)",
          }}
        />
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Peak Peptides Solutions USA Sales
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Your Research Cart
          </h1>
          <p className="text-slate-400 text-sm">
            {isEmpty
              ? "No items yet — browse our research peptides."
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} · ${formatPrice(totalPrice)} subtotal`}
          </p>
        </div>
      </section>

      {/* ── Cart Body ─────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isEmpty ? (
              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-slate-400" aria-hidden>
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                  Browse our catalog of 275+ HPLC-verified research peptides and add items to your cart.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Browse Research Peptides
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.div>
            ) : (
              /* Cart items + sidebar */
              <motion.div
                key="filled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
              >
                {/* ── Items list ── */}
                <div className="lg:col-span-2 space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -16, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.3 }}
                        className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 items-start shadow-sm"
                      >
                        {/* Product image */}
                        <div className="relative w-16 h-16 shrink-0 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                          <Image
                            src={`/images/products/${item.imageFilename}`}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors line-clamp-2 leading-snug"
                          >
                            {item.name}
                          </Link>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-sm font-bold text-slate-900">
                              {formatPrice(item.salePrice)}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          </div>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors font-bold text-base leading-none"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors font-bold text-base leading-none"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                            <span className="text-xs text-slate-500 ml-1">
                              = {formatPrice(item.salePrice * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors mt-2"
                  >
                    ← Continue Shopping
                  </Link>
                </div>

                {/* ── Sidebar: Order Summary ── */}
                <div className="lg:sticky lg:top-24">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                    <h2 className="text-base font-bold text-white">Order Summary</h2>

                    {/* Line items summary */}
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-slate-400 truncate pr-2">
                            {item.name}{" "}
                            <span className="text-slate-600">×{item.quantity}</span>
                          </span>
                          <span className="text-white font-medium shrink-0">
                            {formatPrice(item.salePrice * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-800 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Shipping (USA)</span>
                        <span className="text-emerald-400 font-medium">Free</span>
                      </div>
                      <div className="flex justify-between text-base font-bold">
                        <span className="text-white">Subtotal</span>
                        <span className="text-white">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    {/* Research disclaimer */}
                    <div className="bg-amber-900/30 border border-amber-700/40 rounded-xl px-3 py-2">
                      <p className="text-xs text-amber-300">
                        <strong>Research Use Only</strong> — For in vitro laboratory
                        research. Not for human consumption.
                      </p>
                    </div>

                    {/* Checkout CTA */}
                    <Link
                      href="/checkout"
                      className="block w-full text-center px-6 py-3.5 text-sm font-bold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
                    >
                      Proceed to Crypto Checkout →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────── */}
      <section className="bg-amber-50 border-t border-amber-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2">
            Research Use Only
          </p>
          <p className="text-sm text-amber-700 leading-relaxed">
            All products sold by Peak Peptides Solutions USA Sales are intended exclusively
            for in vitro laboratory research. Not for human consumption, veterinary use,
            or therapeutic applications.
          </p>
        </div>
      </section>
    </main>
  );
}
