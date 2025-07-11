import { useEffect, useState } from "react";

function useHtmlThemeClass() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "blue") {
      return "blue";
    } else {
      return storedTheme;
    }
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isBlue = document.documentElement.classList.contains("blue");
      setTheme(isBlue ? "blue" : "default");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

export default useHtmlThemeClass;
