/** Hand-rolled bars. Last bar is highlighted (today). */
export function BarChart({ data, max, label, height = 160 }: { data: number[]; max?: number; label: string; height?: number }) {
  const m = max ?? Math.max(...data, 1);
  return (
    <div className="bar-chart" role="img" aria-label={label} style={{ height }}>
      {data.map((v, i) => (
        <span key={i} className="bar" style={{ height: `${Math.max(3, Math.round((v / m) * 100))}%`, background: i === data.length - 1 ? "var(--blue)" : "var(--hair-strong)", animationDelay: `${i * 0.02}s` }} />
      ))}
    </div>
  );
}
