"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ── Types ────────────────────────────────────────────────────────────
interface ProductRef {
  name: string;
  slug: string;
  category: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  links?: Array<{ label: string; href: string }>;
}

interface Props {
  productIndex: ProductRef[];
}

// ── Category keyword map ─────────────────────────────────────────────
const categoryPatterns: Array<{ pattern: RegExp; category: string }> = [
  {
    pattern:
      /glp-1|semaglutide|tirzepatide|liraglutide|exenatide|dulaglutide|albiglutide|lixisenatide/,
    category: "GLP-1",
  },
  {
    pattern:
      /growth hormone|ipamorelin|tesamorelin|ghrp|cjc|sermorelin|mod grf|hexarelin/,
    category: "GH",
  },
  {
    pattern: /bpc|healing|thymosin beta|tb4|tb-4|repair|tb-500/,
    category: "Healing",
  },
  {
    pattern: /cognitive|brain|semax|selank|nootropic|dihexa|cerebrolysin/,
    category: "Cognitive",
  },
  {
    pattern: /cosmetic|skin|beauty|matrixyl|argireline|snap-8|collagen|leuphasyl/,
    category: "Cosmetic",
  },
  {
    pattern: /fat loss|weight loss|fragment|aod|melanotan|mt-2/,
    category: "Fat Loss",
  },
  {
    pattern: /immune|thymosin alpha|ta-1|thymulin|ta1/,
    category: "Immune",
  },
  {
    pattern: /muscle|follistatin|igf-1|igf1/,
    category: "Muscle",
  },
];

// ── Smart response logic ─────────────────────────────────────────────
function getBotResponse(
  userInput: string,
  productIndex: ProductRef[]
): ChatMessage {
  const q = userInput.toLowerCase().trim();
  const id = Date.now().toString() + "-bot";

  // Greeting
  if (/^(hi|hello|hey|howdy|sup|good\s|greetings)/.test(q)) {
    return {
      id,
      role: "bot",
      text: "Hello! 👋 I'm Peak, your research peptides guide. Ask me about any product, category, or how to place an order!",
      links: [{ label: "Browse All Products", href: "/products" }],
    };
  }

  // Checkout / order / payment / crypto
  if (/checkout|order|pay|crypto|bitcoin|btc|ethereum|eth|usdt|trc20/.test(q)) {
    return {
      id,
      role: "bot",
      text: "We accept cryptocurrency payments only — Bitcoin (BTC), USDT (TRC20), and Ethereum (ETH). Ready to order?",
      links: [{ label: "Go to Checkout →", href: "/checkout" }],
    };
  }

  // Contact / support / email
  if (/contact|email|support|reach|message|help me/.test(q)) {
    return {
      id,
      role: "bot",
      text: "You can reach us at peakpeptidesolutionusa@gmail.com. We typically respond within 1–2 business days.",
      links: [{ label: "Contact Page →", href: "/contact" }],
    };
  }

  // About / company / purity / quality / HPLC
  if (/about|company|who are|mission|purity|quality|hplc|verified|≥98|98%/.test(q)) {
    return {
      id,
      role: "bot",
      text: "Peak Peptides Solutions USA Sales provides HPLC-verified, research-grade peptides with ≥98% average purity. US-based with domestic shipping.",
      links: [{ label: "About Us →", href: "/about" }],
    };
  }

  // Shipping / delivery
  if (/ship|deliver|usps|fedex|arrival|transit|domestic/.test(q)) {
    return {
      id,
      role: "bot",
      text: "We ship domestically within the USA. Free shipping on all orders — temperature-aware, discreet delivery. 🇺🇸",
    };
  }

  // Pricing / cost / discount / sale
  if (/price|cost|cheap|discount|sale|deal|how much|afford/.test(q)) {
    return {
      id,
      role: "bot",
      text: "All products show \"Was / Now\" pricing with savings already applied. Browse the catalog to compare prices:",
      links: [{ label: "View All Prices →", href: "/products" }],
    };
  }

  // Research use / disclaimer
  if (/research|lab|in vitro|human|clinical|veterinary/.test(q)) {
    return {
      id,
      role: "bot",
      text: "All products from Peak Peptides Solutions USA Sales are strictly for in vitro laboratory research. Not for human consumption, clinical use, or veterinary applications.",
    };
  }

  // Category keyword matches
  for (const { pattern, category } of categoryPatterns) {
    if (pattern.test(q)) {
      const catProducts = productIndex
        .filter((p) => p.category === category)
        .slice(0, 3);
      if (catProducts.length > 0) {
        return {
          id,
          role: "bot",
          text: `Here are some popular ${category} peptides from our catalog:`,
          links: catProducts.map((p) => ({
            label: p.name,
            href: `/products/${p.slug}`,
          })),
        };
      }
    }
  }

  // Direct product name match (word-by-word)
  const words = q.split(/\s+/).filter((w) => w.length >= 3);
  const matches = productIndex
    .filter((p) => {
      const pName = p.name.toLowerCase();
      return (
        words.some((w) => pName.includes(w)) ||
        pName.includes(q) ||
        q.includes(pName)
      );
    })
    .slice(0, 3);

  if (matches.length === 1) {
    return {
      id,
      role: "bot",
      text: `I found ${matches[0].name}! Click below to view the full product details:`,
      links: [
        { label: `View ${matches[0].name} →`, href: `/products/${matches[0].slug}` },
      ],
    };
  }

  if (matches.length > 1) {
    return {
      id,
      role: "bot",
      text: `I found ${matches.length} matching products for "${userInput}":`,
      links: matches.map((p) => ({
        label: p.name,
        href: `/products/${p.slug}`,
      })),
    };
  }

  // Fallback
  return {
    id,
    role: "bot",
    text: `I couldn't find an exact match for "${userInput}". Try searching by product name or category, or browse our full catalog:`,
    links: [
      { label: "Browse All Products →", href: "/products" },
      { label: "Contact Us for Help →", href: "/contact" },
    ],
  };
}

// ── Welcome message ──────────────────────────────────────────────────
const WELCOME: ChatMessage = {
  id: "welcome",
  role: "bot",
  text: "Hi! I'm Peak 👋 I can help you find research peptides, answer questions about our products, or guide you to checkout. What are you looking for?",
  links: [
    { label: "Browse All Products →", href: "/products" },
    { label: "Go to Checkout →", href: "/checkout" },
  ],
};

// ── Component ────────────────────────────────────────────────────────
export default function ChatBot({ productIndex }: Props) {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show bubble 3s after mount
  useEffect(() => {
    const t = setTimeout(() => {
      if (!bubbleDismissed) setShowBubble(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [bubbleDismissed]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleOpen() {
    setOpen(true);
    setShowBubble(false);
    setBubbleDismissed(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function dismissBubble() {
    setShowBubble(false);
    setBubbleDismissed(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
    };
    const botMsg = getBotResponse(trimmed, productIndex);

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <>
      {/* ── Pop-up bubble ──────────────────────────────────── */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 max-w-[240px]"
          >
            <button
              onClick={dismissBubble}
              aria-label="Dismiss"
              className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-700 text-lg leading-none"
            >
              ×
            </button>
            <p className="text-sm text-slate-800 pr-4 font-medium">
              Hi, I&apos;m Peak. How can I be of help today?
            </p>
            {/* Tail */}
            <div className="absolute -bottom-[9px] right-6 w-4 h-4 bg-white border-r border-b border-slate-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat window ────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden w-[calc(100vw-3rem)] max-w-sm sm:w-96"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="bg-slate-950 px-4 py-3 flex items-center gap-3 shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="Peak"
                width={32}
                height={32}
                className="rounded-full object-contain shrink-0"
              />
              <div className="min-w-0">
                <p className="text-white font-bold text-sm leading-tight">
                  Peak
                </p>
                <p className="text-slate-400 text-xs leading-tight">
                  Research Peptides Guide
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close chat"
                className="ml-auto text-slate-400 hover:text-white transition-colors p-1"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-blue-700 text-white rounded-br-sm"
                        : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    <p className="leading-snug">{msg.text}</p>
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {msg.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={handleClose}
                            className="block text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline transition-colors"
                          >
                            → {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products..."
                className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-w-0"
              />
              <button
                type="submit"
                className="bg-blue-700 text-white rounded-xl px-3 py-2 hover:bg-blue-800 transition-colors shrink-0"
                aria-label="Send"
              >
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
                  <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ────────────────────────────────── */}
      <button
        onClick={handleOpen}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-700 hover:bg-blue-800 shadow-xl flex items-center justify-center transition-colors duration-200"
      >
        <Image
          src="/images/logo.jpg"
          alt="Chat with Peak"
          width={36}
          height={36}
          className="rounded-full object-contain"
        />
      </button>
    </>
  );
}
