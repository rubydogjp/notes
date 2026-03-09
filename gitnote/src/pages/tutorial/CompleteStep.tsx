import { MediaFrame } from "../../components/docs";
import { Link } from "react-router-dom";

export default function CompleteStep() {
  return (
    <>
      {/* Celebration hero */}
      <div className="text-center mb-8 max-w-md mx-auto">
        <MediaFrame src="/tutorial/eye-complete.gif" alt="完了おめでとう" />
      </div>

      <div className="my-10 rounded-2xl bg-gradient-to-br from-amber-50 via-amber-100/30 to-gitnote-50 dark:from-amber-900/20 dark:via-gray-900 dark:to-gray-950 border border-amber-200 dark:border-amber-800/30 p-8 text-center">
        <span className="text-5xl mb-4 block">🎉</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
          おめでとうございます！
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          全ての手順が完了しました。
        </p>
        <p className="text-lg text-amber-700 dark:text-amber-300 font-bold">
          これであなたも一人前の OSSコントリビューター
        </p>
      </div>

      {/* Check honeycomb */}
      <div className="my-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 text-center">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          以下のサイトを確認してみてください。<br />
          あなたのデータが入っていますね！
        </p>
        <Link
          to="/honeycomb"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-action-500 hover:bg-action-600 text-white font-bold text-sm shadow-md transition-colors"
        >
          ハチの巣をみる
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          (反映まで数時間かかることがあります)
        </p>
      </div>

      {/* Encouragement */}
      <div className="my-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-gray-700 dark:text-gray-300 leading-loose">
          GitHub にはたくさんの OSS プロジェクトがあります。<br />
          例え少しの作業であったとしても、あなたの力を必要としている OSS がありますので<strong>積極的に参加</strong>してみてください。
        </p>
      </div>

      {/* Message from author */}
      <div className="my-10 rounded-2xl border border-amber-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 bg-amber-50/60 dark:bg-gray-800/40 border-b border-amber-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>💌</span> メッセージ
          </h2>
        </div>
        <div className="px-6 py-5 space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            チュートリアルを体験していただきありがとうございます。<br />
            一度体験したことは理解が早いものです。
          </p>
          <p>
            今回はよく分からないコマンドをそのままコピペした方も、次回は 1 つ 1 つのコマンドの意味を勉強しながらやってみましょう。
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              もう一度何かしたいときは...
            </p>
            <p>
              <Link to="/tutorial/issue" className="text-link hover:text-link-hover font-semibold underline">手順 3. イシュー</Link> を作るところから始めてください。
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              2 回目の issue は自由に作って OK です。「色を変更したい」「文字を変更したい」等
            </p>
          </div>
          <p>
            今後も定期的にアップデートしていく予定です。何か意見や知りたいことがあれば是非教えてください。
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/tutorial/oss-recommend"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-action-500 hover:bg-action-600 text-white font-bold text-sm shadow-md transition-colors"
        >
          おまけ. OSSの紹介
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
