import { useEffect, useState, useCallback } from "react";

interface Cell {
  address: number;
  github_id: string | null;
  color: string;
  text: string | null;
}

const COLUMNS = 7;
const DATA_URL =
  "https://raw.githubusercontent.com/rubydogjp/honeycomb/main/data/cells.json";

// ── Hex geometry ──
// Flat-top hexagon, full tessellation (no gap).
// Outer hex (for stroke/wax border):
const HEX_W = 100;
const HEX_H = HEX_W * (Math.sqrt(3) / 2); // ~86.6
const COL_STEP = HEX_W * 0.75;
const R = HEX_W / 2; // outer radius = 50

// Inner hex (the "cell" inside the wax border):
const STROKE_W = 3;
const R_INNER = R - STROKE_W; // 47 — inset by full stroke so shadow doesn't touch border

// Colors
const EMPTY_FILL = "#e68a00";
const STROKE_COLOR = "#fef3c7";
const FONT_SIZE = 9;
const FONT_SIZE_EMPTY = 8;
const LINE_H = 10;
const SQRT3 = Math.sqrt(3);

// ── Hex point generators ──
function makeHexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(" ");
}

// ── Dynamic text wrapping based on hex geometry ──
// For a flat-top hex, at vertical offset dy from center the horizontal width is:
//   w(dy) = 2 * (r - |dy| / √3)   for |dy| ≤ r * √3 / 2
// We estimate char width as fontSize * 0.85 (mixed CJK/Latin average).
function charsAtOffset(dy: number, r: number, fs: number): number {
  const pad = 4; // horizontal padding each side
  const w = 2 * (r - Math.abs(dy) / SQRT3) - pad * 2;
  const charW = fs * 0.85;
  return Math.max(0, Math.floor(w / charW));
}

function splitLines(text: string, r: number, fs: number): string[] {
  const c0 = charsAtOffset(0, r, fs); // center line capacity
  if (text.length <= c0) return [text];

  const cTop = charsAtOffset(-LINE_H, r, fs);
  if (text.length <= cTop + c0) {
    return [text.substring(0, cTop), text.substring(cTop)];
  }

  const cBot = charsAtOffset(LINE_H, r, fs);
  const l1 = text.substring(0, cTop);
  const l2 = text.substring(cTop, cTop + c0);
  const rest = text.substring(cTop + c0);
  const l3 = rest.length > cBot ? rest.substring(0, cBot - 1) + "\u2026" : rest;
  return [l1, l2, l3].filter((l) => l.length > 0);
}

function getContrastColor(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

// ── Inset shadow filter (applied to inner hex only, not the border) ──
// Light from upper-left → shadow on lower-right inner edge.
const INSET_FILTER = (
  <filter id="hex-inset" x="-50%" y="-50%" width="200%" height="200%">
    <feFlood floodColor="black" floodOpacity="0.6" result="color" />
    <feComposite in="color" in2="SourceGraphic" operator="out" result="inverse" />
    <feGaussianBlur in="inverse" stdDeviation="4" result="blur" />
    <feOffset in="blur" dx="2.5" dy="4" result="shifted" />
    <feComposite in="shifted" in2="SourceGraphic" operator="in" result="shadow" />
    <feMerge>
      <feMergeNode in="SourceGraphic" />
      <feMergeNode in="shadow" />
    </feMerge>
  </filter>
);

// ── Cell component ──
function HexCell({ cell, col, row }: { cell: Cell; col: number; row: number }) {
  const isEmpty = cell.github_id == null;
  const fillColor = isEmpty ? EMPTY_FILL : cell.color;
  const textColor = isEmpty ? "rgba(255,255,255,0.75)" : getContrastColor(fillColor);
  const fs = isEmpty ? FONT_SIZE_EMPTY : FONT_SIZE;

  const fullLabel = cell.text ?? `(${cell.address})`;
  const totalChars = charsAtOffset(-LINE_H, R_INNER, fs) + charsAtOffset(0, R_INNER, fs) + charsAtOffset(LINE_H, R_INNER, fs);
  const lines = splitLines(fullLabel, R_INNER, fs);
  const needsTooltip = fullLabel.length > totalChars;

  const cx = col * COL_STEP + R;
  const cy = row * HEX_H + HEX_H / 2 + (col % 2 === 1 ? HEX_H / 2 : 0);
  const startY = cy - ((lines.length - 1) * LINE_H) / 2;

  return (
    <g className={isEmpty ? "" : "transition-opacity hover:opacity-80"}>
      {/* Layer 1: Outer hex — stroke only (the wax border) */}
      <polygon
        points={makeHexPoints(cx, cy, R)}
        fill={STROKE_COLOR}
        stroke="none"
      />
      {/* Layer 2: Inner hex — fill with optional inset shadow, no stroke */}
      <polygon
        points={makeHexPoints(cx, cy, R_INNER)}
        fill={fillColor}
        stroke="none"
        filter={isEmpty ? "url(#hex-inset)" : undefined}
      />
      {/* Text */}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={textColor}
        fontSize={fs}
        fontWeight={isEmpty ? "500" : "600"}
        fontFamily="'Inter', 'Noto Sans JP', sans-serif"
      >
        {lines.map((line, i) => (
          <tspan key={i} x={cx} y={startY + i * LINE_H}>
            {line}
          </tspan>
        ))}
      </text>
      {needsTooltip && <title>{fullLabel}</title>}
    </g>
  );
}

// ── Page ──
export default function ViewerPage() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCells = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(DATA_URL, { signal: controller.signal });
      clearTimeout(timeout);
      const data: Cell[] = await res.json();
      setCells(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const totalRows = Math.ceil(cells.length / COLUMNS);
  const svgWidth = (COLUMNS - 1) * COL_STEP + HEX_W;
  const svgHeight = totalRows * HEX_H + HEX_H / 2;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-amber-100 via-amber-50 to-gitnote-50 dark:from-amber-950 dark:via-gray-950 dark:to-gray-950 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%2392400e' stroke-width='1'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%2392400e' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-full flex items-center justify-between px-6 lg:px-10 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gitnote-500" />
            <span className="text-amber-700/60 dark:text-amber-400/60 text-sm font-medium tracking-wide">
              HONEYCOMB
            </span>
          </div>
          <button
            onClick={fetchCells}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-200/60 hover:bg-amber-300/60 dark:bg-amber-800/30 dark:hover:bg-amber-700/40 text-amber-800 dark:text-amber-300 text-sm font-medium transition-colors"
            title="更新"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            更新
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 border-4 border-amber-200 dark:border-amber-800/40 border-t-gitnote-500 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-amber-800/60 dark:text-amber-300/60">
            <p>エラーが発生しました</p>
            <button
              onClick={fetchCells}
              className="px-4 py-2 rounded-xl bg-gitnote-500 text-amber-950 font-semibold text-sm hover:bg-gitnote-600 transition-colors"
            >
              再試行
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="w-full flex justify-center px-4 pb-10">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto"
              style={{ maxWidth: `${svgWidth * 1.2}px` }}
            >
              <defs>{INSET_FILTER}</defs>
              {cells.map((cell) => {
                const col = cell.address % COLUMNS;
                const row = Math.floor(cell.address / COLUMNS);
                return (
                  <HexCell key={cell.address} cell={cell} col={col} row={row} />
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
