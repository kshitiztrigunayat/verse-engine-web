"use client";
import { useState } from "react";
import { PageTitle } from "./Header";
import { BarChart } from "@/components/ui/BarChart";
import { StatusPill } from "@/components/ui/StatusPill";
import { WEBHOOK_DAILY } from "@/lib/api/mock";
import type { Webhook } from "@/lib/api/types";

const SEED: Webhook[] = [
  { id: "wh-1", name: "CRM sync", url: "https://api.lakeview-homes.in/verse/crm", events: ["scene.ready", "scene.viewed"], status: "Active", views: 4320, sessions: 2980, watch: "86h", ok: "99.6%" },
  { id: "wh-2", name: "Slack alerts", url: "https://hooks.slack.example/verse", events: ["scene.ready", "scene.failed"], status: "Active", views: 1210, sessions: 860, watch: "31h", ok: "100%" },
  { id: "wh-3", name: "BI export", url: "https://bi.example.com/ingest/verse", events: ["scene.viewed"], status: "Paused", views: 880, sessions: 610, watch: "18h", ok: "97.2%" },
  { id: "wh-4", name: "Staging test", url: "https://staging.example.com/hook", events: ["scene.failed"], status: "Failing", views: 12, sessions: 9, watch: "0h", ok: "41.0%" },
];
const ICON = { Active: "●", Paused: "‖", Failing: "!" } as const;
const EVENTS = ["scene.ready", "scene.viewed", "scene.failed"];

export function WebhooksView() {
  const [hooks, setHooks] = useState(SEED);
  const [selId, setSelId] = useState(SEED[0].id);
  const [form, setForm] = useState(false);
  const [tested, setTested] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({ "scene.ready": true });
  const cur = hooks.find((h) => h.id === selId) ?? hooks[0];
  const failing = cur.status === "Failing";

  const create = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const h: Webhook = { id: `wh-${Date.now()}`, name: String(fd.get("name")), url: String(fd.get("url")), events: EVENTS.filter((x) => checked[x]), status: "Active", views: 0, sessions: 0, watch: "0h", ok: "100%" };
    setHooks([...hooks, h]); setSelId(h.id); setForm(false); setTested(false);
  };
  const setStatus = (status: Webhook["status"]) => setHooks(hooks.map((h) => (h.id === cur.id ? { ...h, status } : h)));
  const del = () => {
    if (hooks.length < 2) { setConfirm(false); return; }
    const rest = hooks.filter((h) => h.id !== cur.id);
    setHooks(rest); setSelId(rest[0].id); setConfirm(false);
  };

  return (
    <>
      <div className="row-between">
        <PageTitle eyebrow="STUDIO · WEBHOOKS" serif="Hear it" wide="First" sub="Get notified when a scene is ready, viewed or fails, and see how each webhook performs." />
        <button type="button" className="cta cta-blue" aria-expanded={form} onClick={() => { setForm(!form); setTested(false); }}>{form ? "Close" : "+ Create webhook"}</button>
      </div>

      {form && (
        <form className="panel fadeup" onSubmit={create} style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20 }}>
          <span className="wide" style={{ fontSize: 18, fontWeight: 600 }}>CREATE A NEW WEBHOOK</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            <label className="fld" htmlFor="h-name">NAME<input id="h-name" name="name" className="inp" required placeholder="e.g. CRM sync" /></label>
            <label className="fld" htmlFor="h-url">ENDPOINT URL<input id="h-url" name="url" className="inp" type="url" required placeholder="https://your-server.com/verse" /></label>
          </div>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}><legend className="mono eyebrow" style={{ color: "var(--muted)", marginBottom: 12 }}>EVENTS TO SEND</legend>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>{EVENTS.map((ev) => <label key={ev} className="mono" style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 44, fontSize: 13 }}><input type="checkbox" checked={!!checked[ev]} onChange={() => setChecked({ ...checked, [ev]: !checked[ev] })} />{ev}</label>)}</div>
          </fieldset>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button className="cta cta-blue" type="submit">Create webhook</button>
            <button className="cta cta-ghost" type="button" onClick={() => setTested(true)}>Send test event</button>
            {tested && <span className="mono label fadeup" role="status" style={{ fontSize: 12 }}>✓ TEST EVENT SENT · 200 OK</span>}
          </div>
        </form>
      )}

      <div className="wh-grid" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "minmax(0, 360px) minmax(0, 1fr)", gap: 24, alignItems: "start" }}>
        <section aria-label="Your webhooks" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {hooks.map((h) => {
            const on = h.id === cur.id;
            return (
              <button key={h.id} type="button" aria-pressed={on} onClick={() => { setSelId(h.id); setConfirm(false); }} style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", padding: 18, borderRadius: 20, cursor: "pointer", border: `1px solid ${on ? "var(--blue)" : "var(--hair)"}`, background: on ? "rgba(0,119,255,0.15)" : "var(--surface)", minHeight: 44 }}>
                <span style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><span style={{ fontWeight: 600, fontSize: 17 }}>{h.name}</span><StatusPill tone={h.status.toLowerCase() as "active"}>{ICON[h.status]} {h.status.toUpperCase()}</StatusPill></span>
                <span className="mono" style={{ fontSize: 11, color: "var(--muted)", overflowWrap: "anywhere" }}>{h.url}</span>
              </button>
            );
          })}
        </section>
        <section className="panel" aria-label={`${cur.name} details`} style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
          <div className="row-between" style={{ alignItems: "flex-start" }}>
            <div style={{ minWidth: 0 }}><h2 className="wide" style={{ fontWeight: 600, fontSize: 28, textTransform: "uppercase" }}>{cur.name}</h2><span className="mono" style={{ fontSize: 11, color: "var(--muted)", overflowWrap: "anywhere" }}>{cur.url} · {cur.events.join(", ")}</span></div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button type="button" className="cta cta-ghost cta-sm" onClick={() => setStatus(cur.status === "Paused" ? "Active" : "Paused")}>{cur.status === "Paused" ? "Resume" : "Pause"}</button>
              {!confirm ? <button type="button" className="cta cta-ghost cta-sm" onClick={() => setConfirm(true)}>Delete</button> : (
                <span className="fadeup" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}><span className="mono" style={{ fontSize: 11 }}>DELETE?</span><button type="button" className="cta cta-white cta-sm" onClick={del}>Yes</button><button type="button" className="cta cta-ghost cta-sm" onClick={() => setConfirm(false)}>Cancel</button></span>
              )}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
            {[["Number of views", cur.views.toLocaleString("en-IN")], ["Unique sessions", cur.sessions.toLocaleString("en-IN")], ["Watch time", cur.watch], ["Delivered OK", cur.ok]].map(([l, v]) => <div key={l}><span style={{ color: "var(--body)", fontSize: 14 }}>{l}</span><div className="wide" style={{ fontSize: 26, fontWeight: 700 }}>{v}</div></div>)}
          </div>
          <div><span style={{ fontWeight: 600, display: "block", marginBottom: 14 }}>Events delivered per day</span><BarChart data={WEBHOOK_DAILY.map((v) => (v * cur.views) / 4320)} max={290} height={120} label="Events delivered per day over the last 20 days" /></div>
          <div>
            <span style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>Recent deliveries</span>
            {[["scene.ready", "Today, 10:40", true], ["scene.viewed", "Today, 10:42", true], ["scene.viewed", "Yesterday, 18:27", !failing]].map(([ev, when, ok], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid var(--hair-soft)", flexWrap: "wrap" }}>
                <code className="mono" style={{ fontSize: 13 }}>{ev as string}</code><span style={{ color: "var(--body)" }}>{when as string}</span>
                <span className="pill" style={ok ? { background: "rgba(0,119,255,0.3)", borderColor: "var(--blue)" } : { background: "#FFFFFF", color: "#001B99", borderColor: "#001B99" }}>{ok ? "✓ 200 OK" : "! 500 RETRYING"}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <style>{`@media(max-width:900px){.wh-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  );
}
