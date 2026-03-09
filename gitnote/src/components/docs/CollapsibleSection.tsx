import { useState, type ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`my-5 rounded-2xl border-2 overflow-hidden transition-colors ${
      open
        ? "border-amber-300 dark:border-amber-700 bg-amber-50/30 dark:bg-amber-950/10"
        : "border-amber-200 dark:border-gray-700 bg-amber-50/50 dark:bg-gray-800/30 hover:border-amber-300 dark:hover:border-gray-600"
    }`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left cursor-pointer group"
      >
        <svg
          className={`w-4 h-4 text-amber-500 dark:text-amber-400 transition-transform flex-shrink-0 ${open ? "rotate-90" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
          {title}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-sm text-gray-700 dark:text-gray-300 border-t border-amber-200/60 dark:border-gray-700/60 ml-4 mr-4 mt-0 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
