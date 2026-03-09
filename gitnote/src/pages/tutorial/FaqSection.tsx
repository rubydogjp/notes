import { CodeBlock } from "../../components/docs";

interface Props {
  open: boolean;
  onClose: () => void;
  highlightSlug?: string;
}

const faqs = [
  {
    slug: "q-oss",
    title: "OSS とは?",
    content: (
      <>
        <p className="mb-3">
          参加者が多いほど信頼性は高くなり、長く使い続けられる傾向があります。
        </p>
        <div className="rounded-2xl border border-amber-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-sm my-4">
          <img src="/tutorial/oss.png" alt="OSSの仕組み" className="w-full h-auto" loading="lazy" />
        </div>
        <p className="mb-3">
          しかしコミュニティには上級者が集まるイメージや、海外メンバーの多さから、はじめての参加には少しばかり勇気が必要でしょう。
        </p>
        <p>
          チュートリアルに沿って体験していただき、OSS活動をより身近なものとして感じられるように進んでいきます。
          使う側ではなく作る側へ..!
        </p>
      </>
    ),
  },
  {
    slug: "q-suspend-restart",
    title: "チュートリアルの中断/再開",
    content: (
      <>
        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">中断するとき</h4>
        <p className="mb-4">特に何も気にせず、そのままブラウザを閉じて大丈夫です。作業の進捗が失われることはありません。</p>

        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">再開するとき</h4>
        <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">手順 1~3 の途中だった場合</p>
        <p className="mb-3">そのまま前回の続きのページを開くだけで OK です。</p>

        <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">手順 4~7 の途中だった場合</p>
        <p className="mb-3">
          ターミナル/Powershell を閉じていた場合は、再度開いて以下を入力してください。
        </p>
        <CodeBlock>{"$ cd honeycomb"}</CodeBlock>
        <p className="mt-2">
          プロンプトに <code className="bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-300 px-1 py-0.5 rounded text-xs">/honeycomb</code> と表示されれば準備 OK です。
        </p>
      </>
    ),
  },
  {
    slug: "q-dispose",
    title: "終わったファイルは消していいの？",
    content: (
      <>
        <p className="mb-3">はい、消してしまっても問題ありません。</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li>PC の中に作られた <code className="bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-300 px-1 py-0.5 rounded text-xs">honeycomb</code> フォルダごと消すことができます。</li>
          <li>再び参加したい時は <strong>手順 2 のクローン</strong> からやり直してください。</li>
        </ul>
        <p className="mb-3">
          また GitHub に不要なリポジトリが残るのを邪魔だと感じる人もいると思います。
          そのまま残しておいても邪魔に感じる以外のデメリットは特にありませんが
          気になれば以下の URL のページの一番下から削除することが可能です。
        </p>
        <CodeBlock>{"https://github.com/<ユーザーID>/honeycomb/settings"}</CodeBlock>
        <p className="mb-2">
          リポジトリを削除した後にもう一度参加したい場合は <strong>手順 2 のフォーク</strong> からやり直してください。
        </p>
        <p>
          全てそのまま削除せず残す方は、次回は <strong>手順 3</strong> から参加することができます。
        </p>
      </>
    ),
  },
];

export default function FaqSection({ open, onClose, highlightSlug }: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-gray-950 shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-200/40 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">よくある質問</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.slug}
              id={faq.slug}
              className={`rounded-2xl border p-5 ${
                highlightSlug === faq.slug
                  ? "border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-900/10"
                  : "border-amber-100 dark:border-gray-800"
              }`}
            >
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3">
                Q. {faq.title}
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {faq.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
