/**
 * Git Note Icon Blueprint
 * Engineering blueprint style: dark blue bg, white/cyan dimensions
 */

const SQRT3 = Math.sqrt(3);
const PHI = (1 + Math.sqrt(5)) / 2;

// Pointy-top hexagon (vertex at top)
function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(" ");
}

function hexVertex(cx: number, cy: number, r: number, i: number) {
  const a = (Math.PI / 3) * i - Math.PI / 2;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

// Git branch geometry: equilateral triangle sized by golden ratio
function computeBranch(cx: number, cy: number, innerR: number, outerR: number) {
  const R = innerR / PHI; // circumradius = innerHexR / φ
  const A  = { x: cx - R * 0.5,  y: cy - R * SQRT3 / 2 }; // apex (upper-left)
  const BR = { x: cx + R,        y: cy };                    // rightmost
  const BL = { x: cx - R * 0.5,  y: cy + R * SQRT3 / 2 };  // bottommost
  const t = outerR / 2 - R / SQRT3;
  const ext = { x: A.x - SQRT3 * t, y: A.y - t };
  return { A, BR, BL, ext, R };
}

// Generate icon SVG string (for download)
function generateIconSvg(): string {
  const br = computeBranch(16, 16, 10, 14);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">`,
    `  <polygon points="${hexPoints(16, 16, 14)}" fill="#fef9c3" stroke="#eab308" stroke-width="2" stroke-linejoin="round"/>`,
    `  <polygon points="${hexPoints(16, 16, 10)}" fill="none" stroke="#eab308" stroke-width="0.5" stroke-linejoin="round" opacity="0.4"/>`,
    `  <line x1="${br.BR.x}" y1="${br.BR.y}" x2="${br.ext.x}" y2="${br.ext.y}" stroke="#eab308" stroke-width="1.2" stroke-linecap="round"/>`,
    `  <line x1="${br.BL.x}" y1="${br.BL.y}" x2="${br.A.x}" y2="${br.A.y}" stroke="#eab308" stroke-width="1.2" stroke-linecap="round"/>`,
    `  <circle cx="${br.A.x}" cy="${br.A.y}" r="2.5" fill="#eab308"/>`,
    `  <circle cx="${br.BR.x}" cy="${br.BR.y}" r="2.5" fill="#eab308"/>`,
    `  <circle cx="${br.BL.x}" cy="${br.BL.y}" r="2.5" fill="#eab308"/>`,
    `</svg>`,
  ].join("\n");
}

function downloadSvg() {
  const svg = generateIconSvg();
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "gitnote-icon.svg";
  a.click();
  URL.revokeObjectURL(url);
}

const VBA_CODE = `Sub GitNoteIcon()
    Dim sld As Slide

    ' ── Parameters ──
    Dim cx As Single: cx = 300   ' Center X (pt)
    Dim cy As Single: cy = 200   ' Center Y (pt)
    Dim r As Single: r = 100     ' Outer circumradius (pt)

    ' Proportions (from SVG spec: viewBox 32x32)
    Dim innerR As Single: innerR = r * 10 / 14
    Dim outerStroke As Single: outerStroke = r * 2 / 14
    Dim innerStroke As Single: innerStroke = r * 0.5 / 14

    ' Colors
    Dim clrFill As Long: clrFill = RGB(254, 249, 195)  ' gitnote-100 #fef9c3
    Dim clrLine As Long: clrLine = RGB(234, 179, 8)     ' gitnote-500 #eab308

    Dim pi As Single: pi = 3.14159265

    Set sld = ActiveWindow.View.Slide

    ' ── Layer 1: Outer hex (pointy-top, freeform polygon) ──
    ' BuildFreeform draws exact vertices — no Rotation needed.
    Dim fb As FreeformBuilder
    Dim a As Single
    Dim i As Integer

    a = -pi / 2
    Set fb = sld.Shapes.BuildFreeform(msoEditingCorner, _
        cx + r * Cos(a), cy + r * Sin(a))
    For i = 1 To 5
        a = pi / 3 * i - pi / 2
        fb.AddNodes msoSegmentLine, msoEditingCorner, _
            cx + r * Cos(a), cy + r * Sin(a)
    Next i

    Dim shpOuter As Shape
    Set shpOuter = fb.ConvertToShape
    With shpOuter
        .Fill.ForeColor.RGB = clrFill
        .Line.ForeColor.RGB = clrLine
        .Line.Weight = outerStroke
    End With

    ' ── Layer 2: Inner hex (stroke only, 40% opacity) ──
    a = -pi / 2
    Set fb = sld.Shapes.BuildFreeform(msoEditingCorner, _
        cx + innerR * Cos(a), cy + innerR * Sin(a))
    For i = 1 To 5
        a = pi / 3 * i - pi / 2
        fb.AddNodes msoSegmentLine, msoEditingCorner, _
            cx + innerR * Cos(a), cy + innerR * Sin(a)
    Next i

    Dim shpInner As Shape
    Set shpInner = fb.ConvertToShape
    With shpInner
        .Fill.Visible = msoFalse
        .Line.ForeColor.RGB = clrLine
        .Line.Weight = innerStroke
        .Line.Transparency = 0.6  ' 40% opacity = 60% transparency
    End With

    ' ── Layer 3: Git branch (golden ratio triangle) ──
    Dim phi As Single: phi = (1 + Sqr(5)) / 2
    Dim triR As Single: triR = innerR / phi

    ' Triangle vertices (apex upper-left, base parallel to lower-right hex edge)
    Dim ax As Single: ax = cx - triR * 0.5
    Dim ay As Single: ay = cy - triR * Sqr(3) / 2
    Dim brx As Single: brx = cx + triR
    Dim bry As Single: bry = cy
    Dim blx As Single: blx = ax
    Dim bly As Single: bly = cy + triR * Sqr(3) / 2

    ' Extended line: BR → A → outer hex edge intersection
    Dim tExt As Single: tExt = r / 2 - triR / Sqr(3)
    Dim extX As Single: extX = ax - Sqr(3) * tExt
    Dim extY As Single: extY = ay - tExt

    Dim brStroke As Single: brStroke = r * 1.2 / 14
    Dim nodeD As Single: nodeD = r * 5 / 14  ' node diameter

    Dim shpL1 As Shape, shpL2 As Shape
    Set shpL1 = sld.Shapes.AddLine(brx, bry, extX, extY)
    shpL1.Line.ForeColor.RGB = clrLine
    shpL1.Line.Weight = brStroke

    Set shpL2 = sld.Shapes.AddLine(blx, bly, ax, ay)
    shpL2.Line.ForeColor.RGB = clrLine
    shpL2.Line.Weight = brStroke

    Dim shpN1 As Shape, shpN2 As Shape, shpN3 As Shape
    Set shpN1 = sld.Shapes.AddShape(msoShapeOval, _
        ax - nodeD / 2, ay - nodeD / 2, nodeD, nodeD)
    Set shpN2 = sld.Shapes.AddShape(msoShapeOval, _
        brx - nodeD / 2, bry - nodeD / 2, nodeD, nodeD)
    Set shpN3 = sld.Shapes.AddShape(msoShapeOval, _
        blx - nodeD / 2, bly - nodeD / 2, nodeD, nodeD)

    shpN1.Fill.ForeColor.RGB = clrLine: shpN1.Line.Visible = msoFalse
    shpN2.Fill.ForeColor.RGB = clrLine: shpN2.Line.Visible = msoFalse
    shpN3.Fill.ForeColor.RGB = clrLine: shpN3.Line.Visible = msoFalse
End Sub`;

export default function BlueprintPage() {
  const S = 400;
  const cx = S / 2;
  const cy = S / 2;
  const outerR = 140;
  const innerR = outerR * 10 / 14;

  // Colors
  const BG = "#0a1628";
  const GRID = "#1a2d4a";
  const LINE = "#38bdf8";   // cyan
  const DIM = "#7dd3fc";    // light cyan
  const ACCENT = "#facc15"; // gitnote-400
  const WHITE = "#e0f2fe";
  const FAINT = "#334155";

  // Outer hex vertices
  const outerVerts = Array.from({ length: 6 }, (_, i) => hexVertex(cx, cy, outerR, i));

  // Git branch (blueprint scale)
  const br = computeBranch(cx, cy, innerR, outerR);
  const brScale = outerR / 14; // 10x
  const brStrokeW = 1.2 * brScale;
  const brNodeR = 2.5 * brScale;

  // Git branch (icon scale, for actual size preview)
  const brIcon = computeBranch(16, 16, 10, 14);

  return (
    <div style={{ backgroundColor: BG }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-xs mb-1" style={{ color: FAINT }}>/dev/icon</p>
            <h1 className="text-2xl font-extrabold font-mono tracking-tight" style={{ color: WHITE }}>
              GITNOTE ICON BLUEPRINT
            </h1>
            <p className="font-mono text-xs mt-1" style={{ color: DIM }}>
              Wax Cell + Git Branch &mdash; pointy-top hexagon, dual layer, golden ratio branch
            </p>
          </div>
          <button
            onClick={downloadSvg}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-colors hover:opacity-80"
            style={{ backgroundColor: "#1a2d4a", color: "#7dd3fc", border: "1px solid #334155" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            SVG
          </button>
        </div>

        {/* Blueprint drawing */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: GRID }}>
          <svg width="100%" viewBox={`0 0 ${S} ${S}`} style={{ backgroundColor: BG }}>
            {/* Grid */}
            {Array.from({ length: 21 }, (_, i) => {
              const pos = i * 20;
              return (
                <g key={i}>
                  <line x1={pos} y1={0} x2={pos} y2={S} stroke={GRID} strokeWidth="0.5" />
                  <line x1={0} y1={pos} x2={S} y2={pos} stroke={GRID} strokeWidth="0.5" />
                </g>
              );
            })}
            {/* Center crosshair */}
            <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} stroke={LINE} strokeWidth="0.5" />
            <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke={LINE} strokeWidth="0.5" />
            <circle cx={cx} cy={cy} r="2" fill={LINE} />

            {/* Outer hex */}
            <polygon
              points={hexPoints(cx, cy, outerR)}
              fill="#fef9c3"
              fillOpacity="0.15"
              stroke={ACCENT}
              strokeWidth={outerR * 2 / 14}
              strokeLinejoin="round"
            />
            {/* Inner hex */}
            <polygon
              points={hexPoints(cx, cy, innerR)}
              fill="none"
              stroke={ACCENT}
              strokeWidth={outerR * 0.5 / 14}
              strokeLinejoin="round"
              opacity="0.4"
            />

            {/* Git branch pattern */}
            <line x1={br.BR.x} y1={br.BR.y} x2={br.ext.x} y2={br.ext.y}
              stroke={ACCENT} strokeWidth={brStrokeW} strokeLinecap="round" />
            <line x1={br.BL.x} y1={br.BL.y} x2={br.A.x} y2={br.A.y}
              stroke={ACCENT} strokeWidth={brStrokeW} strokeLinecap="round" />
            <circle cx={br.A.x} cy={br.A.y} r={brNodeR} fill={ACCENT} />
            <circle cx={br.BR.x} cy={br.BR.y} r={brNodeR} fill={ACCENT} />
            <circle cx={br.BL.x} cy={br.BL.y} r={brNodeR} fill={ACCENT} />

            {/* ── Dimension: outer radius (to upper-right vertex) ── */}
            <line x1={cx} y1={cy} x2={outerVerts[1].x} y2={outerVerts[1].y} stroke={LINE} strokeWidth="1" strokeDasharray="4,3" />
            <circle cx={outerVerts[1].x} cy={outerVerts[1].y} r="3" fill="none" stroke={LINE} strokeWidth="1" />
            <text x={cx + outerR * 0.55} y={cy - outerR * 0.15} textAnchor="middle" fill={DIM} fontSize="13" fontFamily="monospace" fontWeight="bold">
              R = 14
            </text>

            {/* ── Dimension: inner radius (to lower-left vertex) ── */}
            <line x1={cx} y1={cy} x2={cx + innerR * Math.cos(Math.PI * 5 / 6)} y2={cy + innerR * Math.sin(Math.PI * 5 / 6)}
              stroke="#a78bfa" strokeWidth="1" strokeDasharray="4,3" />
            <text x={cx - innerR * 0.55} y={cy + innerR * 0.15} textAnchor="middle" fill="#c4b5fd" fontSize="13" fontFamily="monospace" fontWeight="bold">
              r = 10
            </text>

            {/* ── Dimension: triangle circumradius ── */}
            <line x1={cx} y1={cy} x2={br.BR.x} y2={br.BR.y}
              stroke="#fb923c" strokeWidth="1" strokeDasharray="4,3" />
            <text x={cx + br.R * 0.6} y={cy - 12} textAnchor="middle" fill="#fdba74" fontSize="11" fontFamily="monospace" fontWeight="bold">
              r/&phi; &asymp; 6.18
            </text>

            {/* ── Dimension: outer stroke (right edge) ── */}
            {(() => {
              const v0 = outerVerts[1];
              const v1 = outerVerts[2];
              const mx = (v0.x + v1.x) / 2;
              const my = (v0.y + v1.y) / 2;
              const dx = v1.x - v0.x;
              const dy = v1.y - v0.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const nx = -dy / len;
              const ny = dx / len;
              const off = 30;
              return (
                <g>
                  <line x1={v0.x} y1={v0.y} x2={v0.x + nx * off} y2={v0.y + ny * off} stroke="#4ade80" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1={v1.x} y1={v1.y} x2={v1.x + nx * off} y2={v1.y + ny * off} stroke="#4ade80" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1={v0.x + nx * (off - 5)} y1={v0.y + ny * (off - 5)} x2={v1.x + nx * (off - 5)} y2={v1.y + ny * (off - 5)} stroke="#4ade80" strokeWidth="1" />
                  <text x={mx + nx * (off + 10)} y={my + ny * (off + 10)} textAnchor="middle" dominantBaseline="central" fill="#86efac" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    stroke = 2
                  </text>
                </g>
              );
            })()}

            {/* ── Vertex labels ── */}
            {outerVerts.map((v, i) => (
              <g key={i}>
                <circle cx={v.x} cy={v.y} r="2.5" fill={LINE} />
                <text
                  x={v.x + (v.x - cx) * 0.18}
                  y={v.y + (v.y - cy) * 0.18 + 4}
                  textAnchor="middle"
                  fill={FAINT}
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {i * 60 - 90}°
                </text>
              </g>
            ))}

            {/* ── Corner detail (zoom inset) ── */}
            {(() => {
              const insetX = 30;
              const insetY = 30;
              const insetS = 90;
              const v = outerVerts[1];
              return (
                <g>
                  <line x1={v.x} y1={v.y} x2={insetX + insetS / 2} y2={insetY + insetS / 2} stroke={FAINT} strokeWidth="0.5" strokeDasharray="3,3" />
                  <rect x={insetX} y={insetY} width={insetS} height={insetS} fill={BG} stroke={LINE} strokeWidth="1" rx="4" />
                  <text x={insetX + 6} y={insetY + 14} fill={DIM} fontSize="8" fontFamily="monospace">CORNER DETAIL</text>
                  <polyline
                    points={`${insetX + 20},${insetY + 70} ${insetX + insetS / 2},${insetY + 30} ${insetX + insetS - 20},${insetY + 70}`}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <text x={insetX + 6} y={insetY + insetS - 6} fill="#86efac" fontSize="8" fontFamily="monospace">round join</text>
                </g>
              );
            })()}

            {/* Title block */}
            <rect x={S - 160} y={S - 50} width={155} height={45} fill={BG} stroke={GRID} strokeWidth="1" />
            <text x={S - 155} y={S - 32} fill={WHITE} fontSize="10" fontFamily="monospace" fontWeight="bold">GITNOTE ICON</text>
            <text x={S - 155} y={S - 18} fill={FAINT} fontSize="8" fontFamily="monospace">viewBox: 0 0 32 32</text>
          </svg>
        </div>

        {/* Spec cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "OUTER HEX",
              specs: [
                ["Shape", "pointy-top hexagon"],
                ["Radius", "14 (of 32)"],
                ["Fill", "gitnote-100  #fef9c3"],
                ["Stroke", "gitnote-500  #eab308"],
                ["Stroke Width", "2"],
                ["Stroke Join", "round"],
              ],
              fillSwatch: "#fef9c3",
              strokeSwatch: "#eab308",
            },
            {
              label: "INNER HEX",
              specs: [
                ["Shape", "pointy-top hexagon"],
                ["Radius", "10 (of 32)"],
                ["Fill", "none"],
                ["Stroke", "gitnote-500  #eab308"],
                ["Stroke Width", "0.5"],
                ["Opacity", "0.4"],
              ],
              fillSwatch: undefined,
              strokeSwatch: "#eab308",
            },
            {
              label: "GIT BRANCH",
              specs: [
                ["Sizing", "innerR / \u03c6 \u2248 6.18"],
                ["Stroke", "gitnote-500  #eab308"],
                ["Stroke Width", "1.2"],
                ["Node Radius", "2.5"],
                ["Stroke Cap", "round"],
              ],
              fillSwatch: "#eab308",
              strokeSwatch: "#eab308",
            },
          ].map((card) => (
            <div key={card.label} className="rounded-xl p-4 border font-mono text-xs" style={{ backgroundColor: "#0f1d32", borderColor: GRID }}>
              <p className="font-bold mb-3" style={{ color: LINE }}>{card.label}</p>
              <div className="space-y-1.5">
                {card.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span style={{ color: FAINT }}>{k}</span>
                    <span className="text-right" style={{ color: WHITE }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                {card.fillSwatch && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: card.fillSwatch }} />
                    <span style={{ color: FAINT }}>fill</span>
                  </div>
                )}
                {card.strokeSwatch && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border" style={{ borderColor: card.strokeSwatch, borderWidth: 2 }} />
                    <span style={{ color: FAINT }}>stroke</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coordinate system note */}
        <div className="rounded-xl p-4 border font-mono text-xs space-y-1" style={{ backgroundColor: "#0f1d32", borderColor: GRID }}>
          <p style={{ color: LINE }}>COORDINATE SYSTEM</p>
          <p style={{ color: WHITE }}>viewBox: 0 0 32 32 &nbsp;|&nbsp; center: (16, 16) &nbsp;|&nbsp; pointy-top hexagon</p>
          <p style={{ color: FAINT }}>vertices at −90°, −30°, 30°, 90°, 150°, 210° (top → clockwise)</p>
          <p className="mt-2" style={{ color: "#fb923c" }}>GOLDEN RATIO BRANCH</p>
          <p style={{ color: WHITE }}>circumR<sub>triangle</sub> = innerR / &phi; = 10 / 1.618 &asymp; 6.18</p>
          <p style={{ color: FAINT }}>equilateral triangle: base ∥ lower-right hex edge, apex → upper-left</p>
          <p style={{ color: FAINT }}>lines: BR→A extended to hex edge V5→V0, BL→A (no extension), no base</p>
        </div>

        {/* Actual size preview */}
        <div>
          <p className="font-mono text-xs mb-3" style={{ color: FAINT }}>ACTUAL SIZE ON HEADER</p>
          <div className="flex items-center gap-6 px-6 h-14 rounded-xl border" style={{ backgroundColor: "#fefce8e0", borderColor: "#fef08a60" }}>
            {[24, 28, 32, 36, 40].map((s) => (
              <div key={s} className="text-center space-y-1">
                <svg width={s} height={s} viewBox="0 0 32 32">
                  <polygon points={hexPoints(16, 16, 14)} fill="#fef9c3" stroke="#eab308" strokeWidth="2" strokeLinejoin="round" />
                  <polygon points={hexPoints(16, 16, 10)} fill="none" stroke="#eab308" strokeWidth="0.5" strokeLinejoin="round" opacity="0.4" />
                  <line x1={brIcon.BR.x} y1={brIcon.BR.y} x2={brIcon.ext.x} y2={brIcon.ext.y}
                    stroke="#eab308" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1={brIcon.BL.x} y1={brIcon.BL.y} x2={brIcon.A.x} y2={brIcon.A.y}
                    stroke="#eab308" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx={brIcon.A.x} cy={brIcon.A.y} r="2.5" fill="#eab308" />
                  <circle cx={brIcon.BR.x} cy={brIcon.BR.y} r="2.5" fill="#eab308" />
                  <circle cx={brIcon.BL.x} cy={brIcon.BL.y} r="2.5" fill="#eab308" />
                </svg>
                <p className="font-mono text-gray-500" style={{ fontSize: 9 }}>{s}px</p>
              </div>
            ))}
          </div>
        </div>

        {/* VBA Macro */}
        <div>
          <p className="font-mono text-xs mb-3" style={{ color: LINE }}>POWERPOINT VBA MACRO</p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: GRID }}>
            <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: "#0f1d32" }}>
              <span className="font-mono text-xs" style={{ color: FAINT }}>GitNoteIcon.bas</span>
              <button
                onClick={() => navigator.clipboard.writeText(VBA_CODE)}
                className="font-mono text-xs px-2 py-1 rounded transition-colors hover:opacity-80"
                style={{ color: DIM, backgroundColor: GRID }}
              >
                Copy
              </button>
            </div>
            <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed" style={{ backgroundColor: BG, color: WHITE }}>
              <code>{VBA_CODE}</code>
            </pre>
          </div>
          <div className="mt-3 rounded-xl p-3 border font-mono text-xs space-y-1" style={{ backgroundColor: "#0f1d32", borderColor: GRID }}>
            <p style={{ color: "#86efac" }}>NOTES</p>
            <p style={{ color: WHITE }}>
              Hex: BuildFreeform — pointy-top vertices directly, no Rotation needed
            </p>
            <p style={{ color: WHITE }}>
              Branch: AddLine + AddShape(msoShapeOval) for nodes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
