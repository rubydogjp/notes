import { Link } from "react-router-dom";

interface NavTarget {
  slug: string;
  title: string;
}

interface Props {
  basePath: string;
  prev: NavTarget | null;
  next: NavTarget | null;
}

export default function PageNav({ basePath, prev, next }: Props) {
  return (
    <div className="flex justify-between mt-12 pt-6 border-t border-amber-200/40 dark:border-gray-800 gap-4">
      {prev ? (
        <Link
          to={`${basePath}/${prev.slug}`}
          className="group flex items-center gap-3 px-4 py-3 border border-amber-200/60 dark:border-gray-800 rounded-xl hover:border-amber-400 dark:hover:border-amber-600 transition-colors max-w-[45%]"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wide">前へ</span>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={`${basePath}/${next.slug}`}
          className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-action-500 hover:bg-action-600 transition-colors max-w-[45%] ml-auto"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs text-white/70 uppercase tracking-wide">次へ</span>
            <span className="font-semibold text-sm text-white">
              {next.title}
            </span>
          </div>
          <svg className="w-4 h-4 text-white/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
