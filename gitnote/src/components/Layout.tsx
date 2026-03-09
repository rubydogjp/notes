import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FaqSection from "../pages/tutorial/FaqSection";

const navItems = [
  { to: "/tutorial/intro", label: "チュートリアル", match: "/tutorial" },
  { to: "/git", label: "Git知識", match: "/git" },
  { to: "/develop", label: "共同開発", match: "/develop" },
  { to: "/honeycomb", label: "ハチの巣", match: "/honeycomb" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  const isTutorial = location.pathname.startsWith("/tutorial");

  return (
    <div className="min-h-screen flex flex-col bg-gitnote-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header — full bleed, no max-width constraint */}
      <header className="sticky top-0 z-50 border-b border-amber-200/60 dark:border-gray-800 bg-gitnote-50/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="flex items-center h-14 px-6 lg:px-10 gap-2">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img className="h-7 w-7" src="/general/gitnote-icon.svg" alt="" />
            <span className="text-lg font-extrabold tracking-tight text-amber-900 dark:text-amber-200">Git Note</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navItems.map((item) => {
              const active = location.pathname.startsWith(item.match);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                    ${active
                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3 ml-auto">
            {isTutorial && (
              <button
                onClick={() => setFaqOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-gray-800 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01" />
                </svg>
                Q&A
              </button>
            )}
            <a
              href="https://x.com/rubydogjp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
            >
              困ったらXで質問
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-auto p-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-amber-200/60 dark:border-gray-800 bg-gitnote-50 dark:bg-gray-950 px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname.startsWith(item.match);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${active
                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-gray-800"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            {isTutorial && (
              <button
                onClick={() => {
                  setFaqOpen(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                Q&A
              </button>
            )}
            <a
              href="https://x.com/rubydogjp"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
            >
              困ったらXで質問
            </a>
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer — dark background */}
      <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 dark:border-gray-800 mt-auto">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img className="h-9 w-9" src="/general/gitnote-icon.svg" alt="" />
                <span className="text-xl font-extrabold tracking-tight text-amber-200">Git Note</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                はじめての共同開発、失敗し放題。<br />
                ハチの巣をみんなで作ろう。
              </p>
            </div>

            {/* Shortcuts */}
            <div>
              <h4 className="text-gray-200 text-sm font-semibold mb-3">ショートカット</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-gray-400 hover:text-amber-300 transition-colors">ホーム画面</Link></li>
                <li><Link to="/tutorial/intro" className="text-sm text-gray-400 hover:text-amber-300 transition-colors">チュートリアル</Link></li>
                <li><Link to="/tutorial/setup" className="text-sm text-gray-400 hover:text-amber-300 transition-colors">手順1. 準備</Link></li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-gray-200 text-sm font-semibold mb-3">関連リンク</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://x.com/rubydogjp" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-amber-300 transition-colors">
                    X (@rubydogjp)
                  </a>
                </li>
                <li><Link to="/honeycomb" className="text-sm text-gray-400 hover:text-amber-300 transition-colors">ハチの巣</Link></li>
                <li>
                  <a href="https://github.com/rubydogjp/honeycomb" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-amber-300 transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
          &copy; 2023 Rubydog JP.
        </div>
      </footer>

      {/* Q&A Drawer */}
      <FaqSection open={faqOpen} onClose={() => setFaqOpen(false)} />
    </div>
  );
}
