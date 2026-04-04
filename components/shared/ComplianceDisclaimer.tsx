export default function ComplianceDisclaimer() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6 max-w-3xl mx-auto">
      <div className="flex items-start gap-3">
        {/* Flask / beaker icon */}
        <svg
          className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5.532 13.97a8.25 8.25 0 0 0-2.407 5.13A2.25 2.25 0 0 0 5.368 21.5h13.264a2.25 2.25 0 0 0 2.243-2.401 8.25 8.25 0 0 0-2.407-5.129l-3.559-3.56a2.25 2.25 0 0 1-.659-1.592V3.104M9.75 3h4.5M12 7.5h.008v.008H12V7.5Z"
          />
        </svg>
        <div>
          <h3 className="text-sm font-bold text-blue-900 mb-1">
            Research &amp; Laboratory Use Only
          </h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            All products on this site are sold strictly for research and
            laboratory use only. They are not intended for human consumption,
            diagnostic, or therapeutic purposes. Some compounds like Semaglutide
            and Tirzepatide are being studied in clinical settings for metabolic
            research and weight management, but any human use is outside the
            scope of this website and should only be done under medical
            supervision.
          </p>
        </div>
      </div>
    </div>
  );
}
