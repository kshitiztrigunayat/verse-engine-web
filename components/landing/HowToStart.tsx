import { CopyButton } from "@/components/ui/CopyButton";
import { Cube } from "@/components/ui/Cube";

const chip = { padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)" } as const;
const TOPS = [92, 124, 156];

function Card({ n, title, sub, top, children }: { n: string; title: string; sub: string; top: number; children: React.ReactNode }) {
  return (
    <article className="stack-card" style={{ position: "sticky", top, background: "var(--stack)", borderRadius: 32, border: "1px solid var(--hair)", boxShadow: "0 -24px 60px var(--shadow)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "26px 40px", borderBottom: "1px solid var(--hair-soft)", flexWrap: "wrap" }}>
        <span className="mono label" style={{ fontSize: 14 }}>{`[${n}]`}</span>
        <h3 className="wide" style={{ flex: 1, fontWeight: 600, fontSize: "clamp(24px, 2.4vw, 34px)", letterSpacing: "-0.01em", textTransform: "uppercase", minWidth: 200 }}>{title}</h3>
        <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--muted)" }}>{sub}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 40, padding: 40, alignItems: "center" }}>{children}</div>
    </article>
  );
}
const P = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 21, lineHeight: 1.55, color: "var(--body)", maxWidth: 470 }}>{children}</p>;

export function HowToStart() {
  return (
    <section aria-label="Chapter 03 — How to start" style={{ padding: "120px 0 140px" }}>
      <div className="wrap">
        <div className="row-between" style={{ marginBottom: 64 }}>
          <div>
            <span className="mono label eyebrow">CHAPTER 03 · HOW TO START</span>
            <h2 className="h-light" style={{ marginTop: 18 }}>
              <span className="serif" style={{ display: "block", fontSize: "clamp(56px, 6vw, 84px)" }}>Drop. Cook.</span>
              <span className="wide" style={{ display: "block", fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "-0.02em" }}>SEND IT <span className="hl">FLYING.</span></span>
            </h2>
          </div>
          <p className="note" style={{ maxWidth: 360 }}>THREE MOVES. ZERO INSTALLS. THE WHOLE TRIP TAKES LESS TIME THAN EXPORTING A RENDER.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          <Card n="01" title="Drop it in." sub="BRING WHAT YOU ALREADY HAVE" top={TOPS[0]}>
            <P>A 2 GB Blender scene. A laser scan of an office. A phone photo of a floor plan. Throw it at Verse Engine — or hit <strong style={{ color: "var(--fg)" }}>Publish to Verse Engine</strong> without leaving Blender, Unity or Unreal.</P>
            <div className="band" style={{ position: "relative", borderRadius: 24, padding: 28, overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", right: -80, top: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,119,255,0.9), rgba(0,119,255,0))" }} />
              <div style={{ position: "relative", border: "1.5px dashed rgba(255,255,255,0.5)", borderRadius: 18, padding: 26, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
                <div className="float" style={{ width: 52, height: 52, borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#001B99" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg></div>
                <div style={{ fontWeight: 600, fontSize: 17 }}>Drag anything 3D here</div>
                <div className="mono" style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", fontSize: 12 }}>
                  {[".glb", ".fbx", ".usdz", ".ifc", "floor-plan.pdf"].map((c) => <span key={c} style={chip}>{c}</span>)}
                  <span style={{ padding: "5px 10px", borderRadius: 999, background: "#FFFFFF", color: "#001B99" }}>20+ TYPES</span>
                </div>
              </div>
              <div style={{ position: "relative", marginTop: 16, padding: "14px 16px", borderRadius: 16, background: "rgba(255,255,255,0.14)", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span className="mono">hsr-office-scan.e57</span><span className="mono" style={{ opacity: 0.8 }}>3.4 GB</span></div>
                <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}><div className="loopbar" style={{ height: "100%", background: "#0077FF" }} /></div>
              </div>
            </div>
          </Card>

          <Card n="02" title="We cook it once." sub="VERSE ENGINE PREPARES IT" top={TOPS[1]}>
            <P>Like a film prepared for streaming, your scene is sliced for every kind of device and signed so viewers know it’s genuine. It happens one time — nobody ever waits twice.</P>
            <div style={{ borderRadius: 24, padding: 30, background: "var(--surface)", border: "1px solid var(--hair-soft)", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}><span className="mono" style={{ fontSize: 13 }}>warehouse_twin_final.fbx</span><span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", padding: "5px 10px", borderRadius: 999, background: "#001B99", color: "#fff" }}>RUNS ONCE</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}><span>Scene streaming prep</span><span className="pulse mono" style={{ fontSize: 13 }}>processing</span></div>
                <div style={{ height: 8, borderRadius: 99, background: "var(--hair)", overflow: "hidden" }}><div className="loopbar" style={{ height: "100%", background: "#0077FF", borderRadius: 99 }} /></div>
              </div>
              <div className="band" style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#001B99" strokeWidth="2.2" aria-hidden="true"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg></div>
                <div><div style={{ fontSize: 15, fontWeight: 600 }}>Security signing</div><div style={{ fontSize: 13, opacity: 0.9 }}>Signature attached · ready for phones, laptops, headsets</div></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600 }}><span className="ringpulse" style={{ width: 10, height: 10, borderRadius: "50%", background: "#0077FF" }} />Ready to stream</div>
            </div>
          </Card>

          <Card n="03" title="Send it flying." sub="SHARE ONE LINK" top={TOPS[2]}>
            <P>Paste it into WhatsApp, a pitch deck or your website. Lock it to private, collect comments, export a video — and change the scene later without changing the link.</P>
            <div style={{ borderRadius: 24, padding: 28, background: "var(--light-panel)", color: "#001B99", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#FFFFFF", borderRadius: 999, padding: "6px 6px 6px 18px" }}>
                <span className="mono" style={{ flex: 1, minWidth: 0, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>verse.ctruh.com/s/your-scene</span>
                <CopyButton text="verse.ctruh.com/s/your-scene" label="Copy link" className="cta cta-cobalt cta-sm" />
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-end", justifyContent: "center", padding: "6px 0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div className="force-dark" style={{ width: 220, maxWidth: "52vw", height: 136, borderRadius: "12px 12px 0 0", background: "#001B99", border: "6px solid #001B99", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}><Cube size="xs" /></div>
                  <div style={{ width: 260, maxWidth: "60vw", height: 10, borderRadius: "0 0 10px 10px", background: "#001B99" }} />
                </div>
                <div className="force-dark" style={{ width: 76, height: 146, borderRadius: 16, background: "#001B99", border: "5px solid #001B99", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}><Cube size="xs" style={{ transform: "scale(.6)" }} /></div>
              </div>
              <div className="mono" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", fontSize: 12, letterSpacing: "0.06em" }}>
                {["PRIVATE", "EDITABLE", "EMBEDDABLE"].map((t) => <span key={t} style={{ padding: "7px 12px", borderRadius: 999, border: "1px solid rgba(0,27,153,0.35)" }}>✓ {t}</span>)}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
