import { InlineCode, MediaFrame, ImageFrame, SlideViewer, ActionSim } from "../../components/docs";
import type { SubSlide } from "../../components/docs";

const slides: SubSlide[] = [
  // Intro
  {
    title: "フォークとクローンを始めよう",
    icon: "▶️",
    slide: <ImageFrame src="/tutorial/eye-fork.gif" alt="" />,
    narration: <p>これからプロジェクトのコピーとデータの取得を行います。</p>,
  },
  // 2.1 fork
  {
    title: "fork — プロジェクトをコピー",
    icon: "🍴",
    slide: <MediaFrame src="/tutorial/fork.png" alt="フォーク画面" />,
    narration: (
      <>
        <p>GitHub の画面からGit講座プロジェクトをフォークします。</p>
        <p className="text-gray-500 dark:text-gray-400">
          この操作は<strong>プロジェクト参加時に一度だけ</strong>で OK です。
        </p>
      </>
    ),
    action: (
      <ActionSim
        type="browser"
        command="https://github.com/rubydogjp/honeycomb/fork"
        output="フォーク画面が表示されました。Owner が自分のアカウントか確認！"
      />
    ),
  },
  // 2.2 clone
  {
    title: "clone — データを持ってくる",
    icon: "📥",
    slide: (
      <p className="text-sm text-gray-300">
        フォーク完了後、自分のパソコンまでデータをコピーします。<br />
        この操作も<strong>一度だけ</strong>で OK です。
      </p>
    ),
    narration: (
      <p>
        <InlineCode>&lt;アクセストークン&gt;</InlineCode> と <InlineCode>&lt;ユーザーID&gt;</InlineCode> を自分のものに置き換えて実行してください。
      </p>
    ),
    action: (
      <ActionSim
        type="terminal"
        command="$ git clone https://<アクセストークン>@github.com/<ユーザーID>/honeycomb.git"
        output={`Cloning into 'honeycomb'...\nremote: Enumerating objects: 128, done.\nResolving deltas: 100% (42/42), done.`}
        note={<>例: <InlineCode>git clone https://ghp_Xxxx...@github.com/rbdog/honeycomb.git</InlineCode></>}
      />
    ),
  },
  // 2.3 upstream
  {
    title: "upstream — 本体との接続設定",
    icon: "🔗",
    slide: (
      <p className="text-sm text-gray-300">
        Git講座プロジェクト本体の URL を <InlineCode>upstream</InlineCode> として Git に登録しておきます。
      </p>
    ),
    narration: (
      <>
        <p>この設定は、あとで本体の最新データを取り込むために必要です。</p>
        <p className="text-emerald-700 dark:text-emerald-300 font-bold mt-3">これで活動の準備ができました。</p>
      </>
    ),
    action: (
      <ActionSim
        type="terminal"
        command={`$ cd honeycomb\n$ git remote add upstream https://github.com/rubydogjp/honeycomb.git`}
        output="(設定完了 — 出力なし)"
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

export default function ForkStep() {
  return (
    <SlideViewer
      slides={slides}
    />
  );
}
