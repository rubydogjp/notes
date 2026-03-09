import { Link } from "react-router-dom";
import { CodeBlock, InlineCode, UnderConstruction, PageNav } from "../../components/docs";

interface Topic {
  slug: string;
  title: string;
  wip: boolean;
  content: React.ReactNode;
}

const topics: Topic[] = [
  {
    slug: "git",
    title: "Git とは?",
    wip: true,
    content: (
      <>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          開発中のソフトのバージョンを管理できる無料のツールです。
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="text-link hover:text-link-hover underline">
            (もっと詳しく)
          </a>
        </p>
      </>
    ),
  },
  {
    slug: "github",
    title: "GitHub とは?",
    wip: true,
    content: (
      <>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
          Git とは別ものです。
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          開発中のソフトを置いておくことができる、オンラインのサービスです。
          たくさんの有名企業が公開拠点として利用しています。
        </p>
      </>
    ),
  },
  {
    slug: "fork",
    title: "fork とは?",
    wip: true,
    content: (
      <>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">3 つのリポジトリ</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li><InlineCode>upstream</InlineCode>: Rubydog が管理する中央リポジトリ</li>
          <li><InlineCode>origin</InlineCode>: 今作られたばかりの自分専用リポジトリ</li>
          <li><InlineCode>local</InlineCode>: 自分のパソコンの中のリポジトリ</li>
        </ul>
      </>
    ),
  },
  {
    slug: "branch",
    title: "branch とは?",
    wip: true,
    content: (
      <>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          Git ではそれぞれの開発を同時に進めるために作業の枝分かれを行います。
          まずは自分の作業のために、専用の枝である <InlineCode>ブランチ</InlineCode> を作りましょう。
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
          <li><InlineCode>作業の種類/短い説明_issue番号</InlineCode></li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
          のように名前を決めます。<strong>作業の種類</strong> は以下の通りです。
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
          <li>バグを修正する: <InlineCode>fix</InlineCode></li>
          <li>新しい機能を作る: <InlineCode>feat</InlineCode></li>
        </ul>
        <CodeBlock>{`# 新しいブランチを作る
$ git checkout -b feat/new_cell_<ユーザーID>_<issue番号>
# originへ反映
$ git push origin feat/new_cell_<ユーザーID>_<issue番号>`}</CodeBlock>
      </>
    ),
  },
  {
    slug: "commit",
    title: "commit とは?",
    wip: true,
    content: (
      <>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">コミットメッセージ</h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-3">
          <li><InlineCode>feat: new cell &lt;ユーザーID&gt; #&lt;issue番号&gt;</InlineCode></li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">のようなメッセージにします。</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
          <li>バグの修正: <InlineCode>fix</InlineCode></li>
          <li>機能の開発: <InlineCode>feat</InlineCode></li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">のように種類名を先頭につけます。</p>
        <CodeBlock>{`$ git add path/to/file.txt
$ git commit -m "feat: new cell <ユーザーID> #<issue番号>"`}</CodeBlock>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 mb-2">
          コミットが完了したら、リポジトリを最新にしておきましょう。
        </p>
        <CodeBlock>{"$ git pull --rebase upstream main"}</CodeBlock>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 mb-2">
          このとき稀に <InlineCode>conflict(競合)</InlineCode> が発生することがあります。
          もし競合が起こっても悪いことではないので安心してください。
          他の人と同時に作業をしていくと、同じところを編集してしまうケースがあるためです。
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
          競合が起こった時はもう一度ファイルを開いて、相手の変更が残るように直してあげてください。譲り合いの精神が大切です。
          ファイルを保存したら、
        </p>
        <CodeBlock>{`$ git add path/to/file.txt
$ git rebase --continue`}</CodeBlock>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2 mb-2">
          で解決します。自分が作った変更は消えてしまうので、もう一度前の手順 <InlineCode>5.作業</InlineCode> へ戻ってやり直してください。
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          ここまでできたら origin も最新にしておきます
        </p>
        <CodeBlock>{"$ git push origin feat/new_cell_<ユーザーID>_<issue番号>"}</CodeBlock>
      </>
    ),
  },
  {
    slug: "pull-req",
    title: "Pull Request とは?",
    wip: true,
    content: null,
  },
  {
    slug: "clone",
    title: "clone とは?",
    wip: true,
    content: null,
  },
];

const slugOrder = topics.map((t) => t.slug);

export default function GitTopicPage({ slug }: { slug: string }) {
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) return null;

  const idx = slugOrder.indexOf(slug);
  const prev = idx > 0 ? { slug: slugOrder[idx - 1], title: topics[idx - 1].title } : { slug: "index", title: "目次" };
  const next = idx < slugOrder.length - 1 ? { slug: slugOrder[idx + 1], title: topics[idx + 1].title } : null;

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/git" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">Git知識</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{topic.title}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
        {topic.title}
      </h1>

      {topic.wip && <UnderConstruction />}

      {topic.content && (
        <div className="mt-6">
          {topic.content}
        </div>
      )}

      <PageNav basePath="/git" prev={prev} next={next} />
    </>
  );
}
