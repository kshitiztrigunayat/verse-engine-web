"use client";
import { useEffect, useState } from "react";
import { SEGS } from "@/lib/data";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Cube } from "@/components/ui/Cube";

const dots = (c: string) => <span style={{ display: "flex", gap: 5 }} aria-hidden="true">{[0, 1, 2].map((k) => <span key={k} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}</span>;
const INK = "#001B99", CB = "#001B99", TINT = "#FFFFFF", TINT_BG = "rgba(0,119,255,0.1)";

/** Dual-pane demo, coded mock fallback. [PLACEHOLDER: two synced real screen recordings] */
export function BehindCurtain() {
  const rm = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ref, vis] = useInView<HTMLDivElement>();
  const run = playing && vis && !rm;
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 3200);
    return () => clearInterval(t);
  }, [run]);
  const state = run ? "running" : "paused";

  return (
    <section id="studio-demo" aria-label="Chapter 07 — Behind the curtain" style={{ padding: "130px 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "60%", width: 1300, height: 700, transform: "translate(-50%,-50%)", background: "radial-gradient(closest-side, var(--glow), transparent)" }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="row-between" style={{ marginBottom: 48 }}>
          <div>
            <span className="mono label eyebrow">CHAPTER 07 · BEHIND THE CURTAIN</span>
            <h2 className="h-light" style={{ marginTop: 18 }}>
              <span className="serif" style={{ display: "block", fontSize: "clamp(52px, 6vw, 84px)" }}>Two screens,</span>
              <span className="wide" style={{ display: "block", fontSize: "clamp(40px, 4.5vw, 64px)", letterSpacing: "-0.02em" }}>ONE SCENE.</span>
            </h2>
          </div>
          <p className="note" style={{ maxWidth: 340 }}>WHAT YOU DO IN STUDIO ON THE LEFT. WHAT YOUR CLIENT SEES ON THE RIGHT — SECONDS LATER.</p>
        </div>
        <div ref={ref} className="force-dark" style={{ background: "rgba(0,27,153,0.85)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 32, padding: 18, boxShadow: "0 50px 120px rgba(0,27,153,0.45)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: 14 }}>
            {/* Studio pane */}
            <div style={{ background: "#FFFFFF", color: INK, borderRadius: 20, overflow: "hidden", display: "flex", minHeight: 420 }}>
              <div className="hide-sm" style={{ width: 150, flex: "none", background: TINT_BG, padding: "18px 14px", display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
                <span className="wide" style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", marginBottom: 12, color: CB }}>STUDIO</span>
                <span style={{ padding: "8px 12px", borderRadius: 999, background: "#FFFFFF", fontWeight: 600, color: CB }}>Projects</span>
                {["Uploads", "Links", "Settings"].map((t) => <span key={t} style={{ padding: "8px 12px" }}>{t}</span>)}
              </div>
              <div style={{ flex: 1, minWidth: 0, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="mono" style={{ fontSize: 12, letterSpacing: "0.06em", color: CB }}>PROJECT · showroom_sofa</span>
                <div key={phase} className="fadeup" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {phase === 0 && <>
                    <div style={{ fontWeight: 600, fontSize: 22 }}>Uploading</div>
                    <div style={{ border: "1.5px dashed rgba(0,27,153,0.35)", borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span className="mono">showroom_sofa.glb</span><span style={{ opacity: 0.72 }}>Uploading…</span></div>
                      <div style={{ height: 8, borderRadius: 99, background: TINT_BG, overflow: "hidden" }}><div className="run32" style={{ height: "100%", background: "#0077FF", animationPlayState: state }} /></div>
                    </div></>}
                  {phase === 1 && <>
                    <div style={{ fontWeight: 600, fontSize: 22 }}>Preparing scene</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, padding: "12px 16px", borderRadius: 999, background: TINT_BG }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077FF" strokeWidth="3" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>Scene streaming prep</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, padding: "12px 16px", borderRadius: 999, background: TINT_BG }}><span className="spin" style={{ width: 16, height: 16, borderRadius: "50%", border: "2.5px solid rgba(0,119,255,0.25)", borderTopColor: "#0077FF" }} />Security signing</div></>}
                  {phase === 2 && <>
                    <div style={{ fontWeight: 600, fontSize: 22 }}>Ready to share</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(0,27,153,0.18)", borderRadius: 999, padding: "5px 5px 5px 14px" }}><span className="mono" style={{ flex: 1, minWidth: 0, fontSize: 13, color: CB, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>verse.ctruh.com/v/showroom-sofa</span><span className="ringpulse" style={{ padding: "8px 14px", borderRadius: 999, background: CB, color: "#fff", fontSize: 13, fontWeight: 600 }}>Copy link</span></div>
                    <div className="mono" style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 12 }}>{["PRIVATE", "EDITABLE", "EMBEDDABLE"].map((t) => <span key={t} style={{ padding: "6px 10px", borderRadius: 999, background: TINT_BG, color: CB }}>{t}</span>)}</div></>}
                  {phase === 3 && <>
                    <div style={{ fontWeight: 600, fontSize: 22 }}>Link shared</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 16, background: TINT_BG }}><div style={{ width: 44, height: 44, borderRadius: "50%", background: INK, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3 28 10v12L16 29 4 22V10L16 3Z" stroke="#0077FF" strokeWidth="2.4" strokeLinejoin="round" /></svg></div><div style={{ minWidth: 0 }}><div style={{ fontWeight: 600, fontSize: 15 }}>showroom_sofa</div><div style={{ fontSize: 13, opacity: 0.72 }}>Live link · opened in viewer</div></div></div>
                    <div className="mono" style={{ fontSize: 12, padding: 12, borderRadius: 12, background: INK, color: TINT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{`<iframe src="https://verse.ctruh.com/v/showroom-sofa">`}</div></>}
                </div>
              </div>
            </div>
            {/* Viewer pane */}
            <div style={{ background: INK, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 420 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {dots("rgba(255,255,255,0.25)")}
                <div className="mono" style={{ flex: 1, minWidth: 0, padding: "6px 14px", borderRadius: 999, background: "rgba(255,255,255,0.07)", fontSize: 12, color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap", overflow: "hidden" }}>{phase < 2 ? "about:blank" : "verse.ctruh.com/v/showroom-sofa"}</div>
                <span className="mono hide-sm" style={{ fontSize: 11, letterSpacing: "0.1em", color: TINT }}>VIEWER APP</span>
              </div>
              <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "linear-gradient(rgba(0,119,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,255,0.08) 1px, transparent 1px)", backgroundSize: "36px 36px" }}>
                {phase < 2 && <div className="fadeup pulse" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "rgba(255,255,255,0.8)", fontSize: 15 }}><div style={{ width: 120, height: 120, borderRadius: "50%", border: "1.5px dashed rgba(255,255,255,0.35)" }} />Waiting for a link…</div>}
                {phase === 2 && <div className="fadeup" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, fontSize: 15, color: TINT }}><span className="spin" style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(0,119,255,0.25)", borderTopColor: "#0077FF" }} />Opening scene…</div>}
                {phase === 3 && (
                  <div className="fadeup" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Cube size="md" style={{ filter: "drop-shadow(0 0 30px rgba(0,119,255,0.7))" }} />
                    <span style={{ position: "absolute", top: 16, left: 16, padding: "8px 14px", borderRadius: 999, background: "#0077FF", fontSize: 14, fontWeight: 700 }}>Live · 3 viewers</span>
                    <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, padding: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                      <span style={{ fontSize: 13, padding: "6px 12px", borderRadius: 999, background: CB }}>Orbit</span><span style={{ fontSize: 13, padding: "6px 12px" }}>Zoom</span><span style={{ fontSize: 13, padding: "6px 12px" }}>AR</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 6px 4px", flexWrap: "wrap" }}>
            <button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause demo" : "Play demo"} style={{ width: 48, height: 48, borderRadius: "50%", border: 0, background: CB, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>
              {playing ? <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M7 5v14l12-7L7 5Z" /></svg>}
            </button>
            <div style={{ flex: 1, minWidth: 260, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
              {SEGS.map((l, i) => (
                <button key={l} type="button" onClick={() => setPhase(i)} aria-current={i === phase} style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 44, justifyContent: "center", color: TINT, background: "none", border: 0, padding: 0, cursor: "pointer", textAlign: "left" }}>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: "0.04em" }}>{l}</span>
                  <span style={{ display: "block", height: 3, borderRadius: 3, background: "rgba(255,255,255,0.16)", overflow: "hidden" }}>
                    {i < phase && <span style={{ display: "block", height: "100%", width: "100%", background: "rgba(255,255,255,0.6)" }} />}
                    {i === phase && <span key={phase} className="run32" style={{ display: "block", height: "100%", background: "#0077FF", animationPlayState: state }} />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
