"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CH } from "@/lib/data";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Cube } from "@/components/ui/Cube";
import { scrollToY } from "./SmoothScroll";

const BG = ["#001B99", "#001B99", "#001B99"];

function Device({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="appear" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <span style={{ display: "flex", gap: 6 }} aria-hidden="true">{[0, 1, 2].map((k) => <span key={k} style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />)}</span>
          <span className="mono" style={{ flex: 1, padding: "6px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 12, color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden" }}>verse.ctruh.com/v/showroom-sofa</span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "linear-gradient(rgba(0,119,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,255,0.1) 1px, transparent 1px)", backgroundSize: "32px 32px" }}><Cube size="md" style={{ filter: "drop-shadow(0 0 30px rgba(0,119,255,0.8))" }} /></div>
      </div>
    );
  if (i === 1)
    return (
      <div className="appear" style={{ position: "absolute", inset: 0 }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(#0077FF, #001B99)" }} />
        <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, perspective: 300, overflow: "hidden" }}><div style={{ position: "absolute", left: -300, right: -300, top: 0, height: 600, transformOrigin: "50% 0", transform: "rotateX(70deg)", backgroundImage: "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)", backgroundSize: "40px 40px" }} /></div>
        <div className="scan" aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, height: 2, background: "#0077FF", boxShadow: "0 0 20px #0077FF", opacity: 0.6 }} />
        <div className="ring" aria-hidden="true" style={{ position: "absolute", left: "50%", top: 360, width: 180, height: 180, borderRadius: "50%", border: "2px solid #FFFFFF" }} />
        <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: 395, width: 140, height: 30, transform: "translateX(-50%)", borderRadius: "50%", background: "rgba(0,27,153,0.7)", filter: "blur(6px)" }} />
        <Cube size="sm" style={{ position: "absolute", left: "50%", top: 300, transform: "translate(-50%,-50%)" }} />
        <span className="mono" style={{ position: "absolute", top: 26, left: 20, fontSize: 11, padding: "5px 10px", borderRadius: 999, background: "rgba(0,27,153,0.6)" }}>AR · SURFACE FOUND</span>
        <span style={{ position: "absolute", left: "50%", bottom: 30, transform: "translateX(-50%)", whiteSpace: "nowrap", padding: "12px 20px", borderRadius: 999, background: "#FFFFFF", color: "#001B99", fontWeight: 700, fontSize: 14 }}>Place in your room</span>
      </div>
    );
  const lens = (dx: number, k: number) => (
    <div key={k} style={{ width: 290, height: 290, borderRadius: "50%", overflow: "hidden", backgroundImage: "linear-gradient(rgba(0,119,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,255,0.18) 1px, transparent 1px)", backgroundSize: "26px 26px", backgroundColor: "#001B99", border: "2px solid #0077FF", display: "flex", alignItems: "center", justifyContent: "center" }}><Cube size="md" style={{ transform: `translateX(${dx}px)` }} /></div>
  );
  return (
    <div className="appear" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
      {lens(10, 0)}{lens(-10, 1)}
      <span className="mono" style={{ position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)", fontSize: 11, letterSpacing: "0.12em", color: "#FFFFFF" }}>XR VIEW · STEREO</span>
    </div>
  );
}

export function Realities() {
  const rm = useReducedMotion();
  const sec = useRef<HTMLElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);
  const [ch, setCh] = useState(0);
  const hold = useRef(0);
  const [inRef, vis] = useInView<HTMLDivElement>();
  const [scale, setScale] = useState(1);
  const pinned = wide && !rm;

  useEffect(() => {
    const q = matchMedia("(min-width: 1024px)");
    const h = () => setWide(q.matches);
    h(); q.addEventListener("change", h);
    return () => q.removeEventListener("change", h);
  }, []);

  // Fit the device (up to 640px wide) into narrow containers.
  useEffect(() => {
    const el = holder.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / 660)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Desktop: pin and step by scroll.
  useEffect(() => {
    if (!pinned) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({ trigger: sec.current, start: "top top", end: "bottom bottom", onUpdate: (s) => setCh(Math.min(2, Math.floor(s.progress * 3))) });
    return () => st.kill();
  }, [pinned]);

  // Otherwise autoplay every 3.6s.
  useEffect(() => {
    if (pinned || rm || !vis) return;
    const t = setInterval(() => { if (hold.current > 0) { hold.current--; return; } setCh((c) => (c + 1) % 3); }, 3600);
    return () => clearInterval(t);
  }, [pinned, rm, vis]);

  const pick = (j: number) => {
    if (pinned && sec.current) {
      const top = sec.current.getBoundingClientRect().top + scrollY;
      scrollToY(top + (sec.current.offsetHeight - innerHeight) * ((j + 0.5) / 3));
    } else { hold.current = 2; setCh(j); }
  };

  const c = CH[ch];
  return (
    <section ref={sec} aria-label="Chapter 04 — Every reality" style={{ position: "relative", height: pinned ? "calc(100vh * 2.6)" : "auto", borderTop: "1px solid var(--hair-soft)" }}>
      <div style={{ position: pinned ? "sticky" : "relative", top: 0, minHeight: pinned ? "100vh" : 0, overflow: "hidden", padding: pinned ? "0" : "90px 0" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: "70%", top: "50%", width: 1100, height: 1000, transform: "translate(-50%,-50%)", background: "radial-gradient(closest-side, var(--glow), var(--glow-edge) 50%, transparent)" }} />
        <div className="wrap" style={{ position: "relative", minHeight: pinned ? "100vh" : 0, paddingTop: pinned ? 90 : 0 }}>
          <div className="mono eyebrow" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><span className="label">CHAPTER 04 · EVERY REALITY</span><span style={{ color: "var(--muted)" }}>SAME LINK · THREE WAYS IN</span></div>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: wide ? "minmax(0, 1fr) minmax(0, 1.15fr)" : "minmax(0, 1fr)", gap: 48, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 36 }}>
              <nav aria-label="Chapters" style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 8 }}>
                {CH.map((x, j) => (
                  <button key={x.label} type="button" onClick={() => pick(j)} aria-current={j === ch} style={{ display: "flex", gap: 14, alignItems: "stretch", minHeight: 44, background: "none", border: 0, padding: 0, textAlign: "left", cursor: "pointer" }}>
                    <span style={{ width: 2, background: "var(--hair)", position: "relative", overflow: "hidden" }}><span style={{ position: "absolute", left: 0, top: 0, width: 2, height: j <= ch ? "100%" : "0%", background: "var(--blue)", transition: "height .6s" }} /></span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 2, padding: "4px 0" }}><span className="mono" style={{ fontSize: 11, color: j === ch ? "var(--label)" : "var(--muted)" }}>{`0${j + 1}`}</span><span className="mono" style={{ fontSize: 13, letterSpacing: "0.1em", color: j === ch ? "var(--fg)" : "var(--muted)" }}>{x.label}</span></span>
                  </button>
                ))}
              </nav>
              <div key={ch} className="fadeup" aria-live="polite" style={{ maxWidth: 420 }}>
                <span className="mono" style={{ display: "inline-block", fontSize: 12, letterSpacing: "0.1em", padding: "6px 12px", borderRadius: 999, background: "#0077FF", color: "#fff" }}>{c.tag}</span>
                <h2 className="h-light" style={{ marginTop: 26 }}>
                  <span className="serif" style={{ display: "block", fontSize: "clamp(56px, 6vw, 84px)" }}>{c.lead}</span>
                  <span className="wide" style={{ display: "block", fontSize: "clamp(32px, 3.4vw, 46px)", letterSpacing: "-0.02em", textTransform: "uppercase", whiteSpace: "pre-line" }}>{c.rest}</span>
                </h2>
                <p className="mono" style={{ marginTop: 28, fontSize: 13, lineHeight: 1.7, letterSpacing: "0.04em", color: "var(--body)", textTransform: "uppercase" }}>{c.body}</p>
              </div>
            </div>
            <div ref={inRef} style={{ minWidth: 0 }}><div ref={holder}>
              <div style={{ height: 640 * scale, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ transform: `scale(${scale})`, transformOrigin: "center center", flex: "none" }}>
                  <div className="morph force-dark" style={{ position: "relative", width: c.w, height: c.h, borderRadius: c.r, background: BG[ch], border: "1px solid rgba(255,255,255,0.25)", overflow: "hidden", boxShadow: "0 50px 120px rgba(0,27,153,0.6)", color: "#fff" }}>
                    <div key={ch} style={{ position: "absolute", inset: 0 }}><Device i={ch} /></div>
                  </div>
                </div>
              </div>
              <div className="mono" style={{ marginTop: 14, textAlign: "center", fontSize: 12, letterSpacing: "0.12em", color: "var(--muted)" }}>{c.device}</div>
            </div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
