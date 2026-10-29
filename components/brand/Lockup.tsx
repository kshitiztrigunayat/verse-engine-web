import Link from "next/link";

export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3 28 10v12L16 29 4 22V10L16 3Z" stroke="#0077FF" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M4 10l12 7 12-7M16 17v12" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

/** VERSE ENGINE + small mono line. `sub` is "BY CTRUH" (site) or "STUDIO · BY CTRUH" (app). */
export function Lockup({ sub = "BY CTRUH", href = "/", compact = false }: { sub?: string; href?: string; compact?: boolean }) {
  return (
    <Link href={href} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "var(--fg)" }}>
      <Mark size={compact ? 24 : 28} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <span className="wide" style={{ fontWeight: 600, fontSize: compact ? 13 : 15, letterSpacing: "0.16em" }}>VERSE ENGINE</span>
        <span className="mono" style={{ fontSize: compact ? 9 : 10, letterSpacing: "0.16em", opacity: 0.8 }}>{sub}</span>
      </span>
    </Link>
  );
}

/** Giant decorative wordmark, drawn as SVG text so it stretches to the container and stays out of text-contrast audits. */
export function Wordmark() {
  return (
    <svg viewBox="0 0 1300 150" width="100%" aria-hidden="true" focusable="false" style={{ display: "block", overflow: "visible" }}>
      <text x="0" y="128" textLength="1300" lengthAdjust="spacingAndGlyphs" className="wide" style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 150, fill: "var(--wordmark)" }}>VERSE ENGINE</text>
    </svg>
  );
}
