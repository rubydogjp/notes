import { OsTabs, InlineCode, MediaFrame, ImageFrame, SlideViewer, ActionSim } from "../../components/docs";
import type { SubSlide } from "../../components/docs";

const slides: SubSlide[] = [
  // Intro
  {
    title: "準備を始めよう",
    icon: "▶️",
    slide: <ImageFrame src="/tutorial/git-github.png" alt="" />,
    narration: <p>これから Git と GitHub の準備を行います。</p>,
  },
  // 1.1 Git Install
  {
    title: "Git のインストール",
    icon: "💻",
    slide: (
      <OsTabs
        mac={
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              Macでは最初からGitが用意されているので<strong className="text-emerald-400">準備は不要</strong>です。
            </p>
            <p>ただし、まれに他のソフトの影響でエラーになることがあります。</p>
            <div className="bg-red-950 rounded-xl p-3 text-red-300 text-xs font-mono">
              xcrun: error: invalid active developer
            </div>
            <p>このエラーが出たときは「やってみよう」のコマンドで解決してください。</p>
          </div>
        }
        windows={
          <div className="space-y-3 text-sm text-gray-300">
            <p>事前にインストールをお願いします。</p>
            <MediaFrame src="/tutorial/git-install-win.png" alt="Windows版Gitインストール" />
          </div>
        }
      />
    ),
    narration: (
      <p>
        Git はバージョン管理ツールです。OS によってインストール方法が異なります。
      </p>
    ),
    action: (
      <OsTabs
        mac={
          <ActionSim
            type="terminal"
            command="$ xcode-select --install"
            output="xcode-select: note: install requested for command line developer tools"
          />
        }
        windows={
          <ActionSim
            type="browser"
            command="https://gitforwindows.org/"
            output="Git for Windows のダウンロードページが開きました"
          />
        }
      />
    ),
  },
  // 1.2 Verify
  {
    title: "Git が使えるか確認",
    icon: "✅",
    slide: (
      <div className="bg-gray-800/50 rounded-xl p-4 text-sm space-y-2">
        <p className="text-gray-400">
          💡 <InlineCode>$</InlineCode> は「コマンドの先頭」を表す記号です。入力する必要はありません。
        </p>
        <p className="text-gray-300">
          <InlineCode>2.39.2</InlineCode> のようにバージョンが表示されれば OK
        </p>
        <p className="text-red-400">
          <InlineCode>1.7.10</InlineCode> 以下の場合は新しい Git をインストールしてください
        </p>
      </div>
    ),
    narration: (
      <OsTabs
        mac={<p><strong>ターミナル</strong> を開いて以下を入力してください。</p>}
        windows={<p><strong>Powershell</strong> を開いて以下を入力してください。</p>}
      />
    ),
    action: (
      <ActionSim
        type="terminal"
        command="$ git --version"
        output="git version 2.39.2"
      />
    ),
  },
  // 1.3 Initial config
  {
    title: "Git の初回設定",
    icon: "⚙️",
    slide: (
      <p className="text-sm text-gray-300">
        名前・メールアドレス・改行コード設定をまとめて行います。
      </p>
    ),
    narration: (
      <p>
        この設定は一度行えば OK です。Git を使い始める前に必ず済ませておきましょう。
      </p>
    ),
    action: (
      <ActionSim
        type="terminal"
        command={`$ git config --global user.name "あなたの名前"
$ git config --global user.email "your@email.com"
$ git config --global core.autocrlf false`}
        output="(設定完了 — 出力なし)"
        note={<>例: <InlineCode>git config --global user.name "ルビードッグ"</InlineCode></>}
      />
    ),
  },
  // 1.4 GitHub Account
  {
    title: "GitHub アカウント",
    icon: "🐙",
    slide: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-700 bg-gray-900 p-5 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-100 mb-1">Git</h3>
          <p className="text-sm text-gray-400">バージョン管理ツール</p>
        </div>
        <div className="rounded-2xl border border-gray-700 bg-gray-900 p-5 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-100 mb-1">GitHub</h3>
          <p className="text-sm text-gray-400">コード共有サービス</p>
        </div>
      </div>
    ),
    narration: (
      <p>
        まだ使ったことがない方は以下から <strong>登録(サインアップ)</strong> をお願いします。
      </p>
    ),
    action: (
      <ActionSim
        type="browser"
        command="https://github.com/signup"
        output="GitHub のサインアップページが表示されました"
      />
    ),
  },
  // 1.5 User ID
  {
    title: "ユーザー ID をメモ",
    icon: "📝",
    slide: <MediaFrame src="/tutorial/github_id.png" alt="GitHubユーザーID" />,
    narration: (
      <p>GitHub のプロフィール画面からユーザー ID を確認できます。</p>
    ),
    action: (
      <ActionSim
        type="browser"
        command="https://github.com/<あなたのユーザー名>"
        output="プロフィールページにユーザー ID が表示されています"
        note={<>例: <InlineCode>rbdog</InlineCode> — この ID をメモしておいてください</>}
      />
    ),
  },
  // 1.6 Access Token
  {
    title: "アクセストークンを作成",
    icon: "🔑",
    slide: (
      <div className="space-y-4">
        <p className="text-sm text-gray-300">
          アクセストークンはこれからの作業で使う<strong>秘密のパスワード</strong>のようなものです。
        </p>
        <MediaFrame src="/tutorial/access-token.gif" alt="アクセストークンの作成方法" />
        <MediaFrame src="/tutorial/access-token-digest.png" alt="アクセストークンの設定画面" />
      </div>
    ),
    narration: (
      <>
        <p className="font-semibold">作成時の設定</p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li>種類: <InlineCode>Tokens (classic)</InlineCode> を選択</li>
          <li>有効期限 (Expiration): <InlineCode>30 days</InlineCode> など</li>
          <li>権限 (Scopes): <InlineCode>repo</InlineCode> にチェック</li>
        </ul>
      </>
    ),
    action: (
      <ActionSim
        type="browser"
        command="https://github.com/settings/tokens"
        output="トークン作成ページが表示されました"
        note="作ったアクセストークンは必ずメモしてください。一度画面を離れると確認できません。"
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

export default function SetupStep() {
  return (
    <SlideViewer
      slides={slides}
    />
  );
}
