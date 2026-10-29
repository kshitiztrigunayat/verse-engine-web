"use client";
import { useTheme } from "@/lib/hooks";

export function ThemeToggle() {
  const theme = useTheme();
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("verse-theme", next); } catch {}
  };
  return (
    <button type="button" className="tab" onClick={flip} aria-pressed={theme === "light"} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      {theme === "dark" ? "◐ LIGHT THEME" : "◑ DARK THEME"}
    </button>
  );
}
