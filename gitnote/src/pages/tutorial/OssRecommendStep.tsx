import { Callout, LinkButton, PageNav } from "../../components/docs";

const projects = [
  {
    name: "AppFlowy",
    url: "https://github.com/AppFlowy-IO/AppFlowy",
    tags: ["Flutter", "Rust"],
    desc: "仕事に必要なツールを全て集めたワークスペース「Notion」のオープンソース版。コストをかけずに導入できるOSSの中では最も注目されているプロダクトの一つ。",
  },
  {
    name: "Bevy",
    url: "https://github.com/bevyengine/bevy",
    tags: ["Rust", "ゲームエンジン"],
    desc: "Rust言語で作られたゲームエンジン。専用エディタはまだないが、Rust自体の将来性から今後の発展に期待。",
  },
  {
    name: "Mojo",
    url: "https://github.com/modularml/mojo",
    tags: ["Python", "AI"],
    desc: "AI開発のために2023年に公開された新しいプログラミング言語。Pythonベースなので、Pythonの経験があれば始めやすい。",
  },
];

export default function OssRecommendStep() {
  return (
    <>
      {/* Hero */}
      <div className="text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide mb-4">
          BONUS
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
          OSSプロジェクトのご紹介
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          興味が湧いたら issue を見て、手伝えそうな話題があればコメントしてみましょう
        </p>
      </div>

      {/* Project cards */}
      <div className="space-y-4 my-8">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group rounded-2xl border border-amber-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:shadow-md hover:shadow-amber-100/50 dark:hover:shadow-gray-900/50 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                {p.name}
              </h2>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>
            <div className="flex gap-1.5 mb-3">
              {p.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {p.desc}
            </p>
          </a>
        ))}
      </div>

      <Callout variant="info" title="編集中">
        今後のアップデートで追記していきます。
      </Callout>

      {/* More links */}
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-amber-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">GitHub トピック</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            プログラミング言語や技術キーワードごとにプロジェクトを検索できます。
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            ※ 公開されているからと言ってOSSとは限りません。ライセンスをよく確認してください。
          </p>
          <LinkButton href="https://github.com/topics">GitHub トピック</LinkButton>
        </div>
        <div className="rounded-2xl border border-amber-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">GitHub トレンド</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            今熱いプロジェクトが毎日更新されています。IT系ニュースより最新の情報を知りたいならここ！
          </p>
          <LinkButton href="https://github.com/trending">GitHub トレンド</LinkButton>
        </div>
      </div>

      <PageNav
        basePath="/tutorial"
        prev={{ slug: "complete", title: "完了" }}
        next={null}
      />
    </>
  );
}
