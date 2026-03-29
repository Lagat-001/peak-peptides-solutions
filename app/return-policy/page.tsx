import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Peak Peptides Solutions USA Sales",
  description:
    "Return and refund policy for Peak Peptides Solutions USA Sales. Returns are accepted only for defective or incorrectly shipped products. Research use only.",
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ReturnPolicyPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden py-20 sm:py-28">
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">
            Peak Peptides Solutions USA Sales
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            Return &amp;{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Refund Policy
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300">
            We stand behind the quality of every research-grade peptide we ship.
            Please read this policy carefully before placing an order.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Section 1 — Overview */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              At Peak Peptides Solutions USA Sales, we are committed to
              delivering research-grade peptides that meet the highest purity
              standards. All products undergo HPLC verification before dispatch.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Due to the sensitive nature of research compounds and strict
              quality-chain requirements,{" "}
              <strong className="text-slate-900">
                we accept returns and issue refunds only for defective or
                incorrectly shipped products.
              </strong>{" "}
              Returns are not accepted for change of mind, user error, or
              non-defective items.
            </p>
          </div>

          {/* Section 2 — Eligible / Not Eligible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Eligible */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-600" aria-hidden>
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900">Eligible for Return / Refund</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Product arrived visibly damaged or compromised",
                  "Wrong product shipped (does not match your order)",
                  "Product fails quality or purity verification — with supporting documentation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not eligible */}
            <div className="bg-white border border-red-100 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-600" aria-hidden>
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Change of mind or no longer needed",
                  "Incorrect quantity or product ordered by customer",
                  "Products that have been opened, reconstituted, or used",
                  "Orders where incorrect shipping address was provided",
                  "Delays caused by customs or carrier",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <XIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3 — How to Request */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">How to Request a Return</h2>
            <ol className="space-y-5">
              {[
                {
                  step: "1",
                  title: "Contact us by email within 7 days of receipt",
                  desc: (
                    <>
                      Email{" "}
                      <a
                        href="mailto:peakpeptidesolutionusa@gmail.com"
                        className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
                      >
                        peakpeptidesolutionusa@gmail.com
                      </a>{" "}
                      with the subject line: <em>Return Request — [Your Order ID]</em>.
                    </>
                  ),
                },
                {
                  step: "2",
                  title: "Include the following in your email",
                  desc: "Your Order ID, a clear description of the defect or issue, and supporting photos or third-party lab documentation where applicable.",
                },
                {
                  step: "3",
                  title: "We review and respond within 1–2 business days",
                  desc: "Our team will assess your case and confirm eligibility. We may request additional information.",
                },
                {
                  step: "4",
                  title: "Approved returns",
                  desc: "We will either ship a replacement product at no cost, or issue a full refund to your original payment method within 3–5 business days of approval.",
                },
              ].map(({ step, title, desc }) => (
                <li key={step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-white">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">{title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Section 4 — Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <p className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-3">
              Research Use Only — Important Notice
            </p>
            <p className="text-sm text-amber-700 leading-relaxed">
              All products sold by Peak Peptides Solutions USA Sales are
              intended exclusively for in vitro laboratory research. They are
              not approved for human consumption, clinical use, or veterinary
              applications. By placing an order you confirm that you are a
              qualified researcher and that the products will be used solely for
              lawful scientific research purposes.
            </p>
          </div>

          {/* Section 5 — Contact CTA */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center">
            <h2 className="text-lg font-bold text-white mb-3">
              Have a Question About Your Order?
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Our team is ready to help. Reach out via the contact page or
              email us directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Contact Us
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
