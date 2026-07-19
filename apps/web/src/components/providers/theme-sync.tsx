"use client";

import { useEffect } from "react";

function applySystemTheme() {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = dark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

/** Keeps `data-theme` in sync with the browser/OS color scheme. */
export function ThemeSync() {
  useEffect(() => {
    applySystemTheme();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", applySystemTheme);
    return () => mq.removeEventListener("change", applySystemTheme);
  }, []);

  return null;
}

/** Inline before hydration to avoid a flash of the wrong theme. */
export const themeInitScript = `(function(){try{var t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;
