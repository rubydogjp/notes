/**
 * Temporary page for reviewing PR announcement image designs.
 * Each "card" is a 1920×1080 canvas scaled to fit the viewport.
 */
import { useRef, useCallback } from "react";

/* ── Flat-top hex (same as ViewerPage honeycomb) ── */
function flatHexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

/* ── Honeycomb cloud — large tessellated background layer ── */
function HoneycombCloud({
  cx, cy, r, cols, rows: rowCount, opacity = 1,
}: {
  cx: number; cy: number; r: number; cols: number; rows: number; opacity?: number;
}) {
  const w = r * 2;
  const h = w * (Math.sqrt(3) / 2);
  const colStep = w * 0.75;
  const innerR = r - 2;
  const cells: { x: number; y: number }[] = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rowCount; row++) {
      const x = cx + (col - cols / 2) * colStep;
      const yOff = col % 2 === 0 ? 0 : h / 2;
      const y = cy + (row - rowCount / 2) * h + yOff;
      cells.push({ x, y });
    }
  }
  return (
    <g opacity={opacity}>
      {cells.map((c, i) => (
        <g key={i}>
          <polygon points={flatHexPts(c.x, c.y, r)} fill="#facc15" />
          <polygon points={flatHexPts(c.x, c.y, innerR)} fill="#eab308" />
        </g>
      ))}
    </g>
  );
}

/* ── New icon (pointy-top hex + golden ratio branch) ── */
function NewIcon({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  const s = size / 32;
  return (
    <g transform={`translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})`}>
      <polygon
        points="16,2 28.124,9 28.124,23 16,30 3.876,23 3.876,9"
        fill="#fef9c3" stroke="#eab308" strokeWidth="2" strokeLinejoin="round"
      />
      <polygon
        points="16,6 24.66,11 24.66,21 16,26 7.34,21 7.34,11"
        fill="none" stroke="#eab308" strokeWidth="0.5" strokeLinejoin="round" opacity="0.4"
      />
      <line x1="22.18" y1="16" x2="6.97" y2="7.22" stroke="#eab308" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12.91" y1="21.35" x2="12.91" y2="10.65" stroke="#eab308" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12.91" cy="10.65" r="2.5" fill="#eab308" />
      <circle cx="22.18" cy="16" r="2.5" fill="#eab308" />
      <circle cx="12.91" cy="21.35" r="2.5" fill="#eab308" />
    </g>
  );
}

/* ── Abstracted site preview: dark visual card + narration lines ── */
function SitePreview({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const cardW = w * 0.58;
  const narX = x + cardW + 24;
  const narW = w - cardW - 24;
  return (
    <g>
      <rect x={x} y={y} width={cardW} height={h} rx={12} fill="#0a0a0f" />
      <rect x={x} y={y} width={cardW} height={36} rx={12} fill="#111827" />
      <rect x={x} y={y + 24} width={cardW} height={12} fill="#111827" />
      <rect x={x + 16} y={y + 10} width={90} height={14} rx={4} fill="#374151" />
      <rect x={x + 12} y={y + 48} width={cardW - 24} height={h * 0.55} rx={6} fill="#1f2937" />
      <rect x={x} y={y + h - 42} width={cardW} height={42} fill="#111827" />
      <rect x={x} y={y + h - 42} width={cardW} height={1} fill="#374151" />
      <rect x={x + 52} y={y + h - 24} width={cardW - 130} height={4} rx={2} fill="#374151" />
      <rect x={x + 52} y={y + h - 24} width={(cardW - 130) * 0.65} height={4} rx={2} fill="#22c55e" />
      <rect x={x + cardW - 58} y={y + h - 42} width={58} height={42} fill="#3b82f6" />
      <polygon
        points={`${x + cardW - 38},${y + h - 30} ${x + cardW - 38},${y + h - 12} ${x + cardW - 22},${y + h - 21}`}
        fill="white"
      />
      <rect x={narX} y={y + 8} width={narW * 0.92} height={10} rx={3} fill="#d1d5db" />
      <rect x={narX} y={y + 28} width={narW * 0.7} height={10} rx={3} fill="#e5e7eb" />
      <rect x={narX} y={y + 48} width={narW * 0.82} height={10} rx={3} fill="#e5e7eb" />
    </g>
  );
}

/* ── Abstracted action panel (white window with blue button) ── */
function ActionPreview({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="white" stroke="#d1d5db" strokeWidth="1.5" />
      <rect x={x} y={y} width={w} height={28} rx={10} fill="#f3f4f6" />
      <rect x={x} y={y + 18} width={w} height={10} fill="#f3f4f6" />
      <circle cx={x + 16} cy={y + 14} r={4} fill="#f87171" />
      <circle cx={x + 30} cy={y + 14} r={4} fill="#fbbf24" />
      <circle cx={x + 44} cy={y + 14} r={4} fill="#4ade80" />
      <rect x={x + 14} y={y + 40} width={w * 0.65} height={10} rx={3} fill="#e5e7eb" />
      <rect x={x + 14} y={y + 62} width={64} height={24} rx={6} fill="#3b82f6" />
      <rect x={x + 24} y={y + 70} width={44} height={8} rx={3} fill="white" opacity="0.7" />
    </g>
  );
}

/* ── Transition mark (fast-forward icon: two filled triangles) ── */
function TransitionMark({ cx, cy, size = 56 }: { cx: number; cy: number; size?: number }) {
  const h = size * 0.4;
  const w = size * 0.45;
  const gap = size * 0.06;
  return (
    <g>
      <polygon
        points={`${cx - gap - w},${cy - h} ${cx - gap},${cy} ${cx - gap - w},${cy + h}`}
        fill="#a16207"
      />
      <polygon
        points={`${cx + gap},${cy - h} ${cx + gap + w},${cy} ${cx + gap},${cy + h}`}
        fill="#a16207"
      />
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════
   Final Design: C layout + A background + theme-yellow honeycomb
   ══════════════════════════════════════════════════════════════ */
function FinalDesign({ svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  const logoLeft = 960 - 260;
  return (
    <svg ref={svgRef} viewBox="0 0 1920 1080" className="w-full h-auto rounded-xl shadow-lg border border-amber-200">
      {/* A background: flat fill */}
      <rect width="1920" height="1080" fill="#fefce8" />
      {/* A honeycomb: same position/size as A */}
      <HoneycombCloud cx={260} cy={860} r={50} cols={9} rows={7} opacity={0.7}  />
      <HoneycombCloud cx={1660} cy={220} r={50} cols={9} rows={7} opacity={0.7}  />

      {/* ── Logo transition — C layout ── */}
      <image href="/tmp/gitnote-icon-old.png" x={logoLeft} y={220} width={220} height={93} />
      <TransitionMark cx={logoLeft + 270} cy={268} size={48} />
      <NewIcon cx={logoLeft + 430} cy={268} size={200} />

      {/* ── Preview — left card (SitePreview) ── */}
      <defs>
        <filter id="card-shadow" x="-4%" y="-4%" width="108%" height="112%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.1" />
        </filter>
      </defs>
      <rect x={285} y={450} width={880} height={440} rx={18} fill="white" filter="url(#card-shadow)" />
      <SitePreview x={305} y={470} w={840} h={400} />

      {/* ── Preview — right card (Actions + button) ── */}
      <rect x={1195} y={450} width={480} height={400} rx={18} fill="white" filter="url(#card-shadow)" />
      <ActionPreview x={1215} y={470} w={440} h={115} />
      <ActionPreview x={1215} y={610} w={440} h={115} />
      <rect x={1315} y={760} width={200} height={46} rx={12} fill="#3b82f6" />
      <text x="1415" y="789" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">
        次のステップへ →
      </text>

      {/* Color bar */}
      {["#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e"].map((c, i) => (
        <rect key={i} x={i * (1920 / 9)} y={1060} width={1920 / 9 + 1} height={20} fill={c} />
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   Page
   ══════════════════════════════════════════════════════════════ */
export default function TmpPage() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleDownload = useCallback(async () => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clone SVG and inline all <image> elements as data URLs
    const clone = svg.cloneNode(true) as SVGSVGElement;
    const images = clone.querySelectorAll("image");
    await Promise.all(
      Array.from(images).map(async (imgEl) => {
        const href = imgEl.getAttribute("href") || imgEl.getAttributeNS("http://www.w3.org/1999/xlink", "href");
        if (!href || href.startsWith("data:")) return;
        const resp = await fetch(href);
        const blob = await resp.blob();
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        imgEl.setAttribute("href", dataUrl);
      }),
    );

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(clone);
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, 1920, 1080);
      URL.revokeObjectURL(url);

      const a = document.createElement("a");
      a.download = "gitnote-renewal.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      <div>
        <p className="text-xs font-mono text-gray-400 mb-1">/tmp</p>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
          PR Image Designs — gitnote リニューアル
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          1920 × 1080
        </p>
      </div>

      <section>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
          Final — C配置 + A背景 + テーマ黄ハニカム
        </h2>
        <FinalDesign svgRef={svgRef} />
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-action-500 hover:bg-action-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
            </svg>
            PNG でダウンロード
          </button>
        </div>
      </section>
    </div>
  );
}
