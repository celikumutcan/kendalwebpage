import { useEffect, useLayoutEffect } from "react";

// Hook to safely use layout effect on client and effect on server
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
