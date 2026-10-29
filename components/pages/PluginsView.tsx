"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Cube } from "@/components/ui/Cube";
import { SOON, TOOLS, PLUGIN_STEPS } from "@/lib/data";
import { ROUTES } from "@/lib/links";

export function PluginsView() {
  const [got, setGot] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  return (
    <>
      <PageHero floor>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 520px" }}>
            <span className="mono fadeup eyebrow">PLUG-INS · PUBLISH FROM WHERE YOU WORK</span>
            <h1 className="h-light" style={{ marginTop: 18 }}>
              <span className="mask"><span className="rise serif" style={{ fontSize: "clamp(56px, 6.5vw, 96px)" }}>Your editor</span></span>
              <span className="mask"><span className="rise wide" style={{ fontSize: "clamp(36px, 5.2vw, 76px)", letterSpacing: "-0.02em", animationDelay: ".12s" }}>JUST GOT A</span></span>
              <span className="mask"><span className="rise wide" style={{ fontSize: "clamp(36px, 5.2vw, 76px)", letterSpacing: "-0.02em", animationDelay: ".24s" }}><span className="hl">LINK</span> BUTTON.</span></span>
            </h1>
          </div>
          <div className="fadeup" style={{ flex: "0 1 400px", display: "flex", flexDirection: "column", gap: 22, animationDelay: ".4s" }}>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--body)" }}>Press <strong>Publish to Verse Engine</strong> inside Blender, Unity or Unreal. The scene uploads, gets prepared once, and a link lands in your Studio.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><Link className="cta cta-blue" href={ROUTES.keys}>Get an API key</Link><Link className="cta cta-ghost" href={ROUTES.plugin("blender")}>Install guide</Link></div>
          </div>
        </div>
      </PageHero>

      <section aria-labelledby="avail" style={{ padding: "40px 0 100px" }}>
        <div className="wrap">
          <div className="row-between" style={{ marginBottom: 40 }}>
            <h2 id="avail" className="h-light"><span className="serif" style={{ fontSize: "clamp(48px, 5.5vw, 76px)" }}>Available</span> <span className="wide" style={{ fontSize: "clamp(34px, 4vw, 56px)", letterSpacing: "-0.02em" }}>NOW</span></h2>
            <span className="mono eyebrow" style={{ color: "var(--muted)" }}>EACH ONE HAS ITS OWN INSTALL GUIDE</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {TOOLS.map((t) => (
              <article key={t.id} className="lift-card" style={{ border: "1px solid var(--hair)", borderRadius: 28, overflow: "hidden", background: "var(--surface)" }}>
                <div className="force-dark" style={{ position: "relative", height: 220, background: "#001B99", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(closest-side, rgba(0,119,255,0.7), rgba(0,27,153,0))" }} />
                  <Cube size="md" style={{ position: "relative", marginTop: -28 }} />
                  <span className="mono" style={{ position: "absolute", top: 18, left: 20, fontSize: 11, letterSpacing: "0.12em" }}>{t.editor}</span>
                  <span className="mono" style={{ position: "absolute", bottom: 16, right: 20, fontSize: 11, letterSpacing: "0.1em", padding: "6px 12px", borderRadius: 999, background: "rgba(7,11,31,0.6)" }}>PUBLISH TO VERSE ENGINE ▸</span>
                </div>
                <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}><h3 className="wide" style={{ fontWeight: 600, fontSize: 32, textTransform: "uppercase" }}>{t.name}</h3><span className="mono label" style={{ fontSize: 12 }}>{`SCENE → LINK · ${t.time}`}</span></div>
                  <span className="mono" style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--muted)" }}>{t.req}</span>
                  <p style={{ color: "var(--body)", fontSize: 17 }}>{t.tag}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button type="button" className="cta cta-blue" onClick={() => setGot({ ...got, [t.id]: true })}>{got[t.id] ? "Downloading…" : "Download"}</button>
                    <Link className="cta cta-ghost" href={ROUTES.plugin(t.id)}>Install steps</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how" className="band" style={{ padding: "100px 0" }}>
        <div className="wrap">
          <span className="mono eyebrow">HOW IT WORKS</span>
          <h2 id="how" className="wide h-light" style={{ marginTop: 18, fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.02em" }}>FROM EDITOR TO <span style={{ fontWeight: 800 }}>ANY SCREEN.</span></h2>
          <div style={{ position: "relative", marginTop: 56 }}>
            <div aria-hidden="true" style={{ height: 2, background: "rgba(232,241,255,0.2)", overflow: "hidden" }}><span className="travel" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, marginTop: 32 }}>
              {PLUGIN_STEPS.map((s) => (
                <div key={s.n}><span className="mono" style={{ fontSize: 13 }}>{s.n}</span><h3 className="wide" style={{ fontWeight: 600, fontSize: 26, margin: "10px 0", textTransform: "uppercase" }}>{s.t}</h3><p style={{ color: "var(--body)" }}>{s.d}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="soon" style={{ padding: "100px 0" }}>
        <div className="wrap">
          <div className="row-between" style={{ marginBottom: 40 }}>
            <div><span className="mono label eyebrow">ON THE WAY</span><h2 id="soon" className="h-light" style={{ marginTop: 14 }}><span className="serif" style={{ fontSize: "clamp(40px, 4.5vw, 64px)" }}>Design, AEC</span> <span className="wide" style={{ fontSize: "clamp(30px, 3.4vw, 48px)", letterSpacing: "-0.02em" }}>&amp; BIM TOOLS</span></h2></div>
            <div style={{ minWidth: 280, flex: "0 1 460px" }}>
              {!done ? (
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
                  <label className="fld" htmlFor="nm" style={{ flex: 1, minWidth: 200 }}>EMAIL FOR UPDATES<input id="nm" className="inp" type="email" required placeholder="you@company.com" /></label>
                  <button className="cta cta-blue" type="submit" style={{ minHeight: 48 }}>Notify me</button>
                </form>
              ) : <div className="fadeup mono label" role="status" style={{ fontSize: 13 }}>✓ YOU’RE ON THE LIST — WE’LL EMAIL YOU WHEN THEY SHIP.</div>}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            {SOON.map((n) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, border: "2px dashed var(--hair-strong)", borderRadius: 20 }}>
                <span className="wide" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--hair-strong)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }} aria-hidden="true">{n.charAt(0)}</span>
                <span style={{ display: "flex", flexDirection: "column" }}><span style={{ fontWeight: 600 }}>{n}</span><span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)" }}>COMING SOON</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
