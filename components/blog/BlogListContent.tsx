"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";

const categoryColors: Record<string, string> = {
  "GLP-1": "bg-blue-100 text-blue-700",
  "Healing": "bg-orange-100 text-orange-700",
  "Fat Loss": "bg-red-100 text-red-700",
  "Growth": "bg-green-100 text-green-700",
  "Anti-Aging": "bg-teal-100 text-teal-700",
  "Other": "bg-slate-100 text-slate-700",
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  posts: BlogPost[];
}

export default function BlogListContent({ posts }: Props) {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
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
            Research Blog
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Peptide Research{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Insights &amp; Studies
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300"
          >
            Expert articles on the latest peptide research, mechanisms of
            action, and scientific findings — written for researchers and
            scientists.
          </motion.p>
        </div>
      </section>

      {/* ── Article Grid ─────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                variants={cardItem}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  {/* Card header band */}
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />

                  <div className="p-6 flex flex-col h-full">
                    {/* Category + read time */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          categoryColors[post.category] ??
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {post.readingTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-5">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <time
                        dateTime={post.publishedAt}
                        className="text-xs text-slate-400"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                      <span className="text-xs font-semibold text-blue-700 group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                        Read Article
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
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Research Disclaimer Banner ────────────────────────── */}
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
              All content on this blog is intended for educational and
              informational purposes only. Products sold by Peak Peptides
              Solutions USA Sales are for in vitro scientific research and are
              not for human consumption or clinical use.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition-colors duration-200"
            >
              Browse Research Peptides
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
