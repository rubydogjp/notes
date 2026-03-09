import { createContext, useContext } from "react";

export type OS = "mac" | "windows";

/** null = no provider → OsTabs renders its own tab UI */
export const OsContext = createContext<OS | null>(null);

export function useOsContext() {
  return useContext(OsContext);
}
