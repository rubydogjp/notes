import { Callout, ImageFrame, SlideViewer, ActionSim } from "../../components/docs";
import type { SubSlide } from "../../components/docs";

const slides: SubSlide[] = [
  // Intro
  {
    title: "コミットを始めよう",
    icon: "▶️",
    slide: <ImageFrame src="/tutorial/eye-commit.gif" alt="" />,
    narration: <p>これから変更を記録して最新状態に追従します。</p>,
  },
  // 6.1 Commit
  {
    title: "変更をコミットする",
    icon: "💾",
    slide: (
      <p className="text-sm text-gray-300">
        ファイルを保存したあと、以下のコマンドで変更を記録します。
      </p>
    ),
    narration: (
      <p>
        <code className="text-xs bg-amber-100 dark:bg-gray-800 px-1 rounded">git add</code> でファイルを選び、<code className="text-xs bg-amber-100 dark:bg-gray-800 px-1 rounded">git commit</code> でメッセージと一緒に記録します。
      </p>
    ),
    action: (
      <ActionSim
        type="terminal"
        command={`$ git add data/cells.json\n$ git commit -m "feat: new cell <ユーザーID> #<issue番号>"`}
        output={`[feat/new_cell_rbdog_2 a1b2c3d] feat: new cell rbdog #2\n 1 file changed, 4 insertions(+)`}
        note='例: git commit -m "feat: new cell rbdog #2"'
      />
    ),
  },
  // 6.2 Pull
  {
    title: "最新データを取り込む",
    icon: "🔄",
    slide: (
      <p className="text-sm text-gray-300">
        コミットが完了したら、Git講座プロジェクト本体から最新のデータを取り込みます。
      </p>
    ),
    narration: (
      <>
        <p>他のメンバーが先に変更している可能性があるので、最新状態に追従します。</p>
        <p className="font-bold text-emerald-700 dark:text-emerald-300 mt-2">ゴールはあと少し！</p>
      </>
    ),
    action: (
      <ActionSim
        type="terminal"
        command="$ git pull --rebase upstream main"
        output={`From https://github.com/rubydogjp/honeycomb\nCurrent branch feat/new_cell_rbdog_2 is up to date.`}
      />
    ),
  },
  // 6.3 Conflict
  {
    title: "コンフリクト対応",
    icon: "⚠️",
    slide: (
      <Callout variant="danger" title="Conflict(競合) が起きたとき">
        <p>他の作業者が先に同じデータを編集していた場合、<strong>conflict(競合)</strong> が発生することがあります。競合を起こしてしまうことは悪いことではないので安心してください。</p>
      </Callout>
    ),
    narration: (
      <>
        <p className="font-semibold">解決手順:</p>
        <ol className="list-decimal list-inside space-y-1 ml-1">
          <li>もう一度 <code className="text-xs bg-red-100 dark:bg-red-900/20 px-1 rounded">cells.json</code> を開く</li>
          <li>相手の変更と自分の変更が<strong>両方残る</strong>ように修正する</li>
          <li>ファイルを保存する</li>
        </ol>
        <p>うまく解決できれば両方の変更が反映されます。自分の変更が残らなかった場合は、<strong>手順5. 本作業</strong> に戻ってやり直してください。</p>
      </>
    ),
    action: (
      <ActionSim
        type="terminal"
        command={`$ git add data/cells.json\n$ git rebase --continue`}
        output="Successfully rebased and updated refs/heads/feat/new_cell_rbdog_2."
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

export default function CommitStep() {
  return (
    <SlideViewer
      slides={slides}
    />
  );
}
