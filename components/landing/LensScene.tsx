"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAPS, LP } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";
import { Cube } from "@/components/ui/Cube";
import { scrollToY } from "./SmoothScroll";

type V = (typeof LP)[number];
const N = LP.length;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

/** Interpolate the LP keyframes continuously. Keyframes sit at the centre of each phase. */
function sample(p: number): V {
  const t = Math.min(Math.max(p * N - 0.5, 0), N - 1);
  const i = Math.min(Math.floor(t), N - 2), f = ease(t - i);
  const a = LP[i], b = LP[i + 1];
  return {
    blur: lerp(a.blur, b.blur, f), tOp: lerp(a.tOp, b.tOp, f), tS: lerp(a.tS, b.tS, f),
    hs: Math.exp(lerp(Math.log(a.hs), Math.log(b.hs), f)), hr: lerp(a.hr, b.hr, f), hOp: lerp(a.hOp, b.hOp, f),
    wOp: lerp(a.wOp, b.wOp, f), wS: lerp(a.wS, b.wS, f), prog: lerp(a.prog, b.prog, f),
  };
}

const wallStyle = (v: V) => ({ opacity: v.wOp, transform: `scale(${v.wS})` });
const textStyle = (v: V) => ({ filter: `blur(${v.blur}px)`, opacity: v.tOp, transform: `scale(${v.tS})` });
const visorStyle = (v: V) => ({ opacity: v.hOp, transform: `translate(-50%,-50%) scale(${v.hs}) rotate(${v.hr}deg)` });

function Stage({ v, root, phase, onDot, trans }: { v: V; root?: React.Ref<HTMLDivElement>; phase: number; onDot: (i: number) => void; trans: boolean }) {
  const t = trans ? " ease14" : "";
  return (
    <div ref={root} style={{ position: "relative", height: "100%", minHeight: 760, overflow: "hidden" }}>
      <div data-l="wall" className={t} aria-hidden="true" style={{ position: "absolute", inset: 0, ...wallStyle(v) }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 1600, height: 900, transform: "translate(-50%,-50%)", background: "radial-gradient(closest-side, var(--glow), transparent)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "45%", perspective: 520, overflow: "hidden", maskImage: "linear-gradient(transparent, #FFFFFF 55%)", WebkitMaskImage: "linear-gradient(transparent, #FFFFFF 55%)" }}>
          <div className="floor" style={{ position: "absolute", left: -900, right: -900, top: 0, height: 900, transformOrigin: "50% 0", transform: "rotateX(74deg)", backgroundImage: "linear-gradient(var(--grid) 1.5px, transparent 1.5px), linear-gradient(90deg, var(--grid) 1.5px, transparent 1.5px)", backgroundSize: "70px 70px" }} />
        </div>
        <div className="ring" style={{ position: "absolute", left: "50%", top: "62%", width: 340, height: 340, borderRadius: "50%", border: "2px solid var(--blue)" }} />
        <Cube style={{ position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-50%)", filter: "drop-shadow(0 0 40px rgba(0,119,255,0.8))" }} />
        <div className="mono" style={{ position: "absolute", left: "50%", top: "18%", transform: "translateX(-50%)", padding: "10px 18px", borderRadius: 999, background: "var(--surface-2)", border: "1px solid var(--grid)", fontSize: 14, whiteSpace: "nowrap" }}>verse.ctruh.com/v/warehouse-twin</div>
      </div>

      <div data-l="text" className={`wide${t}`} role="img" aria-label="Heavy files. App installs. Crashes." style={{ position: "absolute", left: "clamp(16px,3.4vw,48px)", right: "clamp(16px,3.4vw,48px)", top: 124, fontWeight: 300, fontSize: "clamp(56px, 10.4vw, 150px)", lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase", ...textStyle(v) }}>
        <div>Heavy files.</div>
        <div style={{ fontWeight: 500 }}>App installs.</div>
        <div><span className="serif" style={{ fontStretch: "100%", textTransform: "none", color: "var(--accent)" }}>Crashes.</span></div>
      </div>
      <span className="mono label eyebrow" style={{ position: "absolute", left: "clamp(16px,3.4vw,48px)", top: 86 }}>CHAPTER 01 · THE WALL</span>

      <div data-l="visor" className={t} aria-hidden="true" style={{ position: "absolute", left: "50%", top: "52%", width: 600, maxWidth: "92vw", ...visorStyle(v), filter: "drop-shadow(0 40px 60px rgba(7,11,31,0.6))" }}>
        <svg width="100%" viewBox="0 0 600 300">
          <defs>
            <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#001B99" /><stop offset="1" stopColor="#070B1F" /></linearGradient>
            <pattern id="lensgrid" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M18 0H0v18" fill="none" stroke="#0077FF" strokeOpacity="0.55" strokeWidth="1" /></pattern>
          </defs>
          <path d="M30 150c-28 0-28-40 0-40h20v40Z M570 150c28 0 28-40 0-40h-20v40Z" fill="#001B99" />
          <rect x="40" y="50" width="520" height="210" rx="100" fill="url(#visor)" stroke="#E8F1FF" strokeOpacity="0.35" strokeWidth="2" />
          {[185, 415].map((cx) => (<g key={cx}><ellipse cx={cx} cy="155" rx="105" ry="72" fill="#070B1F" /><ellipse cx={cx} cy="155" rx="105" ry="72" fill="url(#lensgrid)" stroke="#0077FF" strokeWidth="3" /></g>))}
          <path d="M120 112c20-22 50-30 80-26" stroke="#E8F1FF" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M350 112c20-22 50-30 80-26" stroke="#E8F1FF" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M265 260c10-34 60-34 70 0" fill="#070B1F" />
        </svg>
      </div>

      <div style={{ position: "absolute", left: "clamp(16px,3.4vw,48px)", bottom: 110, width: "min(560px, 80vw)" }} aria-live="polite">
        <div key={phase} className="fadeup"><span className="mono label" style={{ fontSize: 12 }}>{`0${phase + 1} / 04`}</span><div style={{ marginTop: 8, fontSize: "clamp(22px, 2.3vw, 32px)", lineHeight: 1.2 }}>{CAPS[phase]}</div></div>
      </div>
      <div style={{ position: "absolute", right: "clamp(8px,3vw,48px)", bottom: 116, display: "flex", gap: 4 }}>
        {[0, 1, 2, 3].map((i) => (
          <button key={i} type="button" onClick={() => onDot(i)} aria-label={`Go to step ${i + 1}`} aria-current={i === phase} style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: 0, cursor: "pointer" }}>
            <span style={{ display: "block", width: i === phase ? 28 : 8, height: 6, borderRadius: 6, background: i === phase ? "var(--blue)" : "var(--hair-strong)", transition: "width .4s, background .4s" }} />
          </button>
        ))}
      </div>
      <div style={{ position: "absolute", left: "clamp(16px,3.4vw,48px)", right: "clamp(16px,3.4vw,48px)", bottom: 40 }}>
        <div className="mono" style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12, letterSpacing: "0.12em", color: "var(--muted)" }}><span>THE WALL <span className="hide-sm" style={{ marginLeft: 24 }}>WHERE 3D GETS STUCK</span></span><span className="hide-sm">KEEP SCROLLING —</span><span>{`0${phase + 1} / 04`}</span></div>
        <div style={{ marginTop: 14, height: 2, background: "var(--hair)" }}><div data-l="bar" className={trans ? "" : ""} style={{ height: "100%", width: `${v.prog}%`, background: "var(--blue)", transition: trans ? "width 1.2s cubic-bezier(.65,0,.25,1)" : "none" }} /></div>
      </div>
    </div>
  );
}

export function LensScene() {
  const rm = useReducedMotion();
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [auto, setAuto] = useState(false);
  const hold = useRef(0);

  // Can the page scroll at all? (Embeds / tiny viewports can't → auto-advance every 2.7s.)
  useEffect(() => {
    const check = () => setAuto(document.documentElement.scrollHeight <= innerHeight + 60);
    const t = setTimeout(check, 400);
    addEventListener("resize", check);
    return () => { clearTimeout(t); removeEventListener("resize", check); };
  }, []);

  const apply = useCallback((p: number) => {
    const el = stage.current;
    if (!el) return;
    const v = sample(p);
    const set = (k: string, s: Record<string, string | number>) => { const n = el.querySelector<HTMLElement>(`[data-l="${k}"]`); if (n) Object.assign(n.style, s); };
    set("wall", wallStyle(v) as never); set("text", textStyle(v) as never); set("visor", visorStyle(v) as never);
    set("bar", { width: `${v.prog}%` });
    const ph = Math.min(N - 1, Math.floor(p * N));
    setPhase((cur) => (cur === ph ? cur : ph));
  }, []);

  // Scroll-scrubbed (forwards and backwards).
  useEffect(() => {
    if (rm || auto) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({ trigger: sec.current, start: "top top", end: "bottom bottom", onUpdate: (s) => apply(s.progress) });
    apply(st.progress);
    return () => st.kill();
  }, [rm, auto, apply]);

  // Auto-advance fallback.
  useEffect(() => {
    if (rm || !auto) return;
    const t = setInterval(() => {
      if (hold.current > 0) { hold.current--; return; }
      setPhase((p) => (p + 1) % N);
    }, 2700);
    return () => clearInterval(t);
  }, [rm, auto]);
  useEffect(() => { if (auto) apply((phase + 0.5) / N); }, [auto, phase, apply]);

  const go = (i: number) => {
    if (auto) { hold.current = 2; setPhase(i); return; }
    const s = sec.current; if (!s) return;
    const top = s.getBoundingClientRect().top + scrollY;
    scrollToY(top + (s.offsetHeight - innerHeight) * ((i + 0.5) / N));
  };

  // Reduced motion: the four lens frames stacked, no scrubbing.
  if (rm) {
    return (
      <section id="lens" aria-label="Chapter 01 — The Wall">
        {LP.map((v, i) => <div key={i} style={{ height: 820, borderTop: i ? "1px solid var(--hair)" : 0 }}><Stage v={v} phase={i} onDot={() => {}} trans={false} /></div>)}
      </section>
    );
  }
  const v0 = sample(((auto ? phase : 0) + 0.5) / N);
  return (
    <section id="lens" ref={sec} aria-label="Chapter 01 — The Wall" style={{ position: "relative", height: auto ? 900 : "calc(100vh * 3.4)" }}>
      <div style={{ position: auto ? "relative" : "sticky", top: 0, height: auto ? 900 : "100vh", minHeight: 760, overflow: "hidden" }}>
        <Stage v={v0} root={stage} phase={phase} onDot={go} trans={auto} />
      </div>
    </section>
  );
}
