"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Accordion } from "@/components/ui/Accordion";
import { PLANS, PRICING_FAQ } from "@/lib/data";

export function PricingView() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero padBottom={56}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>{[0, -1.5, -3, -4.5].map((d) => <div key={d} className="frame" style={{ animationDelay: `${d}s` }} />)}</div>
        <div style={{ position: "relative" }}>
          <span className="mono fadeup eyebrow">PRICING</span>
          <h1 className="h-light" style={{ marginTop: 18 }}>
            <span className="mask"><span className="rise serif" style={{ fontSize: "clamp(52px, 6.5vw, 96px)" }}>Simple pricing.</span></span>
            <span className="mask"><span className="rise wide" style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.02em", animationDelay: ".12s" }}>VIEWERS <span className="hl">NEVER PAY.</span></span></span>
          </h1>
          <p className="fadeup" style={{ marginTop: 24, fontSize: 19, color: "var(--body)", animationDelay: ".3s" }}>Start free. Every new account gets a 14-day Pro trial.</p>
        </div>
      </PageHero>

      <section aria-label="Plans" style={{ padding: "20px 0 100px" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
            {PLANS.map((p, i) => (
              <article key={p.name} className={`plan fadeup${p.hot ? " band" : ""}`} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20, padding: 28, borderRadius: 28, border: `1px solid ${p.hot ? "var(--blue)" : "var(--hair)"}`, background: p.hot ? undefined : "var(--surface)", animationDelay: `${i * 0.07}s` }}>
                {p.hot && <span className="mono" style={{ position: "absolute", top: -13, left: 24, padding: "5px 12px", borderRadius: 999, background: "var(--blue)", color: "#fff", fontSize: 10, letterSpacing: "0.14em" }}>MOST POPULAR</span>}
                <div><h2 className="wide" style={{ fontWeight: 500, fontSize: 26, textTransform: "uppercase" }}>{p.name}</h2><span style={{ color: "var(--body)", fontSize: 15 }}>{p.who}</span></div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}><span className="wide" style={{ fontWeight: 300, fontSize: 48, lineHeight: 1 }}>{p.price}</span><span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}>{p.per}</span></div>
                <Link className={`cta ${p.hot ? "cta-white" : "cta-ghost"}`} href={p.href}>{p.cta}</Link>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>{p.items.map((t) => <li key={t} style={{ display: "flex", gap: 10 }}><span aria-hidden="true" style={{ color: p.hot ? "#fff" : "var(--label)" }}>✓</span>{t}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className="mono" style={{ marginTop: 28, fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}>[ PLAN FEATURES BEYOND FILE SIZE AND TRIAL LENGTH ARE PLACEHOLDERS ]</p>
        </div>
      </section>

      <section id="enterprise" className="band" aria-labelledby="ent" style={{ position: "relative", padding: "100px 0", overflow: "hidden", scrollMarginTop: 70 }}>
        <div aria-hidden="true" style={{ position: "absolute", right: -200, top: -200, width: 720, height: 720, borderRadius: "50%", border: "1px solid rgba(232,241,255,0.14)" }} />
        <div className="wrap" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 56, alignItems: "center" }}>
          <div>
            <span className="mono eyebrow">ENTERPRISE</span>
            <h2 id="ent" className="h-light" style={{ marginTop: 16 }}><span className="serif" style={{ display: "block", fontSize: "clamp(52px, 6vw, 88px)" }}>Talk to</span><span className="wide" style={{ display: "block", fontSize: "clamp(36px, 4.6vw, 64px)", letterSpacing: "-0.02em" }}>A HUMAN.</span></h2>
            <p style={{ marginTop: 22, fontSize: 19, color: "var(--body)", maxWidth: 460 }}>A specialist calls back within 30 minutes during business hours. SSO, white-label and SLA included.</p>
          </div>
          <div style={{ minWidth: 0 }}>
            {!sent ? (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 16, background: "rgba(7,11,31,0.55)", border: "1px solid rgba(232,241,255,0.2)", borderRadius: 28, padding: 28 }}>
                <label className="fld" htmlFor="e1">NAME<input id="e1" className="inp" required autoComplete="name" /></label>
                <label className="fld" htmlFor="e2">WORK EMAIL<input id="e2" className="inp" type="email" required autoComplete="email" /></label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                  <label className="fld" htmlFor="e3">COMPANY<input id="e3" className="inp" autoComplete="organization" /></label>
                  <label className="fld" htmlFor="e4">PHONE<input id="e4" className="inp" type="tel" autoComplete="tel" /></label>
                </div>
                <label className="fld" htmlFor="e5">WHAT ARE YOU BUILDING?<textarea id="e5" className="inp" rows={3} /></label>
                <button className="cta cta-white cta-lg" type="submit">Request a call back</button>
              </form>
            ) : (
              <div className="fadeup" role="status" style={{ display: "flex", flexDirection: "column", gap: 12, background: "rgba(7,11,31,0.55)", border: "1px solid rgba(232,241,255,0.2)", borderRadius: 28, padding: 36 }}>
                <span className="mono eyebrow">REQUEST RECEIVED</span><span className="wide" style={{ fontSize: 34, fontWeight: 400 }}>WE’LL CALL YOU SHORTLY.</span><span style={{ color: "var(--body)" }}>Expect a call within 30 minutes during business hours (IST).</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="faqh" style={{ padding: "100px 0 110px" }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <h2 id="faqh" className="h-light" style={{ marginBottom: 36 }}><span className="serif" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Questions</span> <span className="wide" style={{ fontSize: "clamp(30px, 3.6vw, 52px)", letterSpacing: "-0.02em" }}>&amp; ANSWERS</span></h2>
          <Accordion items={PRICING_FAQ} initial={0} />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
