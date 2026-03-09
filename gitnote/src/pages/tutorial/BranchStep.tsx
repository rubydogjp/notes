import { InlineCode, ImageFrame, SlideViewer, ActionSim } from "../../components/docs";
import type { SubSlide } from "../../components/docs";

const slides: SubSlide[] = [
  // Intro
  {
    title: "ブランチを始めよう",
    icon: "▶️",
    slide: <ImageFrame src="/tutorial/eye-branch.gif" alt="" />,
    narration: <p>これから自分の作業用ブランチを作成します。</p>,
  },
  // 4.1 What is a branch?
  {
    title: "ブランチとは?",
    icon: "🌿",
    slide: (
      <div className="text-sm text-gray-300 leading-relaxed space-y-3">
        <p>
          Git では複数の作業を同時に進めるために、<strong>枝分かれ</strong>の仕組みがあります。
          自分の作業を <InlineCode>main</InlineCode> ブランチから分岐させることで、他の人の作業に影響を与えずに開発できます。
        </p>
        <p>
          作業が終わったら、あとで <InlineCode>main</InlineCode> に合流させます（プルリクエスト）。
        </p>
      </div>
    ),
    narration: (
      <p>
        ブランチは「枝」という意味です。メインの流れから自分の作業を分岐させて、安全に開発を進められます。
      </p>
    ),
    action: (
      <ActionSim
        type="terminal"
        command="$ git branch"
        output="* main"
        note="現在のブランチを確認するコマンドです"
      />
    ),
  },
  // 4.2 Create branch
  {
    title: "ブランチを作成する",
    icon: "🔀",
    slide: (
      <div className="text-sm text-gray-300 space-y-3">
        <p>
          issue がアサインされたら、いよいよ作業開始です。
          まずは自分の作業専用の <strong>branch(ブランチ)</strong> を作りましょう。
        </p>
        <p className="font-semibold">ブランチ名のルール:</p>
        <p><InlineCode>作業の種類/短い説明_issue番号</InlineCode></p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li>新しい機能: <InlineCode>feat/...</InlineCode></li>
          <li>バグ修正: <InlineCode>fix/...</InlineCode></li>
        </ul>
      </div>
    ),
    narration: (
      <p>
        ブランチ名には作業内容と issue 番号を含めます。チームの誰が見てもどの作業かわかるようにしましょう。
      </p>
    ),
    action: (
      <ActionSim
        type="terminal"
        command="$ git checkout -b feat/new_cell_<ユーザーID>_<issue番号>"
        output="Switched to a new branch 'feat/new_cell_rbdog_2'"
        note={<>例: <InlineCode>git checkout -b feat/new_cell_rbdog_2</InlineCode></>}
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

export default function BranchStep() {
  return (
    <SlideViewer
      slides={slides}
    />
  );
}
