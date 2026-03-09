import { useState } from "react";

interface OverviewItem {
  icon?: string;
  title: string;
  description?: string;
}

interface Props {
  items: OverviewItem[];
}

export default function StepOverview({ items }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-8 rounded-2xl border border-amber-200 dark:border-gray-700 bg-amber-50/40 dark:bg-gray-800/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-5 md:p-6 cursor-pointer"
      >
        <span className="text-sm font-bold text-amber-700 dark:text-amber-400 tracking-wide">
          このステップでやること
        </span>
        <svg
          className={`w-4 h-4 text-amber-600 dark:text-amber-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ol className="space-y-2 px-5 md:px-6 pb-5 md:pb-6">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-amber-200 dark:bg-amber-800/50 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300">
                {item.icon ?? i + 1}
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {item.title}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
