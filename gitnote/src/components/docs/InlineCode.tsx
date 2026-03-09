import type { ReactNode } from "react";

export default function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-300 px-1.5 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  );
}
