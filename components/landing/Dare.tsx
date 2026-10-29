import { LINKS } from "@/lib/links";
import { Marquee } from "@/components/ui/Marquee";

export function Dare() {
  return (
    <section className="band" aria-label="Chapter 06 — The dare" style={{ padding: "110px 0 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: -200, top: -200, width: 720, height: 720, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.14)" }} />
      <div aria-hidden="true" style={{ position: "absolute", right: -60, top: -60, width: 440, height: 440, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="mono eyebrow" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><span>CHAPTER 06 · THE DARE</span><span>THE VERSE ENGINE CHALLENGE IS LIVE</span></div>
        <h2 className="h-light" style={{ marginTop: 30, maxWidth: 1150 }}>
          <span className="serif" style={{ fontSize: "clamp(52px, 6.7vw, 96px)" }}>Bring a scene</span>{" "}
          <span className="wide" style={{ fontSize: "clamp(40px, 6.1vw, 88px)", letterSpacing: "-0.03em" }}>NO BROWSER <span style={{ fontWeight: 800 }}>CAN OPEN.</span></span>
        </h2>
        <div style={{ marginTop: 44, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.25)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 28 }}>
          <p style={{ fontSize: 22, fontWeight: 600, maxWidth: 600 }}>Send your heaviest file—if Verse Engine fails to stream it, you win.</p>
          <a className="cta cta-white cta-lg" href={LINKS.challenge}>Take the Challenge <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#001B99" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg></a>
        </div>
      </div>
      <div style={{ marginTop: 80, padding: "18px 0 26px", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <Marquee outline size={64} weight={600} text="YOUR HEAVIEST FILE ✦ OUR ENGINE ✦ ONE BROWSER TAB ✦ LIVE FINALS 08 NOV ✦ " />
      </div>
    </section>
  );
}
