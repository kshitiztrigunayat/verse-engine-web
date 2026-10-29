"use client";
export function Odometer({ value, unit, rolled, index }: { value: string; unit: string; rolled: boolean; index: number }) {
  return (
    <div className="wide" role="img" aria-label={`${value}${unit}`} style={{ fontWeight: 700, fontSize: "clamp(64px, 7vw, 96px)", lineHeight: 1, display: "flex", alignItems: "flex-start" }}>
      {value.split("").map((ch, j) => {
        const digit = ch >= "0" && ch <= "9";
        if (!digit) return <span key={j} aria-hidden="true">.</span>;
        const n = parseInt(ch, 10);
        return (
          <span key={j} className="roller" aria-hidden="true">
            <span className="roller-col" style={{ transform: `translateY(${rolled ? `-${10 + n}em` : "0em"})`, transitionDelay: `${(index * 0.14 + j * 0.1).toFixed(2)}s` }}>
              {Array.from({ length: 20 }, (_, k) => <span key={k}>{k % 10}</span>)}
            </span>
          </span>
        );
      })}
      <span aria-hidden="true" style={{ color: "var(--accent)", fontWeight: 600 }}>{unit}</span>
    </div>
  );
}
