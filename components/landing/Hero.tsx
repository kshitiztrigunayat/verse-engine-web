"use client";
import Link from "next/link";
import { useState } from "react";
import { useEntered } from "./Shell";
import { ROUTES } from "@/lib/links";

const ArrowUR = ({ c = "#FFFFFF" }: { c?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

const STRIP = [
  { n: "01", t: "ROOM-SIZED RIGS", icon: <><rect x="4" y="8" width="14" height="26" rx="1" /><rect x="22" y="8" width="14" height="26" rx="1" /><path d="M8 14h6M8 19h6M26 14h6M26 19h6M2 36h36" /></> },
  { n: "02", t: "WORKSTATIONS", icon: <><rect x="3" y="7" width="24" height="18" rx="2" /><path d="M11 31h8M15 25v6" /><rect x="30" y="7" width="7" height="24" rx="1" /></> },
  { n: "03", t: "APPS & HEADSETS", icon: <><rect x="4" y="13" width="32" height="15" rx="7" /><circle cx="13" cy="20.5" r="3.5" /><circle cx="27" cy="20.5" r="3.5" /></> },
  { n: "04", t: "ONE LINK", last: true, icon: <><path d="M17 23a6 6 0 0 0 8.5 0l5-5a6 6 0 0 0-8.5-8.5l-1.5 1.5" /><path d="M23 17a6 6 0 0 0-8.5 0l-5 5a6 6 0 0 0 8.5 8.5l1.5-1.5" /></> },
];

export function Hero() {
  const entered = useEntered();
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const toggle = () => { setPlaying(!playing); setStarted(true); };

  return (
    <section style={{ position: "relative", overflow: "hidden", paddingBottom: 72 }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(var(--hair-strong) 1px, transparent 1.4px)", backgroundSize: "140px 110px", opacity: 0.5 }} />
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: 520, width: 1800, height: 700, transform: "translate(-50%,-50%)", background: "radial-gradient(closest-side, var(--glow), var(--glow-edge) 50%, transparent)" }} />
      <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 400, perspective: 520, overflow: "hidden", maskImage: "linear-gradient(transparent, #FFFFFF 55%)", WebkitMaskImage: "linear-gradient(transparent, #FFFFFF 55%)" }}>
        <div className="floor" style={{ position: "absolute", left: -900, right: -900, top: 0, height: 900, transformOrigin: "50% 0", transform: "rotateX(76deg)", backgroundImage: "linear-gradient(var(--grid) 1.5px, transparent 1.5px), linear-gradient(90deg, var(--grid) 1.5px, transparent 1.5px)", backgroundSize: "80px 80px" }} />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 3, paddingTop: 72 }}>
        <div style={{ minHeight: 340, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
          {entered && (
            <>
              <div style={{ flex: "1 1 560px", minWidth: 0 }}>
                <span className="mono fadeup eyebrow" style={{ display: "inline-block" }}>PROLOGUE · VERSE ENGINE BY CTRUH — IMMERSIVE 3D, AR &amp; XR</span>
                <h1 className="h-light" style={{ marginTop: 18 }}>
                  <span className="mask"><span className="rise serif" style={{ fontSize: "clamp(64px, 6.7vw, 96px)", animationDelay: ".1s" }}>Any</span></span>
                  <span className="mask"><span className="rise wide" style={{ fontSize: "clamp(40px, 6.1vw, 88px)", letterSpacing: "-0.02em", animationDelay: ".22s" }}>3D MODEL,</span></span>
                  <span className="mask"><span className="rise wide" style={{ fontSize: "clamp(40px, 6.1vw, 88px)", letterSpacing: "-0.02em", animationDelay: ".34s" }}>AS A <span className="hl">LINK.</span></span></span>
                </h1>
              </div>
              <div className="fadeup" style={{ flex: "0 1 380px", display: "flex", flexDirection: "column", gap: 22, animationDelay: ".5s", paddingBottom: 10 }}>
                <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--body)" }}>Open in seconds on any screen. No APP Downloads. Watch how 3D got here — then skip straight to the end of the story.</p>
                <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                  <Link className="cta cta-blue cta-lg" href={ROUTES.signin}>Explore Studio <ArrowUR /></Link>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)" }}>FREE TO START<br />VIEWERS NEVER PAY</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* hero film — [PLACEHOLDER: ~90s film on the evolution of 3D, MP4/WebM + poster + captions] */}
        <div className="force-dark" style={{ marginTop: 56, position: "relative", aspectRatio: "16 / 9", minHeight: 460, borderRadius: 28, overflow: "hidden", background: "#070B1F", border: "1px solid rgba(232,241,255,0.18)", boxShadow: "0 50px 140px rgba(0,119,255,0.35)" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,119,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,255,0.09) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "45%", width: 900, height: 600, transform: "translate(-50%,-50%)", background: "radial-gradient(closest-side, rgba(0,119,255,0.35), rgba(7,11,31,0))" }} />
          <div className="mono" style={{ position: "absolute", top: 22, left: 24, right: 24, display: "flex", justifyContent: "space-between", fontSize: 12, letterSpacing: "0.1em", color: "#E8F1FF", gap: 12, flexWrap: "wrap" }}><span style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(232,241,255,0.3)" }}>[ FILM · VIDEO PLACEHOLDER ]</span><span style={{ padding: "6px 0" }}>16:9 · ABOUT 90 SECONDS</span></div>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, textAlign: "center", padding: "40px 24px 150px" }}>
            <button className={`playbig ringpulse`} type="button" onClick={toggle} aria-label={playing ? "Pause the film" : "Play the film"} style={{ width: 104, height: 104, borderRadius: "50%", border: 0, background: "#0077FF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {playing ? <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg> : <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z" /></svg>}
            </button>
            <h2 className="h-light" style={{ lineHeight: 1 }}>
              <span className="serif" style={{ display: "block", fontSize: "clamp(34px, 4vw, 56px)" }}>From bulky hardware</span>
              <span className="wide" style={{ display: "block", fontSize: "clamp(26px, 3.2vw, 46px)", letterSpacing: "-0.02em" }}>TO A SHAREABLE <span className="hl">LINK.</span></span>
            </h2>
            <p className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "rgba(232,241,255,0.8)" }}>THE EVOLUTION OF 3D TECHNOLOGY — FINAL FILM DROPS IN HERE</p>
          </div>
          <div style={{ position: "absolute", left: 24, right: 24, bottom: 22 }}>
            <div className="film-strip" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
              {STRIP.map((s) => (
                <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 16, background: s.last ? "#001B99" : "rgba(232,241,255,0.05)", border: `1px solid ${s.last ? "#0077FF" : "rgba(232,241,255,0.12)"}` }}>
                  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke={s.last ? "#FFFFFF" : "#E8F1FF"} strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" style={{ flex: "none" }}>{s.icon}</svg>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", lineHeight: 1.5, color: s.last ? "#FFFFFF" : "#E8F1FF" }}>{s.n}<br />{s.t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, height: 3, borderRadius: 3, background: "rgba(232,241,255,0.14)", overflow: "hidden" }}>
              {started && <div className="run12" style={{ height: "100%", background: "#0077FF", animationPlayState: playing ? "running" : "paused" }} />}
            </div>
          </div>
        </div>
        <div className="mono" style={{ marginTop: 36, textAlign: "center", fontSize: 12, letterSpacing: "0.14em", color: "var(--muted)" }}>SCROLL TO BEGIN CHAPTER 01 ↓</div>
      </div>
      <style>{`@media(max-width:900px){.film-strip{grid-template-columns:repeat(2,minmax(0,1fr))!important}}@media(max-width:600px){.film-strip>div:nth-child(n+3){display:none!important}}`}</style>
    </section>
  );
}
