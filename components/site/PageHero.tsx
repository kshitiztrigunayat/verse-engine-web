/** Shared hero backdrop for inner pages: star dots, glow, optional wire floor. */
export function PageHero({ children, floor = false, padBottom = 88, id }: { children: React.ReactNode; floor?: boolean; padBottom?: number; id?: string }) {
  return (
    <section id={id} style={{ position: "relative", overflow: "hidden", padding: `88px 0 ${padBottom}px` }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(var(--hair-strong) 1px, transparent 1.4px)", backgroundSize: "140px 110px", opacity: 0.5 }} />
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: 260, width: 1600, height: 600, transform: "translate(-50%,-50%)", background: "radial-gradient(closest-side, var(--glow), var(--glow-edge) 50%, transparent)" }} />
      {floor && (
        <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, perspective: 520, overflow: "hidden", maskImage: "linear-gradient(transparent, #FFFFFF 55%)", WebkitMaskImage: "linear-gradient(transparent, #FFFFFF 55%)" }}>
          <div className="floor" style={{ position: "absolute", left: -900, right: -900, top: 0, height: 900, transformOrigin: "50% 0", transform: "rotateX(76deg)", backgroundImage: "linear-gradient(var(--grid) 1.5px, transparent 1.5px), linear-gradient(90deg, var(--grid) 1.5px, transparent 1.5px)", backgroundSize: "80px 80px" }} />
        </div>
      )}
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </section>
  );
}

export function Heading({ eyebrow, serif, wide, hl, size = 72 }: { eyebrow?: string; serif?: string; wide: string; hl?: string; size?: number }) {
  return (
    <>
      {eyebrow && <span className="mono fadeup eyebrow" style={{ display: "inline-block" }}>{eyebrow}</span>}
      <h1 className="h-light" style={{ marginTop: 18 }}>
        {serif && <span className="mask"><span className="rise serif" style={{ fontSize: `clamp(48px, ${size / 14}vw, ${size + 24}px)` }}>{serif}</span></span>}
        <span className="mask"><span className="rise wide" style={{ fontSize: `clamp(34px, ${size / 16}vw, ${size}px)`, letterSpacing: "-0.02em", animationDelay: ".12s" }}>{wide}{hl && <> <span className="hl">{hl}</span></>}</span></span>
      </h1>
    </>
  );
}
