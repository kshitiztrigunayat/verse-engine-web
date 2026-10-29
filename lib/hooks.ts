"use client";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const subRm = (cb: () => void) => {
  const q = matchMedia("(prefers-reduced-motion: reduce)");
  q.addEventListener("change", cb);
  return () => q.removeEventListener("change", cb);
};
export function useReducedMotion() {
  return useSyncExternalStore(subRm, () => matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
}

/** Preloader already seen this session (or reduced motion): set on <html data-pl="seen"> by an inline script. */
export function usePreloaderSeen() {
  return useSyncExternalStore(() => () => {}, () => document.documentElement.dataset.pl === "seen", () => false);
}

/** Current theme from <html data-theme>. */
export function useTheme() {
  return useSyncExternalStore(
    (cb) => {
      const mo = new MutationObserver(cb);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => mo.disconnect();
    },
    () => (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"),
    () => "dark" as const,
  );
}

/** Ticks once a second on the client; null during SSR/hydration. */
export function useNow() {
  return useSyncExternalStore(
    (cb) => { const t = setInterval(cb, 1000); return () => clearInterval(t); },
    () => Math.floor(Date.now() / 1000) * 1000,
    () => null as number | null,
  );
}

/** True while the element intersects the viewport (used to pause off-screen loops). */
export function useInView<T extends HTMLElement>(margin = "0px", once = false) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setSeen(e.isIntersecting);
        if (e.isIntersecting && once) io.disconnect();
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, once]);
  return [ref, seen] as const;
}

export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  const copy = useCallback(
    (text: string) => {
      try {
        navigator.clipboard?.writeText(text);
      } catch {}
      setCopied(true);
      clearTimeout(t.current);
      t.current = setTimeout(() => setCopied(false), timeout);
    },
    [timeout],
  );
  useEffect(() => () => clearTimeout(t.current), []);
  return [copied, copy] as const;
}
