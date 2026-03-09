import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  open: boolean;
  onToggle: () => void;
}

export default function ActionSheet({ children, title = "やること", open, onToggle }: Props) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        open ? "translate-y-0" : "translate-y-[calc(100%-3rem)]"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] rounded-t-2xl">
        {/* Handle bar + header */}
        <button
          onClick={onToggle}
          className="w-full flex flex-col items-center cursor-pointer group"
        >
          <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mt-2 mb-1 group-hover:bg-amber-400 transition-colors" />
          <div className="w-full flex items-center justify-between px-5 py-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
              </svg>
              {title}
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>

        {/* Content */}
        <div
          className={`overflow-y-auto transition-[max-height] duration-300 ${
            open ? "max-h-[40vh]" : "max-h-0"
          }`}
        >
          <div className="px-5 pb-5 pt-1 space-y-3 border-t border-gray-100 dark:border-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
