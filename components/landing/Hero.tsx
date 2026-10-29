"use client";
import Link from "next/link";
import { useEntered } from "./Shell";
import { HeroFilm } from "./HeroFilm";
import { ROUTES } from "@/lib/links";

const ArrowUR = ({ c = "#FFFFFF" }: { c?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export function Hero() {
  const entered = useEntered();

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

        <HeroFilm />
        <div className="mono" style={{ marginTop: 36, textAlign: "center", fontSize: 12, letterSpacing: "0.14em", color: "var(--muted)" }}>SCROLL TO BEGIN CHAPTER 01 ↓</div>
      </div>
    </section>
  );
}
