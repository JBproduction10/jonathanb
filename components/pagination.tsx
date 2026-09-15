"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onChange,
  size = "md",
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  size?: "sm" | "md";
}) {
  if (totalPages <= 1) return null;

  const arrowSize = size === "sm" ? "h-7 w-7" : "h-10 w-10";
  const iconSize = size === "sm" ? 13 : 16;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, page - 1))}
        disabled={page === 0}
        aria-label="Previous page"
        className={`flex items-center justify-center shrink-0 rounded-full card-border text-white/60 hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:pointer-events-none ${arrowSize}`}
      >
        <ChevronLeft size={iconSize} />
      </button>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === page}
            className={`rounded-full transition-all ${
              i === page ? "bg-accent w-5 h-1.5" : "bg-white/20 hover:bg-white/40 w-1.5 h-1.5"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}
        aria-label="Next page"
        className={`flex items-center justify-center shrink-0 rounded-full card-border text-white/60 hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:pointer-events-none ${arrowSize}`}
      >
        <ChevronRight size={iconSize} />
      </button>
    </div>
  );
}
