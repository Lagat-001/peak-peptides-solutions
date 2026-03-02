"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Animation variants ────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const cardItem = (yOffset = 20, duration = 0.45) => ({
  hidden: { opacity: 0, y: yOffset },
  show: { opacity: 1, y: 0, transition: { duration } },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

// ─── Inline SVG icons ──────────────────────────────────────────────────────

const FlaskIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M9 3v6l-4 9a1 1 0 0 0 .9 1.45h10.2A1 1 0 0 0 23 18l-4-9V3" />
    <path d="M8.5 14.5h7" />
  </svg>
);

const MicroscopeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h8" />
    <path d="M3 21h18" />
    <path d="M14 21v-4a2 2 0 0 0-2-2H8" />
    <path d="M10 10 5.5 5.5" />
    <path d="m14 6-3 3" />
    <path d="m9 9 3-3" />
    <rect x="12" y="3" width="4" height="8" rx="1" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
    <rect x="9" y="11" width="14" height="10" rx="2" />
    <circle cx="12" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const BeakerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 3h15M6 3v10.5a6 6 0 0 0 12 0V3" />
    <path d="M6 14.25h12" />
  </svg>
);

const MessageCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// ─── Section data ──────────────────────────────────────────────────────────

const missionCards = [
  {
    icon: <FlaskIcon />,
    title: "Purity & Quality",
    desc: "Every batch HPLC-verified to ≥98% purity. We apply rigorous analytical standards — no exceptions, no shortcuts.",
  },
  {
    icon: <MicroscopeIcon />,
    title: "Research Excellence",
    desc: "Documented-grade peptides formulated for researchers, scientists, and academic laboratories that demand precision.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Customer Trust",
    desc: "Transparent sourcing, no hidden fees, and a knowledgeable support team that stands behind every order.",
  },
  {
    icon: <TruckIcon />,
    title: "Fast USA Shipping",
    desc: "Shipped domestically from the USA with temperature-aware, discreet packaging for fast, reliable delivery.",
  },
];

const whyCards = [
  {
    icon: <CheckCircleIcon />,
    title: "≥98% HPLC Purity",
    desc: "Analytical HPLC testing confirms purity on every peptide in our 275+ product catalog.",
  },
  {
    icon: <ClipboardIcon />,
    title: "Third-Party Tested",
    desc: "Independent laboratory verification provides an additional layer of quality assurance beyond in-house testing.",
  },
  {
    icon: <MapPinIcon />,
    title: "USA-Based Supplier",
    desc: "Stocked and shipped domestically — faster delivery times and simpler logistics for US-based research teams.",
  },
  {
    icon: <LockIcon />,
    title: "Secure Checkout",
    desc: "Encrypted transactions and privacy-first handling protect every order from placement through delivery.",
  },
  {
    icon: <BeakerIcon />,
    title: "Research-Use Focus",
    desc: "Our entire catalog is designed and documented for in vitro scientific study — not for clinical or consumer use.",
  },
  {
    icon: <MessageCircleIcon />,
    title: "Expert Support",
    desc: "Our team understands peptide science and is available to answer technical questions about any product.",
  },
];

const qualityItems = [
  {
    title: "HPLC Verification",
    desc: "High-performance liquid chromatography confirms purity ≥98% for every peptide in our catalog before it ships.",
  },
  {
    title: "Cold-Chain Integrity",
    desc: "Peptides manufactured and stored at controlled temperatures to preserve bioactivity from production through delivery.",
  },
  {
    title: "COA Available on Request",
    desc: "Certificate of Analysis available for any product upon request. Full analytical transparency — no hidden data.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden py-20 sm:py-28 lg:py-36">
        {/* Background orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(30,58,138,0.18) 0%, transparent 60%, rgba(15,23,42,0.4) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-blue-900/20 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4"
          >
            About Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Peak Peptides Solutions
            </span>{" "}
            USA Sales
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-10"
          >
            America&apos;s trusted source for premium research-grade peptides — delivering purity,
            precision, and reliability to the scientific community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["US-Based Supplier", "≥98% Purity Verified", "Research Grade Only"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. Company Story ────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — story text */}
            <motion.div {...fadeUp(0)}>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
                Committed to Research Excellence
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  Peak Peptides Solutions USA Sales was founded on a single principle: researchers
                  deserve peptide compounds that meet the same exacting standards they apply to their
                  own work. We supply a catalog of 275+ research-grade peptides — spanning GLP-1
                  agonists, growth hormone secretagogues, healing peptides, nootropics, cosmetic
                  actives, and clinical reference compounds — all verified at ≥98% purity by
                  analytical HPLC before leaving our facility.
                </p>
                <p>
                  Operating entirely within the United States, we maintain domestic stock that ships
                  quickly without the customs delays or cold-chain uncertainties of international
                  sourcing. Every product is intended exclusively for in vitro laboratory and
                  scientific research. We are transparent about what we supply, how we test it, and
                  what it is for — because trust is the foundation of every long-term research
                  partnership.
                </p>
              </div>
            </motion.div>

            {/* Right — stat card */}
            <motion.div {...fadeUp(0.15)}>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 sm:p-10">
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-8">
                  By the numbers
                </p>
                <div className="space-y-8">
                  {[
                    { value: "275+", label: "Research Peptides" },
                    { value: "≥98%", label: "Average Purity" },
                    { value: "USA", label: "Domestic Shipping" },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex items-center gap-5">
                      <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-none">
                        {value}
                      </span>
                      <span className="text-slate-300 text-sm font-medium leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Mission & Values ─────────────────────────────────────── */}
      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              Mission &amp; Values
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What Drives Us</h2>
          </motion.div>

          <motion.div
            variants={container}
            custom={0.12}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {missionCards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardItem(20, 0.45)}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-700/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-700/20 text-blue-400 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Why Choose Us ────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Built for Serious Research
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            custom={0.08}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyCards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardItem(16, 0.4)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-700/10 text-blue-600 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Quality Standards ────────────────────────────────────── */}
      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              Quality Standards
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How We Ensure Purity
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            custom={0.10}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            {qualityItems.map((item) => (
              <motion.div
                key={item.title}
                variants={cardItem(20, 0.45)}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-full bg-blue-700/20 flex items-center justify-center mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 block" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Disclaimer sub-banner */}
          <motion.div
            {...fadeUp(0)}
            className="bg-blue-900/30 border border-blue-800/50 rounded-xl px-6 py-4 text-center"
          >
            <p className="text-sm text-blue-200">
              All products are for{" "}
              <span className="font-semibold">in vitro laboratory and research use only</span>. Not
              intended for human consumption, veterinary use, or clinical application.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Research Use Only Banner ─────────────────────────────── */}
      <section className="bg-blue-700 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-3">
              Important Notice
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              For Research Use Only
            </h2>
            <p className="text-blue-100 text-sm sm:text-base mb-8 leading-relaxed">
              Products sold by <strong>Peak Peptides Solutions USA Sales</strong> are intended
              exclusively for in vitro scientific research. Not for human consumption, clinical use,
              or veterinary applications. By purchasing, you confirm that you are a qualified
              researcher using these compounds in a laboratory setting.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border-2 border-white text-white text-sm font-semibold hover:bg-white hover:text-blue-700 transition-colors duration-200"
            >
              View Our Full Catalog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
