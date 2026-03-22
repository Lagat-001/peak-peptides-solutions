"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost, ContentSection } from "@/types/blog";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const categoryColors: Record<string, string> = {
  "GLP-1": "bg-blue-100 text-blue-700",
  "Healing": "bg-orange-100 text-orange-700",
  "Fat Loss": "bg-red-100 text-red-700",
  "Growth": "bg-green-100 text-green-700",
  "Anti-Aging": "bg-teal-100 text-teal-700",
  "Other": "bg-slate-100 text-slate-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Section({ section, index }: { section: ContentSection; index: number }) {
  return (
    <motion.div {...fadeUp(0.05 * (index % 8))} className="mb-2">
      {section.heading && (
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-3">
          {section.heading}
        </h2>
      )}
      {section.subheading && (
        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
          {section.subheading}
        </h3>
      )}
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-slate-700 leading-relaxed mb-4 text-base">
          {p}
        </p>
      ))}
      {section.list && section.list.length > 0 && (
        <ul className="mb-4 space-y-2">
          {section.list.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700 text-base">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="overflow-x-auto mb-6 rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900">
                {section.table.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-slate-700 border-t border-slate-100">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

interface Props {
  post: BlogPost;
}

export default function BlogPostContent({ post }: Props) {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          {/* Category + read time */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                categoryColors[post.category] ?? "bg-slate-100 text-slate-700"
              }`}
            >
              {post.category}
            </span>
            <span className="text-slate-400 text-xs">{post.readingTime}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-4 text-sm text-slate-400"
          >
            <span>Peak Peptides Research Team</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ─────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
            {/* Main content */}
            <article>
              {/* Excerpt lead */}
              <motion.p
                {...fadeUp(0)}
                className="text-lg text-slate-600 leading-relaxed mb-8 pb-8 border-b border-slate-100 font-medium"
              >
                {post.excerpt}
              </motion.p>

              {/* Content sections */}
              {post.content.map((section, i) => (
                <Section key={i} section={section} index={i} />
              ))}

              {/* Research disclaimer */}
              <motion.div
                {...fadeUp(0.1)}
                className="mt-12 p-5 bg-amber-50 border border-amber-200 rounded-2xl"
              >
                <p className="text-amber-800 text-sm font-semibold mb-1">
                  Research Use Only
                </p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  All information in this article is provided for educational
                  and informational purposes only. This content does not
                  constitute medical advice. Products referenced are for
                  in vitro scientific research only and are not intended for
                  human consumption, clinical use, or self-administration.
                  Always consult qualified research professionals.
                </p>
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Related Products */}
              {post.relatedProducts.length > 0 && (
                <motion.div
                  {...fadeUp(0.2)}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sticky top-24"
                >
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">
                    Related Products
                  </p>
                  <div className="space-y-3">
                    {post.relatedProducts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/products/${rp.slug}`}
                        className="flex items-center justify-between group p-3 bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                          {rp.name}
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all"
                          aria-hidden
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/products"
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
                  >
                    Browse All Peptides
                  </Link>
                </motion.div>
              )}

              {/* CTA card */}
              <motion.div
                {...fadeUp(0.3)}
                className="bg-blue-700 rounded-2xl p-6 text-center"
              >
                <p className="text-white font-bold text-base mb-2">
                  Ready to Order?
                </p>
                <p className="text-blue-100 text-sm mb-4">
                  Research-grade peptides with fast USA shipping.
                </p>
                <Link
                  href="/checkout"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white text-white text-sm font-semibold hover:bg-white hover:text-blue-700 transition-colors"
                >
                  Order with Crypto
                </Link>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CTA Footer ───────────────────────────────────────── */}
      <section className="bg-slate-950 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Explore More Research
            </h2>
            <p className="text-slate-400 text-base mb-8">
              Browse our full catalog of research-grade peptides or read more
              articles in the Peak Peptides research blog.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors"
              >
                Browse Peptide Catalog
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold transition-colors"
              >
                More Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
