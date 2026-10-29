"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FlowBar } from "./Stepper";
import { CopyButton } from "@/components/ui/CopyButton";
import { Cube } from "@/components/ui/Cube";
import { Tabs } from "@/components/ui/Tabs";
import { LINKS, ROUTES } from "@/lib/links";

const EMBED = `<script src="https://${LINKS.sdkUrl}"></script>\n<verse-scene id="sc-1043"></verse-scene>`;
const NOTES: Record<string, string> = { video: "EXPORTING A FLYTHROUGH VIDEO… IT WILL APPEAR IN STUDIO.", tour: "LIVE TOUR READY — SHARE THE LINK AND GUIDE EVERYONE’S VIEW.", phone: "OPEN THE SAME LINK ON YOUR PHONE — NO APP NEEDED." };
const ACTIONS = [["video", "Export video"], ["embed", "Embed"], ["tour", "Start live tour"], ["phone", "Open on phone"]] as const;

export function ShareView({ file, plan }: { file: string; plan: boolean }) {
  const [name, setName] = useState(plan ? "Koramangala 2BHK" : file ? file.replace(/\.[^.]+$/, "") : "Living room set");
  const [access, setAccess] = useState<"private" | "public">("private");
  const [tg, setTg] = useState([true, true, false]);
  const [embed, setEmbed] = useState(false);
  const [note, setNote] = useState("");
  const [rs, setRs] = useState<0 | 1 | 2>(0);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(t.current), []);
  const restyle = (e: React.FormEvent) => { e.preventDefault(); setRs(1); clearTimeout(t.current); t.current = setTimeout(() => setRs(2), 1600); };

  return (
    <>
      <FlowBar step={3} right="PRO TRIAL · UP TO 20 GB PER FILE" />
      <div className="wrap share-grid" style={{ padding: "48px 48px 96px", display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 40, alignItems: "start" }}>
        <section aria-label="Preview" style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
          <div className="row-between" style={{ alignItems: "center" }}>
            <div><span className="mono label eyebrow">STEP 3 OF 3 · SEND IT FLYING</span><h1 className="h-light" style={{ marginTop: 10 }}><span className="serif" style={{ fontSize: "clamp(40px, 4vw, 56px)" }}>Your scene</span> <span className="wide" style={{ fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-0.02em" }}>IS READY</span></h1></div>
            <span className="mono label" style={{ fontSize: 11, letterSpacing: "0.1em" }}>✓ SIGNED &amp; READY FOR EVERY DEVICE</span>
          </div>
          <div className="force-dark" style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 28, overflow: "hidden", background: "#070B1F", border: "1px solid var(--hair)" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(closest-side, rgba(0,119,255,0.45), rgba(7,11,31,0))" }} />
            <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "45%", perspective: 400, overflow: "hidden" }}><div className="floor" style={{ position: "absolute", left: -600, right: -600, top: 0, height: 700, transformOrigin: "50% 0", transform: "rotateX(74deg)", backgroundImage: "linear-gradient(rgba(0,119,255,0.6) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0,119,255,0.6) 1.5px, transparent 1.5px)", backgroundSize: "60px 60px" }} /><div style={{ position: "absolute", inset: 0, background: "linear-gradient(#070B1F, transparent 55%)" }} /></div>
            <Cube style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", left: 20, bottom: 18, right: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}><span className="wide" style={{ fontSize: 20, fontWeight: 600 }}>{name || "New scene"}</span><span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", opacity: 0.85 }}>DRAG TO LOOK · WASD TO WALK · SCROLL TO ZOOM</span></div>
            {rs === 2 && <span className="mono fadeup" style={{ position: "absolute", top: 16, right: 16, padding: "6px 12px", borderRadius: 999, background: "#0077FF", fontSize: 11, letterSpacing: "0.1em" }}>RESTYLED ✓</span>}
          </div>
          {plan && (
            <form onSubmit={restyle} className="panel" style={{ display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap" }}>
              <label className="fld" htmlFor="restyle" style={{ flex: 1, minWidth: 240 }}>RESTYLE WITH A PROMPT · FLOOR-PLAN HOMES<input id="restyle" className="inp" placeholder="e.g. Scandinavian, light oak floors, warm evening light" /></label>
              <button className="cta cta-blue" type="submit" style={{ minHeight: 48 }}>{rs === 1 ? "Restyling…" : "Restyle"}</button>
            </form>
          )}
        </section>

        <section aria-label="Share settings" style={{ display: "flex", flexDirection: "column", gap: 22, minWidth: 0 }}>
          <h2 className="wide" style={{ fontWeight: 600, fontSize: 24 }}>SHARE ONE LINK</h2>
          <label className="fld" htmlFor="scene-name">SCENE NAME<input id="scene-name" className="inp" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--hair-strong)", borderRadius: 999, padding: "6px 6px 6px 20px", background: "var(--input-bg)" }}><code className="mono" style={{ flex: 1, minWidth: 0, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>verse.ctruh.com/s/sc-1043</code><CopyButton text="verse.ctruh.com/s/sc-1043" label="Copy" className="cta cta-blue cta-sm" /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="fld">WHO CAN OPEN IT</span>
            <Tabs radio label="Who can open it" value={access} onChange={setAccess} items={[["private", "Private link"], ["public", "Public"]] as const} />
            <span style={{ color: "var(--body)", fontSize: 15 }}>{access === "private" ? "Only people with the link can open it. You can revoke it any time." : "Anyone can find and open this scene."}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {["Allow comments", "Show Verse Engine branding", "Link expires"].map((l, i) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid var(--hair-soft)", minHeight: 56 }}>
                <span id={`tg${i}`}>{l}</span>
                <button type="button" className="sw" role="switch" aria-checked={tg[i]} aria-labelledby={`tg${i}`} onClick={() => setTg(tg.map((v, k) => (k === i ? !v : v)))}><span /></button>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
            {ACTIONS.map(([id, label]) => {
              const on = id === "embed" ? embed : note === id;
              return <button key={id} type="button" aria-pressed={on} onClick={() => (id === "embed" ? setEmbed(!embed) : setNote(note === id ? "" : id))} style={{ minHeight: 52, borderRadius: 16, cursor: "pointer", fontWeight: 600, border: `1px solid ${on ? "var(--blue)" : "var(--hair-strong)"}`, background: on ? "rgba(0,119,255,0.15)" : "var(--surface)" }}>{label}</button>;
            })}
          </div>
          {note && <span className="mono label fadeup" role="status" style={{ fontSize: 11, letterSpacing: "0.08em" }}>{NOTES[note]}</span>}
          {embed && <pre className="mono force-dark fadeup" tabIndex={0} style={{ margin: 0, padding: 16, borderRadius: 16, background: "#070B1F", border: "1px solid var(--hair)", fontSize: 12, lineHeight: 1.7, overflowX: "auto" }}>{EMBED}</pre>}
          <Link className="cta cta-blue cta-lg" href={ROUTES.studio}>Save to Studio</Link>
        </section>
      </div>
      <style>{`@media(max-width:1000px){.share-grid{grid-template-columns:1fr!important;padding:32px 16px 80px!important}}`}</style>
    </>
  );
}
