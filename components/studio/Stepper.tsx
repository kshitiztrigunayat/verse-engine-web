import Link from "next/link";
import { ROUTES } from "@/lib/links";

const STEPS = ["UPLOAD", "REVIEW", "PREVIEW & SHARE"];

/** Top bar for the New scene flow. `step` is 1-based. */
export function FlowBar({ step, right }: { step: 1 | 2 | 3; right: string }) {
  return (
    <header style={{ borderBottom: "1px solid var(--hair)", background: "var(--bg)" }}>
      <div className="wrap" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "14px 48px" }}>
        <Link href={ROUTES.studio} style={{ fontWeight: 600, minHeight: 44, display: "inline-flex", alignItems: "center" }}>← Back to Studio</Link>
        <ol aria-label="Progress" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {STEPS.map((s, i) => (
            <li key={s} className="step" aria-current={i + 1 === step ? "step" : undefined}><span>{i + 1 < step ? "✓" : i + 1}</span>{s}</li>
          ))}
        </ol>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}>{right}</span>
      </div>
    </header>
  );
}
