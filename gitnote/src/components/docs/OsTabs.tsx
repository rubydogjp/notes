import { useState, useEffect, type ReactNode } from "react";
import { useOsContext, type OS } from "./OsContext";

interface Props {
  mac: ReactNode;
  windows: ReactNode;
}

const STORAGE_KEY = "gitnote-os-pref";

export default function OsTabs({ mac, windows }: Props) {
  const contextOs = useOsContext();

  // Inside SlideViewer: just render selected content, no UI
  if (contextOs !== null) {
    return <>{contextOs === "mac" ? mac : windows}</>;
  }

  // Standalone: render with tab UI
  return <StandaloneOsTabs mac={mac} windows={windows} />;
}

function StandaloneOsTabs({ mac, windows }: Props) {
  const [os, setOs] = useState<OS>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as OS) || "mac";
    } catch {
      return "mac";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, os);
    } catch { /* ignore */ }
  }, [os]);

  return (
    <div className="my-6 rounded-2xl border border-amber-200 dark:border-gray-700 overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex bg-amber-50 dark:bg-gray-800/80 border-b border-amber-200 dark:border-gray-700">
        <button
          onClick={() => setOs("mac")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors cursor-pointer flex-1 justify-center
            ${os === "mac"
              ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b-2 border-amber-500 -mb-px"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Mac
        </button>
        <button
          onClick={() => setOs("windows")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors cursor-pointer flex-1 justify-center
            ${os === "windows"
              ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b-2 border-amber-500 -mb-px"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 12V6.75l6-1.32v6.48L3 12zm6.98.04l.02 6.47-6.98-1.01V12h6.96zm.76-7.58L21 3v8.96h-10.26V4.46zm10.26 8.5V21l-10.26-1.44-.02-6.6H21z" />
          </svg>
          Windows
        </button>
      </div>
      {/* Content */}
      <div className="bg-white dark:bg-gray-900 p-5">
        {os === "mac" ? mac : windows}
      </div>
    </div>
  );
}
