"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SlimFooter } from "@/components/site/SiteFooter";
import { Cube } from "@/components/ui/Cube";
import { POSTS, POST_TABS } from "@/lib/data";
import { ROUTES } from "@/lib/links";

export function ExploreView() {
  const [tab, setTab] = useState("all");
  const [reg, setReg] = useState<Record<string, boolean>>({});
  const list = POSTS.filter((p) => tab === "all" || p.type === tab);
  return (
    <>
      <PageHero padBottom={56}>
        <span className="mono fadeup eyebrow">EXPLORE · NOTES FROM THE ENGINE ROOM</span>
        <h1 className="h-light" style={{ marginTop: 18 }}>
          <span className="mask"><span className="rise serif" style={{ fontSize: "clamp(52px, 6.5vw, 96px)" }}>Guides, research</span></span>
          <span className="mask"><span className="rise wide" style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.02em", animationDelay: ".12s" }}>&amp; <span className="hl">EVENTS.</span></span></span>
        </h1>
        <p className="fadeup" style={{ marginTop: 24, fontSize: 19, color: "var(--body)", maxWidth: 560, animationDelay: ".3s" }}>Straight from the team building Verse Engine at Ctruh — how it works, what people are making, and where to meet us.</p>
        <div className="tabs" role="tablist" aria-label="Filter posts" style={{ marginTop: 32 }}>
          {POST_TABS.map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={tab === id} className="tab" onClick={() => setTab(id)}>{label}</button>)}
          <Link className="tab" href={ROUTES.docs}>Documentation ↗</Link>
        </div>
      </PageHero>
      <section style={{ padding: "20px 0 110px" }}>
        {/* [PLACEHOLDER: real posts — wire to a CMS] */}
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))", gap: 24 }}>
          {list.map((p, i) => (
            <article key={p.title} className="lift-card fadeup" style={{ border: "1px solid var(--hair)", borderRadius: 28, overflow: "hidden", background: "var(--surface)", animationDelay: `${i * 0.06}s`, display: "flex", flexDirection: "column" }}>
              <div className="force-dark" style={{ position: "relative", height: 200, background: p.type === "Research" ? "#070B1F" : "#001B99", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {p.type === "Blog" && <Cube size="md" />}
                {p.type === "Research" && <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 8, height: 70 }}>{Array.from({ length: 7 }, (_, k) => <span key={k} className="wave" />)}</div>}
                {p.type === "Event" && <div aria-hidden="true"><span className="ringz" /><span className="ringz" /><span className="ringz" /></div>}
                <span className="mono" style={{ position: "absolute", top: 16, left: 18, fontSize: 11, letterSpacing: "0.14em", padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(232,241,255,0.4)" }}>{p.type.toUpperCase()}</span>
              </div>
              <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                <h2 className="wide" style={{ fontWeight: 500, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.01em", textTransform: "uppercase" }}>{p.title}</h2>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}>{p.meta.toUpperCase()}</span>
                <div style={{ marginTop: "auto", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <a href="#" className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", minHeight: 44, display: "inline-flex", alignItems: "center" }}>READ →</a>
                  {p.type === "Event" && <button type="button" className={reg[p.title] ? "cta cta-ghost cta-sm" : "cta cta-blue cta-sm"} aria-pressed={!!reg[p.title]} onClick={() => setReg({ ...reg, [p.title]: true })}>{reg[p.title] ? "Registered ✓" : "Register"}</button>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SlimFooter />
    </>
  );
}
