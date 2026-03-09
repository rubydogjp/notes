import { createContext, useContext } from "react";

interface SubStepContextType {
  titles: string[];
  setTitles: (titles: string[]) => void;
  nextStep?: { title: string; path: string };
}

export const SubStepContext = createContext<SubStepContextType | null>(null);
export function useSubSteps() {
  return useContext(SubStepContext);
}
