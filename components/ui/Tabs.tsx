"use client";
export function Tabs<T extends string | number>({ items, value, onChange, label, radio }: { items: readonly (readonly [T, string])[]; value: T; onChange: (v: T) => void; label: string; radio?: boolean }) {
  return (
    <div className="tabs" role={radio ? "radiogroup" : "tablist"} aria-label={label}>
      {items.map(([id, text]) => (
        <button key={String(id)} type="button" className="tab" role={radio ? "radio" : "tab"} {...(radio ? { "aria-checked": id === value } : { "aria-selected": id === value })} onClick={() => onChange(id)}>
          {text}
        </button>
      ))}
    </div>
  );
}
