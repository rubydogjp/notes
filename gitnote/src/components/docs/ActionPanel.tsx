/** @deprecated Use ActionSheet instead. Kept for potential non-tutorial use. */
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
}

export default function ActionPanel({ children, title = "やること" }: Props) {
  return (
    <div className="my-5 rounded-xl border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-900/10 p-4 md:p-5">
      <div className="flex items-center gap-2 font-bold text-sm mb-3 text-amber-800 dark:text-amber-300">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
        </svg>
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
