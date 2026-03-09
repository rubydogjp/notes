import { useState, useEffect, useCallback, useMemo, createContext, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { OsContext, type OS } from "./OsContext";
import { useSubSteps } from "./SubStepContext";

export interface SubSlide {
  title: string;
  icon?: string;
  slide: ReactNode;
  narration: ReactNode;
  action?: ReactNode;
}

interface Props {
  slides: SubSlide[];
}

const OS_STORAGE_KEY = "gitnote-os-pref";

/** Context for ActionSim to notify SlideViewer of execution */
export const ActionDoneContext = createContext<(() => void) | null>(null);

export default function SlideViewer({
  slides,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [, setCompletedActions] = useState<Set<number>>(new Set());
  const [os, setOs] = useState<OS>(() => {
    try {
      return (localStorage.getItem(OS_STORAGE_KEY) as OS) || "mac";
    } catch {
      return "mac";
    }
  });

  const slide = slides[currentSlide];
  const total = slides.length;
  const isLastSlide = currentSlide === total - 1;

  // Once the user reaches the last slide, keep actions visible
  useEffect(() => {
    if (isLastSlide) setHasReachedEnd(true);
  }, [isLastSlide]);

  // Collect all slides that have actions, with their original index
  const actionSlides = useMemo(
    () => slides
      .map((s, i) => ({ action: s.action, index: i }))
      .filter((s) => s.action),
    [slides],
  );
  const actionCount = actionSlides.length;

  const goPrev = useCallback(() => {
    if (currentSlide > 0) setCurrentSlide((s) => s - 1);
  }, [currentSlide]);

  const goNext = useCallback(() => {
    if (currentSlide < total - 1) setCurrentSlide((s) => s + 1);
  }, [currentSlide, total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  useEffect(() => {
    setCurrentSlide(0);
    setHasReachedEnd(false);
    setCompletedActions(new Set());
  }, [slides]);

  // Publish slide titles to StepProgress via context
  const subSteps = useSubSteps();
  useEffect(() => {
    subSteps?.setTitles(slides.map((s) => s.title));
    return () => subSteps?.setTitles([]);
  }, [slides]);

  useEffect(() => {
    try {
      localStorage.setItem(OS_STORAGE_KEY, os);
    } catch { /* ignore */ }
  }, [os]);

  return (
    <OsContext.Provider value={os}>
      <div>
        {/* Visual (left) | Details (right) — split on md+ */}
        <div className="mt-10 md:grid md:grid-cols-[3fr_2fr]">
          {/* Left: Visual card (title + 16:9 content + nav) */}
          <div className="md:pr-6">
            <div className="rounded-xl border-2 border-gray-700/50 bg-gray-950 overflow-hidden shadow-md">
              {/* Card header: title + OS dropdown */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-gray-700/50 bg-gray-900">
                {slide.icon && <span className="text-lg">{slide.icon}</span>}
                <h2 className="text-sm font-bold text-gray-100 flex-1 min-w-0 truncate">
                  {slide.title}
                </h2>
                {/* OS dropdown */}
                <select
                  value={os}
                  onChange={(e) => setOs(e.target.value as OS)}
                  className="text-xs font-medium bg-gray-800 border border-gray-700/50 rounded-lg px-2 py-1 text-gray-300 cursor-pointer flex-shrink-0 appearance-auto"
                >
                  <option value="mac">Mac</option>
                  <option value="windows">Windows</option>
                </select>
              </div>

              {/* Visual content — 16:9 */}
              <div className="aspect-video overflow-y-auto p-4">
                {slide.slide}
              </div>

              {/* Control bar: skip-back | seek bar | skip-forward */}
              <div className="flex items-stretch border-t border-gray-700/50 bg-gray-900/80">
                {/* Skip backward */}
                <button
                  onClick={goPrev}
                  disabled={currentSlide <= 0}
                  className="flex items-center justify-center w-14 border-r border-gray-700/50 text-gray-400 hover:text-gray-200 hover:bg-gray-800 active:bg-gray-700 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default"
                  aria-label="前のスライド"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>

                {/* Seek bar */}
                <div className="flex-1 flex items-center gap-2 px-3 py-4">
                  <span className="text-[10px] font-mono text-gray-500 w-8 text-right">
                    {currentSlide + 1}/{total}
                  </span>
                  <div
                    className="flex-1 h-1 bg-gray-700 rounded-full relative cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const ratio = (e.clientX - rect.left) / rect.width;
                      setCurrentSlide(Math.min(total - 1, Math.max(0, Math.round(ratio * (total - 1)))));
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 h-full bg-success-500 rounded-full transition-all"
                      style={{ width: `${total > 1 ? (currentSlide / (total - 1)) * 100 : 100}%` }}
                    />
                    <div
                      className="absolute top-1/2 w-3 h-3 bg-success-500 rounded-full shadow-sm transition-all"
                      style={{ left: `${total > 1 ? (currentSlide / (total - 1)) * 100 : 100}%`, transform: "translate(-50%, -50%)" }}
                    />
                  </div>
                </div>

                {/* Skip forward — prominent (action blue) */}
                <button
                  onClick={goNext}
                  disabled={currentSlide >= total - 1}
                  className="flex items-center justify-center w-16 border-l border-action-600 bg-action-500 text-white hover:bg-action-600 active:bg-action-700 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default"
                  aria-label="次のスライド"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 6h-2v12h2zm-3.5 6L6 6v12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Details (narration) */}
          <div className="mt-6 md:mt-0 md:border-l-2 md:border-gray-200 dark:md:border-gray-700 md:pl-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
            {slide.narration}
          </div>
        </div>

        {/* ── Actions (batch, persist once user reaches the end) ── */}
        {hasReachedEnd && actionCount > 0 && (
          <div className="mt-8 pt-6 border-t-2 border-amber-200 dark:border-amber-800/60">
            <p className="font-bold text-sm mb-3 text-amber-800 dark:text-amber-300">
              やってみよう！
            </p>
            <div className="space-y-3 px-4">
              {actionSlides.map(({ action, index }, i) => (
                <ActionDoneContext.Provider
                  key={index}
                  value={() => setCompletedActions((prev) => new Set(prev).add(i))}
                >
                  {action}
                </ActionDoneContext.Provider>
              ))}
            </div>

          </div>
        )}

        {/* Next step button — always visible, disabled until all actions done */}
        {subSteps?.nextStep && (
          <div className="mt-8 flex justify-center">
            {hasReachedEnd ? (
              <Link
                to={subSteps.nextStep.path}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-action-500 hover:bg-action-600 text-white font-bold text-sm shadow-md transition-colors"
              >
                次のステップへ
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 font-bold text-sm cursor-not-allowed opacity-60">
                次のステップへ
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </div>
        )}

      </div>
    </OsContext.Provider>
  );
}
