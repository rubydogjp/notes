import { InlineCode, MediaFrame, ImageFrame, SlideViewer, ActionSim } from "../../components/docs";
import type { SubSlide } from "../../components/docs";

const slides: SubSlide[] = [
  // Intro
  {
    title: "プルリクエストを始めよう",
    icon: "▶️",
    slide: <ImageFrame src="/tutorial/eye-pull-req.gif" alt="" />,
    narration: <p>これから作業結果を本体に送ります。</p>,
  },
  // 7.1 Push
  {
    title: "GitHub へ送信 (Push)",
    icon: "🚀",
    slide: (
      <p className="text-sm text-gray-300">
        まず作業結果をあなたの GitHub リポジトリへ送信します。
      </p>
    ),
    narration: (
      <p>ローカルの変更をリモートリポジトリにアップロードします。<code className="text-xs bg-red-100 dark:bg-red-900/20 px-1.5 py-0.5 rounded">remote: permission to ...</code> のようなエラーが出た場合は、該当の issue 内のコメントにてエラーメッセージと一緒に教えてください。</p>
    ),
    action: (
      <ActionSim
        type="terminal"
        command="$ git push origin feat/new_cell_<ユーザーID>_<issue番号>"
        output={`Enumerating objects: 7, done.\nTo https://github.com/rbdog/honeycomb.git\n * [new branch]  feat/new_cell_rbdog_2 -> feat/new_cell_rbdog_2`}
        note={<>例: <InlineCode>git push origin feat/new_cell_rbdog_2</InlineCode></>}
      />
    ),
  },
  // 7.2 Pull Request
  {
    title: "Pull Request を作成する",
    icon: "📬",
    slide: <MediaFrame src="/tutorial/pull-req.gif" alt="プルリクエスト作成画面" />,
    narration: (
      <p className="font-medium">
        いよいよ最後の工程です！
      </p>
    ),
    action: (
      <ActionSim
        type="browser"
        title="GitHub Pull Requests"
        command="https://github.com/rubydogjp/honeycomb/pulls"
        output="Pull Request の作成ページが表示されました"
        note={<>タイトル: <InlineCode>[PR] feat: new cell &lt;ユーザーID&gt; #&lt;issue番号&gt;</InlineCode></>}
      />
    ),
  },
  // 7.3 Wait for approval
  {
    title: "承認を待つ",
    icon: "☕",
    slide: (
      <div className="text-center py-4">
        <span className="text-4xl mb-3 block">☕</span>
        <p className="text-gray-300 leading-relaxed mb-2">
          あとはコーヒーを飲みながらプルリクエストが承認されるのを待つだけです。
        </p>
      </div>
    ),
    narration: (
      <p className="text-gray-500 dark:text-gray-400">
        責任者がレビュー確認をしますので、0~2 日お待ちください。<br />
        何か依頼された場合は対応をお願いします。
      </p>
    ),
    action: (
      <ActionSim
        type="browser"
        title="GitHub Notifications"
        command="https://github.com/notifications"
        output="通知を確認 — 承認されるとメールでもお知らせが届きます"
      />
    ),
  },
  // Outro
  {
    title: "やってみよう",
    icon: "🎯",
    slide: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <span className="text-4xl mb-3">🎯</span>
        <p className="text-gray-300 font-bold">では、やってみよう！</p>
        <p className="text-gray-500 text-xs mt-2">
          上のスライドを参考に、ひとつずつ進めてください。
        </p>
      </div>
    ),
    narration: <p>下のアクションをひとつずつ実行してみましょう。</p>,
  },
];

export default function PullReqStep() {
  return (
    <SlideViewer
      slides={slides}
    />
  );
}
