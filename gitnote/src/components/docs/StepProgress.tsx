import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useSubSteps } from "./SubStepContext";

export interface StepMeta {
  slug: string;
  title: string;
  stepNum: number | null;
}

interface Props {
  steps: StepMeta[];
  currentSlug: string;
  basePath: string;
}

/** Max dots shown at once — overflow is indicated by extending lines */
const MAX_VISIBLE = 7;

export default function StepProgress({ steps, currentSlug, basePath }: Props) {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const subSteps = useSubSteps();
  const numberedSteps = steps.filter((s) => s.stepNum !== null);
  const currentStep = steps.find((s) => s.slug === currentSlug);
  const currentStepNum = currentStep?.stepNum ?? 0;

  // Close TOC on step change
  useEffect(() => setTocOpen(false), [currentSlug]);

  // Title for left label
  const stepLabel = currentStep?.stepNum ? `STEP ${currentStep.stepNum}` : null;
  const stepTitle = currentStep?.stepNum
    ? currentStep.title.replace(/^手順\d+\.\s*/, "")
    : currentStep?.title ?? "";

  // Windowed visible range for dots
  const { visibleSteps, hasOverflowLeft, hasOverflowRight } = useMemo(() => {
    const total = numberedSteps.length;
    if (total <= MAX_VISIBLE) {
      return { visibleSteps: numberedSteps, hasOverflowLeft: false, hasOverflowRight: false };
    }
    // Find current index within numbered steps
    const curIdx = numberedSteps.findIndex((s) => s.slug === currentSlug);
    const activeIdx = curIdx >= 0 ? curIdx : 0;

    // Center the window around active step
    const half = Math.floor(MAX_VISIBLE / 2);
    let start = activeIdx - half;
    let end = start + MAX_VISIBLE;

    if (start < 0) { start = 0; end = MAX_VISIBLE; }
    if (end > total) { end = total; start = total - MAX_VISIBLE; }

    return {
      visibleSteps: numberedSteps.slice(start, end),
      hasOverflowLeft: start > 0,
      hasOverflowRight: end < total,
    };
  }, [numberedSteps, currentSlug]);

  return (
    <div className="sticky top-14 z-30 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-amber-200/50 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 grid grid-cols-[1fr_auto] items-center gap-2 md:gap-4">
        {/* Left: Step title — fixed region, clickable to toggle TOC */}
        <button
          type="button"
          onClick={() => subSteps?.titles.length && setTocOpen((v) => !v)}
          className="flex items-center gap-1.5 min-w-0 cursor-pointer"
        >
          {stepLabel && (
            <span className="hidden sm:inline text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wide whitespace-nowrap">
              {stepLabel}
            </span>
          )}
          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
            {stepTitle}
          </span>
          {subSteps?.titles.length ? (
            <svg
              className={`w-3 h-3 flex-shrink-0 text-gray-400 dark:text-gray-500 transition-transform ${tocOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          ) : null}
        </button>

        {/* Center: Step indicators — fixed region, never shifts */}
        <div className="flex items-center justify-center min-w-0">
          {/* Overflow line left */}
          {hasOverflowLeft && (
            <div className="w-6 md:w-10 h-0.5 rounded-full bg-amber-300 dark:bg-amber-700 flex-shrink-0 mr-1" />
          )}

          <div className="flex items-center gap-0.5">
            {visibleSteps.map((step, i) => {
              const isActive = step.slug === currentSlug;
              const isDone = step.stepNum !== null && currentStepNum !== null && step.stepNum < currentStepNum;

              return (
                <div key={step.slug} className="relative flex items-center">
                  <Link
                    to={`${basePath}/${step.slug}`}
                    className={`relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-xs font-bold transition-colors
                      ${isActive
                        ? "bg-action-500 text-white ring-[3px] ring-action-500/40"
                        : isDone
                          ? "bg-success-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    onMouseEnter={() => setHoveredStep(step.slug)}
                    onMouseLeave={() => setHoveredStep(null)}
                    aria-label={step.title}
                  >
                    {isDone ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.stepNum
                    )}
                  </Link>
                  {hoveredStep === step.slug && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2.5 rounded-lg pointer-events-none z-40 shadow-lg">
                      {step.title}
                    </div>
                  )}
                  {i < visibleSteps.length - 1 && (
                    <div className={`w-3 md:w-5 h-0.5 mx-0.5 rounded-full ${
                      isDone ? "bg-success-500" : "bg-gray-200 dark:bg-gray-700"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Overflow line right */}
          {hasOverflowRight && (
            <div className="w-6 md:w-10 h-0.5 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 ml-1" />
          )}
        </div>

      </div>

      {/* TOC dropdown */}
      {tocOpen && subSteps?.titles.length ? (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-3">
          <ol className="space-y-1">
            {subSteps.titles.map((title, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="w-5 h-5 rounded-md bg-amber-200 dark:bg-amber-800/50 flex items-center justify-center text-[10px] font-bold text-amber-700 dark:text-amber-300 flex-shrink-0">
                  {i + 1}
                </span>
                <span>{title}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
