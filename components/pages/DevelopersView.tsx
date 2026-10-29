"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Tabs } from "@/components/ui/Tabs";
import { useCopy } from "@/lib/hooks";
import { DEV_CARDS, DEV_CODE, DEV_FLOW, DEV_QUICK, DEV_TABS } from "@/lib/data";
import { ROUTES } from "@/lib/links";

export function DevelopersView() {
  const [tab, setTab] = useState<string>("embed");
  const [copied, copy] = useCopy();
  return (
    <>
      <PageHero>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <span className="mono fadeup eyebrow">FOR DEVELOPERS · REST API + EMBED SDK</span>
            <h1 className="h-light" style={{ marginTop: 18 }}>
              <span className="mask"><span className="rise serif" style={{ fontSize: "clamp(48px, 6vw, 88px)" }}>Build Verse Engine</span></span>
              <span className="mask"><span className="rise wide" style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.02em", animationDelay: ".12s" }}>INTO YOUR</span></span>
              <span className="mask"><span className="rise wide" style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.02em", animationDelay: ".24s" }}><span className="hl">PRODUCT.</span></span></span>
            </h1>
            <p className="fadeup" style={{ marginTop: 24, fontSize: 19, color: "var(--body)", maxWidth: 520, animationDelay: ".4s" }}>Upload, publish, embed and track 3D scenes with a REST API — or skip the backend and drop in one script tag.</p>
            <div className="fadeup" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap", animationDelay: ".5s" }}><Link className="cta cta-blue cta-lg" href={ROUTES.keys}>Get an API key</Link><Link className="cta cta-ghost cta-lg" href={ROUTES.doc("scenes-api")}>API reference</Link></div>
          </div>
          <div className="force-dark" style={{ borderRadius: 24, border: "1px solid rgba(232,241,255,0.2)", background: "#070B1F", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,119,255,0.3)", minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: 12, borderBottom: "1px solid rgba(232,241,255,0.12)", flexWrap: "wrap" }}>
              <Tabs label="Code samples" items={DEV_TABS} value={tab} onChange={setTab} />
              <button type="button" className="tab" onClick={() => copy(DEV_CODE[tab])} aria-live="polite">{copied ? "COPIED ✓" : "COPY"}</button>
            </div>
            <pre key={tab} className="mono fadeup" tabIndex={0} style={{ margin: 0, padding: 24, minHeight: 240, fontSize: 13, lineHeight: 1.75, color: "#E8F1FF", overflowX: "auto", whiteSpace: "pre" }}>{DEV_CODE[tab]}<span className="caret">▍</span></pre>
          </div>
        </div>
      </PageHero>

      <section aria-labelledby="flow" className="band" style={{ padding: "90px 0" }}>
        <div className="wrap">
          <span id="flow" className="mono eyebrow">THE ROUND TRIP</span>
          <div style={{ marginTop: 40 }}>
            <div aria-hidden="true" style={{ height: 2, background: "rgba(232,241,255,0.2)", overflow: "hidden" }}><span className="travel" /></div>
            <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28, marginTop: 28 }}>
              {DEV_FLOW.map((f) => (
                <li key={f.code} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                  <code className="node mono" style={{ fontSize: 13, padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(232,241,255,0.4)", background: "#070B1F", color: "#E8F1FF" }}>{f.code}</code>
                  <span style={{ color: "var(--body)" }}>{f.d}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 24 }}>
          {DEV_CARDS.map((c) => (
            <article key={c.tag} className={c.band ? "band" : ""} style={{ borderRadius: 32, padding: 40, border: c.band ? "1px solid var(--blue)" : "1px solid var(--hair)", background: c.band ? undefined : "var(--surface)", display: "flex", flexDirection: "column", gap: 20 }}>
              <span className="mono eyebrow" style={{ color: c.band ? "var(--tint)" : "var(--label)" }}>{c.tag}</span>
              <h2 className="h-light"><span className="serif" style={{ fontSize: "clamp(48px, 5vw, 72px)" }}>{c.lead}</span> <span className="wide" style={{ fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>{c.rest}</span></h2>
              <p style={{ fontSize: 18, color: "var(--body)" }}>{c.d}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>{c.items.map((t) => <li key={t} style={{ display: "flex", gap: 12 }}><span aria-hidden="true" style={{ color: c.band ? "#fff" : "var(--label)" }}>✓</span>{t}</li>)}</ul>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto" }}>
                <Link className={c.band ? "cta cta-white" : "cta cta-blue"} href={ROUTES.doc(c.tag === "API" ? "scenes-api" : "embed-sdk")}>{c.cta}</Link>
                {c.keys && <Link className="cta cta-ghost" href={ROUTES.keys}>Manage keys in Studio</Link>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 0 110px" }}>
        <div className="wrap">
          <h2 className="h-light"><span className="serif" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>Quickstart,</span> <span className="wide" style={{ fontSize: "clamp(30px, 3.6vw, 52px)", letterSpacing: "-0.02em" }}>IN THREE CALLS</span></h2>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {DEV_QUICK.map((q) => (
              <Link key={q.n} href={q.href} className="lift-card" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 12, padding: 28, border: "1px solid var(--hair)", borderRadius: 28, background: "var(--surface)" }}>
                <span className="mono label">{q.n}</span><span className="wide" style={{ fontSize: 24, fontWeight: 600, textTransform: "uppercase" }}>{q.t}</span><span style={{ color: "var(--body)" }}>{q.d}</span><span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", marginTop: "auto" }}>{q.link} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
