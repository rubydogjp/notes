import { CodeBlock } from "../../components/docs";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SuspendResumeDrawer({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-gray-950 shadow-2xl z-50 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-200/40 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">中断・再開</h2>
          </div>
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

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          {/* 中断 */}
          <div className="rounded-2xl border border-amber-100 dark:border-gray-800 bg-amber-50/50 dark:bg-gray-900 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">中断するとき</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              特に何も気にせず、そのままブラウザを閉じて大丈夫です。
              作業の進捗が失われることはありません。
            </p>
          </div>

          {/* 再開 */}
          <div className="rounded-2xl border border-amber-100 dark:border-gray-800 bg-amber-50/50 dark:bg-gray-900 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">再開するとき</h3>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">1</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">手順 1~3 の途中だった場合</p>
                  <p className="text-gray-600 dark:text-gray-400">そのまま前回の続きのページを開くだけで OK です。</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">2</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">手順 4~7 の途中だった場合</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    ターミナル/Powershell を閉じていた場合は、再度開いて以下を入力してください。
                  </p>
                  <CodeBlock>{"$ cd honeycomb"}</CodeBlock>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    プロンプトに <code className="bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-300 px-1 py-0.5 rounded text-xs">/honeycomb</code> と表示されれば準備 OK です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
