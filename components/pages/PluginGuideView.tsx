"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Accordion } from "@/components/ui/Accordion";
import { EDITOR_KEYS, PLUGIN_FAQ, PLUGIN_GUIDES, type EditorKey } from "@/lib/data";
import { ROUTES } from "@/lib/links";

export function PluginGuideView({ editor }: { editor: EditorKey }) {
  const p = PLUGIN_GUIDES[editor];
  const [got, setGot] = useState(false);
  return (
    <>
      <PageHero padBottom={64}>
        <nav aria-label="Breadcrumb" className="mono eyebrow"><Link href={ROUTES.plugins}>PLUG-INS</Link> / <span className="label">{p.name.toUpperCase()}</span></nav>
        <div className="tabs" role="navigation" aria-label="Choose a tool" style={{ marginTop: 24 }}>
          {EDITOR_KEYS.map((k) => <Link key={k} href={ROUTES.plugin(k)} className="tab" aria-current={k === editor ? "page" : undefined} style={k === editor ? { background: "var(--blue)", borderColor: "var(--blue)", color: "var(--cta-text)" } : undefined}>{PLUGIN_GUIDES[k].name}</Link>)}
        </div>
        <div key={editor} className="fadeup" style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 520px" }}>
            <h1 className="h-light"><span className="serif" style={{ fontSize: "clamp(40px, 4.7vw, 68px)" }}>Verse Engine for</span> <span className="wide" style={{ fontSize: "clamp(40px, 5.2vw, 76px)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>{p.name}</span></h1>
            <p style={{ marginTop: 20, fontSize: 19, color: "var(--body)", maxWidth: 560 }}>{p.tag} About <strong>{p.time}</strong> from project to link.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <button type="button" className="cta cta-blue cta-lg" onClick={() => setGot(true)}>{got ? `Downloading ${p.name}…` : `Download for ${p.name}`}</button>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}>{p.file} · REQUIRES {p.req}</span>
          </div>
        </div>
      </PageHero>

      <section style={{ padding: "40px 0 100px" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 56, alignItems: "start" }}>
          <div style={{ gridColumn: "span 1" }}>
            <h2 className="wide" style={{ fontWeight: 600, fontSize: "clamp(22px, 5.6vw, 34px)", textTransform: "uppercase", letterSpacing: "-0.01em" }}>Install in <span className="hl">4</span> steps</h2>
            <ol key={editor} style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 18 }}>
              {p.steps.map(([t, d, path], i) => (
                <li key={t} className="fadeup" style={{ display: "flex", gap: 20, padding: 22, border: "1px solid var(--hair)", borderRadius: 24, background: "var(--surface)", animationDelay: `${i * 0.08}s` }}>
                  <span className="mono label" style={{ fontSize: 14 }}>{`0${i + 1}`}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}>{t}</span>
                    <span style={{ color: "var(--body)" }}>{d}</span>
                    {path && <code className="mono" style={{ marginTop: 6, alignSelf: "flex-start", maxWidth: "100%", overflowWrap: "anywhere", fontSize: 12, padding: "8px 12px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--hair)" }}>{path}</code>}
                  </div>
                </li>
              ))}
            </ol>
            <h2 className="wide" style={{ fontWeight: 600, fontSize: "clamp(22px, 5.6vw, 34px)", textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: 64, marginBottom: 24 }}>Troubleshooting</h2>
            <Accordion items={PLUGIN_FAQ} />
          </div>
          <aside style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="force-dark" style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", background: "#001B99" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ display: "flex", gap: 6 }} aria-hidden="true">{[0, 1, 2].map((k) => <span key={k} style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />)}</span>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em" }}>{p.editor}</span>
              </div>
              <div style={{ display: "flex", minHeight: 260 }} aria-hidden="true">
                <div style={{ flex: 1, backgroundImage: "linear-gradient(rgba(0,119,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,255,0.1) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <div style={{ width: 190, padding: 16, borderLeft: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", gap: 10 }}>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#0077FF" }}>VERSE ENGINE</span>
                  <span style={{ height: 10, borderRadius: 6, background: "rgba(255,255,255,0.12)" }} /><span style={{ height: 10, width: "70%", borderRadius: 6, background: "rgba(255,255,255,0.12)" }} />
                  <span className="ringpulse" style={{ marginTop: "auto", padding: "12px 10px", borderRadius: 12, background: "#0077FF", fontSize: 13, fontWeight: 700, textAlign: "center" }}>Publish to Verse Engine</span>
                </div>
              </div>
            </div>
            <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span className="mono label eyebrow">REQUIREMENTS</span>
              <span>{p.reqLong}</span><span>A Verse Engine account and API key</span><span>Windows, macOS or Linux</span>
            </div>
            <div className="band" style={{ borderRadius: 24, padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 20 }}>Need an API key?</span>
              <span style={{ color: "var(--body)" }}>Create one in Studio under Plug-ins &amp; API. It takes ten seconds.</span>
              <Link className="cta cta-white" href={ROUTES.keys} style={{ alignSelf: "flex-start" }}>Open Studio →</Link>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
