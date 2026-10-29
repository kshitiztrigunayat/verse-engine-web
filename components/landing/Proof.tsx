"use client";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";
import { Odometer } from "@/components/ui/Odometer";
import { Marquee } from "@/components/ui/Marquee";

export function Proof() {
  const ref = useRef<HTMLElement>(null);
  const [rolled, setRolled] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Roll when the section is 75% up the viewport.
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRolled(true); io.disconnect(); } }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="stats" ref={ref} aria-label="Chapter 02 — The Proof" style={{ position: "relative", padding: "140px 0 0", overflow: "hidden" }}>
      <div className="wrap">
        <div className="mono eyebrow" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", color: "var(--muted)" }}><span className="label">CHAPTER 02 · THE PROOF</span><span>MEASURED IN A DESKTOP BROWSER</span></div>
        {rolled && (
          <>
            <h2 className="wide h-light" style={{ marginTop: 40, fontSize: "clamp(56px, 9vw, 132px)", letterSpacing: "-0.03em" }}>
              <span className="word" style={{ animationDelay: ".05s" }}>WHAT</span><span className="word" style={{ animationDelay: ".15s" }}>CAN</span><span className="word" style={{ animationDelay: ".25s", fontWeight: 600 }}>WE</span><span className="word serif" style={{ animationDelay: ".4s", fontStretch: "100%", color: "var(--accent)", fontSize: "1.08em" }}>DO?</span>
            </h2>
            <p className="fadeup" style={{ marginTop: 28, fontSize: 20, maxWidth: 560, color: "var(--body)", animationDelay: ".6s" }}>Heavy used to mean slow. So we stopped shrinking files and built an engine that streams the big ones — straight into an ordinary browser tab.</p>
          </>
        )}
        {!rolled && <h2 className="wide h-light" style={{ marginTop: 40, fontSize: "clamp(56px, 9vw, 132px)", letterSpacing: "-0.03em", opacity: 0 }} aria-hidden="true">WHAT CAN WE DO?</h2>}
        <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", borderTop: "1px solid var(--hair-strong)" }}>
          {STATS.map((st, i) => (
            <div key={st.eyebrow} style={{ padding: "24px 24px 8px 0", borderRight: "1px solid var(--hair)", marginRight: 24 }}>
              <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.12em" }}><span className="label">{`[0${i + 1}]`}</span><span style={{ color: "var(--muted)" }}>{st.eyebrow}</span></div>
              <div style={{ marginTop: 16 }}><Odometer value={st.value} unit={st.unit} rolled={rolled} index={i} /></div>
              <div className="mono" style={{ marginTop: 14, fontSize: 13, letterSpacing: "0.12em" }}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="band" aria-hidden="true" style={{ marginTop: 120, padding: "22px 0", overflow: "hidden", transform: "rotate(-2deg) scale(1.05)" }}>
        <Marquee text="WEBGPU ✦ WEBGL2 FALLBACK ✦ STREAMS ONLY WHAT YOU SEE ✦ NO CLOUD GPU ✦ " />
      </div>
      <div style={{ padding: "26px 0 40px" }}><Marquee reverse outline text="GLB ✦ USDZ ✦ IFC ✦ E57 ✦ GAUSSIAN SPLATS ✦ POINT CLOUDS ✦ FLOOR PLANS ✦ " /></div>
    </section>
  );
}
