import { useState, useEffect } from "react";

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export const useBreakpoint = (maxWidth: number) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const handleChange = () => setIsMatch(media.matches);
    handleChange(); // Initial check

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [maxWidth]);

  return isMatch;
};
