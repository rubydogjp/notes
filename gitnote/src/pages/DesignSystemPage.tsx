import { Link } from "react-router-dom";

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

const scale = [
  { token: "gitnote-50",  hex: "#fefce8", role: "ページ背景" },
  { token: "gitnote-100", hex: "#fef9c3", role: "カード背景・薄いアクセント" },
  { token: "gitnote-200", hex: "#fef08a", role: "ハイライト・選択状態" },
  { token: "gitnote-300", hex: "#fde047", role: "バッジ・ラベル背景" },
  { token: "gitnote-400", hex: "#facc15", role: "ボタン (light)・アクティブ" },
  { token: "gitnote-500", hex: "#eab308", role: "メインカラー" },
  { token: "gitnote-600", hex: "#ca8a04", role: "ボタン hover・濃いアクセント" },
  { token: "gitnote-700", hex: "#a16207", role: "リンク・見出しテキスト" },
  { token: "gitnote-800", hex: "#854d0e", role: "リンク hover・最も濃いテキスト" },
];

const aliases = [
  { token: "link", resolved: "gitnote-700", hex: "#a16207" },
  { token: "link-hover", resolved: "gitnote-800", hex: "#854d0e" },
];

const fonts = [
  { token: "--font-sans", value: '"Inter", "Noto Sans JP", sans-serif' },
  { token: "--font-mono", value: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace' },
];

export default function DesignSystemPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div>
        <p className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-1">/dev/design</p>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          Design System
        </h1>
      </div>

      {/* Color scale */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          Gitnote Scale
        </h2>
        <div className="flex rounded-2xl overflow-hidden h-14 mb-4">
          {scale.map((c) => (
            <div key={c.token} className="flex-1 group relative" style={{ backgroundColor: c.hex }}>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold px-1 py-0.5 rounded bg-black/50 text-white pointer-events-none">
                {c.token.replace("gitnote-", "")}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {scale.map((c) => (
            <div key={c.token} className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 p-3">
              <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0" style={{ backgroundColor: c.hex }} />
              <div className="min-w-0">
                <p className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100">{c.token}</p>
                <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{c.hex}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aliases */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          Aliases
        </h2>
        <div className="space-y-2">
          {aliases.map((a) => (
            <div key={a.token} className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 p-3">
              <div className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0" style={{ backgroundColor: a.hex }} />
              <span className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100">{a.token}</span>
              <span className="text-[10px] text-gray-400">→</span>
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{a.resolved}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fonts */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          Fonts
        </h2>
        <div className="space-y-2">
          {fonts.map((f) => (
            <div key={f.token} className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
              <p className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100 mb-1">{f.token}</p>
              <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          Preview
        </h2>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <div className="flex flex-wrap gap-3">
            {["500", "400", "600", "700", "800"].map((n) => {
              const c = scale.find((s) => s.token === `gitnote-${n}`)!;
              const light = Number(n) <= 400;
              return (
                <button
                  key={n}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm ${light ? "" : "text-white"}`}
                  style={{ backgroundColor: c.hex, color: light ? "#854d0e" : undefined }}
                >
                  gitnote-{n}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            {["700", "800", "500"].map((n) => {
              const c = scale.find((s) => s.token === `gitnote-${n}`)!;
              return (
                <p key={n} className="text-xl font-extrabold" style={{ color: c.hex }}>
                  見出しテキスト (gitnote-{n})
                </p>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            {["200", "300", "600"].map((n) => {
              const c = scale.find((s) => s.token === `gitnote-${n}`)!;
              const light = Number(n) <= 300;
              return (
                <span
                  key={n}
                  className="text-[10px] font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: c.hex, color: light ? "#854d0e" : "#fff" }}
                >
                  gitnote-{n}
                </span>
              );
            })}
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: "#fef08a", backgroundColor: "#fefce8" }}>
            <p className="text-sm" style={{ color: "#854d0e" }}>
              gitnote-50 背景 + gitnote-200 ボーダー
            </p>
          </div>
        </div>
      </section>

      {/* Link to blueprint */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          Related
        </h2>
        <Link
          to="/dev/icon"
          className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <svg width={32} height={32} viewBox="0 0 32 32">
            <polygon points={hexPoints(16, 16, 14)} fill="#fef9c3" stroke="#eab308" strokeWidth="2" strokeLinejoin="round" />
            <polygon points={hexPoints(16, 16, 10)} fill="none" stroke="#eab308" strokeWidth="0.5" strokeLinejoin="round" opacity="0.4" />
          </svg>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Icon Blueprint</p>
            <p className="text-xs text-gray-400">Wax Cell + Git Branch — specs, dimensions, PPT macro</p>
          </div>
          <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
