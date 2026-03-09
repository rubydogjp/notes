import type { ReactNode } from "react";

interface Props {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * @deprecated Use TaskCard for tutorial steps instead.
 * Kept for non-tutorial pages (Git, Develop) that may still use it.
 */
export default function Section({ title, icon, children }: Props) {
  return (
    <div className="my-8 rounded-2xl border border-amber-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm overflow-hidden">
      {title && (
        <div className="flex items-center gap-3 px-6 py-4 bg-amber-50/60 dark:bg-gray-800/40 border-b border-amber-100 dark:border-gray-800">
          {icon && <span className="text-lg">{icon}</span>}
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
      )}
      <div className="px-6 py-5 space-y-4">
        {children}
      </div>
    </div>
  );
}
