"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  pages.push(1);

  if (left > 2) pages.push("…");

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) pages.push("…");

  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  const btnBase =
    "flex items-center justify-center min-w-[44px] h-[44px] px-3 rounded-xl text-sm font-semibold transition-colors select-none";
  const btnActive = "bg-blue-700 text-white";
  const btnInactive = "text-slate-700 hover:bg-blue-50";
  const btnDisabled = "text-slate-300 cursor-not-allowed";

  return (
    <nav aria-label="Product page navigation" className="flex flex-wrap items-center justify-center gap-1">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnInactive}`}
      >
        ‹ Prev
      </button>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex items-center justify-center min-w-[44px] h-[44px] px-2 text-slate-400 text-sm select-none"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={`${btnBase} ${page === currentPage ? btnActive : btnInactive}`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnInactive}`}
      >
        Next ›
      </button>
    </nav>
  );
}
