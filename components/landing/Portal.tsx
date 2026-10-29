import Link from "next/link";
import { Wordmark } from "@/components/brand/Lockup";
import { ThemeToggle } from "@/components/brand/ThemeToggle";
import { LINKS, ROUTES } from "@/lib/links";
import { Clock } from "./Clock";

const FOOT: [string, string][] = [["STUDIO", ROUTES.studio], ["PLUG-INS", ROUTES.plugins], ["DEVELOPERS", ROUTES.developers], ["DOCS", ROUTES.docs], ["EXPLORE", ROUTES.explore], ["PRICING", ROUTES.pricing], ["ABOUT", ROUTES.about]];

export function Portal() {
  return (
    <section aria-label="Epilogue" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "relative", height: 640, overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 900, height: 700, transform: "translate(-50%,-50%)", background: "radial-gradient(closest-side, var(--glow), transparent)" }} />
          {[0, -0.75, -1.5, -2.25, -3, -3.75, -4.5, -5.25].map((d, i) => <div key={d} className="frame" style={{ animationDelay: `${d}s`, borderColor: i === 4 ? "var(--tint)" : undefined }} />)}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20, padding: "0 16px" }}>
          <span className="mono eyebrow">EPILOGUE · THE NEXT CHAPTER IS YOURS</span>
          <h2 className="h-light">
            <span className="serif" style={{ display: "block", fontSize: "clamp(44px, 6.1vw, 88px)" }}>It started with rigs.</span>
            <span className="wide" style={{ display: "block", fontSize: "clamp(40px, 5.8vw, 84px)", letterSpacing: "-0.03em" }}>IT ENDS WITH <span className="hl">YOU.</span></span>
          </h2>
          <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="cta cta-blue cta-lg" href={ROUTES.signin}>Explore Studio</Link>
            <Link className="cta cta-ghost cta-lg" href={ROUTES.pricing}>See pricing</Link>
          </div>
        </div>
      </div>
      <footer className="wrap" style={{ position: "relative", paddingTop: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-start", borderTop: "1px solid var(--hair)", paddingTop: 22 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.12em", lineHeight: 1.8, color: "var(--muted)" }}>IST / LOCAL TIME<br /><Clock /></div>
          <nav aria-label="Footer" className="mono" style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 12, letterSpacing: "0.12em" }}>
            {FOOT.map(([t, h]) => <Link key={t} href={h} style={{ textDecoration: "none", padding: "12px 8px" }}>{t}</Link>)}
          </nav>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.12em", textAlign: "right", lineHeight: 1.8, color: "var(--muted)", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <span>© 2026 CTRUH TECHNOLOGIES<br />{LINKS.email.toUpperCase()}</span>
            <ThemeToggle />
          </div>
        </div>
        <div style={{ marginTop: 56, marginBottom: -14, height: "clamp(50px, 9vw, 126px)", overflow: "hidden" }}><Wordmark /></div>
      </footer>
    </section>
  );
}
