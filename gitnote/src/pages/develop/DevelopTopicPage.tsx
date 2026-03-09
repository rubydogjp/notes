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
    slug: "issue",
    title: "issue",
    wip: true,
    content: (
      <>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          プロジェクトに対して何かを行動を起したいときはまず <InlineCode>issue</InlineCode> を発行しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-6">
          <li>バグの報告</li>
          <li>新しい機能のリクエスト</li>
          <li>疑問点</li>
          <li>今後の方針</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          など、さまざまな種類の issue が作られます
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">タイトル</h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-3">
          <li><InlineCode>[Bug] button is not working</InlineCode> ボタンが反応しません</li>
          <li><InlineCode>[FR] customize theme color</InlineCode> 色をカスタマイズする新機能</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">のようなタイトルを決めます。</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-6">
          <li>バグの報告: <InlineCode>[Bug]</InlineCode></li>
          <li>新しい機能のリクエスト: <InlineCode>[FR]</InlineCode></li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">のように種類名を先頭につけます。</p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">詳細</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          以下のようなフォーマットがよく使用されます。
        </p>
        <CodeBlock>{`[Bug]
**Describe**
  (バグの説明)
**To Reproduce**
  (再現手順)
**Expected behavior**
  (想定される挙動)
**Screenshots**
  (スクリーンショット)
**Device**
  (端末名, OS, バージョン, 使用ブラウザ)
**App Version**
  (アプリバージョン)
**Additional context**
  (その他の経緯)`}</CodeBlock>
        <CodeBlock>{`[FR]
**Related Problem**
  (現状の問題)
**Solution**
  (解決案)
**Alternatives**
  (その他の解決案)
**Additional context**
  (その他の経緯)`}</CodeBlock>
      </>
    ),
  },
];

export default function DevelopTopicPage({ slug }: { slug: string }) {
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) return null;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/develop" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">共同開発</Link>
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

      <PageNav basePath="/develop" prev={{ slug: "index", title: "目次" }} next={null} />
    </>
  );
}
