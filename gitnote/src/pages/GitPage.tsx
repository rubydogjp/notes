import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { UnderConstruction } from "../components/docs";
import GitTopicPage from "./git/GitTopicPage";

interface TopicCard {
  slug: string;
  title: string;
  desc: string;
  wip: boolean;
}

const gitTopics: TopicCard[] = [
  { slug: "git", title: "Git", desc: "バージョン管理ツール", wip: true },
  { slug: "github", title: "GitHub", desc: "オンラインのコード共有サービス", wip: true },
  { slug: "fork", title: "fork", desc: "プロジェクトを自分のアカウントにコピー", wip: true },
  { slug: "branch", title: "branch", desc: "作業の枝分かれ", wip: true },
  { slug: "commit", title: "commit", desc: "変更を記録する", wip: true },
  { slug: "pull-req", title: "Pull Request", desc: "変更をプロジェクトに提案", wip: true },
  { slug: "clone", title: "clone", desc: "リポジトリをローカルにコピー", wip: true },
];

function GitIndex() {
  return (
    <>
      <div className="text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide mb-4">
          GIT KNOWLEDGE
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
          Git知識
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          ここには Git に関する知識がまとめられています
        </p>
      </div>

      <UnderConstruction />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {gitTopics.map((topic) => (
          <Link
            key={topic.slug}
            to={`/git/${topic.slug}`}
            className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-amber-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:shadow-amber-100/50 dark:hover:shadow-gray-900/50 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                {topic.title}
              </h3>
              {topic.wip && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-medium flex-shrink-0">
                  WIP
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{topic.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function GitPage() {
  const { slug } = useParams();
  const currentSlug = slug || "index";

  useEffect(() => { window.scrollTo(0, 0); }, [currentSlug]);

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {currentSlug === "index" ? <GitIndex /> : <GitTopicPage slug={currentSlug} />}
    </article>
  );
}
