/** @deprecated Use SlideViewer for tutorial steps instead. Kept for potential non-tutorial use. */
import type { ReactNode } from "react";
import ActionPanel from "./ActionPanel";

interface Props {
  stepNum: number;
  subStepNum: number;
  title: string;
  icon?: string;
  children: ReactNode;
  action?: ReactNode;
  actionTitle?: string;
  isLast?: boolean;
}

export default function TaskCard({
  stepNum,
  subStepNum,
  title,
  icon,
  children,
  action,
  actionTitle,
  isLast = false,
}: Props) {
  const badge = `${stepNum}.${subStepNum}`;

  return (
    <div className={`relative pl-10 md:pl-12 ${isLast ? "pb-2" : "pb-10"}`}>
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-[17px] md:left-[21px] top-10 bottom-0 w-0.5 bg-amber-200 dark:bg-amber-800/50" />
      )}

      {/* Step number badge */}
      <div className="absolute left-0 top-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-md shadow-amber-300/30">
        {badge}
      </div>

      {/* Card content */}
      <div className="rounded-2xl border border-amber-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 bg-amber-50/60 dark:bg-gray-800/40 border-b border-amber-100 dark:border-gray-800">
          {icon && <span className="text-lg">{icon}</span>}
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Explanation content */}
          {children}

          {/* Action panel */}
          {action && <ActionPanel title={actionTitle}>{action}</ActionPanel>}
        </div>
      </div>
    </div>
  );
}
