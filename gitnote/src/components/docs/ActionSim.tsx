import { useState, useContext, type ReactNode } from "react";
import { ActionDoneContext } from "./SlideViewer";

interface Props {
  /** "terminal" = CLI風, "browser" = ブラウザ風 */
  type: "terminal" | "browser";
  /** ウィンドウタイトル */
  title?: string;
  /** 表示するコマンド or URL */
  command: string;
  /** 実行後に出るテキスト */
  output?: string;
  /** true → ✅, false → ❌ */
  success?: boolean;
  /** 追加の説明テキスト (ボタン下に常時表示) */
  note?: ReactNode;
}

export default function ActionSim({
  type,
  title,
  command,
  output,
  success = true,
  note,
}: Props) {
  const [executed, setExecuted] = useState(false);
  const onDone = useContext(ActionDoneContext);

  const isTerminal = type === "terminal";
  const windowTitle = title ?? (isTerminal ? "Terminal" : "Browser");
  const btnLabel = isTerminal ? "実行" : "開く";
  const hintMessage = isTerminal
    ? "実際にターミナルアプリでやってみよう！"
    : "実際にブラウザで開いてやってみよう！";

  return (
    <div className="rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden shadow-sm bg-white dark:bg-gray-900">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="flex-1 text-center text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
          {windowTitle}
        </span>
        <span className="w-[3.75rem]" />
      </div>

      {/* Body */}
      <div className={`px-4 py-4 font-mono text-sm ${isTerminal ? "bg-gray-950 text-gray-100" : "bg-white dark:bg-gray-900"}`}>
        {/* Command / URL display */}
        {isTerminal ? (
          <div className="text-green-400 whitespace-pre-wrap break-all">{command}</div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-600 dark:text-gray-300 text-xs mb-2 font-sans">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span className="truncate">{command}</span>
          </div>
        )}

        {/* Run button */}
        {!executed ? (
          <button
            onClick={() => { setExecuted(true); onDone?.(); }}
            className="mt-3 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer transition-colors bg-action-500 hover:bg-action-600 text-white"
          >
            {btnLabel}
          </button>
        ) : (
          <div className="mt-3 space-y-2">
            {/* Output */}
            {output && (
              <div className={isTerminal ? "text-gray-300" : "text-gray-700 dark:text-gray-300 font-sans text-sm"}>
                {output}
              </div>
            )}
            {/* Result badge */}
            <div className={`flex items-center gap-2 text-sm font-bold ${
              success ? "text-success-500" : "text-failure-500"
            }`}>
              <span className="text-lg">{success ? "✅" : "❌"}</span>
              {success ? "成功" : "エラー"}
            </div>
            {/* Hint */}
            <p className={`text-xs font-sans ${isTerminal ? "text-gray-400" : "text-gray-500 dark:text-gray-400"}`}>
              {hintMessage}
            </p>
          </div>
        )}
      </div>

      {/* Note area (always visible) */}
      {note && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 font-sans">
          {note}
        </div>
      )}
    </div>
  );
}
