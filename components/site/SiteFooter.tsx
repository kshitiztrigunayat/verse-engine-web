import Link from "next/link";
import { Wordmark } from "@/components/brand/Lockup";
import { ThemeToggle } from "@/components/brand/ThemeToggle";
import { LINKS, ROUTES } from "@/lib/links";

const COLS: { h: string; items: [string, string][] }[] = [
  { h: "START BUILDING", items: [["Studio", ROUTES.studio], ["New scene", ROUTES.newScene], ["Sign in", ROUTES.signin], ["Pricing", ROUTES.pricing]] },
  { h: "PLUG-INS", items: [["Blender", ROUTES.plugin("blender")], ["Unity", ROUTES.plugin("unity")], ["Unreal", ROUTES.plugin("unreal")], ["All plug-ins", ROUTES.plugins]] },
  { h: "DEVELOPERS", items: [["API & SDK", ROUTES.developers], ["Documentation", ROUTES.docs]] },
  { h: "EXPLORE", items: [["Blogs", ROUTES.explore], ["Research", ROUTES.explore], ["Events", ROUTES.explore]] },
  { h: "ABOUT", items: [["About Ctruh", ROUTES.about], ["About Verse Engine", ROUTES.about]] },
];

export function SiteFooter() {
  return (
    <footer style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--hair)", paddingTop: 64 }}>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40 }}>
        <div style={{ gridColumn: "span 2", minWidth: 220 }}>
          <span className="wide" style={{ fontWeight: 600, fontSize: 15, letterSpacing: "0.16em" }}>VERSE ENGINE <span className="mono" style={{ fontSize: 10, opacity: 0.8 }}>BY CTRUH</span></span>
          <p style={{ marginTop: 14, color: "var(--body)", maxWidth: 300 }}>Any 3D world, as a link. Built in Bengaluru and San Francisco.</p>
        </div>
        {COLS.map((c) => (
          <nav key={c.h} aria-label={c.h} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="mono label eyebrow" style={{ marginBottom: 8 }}>{c.h}</span>
            {c.items.map(([t, h]) => <Link key={t} href={h} style={{ textDecoration: "none", color: "var(--body)", minHeight: 32, display: "flex", alignItems: "center" }}>{t}</Link>)}
          </nav>
        ))}
      </div>
      <div className="wrap mono" style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", fontSize: 12, letterSpacing: "0.1em", color: "var(--muted)" }}>
        <span>© 2026 CTRUH TECHNOLOGIES PRIVATE LIMITED · {LINKS.email.toUpperCase()}</span>
        <span style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <a href={LINKS.legal.terms}>TERMS</a><a href={LINKS.legal.privacy}>PRIVACY</a><a href={LINKS.legal.refunds}>REFUNDS</a>
          <ThemeToggle />
        </span>
      </div>
      <div style={{ marginTop: 40, marginBottom: -12, overflow: "hidden", height: "clamp(44px, 8vw, 110px)" }}><Wordmark /></div>
    </footer>
  );
}

export function SlimFooter() {
  return (
    <footer className="mono" style={{ borderTop: "1px solid var(--hair)", padding: "28px 0", fontSize: 12, letterSpacing: "0.1em", color: "var(--muted)" }}>
      <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
        <span>© 2026 CTRUH TECHNOLOGIES PRIVATE LIMITED</span>
        <span style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <Link href={ROUTES.developers}>API &amp; SDK</Link><Link href={ROUTES.explore}>BLOG</Link><Link href={ROUTES.home}>HOME</Link>
          <ThemeToggle />
        </span>
      </div>
    </footer>
  );
}
