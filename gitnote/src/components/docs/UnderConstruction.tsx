import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function UnderConstruction({ children }: Props) {
  return (
    <div className="my-6 rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10 p-6 md:p-8 text-center">
      <div className="text-4xl mb-3">🚧</div>
      <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">
        作成中です
      </h3>
      <p className="text-sm text-amber-700/70 dark:text-amber-400/60 mb-4">
        このページは現在作成途中です。もうしばらくお待ちください。
      </p>
      {children && (
        <div className="mt-4 text-left text-sm text-gray-600 dark:text-gray-400">
          {children}
        </div>
      )}
    </div>
  );
}
