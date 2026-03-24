"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sendContactEmail, type ContactFormState } from "@/app/contact/actions";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const initialState: ContactFormState = { status: "idle", message: "" };

export default function ContactContent() {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );

  const inputClass =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-slate-700 mb-2";

  return (
    <main>
      {/* ── Section 1: Hero ─────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden py-20 sm:py-28 lg:py-36">
        {/* Background gradient + orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(30,58,138,0.18) 0%, transparent 60%, rgba(15,23,42,0.4) 100%)",
          }}
        />
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-blue-900/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4"
          >
            Contact Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Get in Touch with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Peak Peptides Solutions
            </span>{" "}
            USA Sales
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300"
          >
            Have a question about our research peptides? We&apos;re here to
            help. Send us a message and we&apos;ll get back to you promptly.
          </motion.p>
        </div>
      </section>

      {/* ── Section 2: Contact Info + Form ──────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              Reach Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              We&apos;d Love to Hear From You
            </h2>
          </motion.div>

          {/* 2-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left — Contact Info Card */}
            <motion.div
              {...fadeUp(0)}
              className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-8"
            >
              <h3 className="text-lg font-bold text-white mb-8">
                Contact Information
              </h3>

              {/* Email row */}
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-0.5 w-10 h-10 rounded-xl bg-blue-700/20 flex items-center justify-center shrink-0">
                  {/* Mail icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                    aria-hidden
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:peakpeptidesolutionusa@gmail.com"
                    className="text-white font-medium break-all hover:text-blue-400 transition-colors duration-200"
                  >
                    peakpeptidesolutionusa@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp row */}
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-0.5 w-10 h-10 rounded-xl bg-green-700/20 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-400"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    WhatsApp / Phone
                  </p>
                  <a
                    href="https://wa.me/15843332315?text=Hi%2C%20I'm%20interested%20in%20your%20research%20peptides."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-green-400 transition-colors duration-200"
                  >
                    +1 (584) 333-2315
                  </a>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-8">
                For research inquiries and order support. We typically respond
                within 1–2 business days.
              </p>

              <p className="text-blue-400 text-xs italic">
                For research use inquiries only. We do not provide medical
                advice.
              </p>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div
              {...fadeUp(0.15)}
              className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
            >
              {state.status === "success" ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center min-h-64 text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    {/* Check circle icon */}
                    <svg
                      width="28"
                      height="28"
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
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Message sent successfully
                  </h3>
                  <p className="text-slate-500 text-sm max-w-xs">
                    Thank you for reaching out. We&apos;ll get back to you
                    within 1–2 business days.
                  </p>
                </div>
              ) : (
                /* Form */
                <form action={formAction} className="space-y-5">
                  {/* Error banner */}
                  {state.status === "error" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {state.message}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What's this about?"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe your research inquiry..."
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isPending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Research Use Only Banner ─────────────── */}
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
