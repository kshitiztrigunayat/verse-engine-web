"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PL_STATUS } from "@/lib/data";
import { usePreloaderSeen } from "@/lib/hooks";

// 3×3×3 isometric voxel cube: draw order back→front.
const CUBES: { x: number; y: number; z: number }[] = [];
for (let z = 0; z < 3; z++) for (let s = 0; s <= 4; s++) for (let x = 0; x < 3; x++) { const y = s - x; if (y < 0 || y > 2) continue; CUBES.push({ x, y, z }); }

const MIN_MS = 2500;

export function Preloader({ onEnter }: { onEnter: () => void }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [goneState, setGone] = useState(false);
  const seen = usePreloaderSeen();
  const gone = goneState || seen;
  const assets = useRef(0); // 0..1, real progress: fonts + window load
  const leave = useRef(false);

  const enter = useCallback(() => {
    if (leave.current) return;
    leave.current = true;
    setLeaving(true);
    try { sessionStorage.setItem("verse-pl", "1"); } catch {}
    setTimeout(() => { setGone(true); onEnter(); }, 950);
  }, [onEnter]);

  useEffect(() => {
    if (seen) return;
    document.body.style.overflow = "hidden";
    let fontsDone = false, loaded = document.readyState === "complete";
    const upd = () => { assets.current = (fontsDone ? 0.5 : 0.1) + (loaded ? 0.5 : 0.2); };
    document.fonts?.ready.then(() => { fontsDone = true; upd(); });
    if (!loaded) window.addEventListener("load", () => { loaded = true; upd(); }, { once: true });
    upd();
    const start = performance.now();
    let raf = 0, auto: ReturnType<typeof setTimeout> | undefined, done = false;
    const loop = (now: number) => {
      const timeP = Math.min(1, (now - start) / MIN_MS);
      const p = Math.round(Math.min(timeP, assets.current) * 100);
      setPct(p);
      if (p >= 100 && !done) { done = true; auto = setTimeout(enter, 1600); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); clearTimeout(auto); document.body.style.overflow = ""; };
  }, [enter, seen]);

  useEffect(() => { if (leaving) document.body.style.overflow = ""; }, [leaving]);

  if (gone) return null;
  const ready = pct >= 100;
  return (
    <div className="preload force-dark" role="dialog" aria-label="Loading Verse Engine" style={{ position: "fixed", inset: 0, zIndex: 100, background: "#070B1F", opacity: leaving ? 0 : 1, transform: `translateY(${leaving ? -40 : 0}px)`, pointerEvents: leaving ? "none" : "auto", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "46%", width: 900, height: 900, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,119,255,0.28), rgba(7,11,31,0))" }} />
      <div className="mono" style={{ position: "absolute", top: 36, left: "clamp(16px,3.4vw,48px)", right: "clamp(16px,3.4vw,48px)", display: "flex", justifyContent: "space-between", fontSize: 12, letterSpacing: "0.14em", color: "rgba(232,241,255,0.75)" }}><span>VERSE ENGINE — BY CTRUH</span><span>3D · AR · XR</span></div>
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "32%", width: 0, height: 0 }}>
        {CUBES.map((q, i) => {
          const on = pct >= ((i + 1) / CUBES.length) * 96;
          return (
            <div key={i} className="vox" style={{ position: "absolute", left: (q.x - q.y) * 32 - 32, top: (q.x + q.y) * 18.5 - q.z * 37 - 20, width: 64, height: 74, opacity: on ? 1 : 0, transform: `translateY(${on ? 0 : -40}px)` }}>
              <svg width="64" height="74" viewBox="0 0 64 74"><path d="M32 0 64 18.5 32 37 0 18.5Z" fill="#E8F1FF" /><path d="M0 18.5 32 37v37L0 55.5Z" fill="#0077FF" /><path d="M64 18.5 32 37v37l32-18.5Z" fill="#001B99" /></svg>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: "56%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "0 16px", textAlign: "center" }}>
        <span className="mono" style={{ fontSize: 12, letterSpacing: "0.2em", color: "#E8F1FF" }}>INITIALIZING VERSE ENGINE<span className="blink">_</span></span>
        <div className="wide" role="status" aria-label={`${pct} percent`} style={{ fontWeight: 700, fontSize: "clamp(72px, 12vw, 110px)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{String(pct).padStart(3, "0")}<span style={{ color: "#0077FF", fontWeight: 600 }}>%</span></div>
        <span className="mono" style={{ fontSize: 13, color: "rgba(232,241,255,0.75)" }}>{PL_STATUS[Math.min(3, Math.floor(pct / 34))]}</span>
        {ready && (
          <div className="fadeup" style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="entry" type="button" autoFocus onClick={enter} style={{ minHeight: 48, padding: "0 26px", borderRadius: 999, border: 0, background: "#0077FF", color: "#FFFFFF", font: "600 16px var(--font-sans)", cursor: "pointer" }}>Enter with spatial audio</button>
            <button className="entry" type="button" onClick={enter} style={{ minHeight: 48, padding: "0 26px", borderRadius: 999, border: "1px solid rgba(232,241,255,0.35)", background: "transparent", color: "#FFFFFF", font: "600 16px var(--font-sans)", cursor: "pointer" }}>Enter quietly</button>
          </div>
        )}
      </div>
    </div>
  );
}
