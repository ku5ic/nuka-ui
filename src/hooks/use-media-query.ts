import { useState, useEffect } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export { useMediaQuery };
