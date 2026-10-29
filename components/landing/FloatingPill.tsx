"use client";
import { useEffect, useRef, useState } from "react";
import { scrollToY } from "./SmoothScroll";

export function FloatingPill() {
  const [sp, setSp] = useState(0);
  const pend = useRef(false);
  useEffect(() => {
    const check = () => {
      pend.current = false;
      const de = document.documentElement;
      setSp(Math.round(Math.min(1, (window.scrollY || 0) / Math.max(1, de.scrollHeight - innerHeight)) * 100));
    };
    const on = () => { if (!pend.current) { pend.current = true; requestAnimationFrame(check); } };
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    check();
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);
  return (
    <button type="button" aria-label="Back to top" onClick={() => scrollToY(0)} className="force-dark" style={{ position: "fixed", left: "50%", bottom: 22, transform: "translateX(-50%)", zIndex: 70, display: "flex", alignItems: "center", gap: 14, padding: "6px 18px 6px 6px", borderRadius: 999, background: "rgba(0,27,153,0.9)", whiteSpace: "nowrap", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", color: "#FFFFFF", cursor: "pointer", minHeight: 44 }}>
      <span className="orb" aria-hidden="true" style={{ width: 34, height: 34, borderRadius: "50%", background: "conic-gradient(#0077FF, #FFFFFF, #001B99, #0077FF)", boxShadow: "0 0 18px rgba(0,119,255,0.8)" }} />
      <span className="wide" style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.16em" }}>VERSE ENGINE</span>
      <span className="mono" style={{ fontSize: 12, color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>{String(sp).padStart(2, "0")} / 100</span>
    </button>
  );
}
