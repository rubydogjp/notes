import { InlineCode, MediaFrame, ImageFrame, SlideViewer, ActionSim } from "../../components/docs";
import type { SubSlide } from "../../components/docs";

const slides: SubSlide[] = [
  // Intro
  {
    title: "イシューを始めよう",
    icon: "▶️",
    slide: <ImageFrame src="/tutorial/eye-issue.gif" alt="" />,
    narration: <p>これから作業内容を issue として登録します。</p>,
  },
  // 3.1 Create issue
  {
    title: "issue を発行する",
    icon: "📋",
    slide: <MediaFrame src="/tutorial/issue.gif" alt="issue作成画面" />,
    narration: (
      <p>
        今回は練習ですので、以下の内容で issue を作ります。
      </p>
    ),
    action: (
      <ActionSim
        type="browser"
        title="GitHub Issues"
        command="https://github.com/rubydogjp/honeycomb/issues"
        output="issue が正常に作成されました！"
        note={
          <>
            タイトル: <InlineCode>[FR] &lt;ユーザーID&gt; が参加</InlineCode><br />
            説明: <InlineCode>アプリ内に新しく &lt;ユーザーID&gt; のデータを追加します</InlineCode>
          </>
        }
      />
    ),
  },
  // 3.2 Issue number
  {
    title: "issue 番号をメモ",
    icon: "📌",
    slide: <MediaFrame src="/tutorial/issue-number.png" alt="issue番号" />,
    narration: (
      <p>発行された issue の画面に番号が表示されます。</p>
    ),
    action: (
      <ActionSim
        type="browser"
        title="GitHub Issues"
        command="https://github.com/rubydogjp/honeycomb/issues/2"
        output="issue #2 のページが表示されました"
        note={<>この番号をメモしてください。例: <InlineCode>2</InlineCode></>}
      />
    ),
  },
  // 3.3 Assign
  {
    title: "assign を待つ",
    icon: "⏳",
    slide: (
      <div className="space-y-3 text-sm text-gray-300">
        <p>
          issue に誰が対応するか決めることを <strong>assign(アサイン)</strong> と言います。
        </p>
        <p>
          当プロジェクトでは issue を作ったあなた自身がアサインされます。0~2 日ほどお待ちください。
        </p>
      </div>
    ),
    narration: (
      <>
        <p className="font-bold text-emerald-700 dark:text-emerald-300">
          今回は練習ですのでアサインを待たずに次へ進んで構いません！
        </p>
        <p>アサインされると GitHub の中に通知が届きます。</p>
      </>
    ),
    action: (
      <ActionSim
        type="browser"
        title="GitHub Notifications"
        command="https://github.com/notifications"
        output="通知ページが表示されました。assign の通知を確認しよう"
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

export default function IssueStep() {
  return (
    <SlideViewer
      slides={slides}
    />
  );
}
