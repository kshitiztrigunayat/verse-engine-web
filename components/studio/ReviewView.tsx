"use client";
import Link from "next/link";
import { useState } from "react";
import { FlowBar } from "./Stepper";
import { ROUTES } from "@/lib/links";

const TOOLS = [["select", "Select"], ["door", "+ Door"], ["window", "+ Window"], ["gap", "+ Open gap"]] as const;
const QS = ["Is there a door between Living / Dining and the balcony?", "Is the blue mark on Bedroom 2 a window?", "Is the gap between Kitchen and Living an open archway?"];
const ROOMS: { n: string; col: string; row: string; ping?: boolean }[] = [
  { n: "Kitchen", col: "1 / 2", row: "1 / 2" },
  { n: "Living / Dining", col: "2 / 4", row: "1 / 3", ping: true },
  { n: "Bedroom 1", col: "1 / 2", row: "2 / 4" },
  { n: "Bedroom 2", col: "4 / 5", row: "1 / 3", ping: true },
  { n: "Bath", col: "2 / 5", row: "3 / 4" },
];

export function ReviewView({ file }: { file: string }) {
  const [rot, setRot] = useState(0);
  const [fh, setFh] = useState(false);
  const [fv, setFv] = useState(false);
  const [tool, setTool] = useState<(typeof TOOLS)[number][0]>("select");
  const [ok, setOk] = useState<boolean[]>([false, false, false]);
  const n = ok.filter(Boolean).length;
  const toolName = TOOLS.find((t) => t[0] === tool)![1].replace("+ ", "").toUpperCase();
  return (
    <>
      <FlowBar step={2} right={(file || "koramangala-2bhk-plan.pdf").toUpperCase()} />
      <div className="wrap review-grid" style={{ padding: "48px 48px 96px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 380px", gap: 32, alignItems: "start" }}>
        <section aria-label="Floor plan editor" style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
          <div className="row-between" style={{ alignItems: "center" }}>
            <div><span className="mono label eyebrow">STEP 2 OF 3 · CHECK THE PLAN</span><h1 className="h-light" style={{ marginTop: 10 }}><span className="serif" style={{ fontSize: "clamp(40px, 4vw, 56px)" }}>Check your</span> <span className="wide" style={{ fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-0.02em" }}>FLOOR PLAN</span></h1></div>
            <div role="toolbar" aria-label="Edit plan" className="tabs">
              <button type="button" className="tab" onClick={() => setRot(rot + 90)}>↻ Rotate</button>
              <button type="button" className="tab" aria-pressed={fh} onClick={() => setFh(!fh)} style={fh ? { background: "var(--blue)", color: "#fff", borderColor: "var(--blue)" } : undefined}>⇋ Flip horizontal</button>
              <button type="button" className="tab" aria-pressed={fv} onClick={() => setFv(!fv)} style={fv ? { background: "var(--blue)", color: "#fff", borderColor: "var(--blue)" } : undefined}>⇵ Flip vertical</button>
            </div>
          </div>
          <div role="radiogroup" aria-label="Tool" className="tabs">
            {TOOLS.map(([id, label]) => <button key={id} type="button" role="radio" aria-checked={tool === id} className="tab" onClick={() => setTool(id)}>{label}</button>)}
          </div>
          <div className="force-dark" style={{ position: "relative", borderRadius: 28, border: "1px solid var(--hair)", background: "#070B1F", padding: 40, overflow: "hidden", backgroundImage: "linear-gradient(rgba(0,119,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,255,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }}>
            <div className="scan" aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, height: 2, background: "#0077FF", boxShadow: "0 0 20px #0077FF", opacity: 0.5 }} />
            <div role="img" aria-label="Floor plan with kitchen, living and dining, two bedrooms and a bath" style={{ margin: "0 auto", width: "min(100%, 560px)", aspectRatio: "4 / 3", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: 0, border: "3px solid #E8F1FF", transform: `rotate(${rot}deg) scale(${fh ? -1 : 1}, ${fv ? -1 : 1})`, transition: "transform .6s cubic-bezier(.65,0,.25,1)" }}>
              {ROOMS.map((r) => (
                <div key={r.n} style={{ gridColumn: r.col, gridRow: r.row, border: "1.5px solid rgba(232,241,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", fontSize: 13, fontWeight: 600, background: "rgba(0,119,255,0.08)" }}>
                  <span style={{ transform: `scale(${fh ? -1 : 1}, ${fv ? -1 : 1}) rotate(${-rot}deg)`, display: "block", textAlign: "center", transition: "transform .6s" }}>{r.n}</span>
                  {r.ping && <span className="ringpulse" style={{ position: "absolute", right: 10, bottom: 10, width: 14, height: 14, borderRadius: "50%", background: "#0077FF" }} />}
                </div>
              ))}
            </div>
          </div>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}>TOOL: {toolName} · CLICK A WALL TO ADD OR REMOVE IT. ● = DOOR · ■ = WINDOW</span>
        </section>

        <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="panel"><span className="wide" style={{ fontSize: 16, fontWeight: 500 }}>WHAT WE FOUND</span>
            <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>{[["5", "ROOMS"], ["6", "DOORS"], ["7", "WINDOWS"]].map(([v, l]) => <div key={l}><div className="wide" style={{ fontSize: 40, fontWeight: 300, lineHeight: 1 }}>{v}</div><span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)" }}>{l}</span></div>)}</div>
          </div>
          <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="row-between" style={{ alignItems: "center" }}><span className="wide" style={{ fontSize: 16, fontWeight: 500 }}>PLEASE CONFIRM</span><span className="mono label" aria-live="polite">{n} / 3</span></div>
            <p style={{ color: "var(--body)", fontSize: 15 }}>We weren’t sure about these. Tick the ones that are right, or fix them on the plan.</p>
            {QS.map((q, i) => (
              <label key={q} className="chk" htmlFor={`cf${i}`} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 14, borderRadius: 16, cursor: "pointer", border: `1px solid ${ok[i] ? "var(--blue)" : "var(--hair)"}`, background: ok[i] ? "rgba(0,119,255,0.18)" : "var(--surface)" }}>
                <input id={`cf${i}`} type="checkbox" checked={ok[i]} onChange={() => setOk(ok.map((v, k) => (k === i ? !v : v)))} style={{ marginTop: 2, flex: "none" }} />{q}
              </label>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}><Link className="cta cta-ghost" href={ROUTES.newScene}>Back</Link><Link className="cta cta-blue" href={`${ROUTES.newShare}?f=${encodeURIComponent(file)}&plan=1`}>Build 3D home →</Link></div>
        </aside>
      </div>
      <style>{`@media(max-width:1000px){.review-grid{grid-template-columns:1fr!important;padding:32px 16px 80px!important}}`}</style>
    </>
  );
}
