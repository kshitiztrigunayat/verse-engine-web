import Link from "next/link";
import { PCARDS } from "@/lib/data";
import { ROUTES } from "@/lib/links";
import { TiltCard } from "@/components/ui/TiltCard";

const ICONS = {
  orbit: <><circle cx="18" cy="17" r="6" /><path d="M4 8l11 6M4 14l8 4" /></>,
  cube: <><path d="M16 4 27 10v12L16 28 5 22V10L16 4Z" strokeLinejoin="round" /><path d="M5 10l11 6 11-6M16 16v12" strokeLinejoin="round" /></>,
  peak: <><circle cx="16" cy="16" r="12" /><path d="M9 22l5-9 3 5 2-3 4 7" strokeLinejoin="round" /></>,
} as const;

export function Tools() {
  return (
    <section id="platforms" aria-label="Chapter 05 — Your tools, untouched" style={{ position: "relative", padding: "120px 0 140px", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: -300, width: 1200, height: 600, transform: "translateX(-50%)", background: "radial-gradient(closest-side, var(--glow-edge), transparent)" }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="row-between" style={{ marginBottom: 56 }}>
          <div>
            <span className="mono label eyebrow">CHAPTER 05 · YOUR TOOLS, UNTOUCHED</span>
            <h2 className="wide h-light" style={{ marginTop: 18, fontSize: "clamp(40px, 4.7vw, 68px)", letterSpacing: "-0.02em", lineHeight: 0.98 }}>CROSS PLATFORM<br /><span style={{ fontWeight: 600 }}>FUNCTIONALITY</span></h2>
          </div>
          <p className="note" style={{ maxWidth: 340 }}>NO EXPORT DANCE. ONE BUTTON INSIDE THE EDITOR YOU ALREADY LIVE IN — <Link href={ROUTES.plugins} style={{ color: "var(--fg)" }}>SEE ALL PLUG-INS →</Link></p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 22 }}>
          {PCARDS.map((c, i) => {
            const soon = c.icon === "soon";
            return (
              <TiltCard key={c.name} soon={soon}>
                {!soon && <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "40%", width: 340, height: 340, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,119,255,0.75), rgba(0,27,153,0.3) 60%, rgba(0,27,153,0))" }} />}
                <div className="tg" aria-hidden="true" />
                <div className="mono lift-sm" style={{ position: "relative", display: "flex", justifyContent: "space-between", fontSize: 12, letterSpacing: "0.1em", gap: 8 }}><span>{`[0${i + 1}]`}</span><span>{c.tag}</span></div>
                {!soon ? (
                  <div className="lift" style={{ position: "relative", alignSelf: "center", width: 92, height: 92, borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 24px 50px rgba(7,11,31,0.5)" }}>
                    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="#001B99" strokeWidth="2.2" aria-hidden="true">{ICONS[c.icon as keyof typeof ICONS]}</svg>
                  </div>
                ) : (
                  <div className="lift" style={{ alignSelf: "center", width: 92, height: 92, borderRadius: "50%", border: "2px dashed var(--hair-strong)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  </div>
                )}
                <div className="lift-sm" style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3 className="wide" style={{ fontWeight: 500, fontSize: 28, letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1.1 }}>{c.name}</h3>
                  <span style={{ fontSize: 15, lineHeight: 1.5, opacity: 0.88 }}>{c.desc}</span>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
