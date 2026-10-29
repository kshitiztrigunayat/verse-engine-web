"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlimFooter } from "@/components/site/SiteFooter";
import { DOCS, DOC_CURL, DOC_PAGES, slugify } from "@/lib/data";
import { ROUTES } from "@/lib/links";

export function DocsView({ slug }: { slug: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [rated, setRated] = useState<string | null>(null);
  const page = DOC_PAGES.find((p) => p.slug === slug) ?? DOC_PAGES[0];
  const intro = page.slug === "what-is-verse-engine";
  const ql = q.toLowerCase();
  return (
    <>
      <div style={{ borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", padding: "16px 48px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}><span className="serif" style={{ fontSize: 32 }}>Verse Engine</span><span className="wide mono label" style={{ fontSize: 12, letterSpacing: "0.16em" }}>DOCS</span></div>
          <div style={{ flex: "0 1 380px", minWidth: 220 }}><label className="sr-only" htmlFor="ds">Search docs</label><input id="ds" className="inp" type="search" placeholder="Search docs…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        </div>
      </div>
      <div className="wrap docs-grid" style={{ display: "grid", gridTemplateColumns: "280px minmax(0, 1fr)", gap: 56, padding: "40px 48px 80px" }}>
        <nav aria-label="Docs" style={{ position: "sticky", top: 90, alignSelf: "start", maxHeight: "calc(100vh - 120px)", overflowY: "auto", display: "flex", flexDirection: "column", gap: 22 }}>
          {DOCS.map(([group, items]) => {
            const shown = items.filter((l) => !ql || l.toLowerCase().includes(ql));
            if (!shown.length) return null;
            return (
              <div key={group} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="mono label eyebrow" style={{ marginBottom: 6 }}>{group}</span>
                {shown.map((l) => {
                  const on = slugify(l) === page.slug;
                  return <Link key={l} href={ROUTES.doc(slugify(l))} aria-current={on ? "page" : undefined} onClick={() => setRated(null)} style={{ minHeight: 40, display: "flex", alignItems: "center", padding: "0 14px", borderRadius: 12, textDecoration: "none", background: on ? "rgba(0,119,255,0.25)" : "transparent", fontWeight: on ? 600 : 500, color: on ? "var(--fg)" : "var(--body)" }}>{l}</Link>;
                })}
              </div>
            );
          })}
          {DOCS.every(([, items]) => !items.some((l) => !ql || l.toLowerCase().includes(ql))) && <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>NO MATCHES</span>}
        </nav>
        <article style={{ minWidth: 0, maxWidth: 780 }}>
          <span className="mono eyebrow" style={{ color: "var(--muted)" }}>{page.group} / {page.title.toUpperCase()}</span>
          <div key={page.slug} className="fadeup">
            <h1 className="wide h-light" style={{ marginTop: 18, fontSize: "clamp(34px, 4.2vw, 56px)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>{page.title}</h1>
            {intro ? (
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20, fontSize: 18, lineHeight: 1.7, color: "var(--body)" }}>
                <p>Verse Engine by Ctruh turns a 3D file, a Blender, Unity or Unreal project, or a floor plan into one link that opens in any modern browser. There’s no app to install for you or your viewers.</p>
                <p>It’s Ctruh’s own engine, built for the browser. It uses WebGPU where available and falls back to WebGL2, and streams only what each viewer can see, so large scenes open quickly on phones as well as laptops.</p>
                <h2 className="wide" style={{ fontWeight: 500, fontSize: 26, color: "var(--fg)", textTransform: "uppercase", marginTop: 12 }}>Ways to bring a scene</h2>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "disc", paddingLeft: 22 }}>
                  <li>Upload a file in Studio (20+ formats, up to 20 GB on paid plans)</li><li>Publish from the Blender, Unity or Unreal plug-in</li><li>Send a floor plan to get a walkable, furnished home</li><li>Upload through the REST API</li>
                </ul>
                <pre className="mono force-dark" tabIndex={0} style={{ margin: 0, padding: 20, borderRadius: 18, border: "1px solid var(--hair)", background: "#070B1F", fontSize: 13, lineHeight: 1.7, overflowX: "auto" }}>{DOC_CURL}</pre>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 8 }}>
                  <button type="button" onClick={() => router.push(ROUTES.doc("upload-your-first-scene"))} style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 4, padding: "16px 22px", borderRadius: 20, border: "1px solid var(--hair-strong)", background: "var(--surface)", cursor: "pointer", minHeight: 44 }}><span className="mono label" style={{ fontSize: 11 }}>NEXT</span><span style={{ fontWeight: 600 }}>Upload your first scene →</span></button>
                  <Link href={ROUTES.newScene} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 4, padding: "16px 22px", borderRadius: 20, border: "1px solid var(--blue)", background: "rgba(0,119,255,0.12)", minHeight: 44 }}><span className="mono label" style={{ fontSize: 11 }}>OR JUST TRY IT</span><span style={{ fontWeight: 600 }}>Open the upload flow ↗</span></Link>
                </div>
              </div>
            ) : (
              /* [PLACEHOLDER content — wire to MDX] */
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
                <p className="mono" style={{ fontSize: 13, color: "var(--muted)" }}>[ The final article for “{page.title}” goes here. ]</p>
                {[100, 92, 96, 80, 60].map((w) => <span key={w} className="shimmer" style={{ width: `${w}%` }} />)}
              </div>
            )}
          </div>
          <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid var(--hair)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {rated === null ? (<><span>Was this page helpful?</span><button type="button" className="cta cta-ghost cta-sm" onClick={() => setRated("yes")}>Yes</button><button type="button" className="cta cta-ghost cta-sm" onClick={() => setRated("no")}>No</button></>) : <span className="mono label fadeup" role="status" style={{ fontSize: 12 }}>✓ THANKS — THAT HELPS US IMPROVE THE DOCS.</span>}
          </div>
        </article>
      </div>
      <SlimFooter />
      <style>{`@media(max-width:900px){.docs-grid{grid-template-columns:1fr!important;gap:28px!important;padding:24px 16px 60px!important}.docs-grid nav{position:static!important;max-height:none!important}}`}</style>
    </>
  );
}
