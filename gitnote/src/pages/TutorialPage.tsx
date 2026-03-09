import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { StepProgress } from "../components/docs";
import { SubStepContext } from "../components/docs/SubStepContext";
import { tutorialSteps } from "../content/tutorial/steps";
import IntroStep from "./tutorial/IntroStep";
import SetupStep from "./tutorial/SetupStep";
import ForkStep from "./tutorial/ForkStep";
import IssueStep from "./tutorial/IssueStep";
import BranchStep from "./tutorial/BranchStep";
import WorkStep from "./tutorial/WorkStep";
import CommitStep from "./tutorial/CommitStep";
import PullReqStep from "./tutorial/PullReqStep";
import CompleteStep from "./tutorial/CompleteStep";
import OssRecommendStep from "./tutorial/OssRecommendStep";

const stepComponents: Record<string, React.ComponentType> = {
  intro: IntroStep,
  setup: SetupStep,
  fork: ForkStep,
  issue: IssueStep,
  branch: BranchStep,
  work: WorkStep,
  commit: CommitStep,
  "pull-req": PullReqStep,
  complete: CompleteStep,
  "oss-recommend": OssRecommendStep,
};

const slideSlugs = new Set(["setup", "fork", "issue", "branch", "work", "commit", "pull-req"]);
const faqSlugs = ["q-oss", "q-suspend-restart", "q-dispose"];

export default function TutorialPage() {
  const { slug } = useParams();
  const currentSlug = slug || "intro";
  const [subStepTitles, setSubStepTitles] = useState<string[]>([]);
  const setTitles = useCallback((t: string[]) => setSubStepTitles(t), []);

  // Compute next step for the "next step" button in SlideViewer
  const currentIdx = tutorialSteps.findIndex((s) => s.slug === currentSlug);
  const nextStep = useMemo(() => {
    if (currentIdx < 0 || currentIdx >= tutorialSteps.length - 1) return undefined;
    const next = tutorialSteps[currentIdx + 1];
    return { title: next.title, path: `/tutorial/${next.slug}` };
  }, [currentIdx]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSlug]);

  if (faqSlugs.includes(currentSlug)) {
    return <Navigate to="/tutorial/intro" replace />;
  }

  const StepComponent = stepComponents[currentSlug];
  if (!StepComponent) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-16">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">ページが見つかりません</h1>
      </div>
    );
  }

  return (
    <SubStepContext.Provider value={{ titles: subStepTitles, setTitles, nextStep }}>
      <StepProgress
        steps={tutorialSteps}
        currentSlug={currentSlug}
        basePath="/tutorial"
      />

      {slideSlugs.has(currentSlug) ? (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
          <StepComponent />
        </div>
      ) : (
        <article className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14">
          <StepComponent />
        </article>
      )}
    </SubStepContext.Provider>
  );
}
