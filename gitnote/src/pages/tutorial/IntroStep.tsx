import { Link } from "react-router-dom";
import { MediaFrame } from "../../components/docs";

export default function IntroStep() {
  return (
    <>
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
          はじめに
        </h1>
      </div>

      <div className="max-w-md mx-auto">
        <MediaFrame src="/tutorial/welcome.gif" alt="ようこそ" />
      </div>

      {/* What's next */}
      <div className="my-10 text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          これから共同開発のチュートリアルを始めていきます。
        </p>
      </div>

      <div className="my-5 rounded-xl border-2 border-amber-400 dark:border-amber-600 p-4 md:p-5">
        <div className="flex items-center gap-2 font-bold text-sm mb-1.5 text-amber-700 dark:text-amber-300">
          <span className="text-base">💡</span>
          画面サイズ
        </div>
        <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          ここから先はパソコンで見ることをオススメします
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/tutorial/setup"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-action-500 hover:bg-action-600 text-white font-bold text-sm shadow-md transition-colors"
        >
          最初のステップへ
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
