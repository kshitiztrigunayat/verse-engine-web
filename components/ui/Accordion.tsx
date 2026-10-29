"use client";
import { useId, useState } from "react";

export function Accordion({ items, initial = -1 }: { items: readonly (readonly [string, string])[]; initial?: number }) {
  const [open, setOpen] = useState(initial);
  const id = useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map(([q, a], i) => {
        const o = open === i;
        return (
          <div key={q} style={{ border: `1px solid ${o ? "var(--blue)" : "var(--hair)"}`, borderRadius: 20, background: "var(--surface)", transition: "border-color .3s" }}>
            <h3 style={{ margin: 0 }}>
              <button type="button" className="faq" aria-expanded={o} aria-controls={`${id}-${i}`} onClick={() => setOpen(o ? -1 : i)}>
                <span>{q}</span><span className="mono" aria-hidden="true">{o ? "−" : "+"}</span>
              </button>
            </h3>
            {o && <p id={`${id}-${i}`} className="fadeup" style={{ padding: "0 22px 22px", color: "var(--body)", fontSize: 17, lineHeight: 1.6, maxWidth: 760 }}>{a}</p>}
          </div>
        );
      })}
    </div>
  );
}
