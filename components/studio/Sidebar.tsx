"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lockup } from "@/components/brand/Lockup";
import { ThemeToggle } from "@/components/brand/ThemeToggle";
import { ROUTES } from "@/lib/links";

const NAV = [
  { href: ROUTES.studio, label: "Scenes", exact: true },
  { href: ROUTES.analytics(), label: "Analytics" },
  { href: ROUTES.webhooks, label: "Webhooks" },
  { href: ROUTES.keys, label: "Plug-ins & API" },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="side" aria-label="Studio">
      <Lockup sub="STUDIO · BY CTRUH" href={ROUTES.home} compact />
      <Link className="cta cta-blue" href={ROUTES.newScene}>+ New scene</Link>
      <nav aria-label="Studio sections" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map((n) => <Link key={n.href} className="item" href={n.href} aria-current={(n.exact ? path === n.href : path.startsWith(n.href)) ? "page" : undefined}>{n.label}</Link>)}
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span className="mono eyebrow" style={{ color: "var(--muted)", padding: "0 16px 6px" }}>HELP</span>
        <Link className="item" href={ROUTES.docs}>Documentation</Link>
        <Link className="item" href={ROUTES.developers}>API &amp; SDK</Link>
      </div>
      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6, padding: 16, border: "1px solid var(--hair)", borderRadius: 20, background: "var(--surface)" }}>
        <span style={{ fontWeight: 600 }}>Bhaskar</span>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--body)" }}>PRO TRIAL · 9 DAYS LEFT</span>
        <Link href={ROUTES.pricing} style={{ fontSize: 14, minHeight: 32, display: "flex", alignItems: "center" }}>Upgrade plan →</Link>
        <ThemeToggle />
      </div>
    </aside>
  );
}
