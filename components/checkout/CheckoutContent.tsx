"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────
type CryptoId = "BTC" | "USDT" | "ETH";

interface CryptoOption {
  id: CryptoId;
  name: string;
  symbol: string;
  network: string;
  address: string;
  rate: number;
  decimals: number;
  iconBg: string;
  iconText: string;
  iconLabel: string;
}

// ── Animation helpers ────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

// ── Static data ──────────────────────────────────────────────────────
const cartItems = [
  { name: "BPC-157", qty: 1, price: 55 },
  { name: "Semaglutide", qty: 1, price: 215 },
];
const TOTAL = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

const cryptos: CryptoOption[] = [
  {
    id: "BTC",
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Network",
    address: "bc1qplaceholderaddressbppsusa",
    rate: 65000,
    decimals: 6,
    iconBg: "bg-orange-500",
    iconText: "text-white",
    iconLabel: "₿",
  },
  {
    id: "USDT",
    name: "Tether USD",
    symbol: "USDT",
    network: "TRON (TRC20)",
    address: "TPlaceholderTRC20AddressBPPS",
    rate: 1,
    decimals: 2,
    iconBg: "bg-emerald-500",
    iconText: "text-white",
    iconLabel: "₮",
  },
  {
    id: "ETH",
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum (ERC20)",
    address: "0xPlaceholderEthereumAddrBPPS",
    rate: 3200,
    decimals: 6,
    iconBg: "bg-blue-600",
    iconText: "text-white",
    iconLabel: "Ξ",
  },
];

// ── QR placeholder SVG (static, no randomness) ───────────────────────
function QRPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      <div className="w-32 h-32 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-center">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Top-left finder pattern */}
          <rect x="4" y="4" width="28" height="28" rx="3" fill="#1e293b" />
          <rect x="10" y="10" width="16" height="16" rx="2" fill="white" />
          <rect x="14" y="14" width="8" height="8" rx="1" fill="#1e293b" />
          {/* Top-right finder pattern */}
          <rect x="64" y="4" width="28" height="28" rx="3" fill="#1e293b" />
          <rect x="70" y="10" width="16" height="16" rx="2" fill="white" />
          <rect x="74" y="14" width="8" height="8" rx="1" fill="#1e293b" />
          {/* Bottom-left finder pattern */}
          <rect x="4" y="64" width="28" height="28" rx="3" fill="#1e293b" />
          <rect x="10" y="70" width="16" height="16" rx="2" fill="white" />
          <rect x="14" y="74" width="8" height="8" rx="1" fill="#1e293b" />
          {/* Data modules (decorative) */}
          <rect x="40" y="4" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="50" y="4" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="40" y="14" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="50" y="14" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="40" y="24" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="4" y="40" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="14" y="40" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="24" y="40" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="40" y="40" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="50" y="40" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="60" y="40" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="70" y="40" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="80" y="40" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="40" y="50" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="60" y="50" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="80" y="50" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="40" y="60" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="50" y="60" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="70" y="60" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="4" y="50" width="6" height="6" rx="1" fill="#1e293b" />
          <rect x="24" y="50" width="6" height="6" rx="1" fill="#1e293b" />
        </svg>
      </div>
      <p className="text-xs text-slate-400">Scan to Pay</p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────
export default function CheckoutContent() {
  const [selectedId, setSelectedId] = useState<CryptoId | null>(null);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const orderIdRef = useRef<string | null>(null);

  const selected = cryptos.find((c) => c.id === selectedId) ?? null;
  const cryptoAmount = selected
    ? (TOTAL / selected.rate).toFixed(selected.decimals)
    : null;

  function handleCopy() {
    if (!selected) return;
    navigator.clipboard.writeText(selected.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleSent() {
    if (!orderIdRef.current) {
      orderIdRef.current =
        "PP-" + Math.floor(100000 + Math.random() * 900000);
    }
    setSent(true);
  }

  return (
    <main>
      {/* ── Top Research Disclaimer ───────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200 py-3 px-4">
        <div className="max-w-3xl mx-auto flex items-start gap-2 text-amber-800 text-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 mt-0.5 text-amber-600"
            aria-hidden
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <p>
            <strong>For Research Use Only</strong> — All products are intended
            exclusively for in vitro laboratory research. Not for human
            consumption, clinical use, or veterinary applications.
          </p>
        </div>
      </div>

      {/* ── Hero / Header ─────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden py-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(30,58,138,0.18) 0%, transparent 60%, rgba(15,23,42,0.4) 100%)",
          }}
        />
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-64 h-64 rounded-full bg-blue-900/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4"
          >
            Checkout
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
          >
            Complete Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Research Order
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base sm:text-lg text-slate-300"
          >
            We accept cryptocurrency payments only. Select your preferred
            payment method below.
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* A — Order Summary */}
          <motion.div
            {...fadeUp(0)}
            className="bg-slate-950 border border-slate-800 rounded-2xl p-6"
          >
            <h2 className="text-base font-bold text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span className="text-slate-300">
                    {item.name}{" "}
                    <span className="text-slate-500">× {item.qty}</span>
                  </span>
                  <span className="text-white font-medium">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Shipping (USA)</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span className="text-white">Total</span>
                <span className="text-white">${TOTAL.toFixed(2)} USD</span>
              </div>
            </div>
          </motion.div>

          {/* B — Payment Method selector */}
          <motion.div {...fadeUp(0.1)}>
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Select Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cryptos.map((crypto) => {
                const isSelected = selectedId === crypto.id;
                return (
                  <button
                    key={crypto.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(crypto.id);
                      setSent(false);
                    }}
                    className={`rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200 text-left ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white hover:border-blue-400"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${crypto.iconBg} flex items-center justify-center mb-3`}
                    >
                      <span
                        className={`text-lg font-bold leading-none ${crypto.iconText}`}
                      >
                        {crypto.iconLabel}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {crypto.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {crypto.network}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* C + D + E — Payment details, button, success */}
          <AnimatePresence mode="wait">
            {selected && !sent && (
              <motion.div
                key="payment-details"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Payment details card */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
                  {/* Network badge + amount */}
                  <div>
                    <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-900/30 border border-blue-800/50 rounded-full px-3 py-1 mb-3">
                      {selected.network}
                    </span>
                    <p className="text-3xl font-bold font-mono text-white">
                      {cryptoAmount} {selected.symbol}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      ${TOTAL.toFixed(2)} USD · Rate shown is approximate and
                      for illustration only.
                    </p>
                  </div>

                  {/* Wallet address */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                      Send to this address
                    </p>
                    <div className="bg-slate-900 rounded-xl px-4 py-3 flex items-start justify-between gap-3">
                      <span className="font-mono text-sm text-slate-200 break-all leading-relaxed">
                        {selected.address}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 ${
                          copied
                            ? "bg-emerald-700/40 text-emerald-300"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                      >
                        {copied ? (
                          <>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="m9 12 2 2 4-4" />
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <rect
                                width="14"
                                height="14"
                                x="8"
                                y="8"
                                rx="2"
                                ry="2"
                              />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* QR placeholder */}
                  <QRPlaceholder />

                  {/* Instructions */}
                  <div className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3">
                      Payment Instructions
                    </p>
                    <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
                      <li>Copy the wallet address above.</li>
                      <li>
                        Send{" "}
                        <strong className="text-white">
                          exactly {cryptoAmount} {selected.symbol}
                        </strong>{" "}
                        from your wallet.
                      </li>
                      <li>
                        Click &quot;I Have Sent the Payment&quot; below.
                      </li>
                      <li>
                        We will manually verify and process your order within
                        1–2 business days.
                      </li>
                    </ol>
                    <p className="text-xs font-bold text-amber-400 mt-3 pt-3 border-t border-blue-800/50">
                      Send the EXACT amount. Do not change the amount or add
                      any extra.
                    </p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleSent}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-2xl text-lg transition-colors duration-200 cursor-pointer"
                >
                  I Have Sent the Payment →
                </button>
              </motion.div>
            )}

            {sent && selected && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-green-800 mb-2">
                  Payment Confirmation Pending
                </h2>
                <p className="text-green-700 text-sm mb-4 max-w-sm mx-auto">
                  Thank you! Our team will manually verify your{" "}
                  {selected.name} transaction and process your order within
                  1–2 business days.
                </p>
                <p className="text-slate-500 text-sm font-mono mb-1">
                  Order {orderIdRef.current}
                </p>
                <p className="text-slate-500 text-sm">
                  Questions?{" "}
                  <a
                    href="mailto:peakpeptidesolutionusa@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    peakpeptidesolutionusa@gmail.com
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom Research Use Only Banner ───────────────────── */}
      <section className="bg-blue-700 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              For Research Use Only
            </h2>
            <p className="text-white/80 text-base mb-8 max-w-2xl mx-auto">
              Products sold by Peak Peptides Solutions USA Sales are intended
              exclusively for in vitro scientific research. Not for human
              consumption, clinical use, or veterinary applications.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition-colors duration-200"
            >
              View Our Full Catalog
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
