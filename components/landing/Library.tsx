"use client";
import { useEffect, useRef, useState } from "react";
import { LIB_ROWS } from "@/lib/data";
import { LINKS } from "@/lib/links";
import { useReducedMotion } from "@/lib/hooks";
import { Cube } from "@/components/ui/Cube";

const SK = { fill: "none", stroke: "#E8F1FF", strokeWidth: 1.6 } as const;
function Sketch({ kind }: { kind: string }) {
  const p = { width: 240, height: 150, viewBox: "0 0 260 160", ...SK, "aria-hidden": true } as const;
  if (kind === "plan") return <svg {...p}><rect x="10" y="10" width="240" height="140" /><path d="M110 10v80M110 120v30M10 80h70M140 80h110M180 80v70" /><path d="M80 80a30 30 0 0 1 30 30" stroke="#0077FF" /><rect x="30" y="28" width="50" height="30" stroke="#0077FF" /></svg>;
  if (kind === "config") return <svg {...p}><path d="M40 70h150v50H40zM40 70V50a10 10 0 0 1 10-10h130a10 10 0 0 1 10 10v20M30 75h20v45H30zM180 75h20v45h-20z" /><circle cx="226" cy="44" r="10" fill="#0077FF" stroke="none" /><circle cx="226" cy="74" r="10" fill="#E8F1FF" stroke="none" /><circle cx="226" cy="104" r="10" fill="#070B1F" /></svg>;
  if (kind === "home") return <svg {...p} strokeLinejoin="round"><path d="M60 80 130 40l70 40v60H60z" /><path d="M40 92 130 30l90 62" stroke="#0077FF" /><rect x="112" y="100" width="36" height="40" /></svg>;
  return <svg {...p} strokeLinejoin="round"><path d="M20 140V80l40-25v25l40-25v25l40-25v25l40-25v85z" /><path d="M200 140V40h20v100" /><circle cx="60" cy="110" r="6" fill="#0077FF" stroke="none" /><circle cx="140" cy="110" r="6" fill="#0077FF" stroke="none" /><path d="M66 110h68" stroke="#0077FF" strokeDasharray="3 4" /></svg>;
}

export function Library() {
  const rm = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const pend = useRef(false);
  const pos = useRef({ x: 860, y: 60 });
  const [h, setH] = useState(1);
  const [xy, setXy] = useState({ x: 860, y: 60 });
  const [w, setW] = useState(1000);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const move = (e: React.MouseEvent) => {
    if (rm || !box.current) return;
    const r = box.current.getBoundingClientRect();
    pos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!pend.current) { pend.current = true; requestAnimationFrame(() => { pend.current = false; setXy(pos.current); }); }
  };
  const px = Math.max(0, Math.min(w - 330, xy.x + 40)), py = Math.max(-40, Math.min(300, xy.y - 140));

  return (
    <section aria-label="Chapter 08 — Library" style={{ position: "relative", padding: "110px 0 120px", borderTop: "1px solid var(--hair-soft)" }}>
      <div className="wrap">
        <div className="row-between" style={{ marginBottom: 56 }}>
          <div>
            <span className="mono label eyebrow">CHAPTER 08 · DON’T START FROM ZERO</span>
            <h2 className="h-light" style={{ marginTop: 18 }}><span className="serif" style={{ fontSize: "clamp(52px, 6vw, 84px)" }}>The pre-built</span>{" "}<span className="wide" style={{ fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "-0.02em", fontWeight: 600 }}>LIBRARY</span></h2>
          </div>
          <p className="note" style={{ maxWidth: 340 }}>LIVE SCENES OTHER TEAMS SHIPPED. HOVER TO PEEK, OPEN ONE TO MAKE IT YOURS.</p>
        </div>
        {/* [PLACEHOLDER: real thumbnails / turntables and template URLs → LINKS.templates] */}
        <div ref={box} onMouseMove={move} style={{ position: "relative", borderTop: "1px solid var(--hair-strong)" }}>
          {LIB_ROWS.map((r, j) => {
            const on = j === h;
            return (
              <a key={r.title} className="row-link lib-row" href={LINKS.templates} onMouseEnter={() => setH(j)} onFocus={() => setH(j)} style={{ display: "grid", gridTemplateColumns: "70px minmax(0, 1fr) 200px 130px", alignItems: "center", padding: `30px 0 30px ${on && !rm ? 28 : 0}px`, borderBottom: "1px solid var(--hair-strong)", color: on ? "var(--fg)" : "var(--muted)" }}>
                <span className="mono" style={{ fontSize: 13, color: on ? "var(--label)" : "var(--muted)" }}>{`0${j + 1}`}</span>
                <span className="wide" style={{ fontWeight: on ? 500 : 300, fontSize: "clamp(22px, 3vw, 40px)", letterSpacing: "-0.02em", lineHeight: 1 }}>{r.title}</span>
                <span className="mono lib-tags" style={{ fontSize: 12, letterSpacing: "0.12em" }}>{r.tags}</span>
                <span className="mono lib-go" style={{ fontSize: 12, letterSpacing: "0.12em", textAlign: "right" }}>EXPLORE →</span>
              </a>
            );
          })}
          <div className="force-dark lib-preview" aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, width: 320, pointerEvents: "none", transform: `translate(${px}px, ${py}px)`, transition: "transform .45s cubic-bezier(.2,.8,.2,1)", zIndex: 5 }}>
            <div key={h} className="swap" style={{ borderRadius: 24, overflow: "hidden", background: "#001B99", border: "1px solid rgba(232,241,255,0.3)", boxShadow: "0 40px 80px rgba(7,11,31,0.5)" }}>
              <div style={{ position: "relative", height: 200, backgroundImage: "linear-gradient(rgba(232,241,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,241,255,0.1) 1px, transparent 1px)", backgroundSize: "22px 22px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sketch kind={LIB_ROWS[h].kind} />
                <Cube size="xs" style={{ position: "absolute", right: 18, top: 18 }} />
              </div>
              <div style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#070B1F", color: "#fff" }}><span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "#E8F1FF" }}>{LIB_ROWS[h].caption}</span><span style={{ fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 999, background: "#0077FF" }}>Open</span></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.lib-row{grid-template-columns:36px minmax(0,1fr) auto!important}.lib-tags{display:none}.lib-go{font-size:11px!important}.lib-preview{display:none}}@media(hover:none){.lib-preview{display:none}}`}</style>
    </section>
  );
}
