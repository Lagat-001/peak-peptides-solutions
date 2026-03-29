"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Review } from "@/types/review";

interface Props {
  reviews: Review[];
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${stars} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          fill={n <= stars ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={n <= stars ? 0 : 1.5}
          className={`w-4 h-4 ${n <= stars ? "text-amber-400" : "text-slate-300"}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.05 },
  }),
};

export default function ReviewsContent({ reviews }: Props) {
  const avgStars = (
    reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
  ).toFixed(1);

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden py-20 sm:py-28 lg:py-36">
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
            Research Peptide Community
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            What Researchers{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Are Saying
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8"
          >
            Real reviews from the research peptide community — sourced from{" "}
            <a
              href="https://peptidecritic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              PeptideCritic.com
            </a>
            , the independent research peptide review platform.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.33 }}
            className="inline-flex items-center gap-6 bg-slate-900/60 border border-slate-700 rounded-2xl px-6 py-4"
          >
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white">{avgStars}</p>
              <div className="flex justify-center mt-1">
                <StarRating stars={5} />
              </div>
              <p className="text-xs text-slate-400 mt-1">Avg Rating</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white">{reviews.length}</p>
              <p className="text-xs text-slate-400 mt-1">Community Reviews</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white">100%</p>
              <p className="text-xs text-slate-400 mt-1">Verified Sources</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews Grid ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Community Reviews
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              From the Research Peptide Community
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Sourced from{" "}
              <a
                href="https://peptidecritic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                PeptideCritic.com
              </a>{" "}
              — an independent, community-driven research peptide review platform. These are reviews of vendors in the research peptide industry.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 p-6 flex flex-col"
              >
                {/* Stars */}
                <div className="flex items-center justify-between mb-3">
                  <StarRating stars={review.stars} />
                  {review.date && (
                    <span className="text-xs text-slate-400">
                      {formatDate(review.date)}
                    </span>
                  )}
                </div>

                {/* Reviewer + vendor badge */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="text-sm font-semibold text-slate-800">
                    {review.reviewer}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {review.vendorReviewed}
                  </span>
                </div>

                {/* Review text */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  &ldquo;{review.reviewText}&rdquo;
                </p>

                {/* Source attribution */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    Source: PeptideCritic.com
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research Use Only Disclaimer ─────────────────────────── */}
      <section className="bg-amber-50 border-y border-amber-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2">
            Research Use Only
          </p>
          <p className="text-sm text-amber-700 leading-relaxed">
            All products offered by Peak Peptides Solutions USA Sales are
            intended exclusively for laboratory research purposes. They are not
            approved for human consumption, veterinary use, or therapeutic
            applications. The reviews above reflect experiences within the
            research peptide community and are sourced from PeptideCritic.com.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-blue-700 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Start Your Research?
          </h2>
          <p className="text-blue-100 mb-8">
            Browse our full catalog of HPLC-verified, research-grade peptides.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-blue-700 bg-white rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
          >
            Browse Research Peptides
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
