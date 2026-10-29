"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lockup } from "@/components/brand/Lockup";
import { ROUTES } from "@/lib/links";

const LINKS = [
  { href: ROUTES.studio, label: "STUDIO", match: "/studio" },
  { href: ROUTES.docs, label: "VERSE ENGINE", arrow: true, match: "/docs" },
  { href: ROUTES.developers, label: "DEVELOPERS", match: "/developers" },
  { href: ROUTES.pricing, label: "PRICING", match: "/pricing" },
  { href: ROUTES.plugins, label: "PLUG-INS", match: "/plugins" },
  { href: ROUTES.about, label: "ABOUT", match: "/about" },
];

export function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const items = LINKS.map((l) => (
    <Link key={l.href} className="navlink" href={l.href} aria-current={path.startsWith(l.match) ? "page" : undefined} onClick={() => setOpen(false)}>
      {l.label}
      {l.arrow && <span aria-hidden="true" style={{ color: "var(--accent)", marginLeft: 6 }}>→</span>}
    </Link>
  ));
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--nav-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid var(--hair-soft)" }}>
      <nav aria-label="Primary" className="wrap" style={{ padding: "12px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <Lockup />
        <div className="hide-md" style={{ display: "flex", alignItems: "center", gap: 2 }}>{items}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Link className="navlink hide-sm" href={ROUTES.signin}>SIGN IN</Link>
          <Link className="cta cta-blue hide-xs" href={ROUTES.signin}>Explore Studio</Link>
          <button type="button" className="tab only-menu" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? "CLOSE" : "MENU"}</button>
        </div>
        {open && (
          <div id="mobile-nav" className="fadeup" style={{ flexBasis: "100%", display: "flex", flexDirection: "column", gap: 2, paddingBottom: 8 }}>
            {items}
            <Link className="navlink" href={ROUTES.signin} onClick={() => setOpen(false)}>SIGN IN</Link>
            <Link className="cta cta-blue only-xs" href={ROUTES.signin} onClick={() => setOpen(false)} style={{ alignSelf: "flex-start", marginTop: 8 }}>Explore Studio</Link>
          </div>
        )}
      </nav>
      <style>{`.only-menu{display:none}@media(max-width:1100px){.only-menu{display:inline-flex}}@media(max-width:768px){nav[aria-label=Primary]{padding:10px 16px!important}}.only-xs{display:none}@media(max-width:520px){.hide-xs{display:none!important}.only-xs{display:inline-flex}}`}</style>
    </header>
  );
}
