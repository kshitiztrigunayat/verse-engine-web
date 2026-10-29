"use client";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Cube } from "@/components/ui/Cube";
import { ABOUT_FACTS, ABOUT_PILLARS, ABOUT_STATS } from "@/lib/data";

export function AboutView() {
  const [tab, setTab] = useState<"company" | "engine">("company");
  return (
    <>
      <PageHero padBottom={96}>
        <div className="hide-md" aria-hidden="true" style={{ position: "absolute", right: -40, top: -30, width: 720, height: 720, pointerEvents: "none" }}>
          <div className="orbit"><span /></div><div className="orbit"><span /></div>
          <Cube style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
        </div>
        <div className="tabs" role="tablist" aria-label="About" style={{ position: "relative" }}>
          {([["company", "About Ctruh"], ["engine", "About Verse Engine"]] as const).map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={tab === id} className="tab" onClick={() => setTab(id)}>{label}</button>)}
        </div>
        <div key={tab} className="fadeup" style={{ position: "relative", marginTop: 48 }}>
          {tab === "company" ? (
            <><h1 className="h-light"><span className="serif" style={{ display: "block", fontSize: "clamp(52px, 6.5vw, 96px)" }}>Building the</span><span className="wide" style={{ display: "block", fontSize: "clamp(36px, 5.2vw, 76px)", letterSpacing: "-0.02em" }}>SPATIAL <span className="hl">INTERNET.</span></span></h1>
              <p style={{ marginTop: 24, fontSize: 20, color: "var(--body)", maxWidth: 560 }}>Ctruh Technologies makes 3D, XR and AI infrastructure so anyone can create and share immersive worlds.</p></>
          ) : (
            <><h1 className="h-light"><span className="serif" style={{ display: "block", fontSize: "clamp(52px, 6.5vw, 96px)" }}>Our own engine,</span><span className="wide" style={{ display: "block", fontSize: "clamp(36px, 5.2vw, 76px)", letterSpacing: "-0.02em" }}>BUILT FOR THE <span className="hl">BROWSER.</span></span></h1>
              <p style={{ marginTop: 24, fontSize: 20, color: "var(--body)", maxWidth: 560 }}>Verse Engine streams huge 3D scenes to any device, with no app store and no cloud GPU.</p></>
          )}
        </div>
      </PageHero>

      {tab === "company" ? (
        <>
          <section style={{ padding: "60px 0" }}>
            <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 48, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <span className="mono label eyebrow">OUR STORY</span>
                <h2 className="wide h-light" style={{ fontSize: "clamp(30px, 3.4vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>FROM ROOM-SIZED RIGS TO A LINK IN YOUR POCKET.</h2>
                <p style={{ fontSize: 18, color: "var(--body)", lineHeight: 1.65 }}>Ctruh builds 3D, XR and AI infrastructure for the spatial internet. Verse Engine is how anyone shares a 3D world as a link, built by a team in Bengaluru and San Francisco.</p>
                <p className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--muted)" }}>[ FOUNDING STORY AND MILESTONES GO HERE ]</p>
              </div>
              <div style={{ aspectRatio: "4 / 3", border: "2px dashed var(--hair-strong)", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)" }}><span className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--muted)" }}>[ TEAM PHOTO ]</span></div>
            </div>
          </section>
          <section style={{ padding: "40px 0 110px" }}>
            <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {ABOUT_FACTS.map((f) => (
                <div key={f.k} className="panel" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <span className="mono label eyebrow">{f.k}</span><span className="wide" style={{ fontSize: 26, fontWeight: 500, overflowWrap: "anywhere" }}>{f.v}</span><span style={{ color: "var(--body)" }}>{f.d}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <section style={{ padding: "40px 0 80px" }}>
            <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {ABOUT_PILLARS.map((p, i) => <div key={p.n} className="panel fadeup" style={{ display: "flex", flexDirection: "column", gap: 12, animationDelay: `${i * 0.08}s` }}><span className="mono label">{p.n}</span><span className="wide" style={{ fontSize: 24, fontWeight: 500, textTransform: "uppercase" }}>{p.t}</span><span style={{ color: "var(--body)" }}>{p.d}</span></div>)}
            </div>
          </section>
          <section className="band" aria-labelledby="cost" style={{ padding: "90px 0" }}>
            <div className="wrap" style={{ maxWidth: 960 }}>
              <div className="row-between"><h2 id="cost" className="wide" style={{ fontWeight: 400, fontSize: "clamp(30px, 3.6vw, 48px)", textTransform: "uppercase" }}>STREAMING COST</h2><span className="mono eyebrow">PER THOUSAND VIEWER-HOURS</span></div>
              {/* confirm before launch */}
              {[["Verse Engine", "ABOUT $252", 6, "#0077FF"], ["Cloud GPU streaming", "$498 – $6,000", 100, "#E8F1FF"]].map(([n, v, w, c]) => (
                <div key={n as string} style={{ marginTop: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, gap: 12, flexWrap: "wrap" }}><span style={{ fontSize: 20, fontWeight: 600 }}>{n}</span><span className="mono">{v}</span></div>
                  <div style={{ height: 14, borderRadius: 99, background: "rgba(232,241,255,0.14)", overflow: "hidden" }}><div className="grow" style={{ height: "100%", width: `${w}%`, background: c as string, borderRadius: 99 }} /></div>
                </div>
              ))}
            </div>
          </section>
          <section style={{ padding: "90px 0 110px" }}>
            <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
              {ABOUT_STATS.map((s) => <div key={s.l}><div className="wide" style={{ fontWeight: 300, fontSize: "clamp(56px, 6vw, 88px)", lineHeight: 1 }}>{s.v}<span style={{ color: "var(--accent)", fontWeight: 500 }}>{s.u}</span></div><div className="mono" style={{ marginTop: 12, fontSize: 12, letterSpacing: "0.12em" }}>{s.l}</div></div>)}
            </div>
          </section>
        </>
      )}
      <SiteFooter />
    </>
  );
}
