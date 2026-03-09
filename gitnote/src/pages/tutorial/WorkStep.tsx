import { OsTabs, MediaFrame, ImageFrame, SlideViewer, ActionSim } from "../../components/docs";
import type { SubSlide } from "../../components/docs";

const slides: SubSlide[] = [
  // Intro
  {
    title: "本作業を始めよう",
    icon: "▶️",
    slide: <ImageFrame src="/tutorial/app.png" alt="" />,
    narration: <p>これから実際にファイルを編集します。</p>,
  },
  // 5.1 Open file
  {
    title: "ファイルを開く",
    icon: "📂",
    slide: <MediaFrame src="/tutorial/folder.gif" alt="フォルダを開く" />,
    narration: (
      <p>
        パソコンの中に作られた以下のファイルを開きます。
      </p>
    ),
    action: (
      <OsTabs
        mac={
          <ActionSim
            type="terminal"
            command="$ open ."
            output="Finder でフォルダが開きました"
            note="honeycomb > data > cells.json を探してください"
          />
        }
        windows={
          <ActionSim
            type="terminal"
            title="Powershell"
            command="$ start ."
            output="エクスプローラーでフォルダが開きました"
            note="honeycomb > data > cells.json を探してください"
          />
        }
      />
    ),
  },
  // 5.2 Edit file
  {
    title: "データを編集する",
    icon: "✏️",
    slide: <MediaFrame src="/tutorial/cells-json.png" alt="cells.jsonの編集" />,
    narration: (
      <p>データの中から<strong>まだ誰も使っていない null の項目</strong>を選んで編集してください。</p>
    ),
    action: (
      <ActionSim
        type="terminal"
        title="Editor — cells.json"
        command={`{
  "address": "0x01",
  "github_id": "rbdog",
  "color": "#C70067",
  "text": "ルビードッグ"
}`}
        output="ファイルを保存しました (Ctrl+S / Cmd+S)"
        note="カンマ(,)の位置に注意！ 画像を参考にしてください"
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

export default function WorkStep() {
  return (
    <SlideViewer
      slides={slides}
    />
  );
}
