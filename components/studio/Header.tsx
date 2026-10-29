export function PageTitle({ eyebrow, serif, wide, sub }: { eyebrow: string; serif: string; wide: string; sub?: string }) {
  return (
    <div>
      <span className="mono label eyebrow">{eyebrow}</span>
      <h1 className="h-light" style={{ marginTop: 10 }}><span className="serif" style={{ fontSize: "clamp(40px, 4vw, 56px)" }}>{serif}</span> <span className="wide" style={{ fontSize: "clamp(30px, 3vw, 44px)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>{wide}</span></h1>
      {sub && <p style={{ marginTop: 10, color: "var(--body)", fontSize: 17 }}>{sub}</p>}
    </div>
  );
}
