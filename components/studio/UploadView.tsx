"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FlowBar } from "./Stepper";
import { Tabs } from "@/components/ui/Tabs";
import { LINKS, ROUTES } from "@/lib/links";

const FORMATS = ["GLB", "glTF embedded", "PLY splat", "SPLAT", "PLY point cloud", "LAS", "LAZ", "E57", "XYZ", "PLY scan mesh", "IFC", "USDZ", "USD", "FBX*", "OBJ*", "ZIP*", "PNG", "JPG", "PDF"];

export function UploadView() {
  const [mode, setMode] = useState<"file" | "plan">("file");
  const [file, setFile] = useState<string | null>(null);
  const [pct, setPct] = useState(0);
  const t = useRef<ReturnType<typeof setInterval>>(undefined);
  useEffect(() => () => clearInterval(t.current), []);

  const start = (name: string) => {
    clearInterval(t.current);
    setFile(name); setPct(0);
    let p = 0;
    t.current = setInterval(() => {
      p = Math.min(100, p + Math.ceil(Math.random() * 14));
      setPct(p);
      if (p >= 100) clearInterval(t.current);
    }, 160);
  };
  const plan = mode === "plan";
  const done = pct >= 100;
  const next = plan ? `${ROUTES.newReview}?f=${encodeURIComponent(file ?? "")}` : `${ROUTES.newShare}?f=${encodeURIComponent(file ?? "")}`;

  return (
    <>
      <FlowBar step={1} right="PRO TRIAL · UP TO 20 GB PER FILE" />
      <div className="wrap" style={{ maxWidth: 960, padding: "56px 48px 96px", display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <span className="mono label eyebrow">STEP 1 OF 3 · DROP IT IN</span>
          <h1 className="h-light" style={{ marginTop: 12 }}><span className="serif" style={{ display: "block", fontSize: "clamp(40px, 4.5vw, 64px)" }}>Turn any 3D file</span><span className="wide" style={{ display: "block", fontSize: "clamp(26px, 3vw, 44px)", letterSpacing: "-0.02em" }}>INTO A LINK ANYONE CAN OPEN</span></h1>
          <p style={{ marginTop: 14, color: "var(--body)", fontSize: 18 }}>Pick what you’re bringing. We’ll handle the rest.</p>
        </div>
        <Tabs label="What are you bringing?" value={mode} onChange={(m) => { clearInterval(t.current); setMode(m); setFile(null); setPct(0); }} items={[["file", "3D file or scan"], ["plan", "Floor plan → 3D home"]] as const} />

        <div className="dash">
          <span className="float ringpulse" style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg></span>
          <span className="wide" style={{ fontSize: 22, fontWeight: 500 }}>{plan ? "DROP YOUR FLOOR PLAN HERE" : "DROP YOUR 3D FILE OR SCAN HERE"}</span>
          <span style={{ color: "var(--body)", maxWidth: 520 }}>{plan ? "PNG, JPG or PDF. We build a walkable, furnished home from it." : "Models, point clouds, splats and BIM. FBX, OBJ and ZIP are converted for you."}</span>
          {!file ? (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <label className="cta cta-blue" htmlFor="file-in" style={{ cursor: "pointer" }}>Choose file<input id="file-in" type="file" className="sr-only" onChange={(e) => start(e.target.files?.[0]?.name ?? "scene.glb")} /></label>
              <button type="button" className="cta cta-ghost" onClick={() => start(plan ? "koramangala-2bhk-plan.pdf" : "living-room-set.glb")}>Use a sample file</button>
            </div>
          ) : (
            <div className="fadeup" style={{ width: "min(100%, 520px)", display: "flex", flexDirection: "column", gap: 10 }} role="status">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span className="mono" style={{ fontSize: 13, overflowWrap: "anywhere" }}>{file}</span><span className="mono label" style={{ fontSize: 12 }}>{pct < 100 ? `UPLOADING… ${pct}%` : "UPLOADED ✓"}</span></div>
              <div style={{ height: 8, borderRadius: 99, background: "var(--hair)", overflow: "hidden" }}><div style={{ height: "100%", width: `${pct}%`, background: "var(--blue)", transition: "width .16s linear" }} /></div>
            </div>
          )}
          {plan && <span style={{ fontSize: 14, color: "var(--muted)" }}>No file handy? WhatsApp your floor plan to <strong className="mono">{LINKS.whatsapp}</strong></span>}
        </div>

        <section aria-labelledby="fmts" className="panel">
          <div className="row-between" style={{ alignItems: "center", marginBottom: 16 }}><h2 id="fmts" className="wide" style={{ fontSize: 16, fontWeight: 500 }}>SUPPORTED FORMATS</h2><span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}>DASHED = CONVERTED ON OUR SIDE</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FORMATS.map((f) => { const conv = f.includes("*"); return <code key={f} className="mono" style={{ fontSize: 12, padding: "7px 12px", borderRadius: 999, border: `1px ${conv ? "dashed" : "solid"} ${conv ? "var(--hair-strong)" : "rgba(0,119,255,0.6)"}`, background: conv ? "transparent" : "rgba(0,119,255,0.12)" }}>{f.replace("*", "")}</code>; })}
          </div>
        </section>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <Link className="cta cta-ghost" href={ROUTES.studio}>Cancel</Link>
          {done ? <Link className="cta cta-blue fadeup" href={next}>Continue →</Link> : <button type="button" className="cta cta-blue" disabled>Continue →</button>}
        </div>
      </div>
    </>
  );
}
