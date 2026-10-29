"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageTitle } from "./Header";
import { BarChart } from "@/components/ui/BarChart";
import { CopyButton } from "@/components/ui/CopyButton";
import { Tabs } from "@/components/ui/Tabs";
import { DAILY, SCENES, SESSIONS, fmt, hrs } from "@/lib/api/mock";
import { ROUTES } from "@/lib/links";

const DEVICES = [["Phone", 58, "#0077FF"], ["Desktop", 34, "#FFFFFF"], ["Headset", 8, "#FFFFFF"]] as const;

export function AnalyticsView({ initial }: { initial?: string }) {
  const router = useRouter();
  const [id, setId] = useState(SCENES.some((s) => s.id === initial) ? initial! : "sc-1039");
  const [range, setRange] = useState(30);
  const s = SCENES.find((x) => x.id === id) ?? SCENES[1];
  const k = range / 30;
  const bars = DAILY.slice(-Math.min(range, 30)).map((v) => (v * s.views) / 3410);
  const processing = s.status === "Processing";
  return (
    <>
      <PageTitle eyebrow="STUDIO · ANALYTICS" serif="How it’s" wide="Landing" />
      <div className="panel" style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 260, flex: "1 1 340px" }}>
          <span className="mono label eyebrow">{s.source}</span>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <label htmlFor="pick" className="mono eyebrow" style={{ color: "var(--muted)" }}>SCENE</label>
            <select id="pick" className="sel" style={{ maxWidth: 320 }} value={id} onChange={(e) => { setId(e.target.value); router.replace(ROUTES.analytics(e.target.value), { scroll: false }); }}>
              {SCENES.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", overflowWrap: "anywhere" }}>{`verse.ctruh.com/s/${s.id} · PRIVATE LINK · PUBLISHED ${s.date}`.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><CopyButton key={id} text={`verse.ctruh.com/s/${s.id}`} /><Link className="cta cta-blue cta-sm" href={ROUTES.newShare}>Open scene</Link></div>
      </div>
      <div style={{ marginTop: 24 }}><Tabs label="Date range" value={range} onChange={setRange} items={[[7, "7 days"], [30, "30 days"], [90, "90 days"]] as const} /></div>

      {processing ? (
        <div className="panel fadeup" role="status" style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          <span className="mono label" style={{ display: "flex", gap: 10, alignItems: "center" }}><span className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue)" }} />PROCESSING</span>
          <span style={{ color: "var(--body)" }}>This scene is still being prepared. Numbers show up once people open it.</span>
        </div>
      ) : (
        <div key={`${id}-${range}`} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {[["Number of views", fmt(Math.round(s.views * k))], ["Unique sessions", fmt(Math.round(s.sessions * k))], ["Watch time", hrs(Math.round(s.watch * k))]].map(([l, v]) => <div key={l} className="kpi fadeup"><span style={{ color: "var(--body)" }}>{l}</span><span className="wide" style={{ fontSize: 34, fontWeight: 700 }}>{v}</span><span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)" }}>LAST {range} DAYS</span></div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 20 }}>
            <div className="panel"><span style={{ fontWeight: 600, display: "block", marginBottom: 20 }}>Views per day</span><BarChart data={bars} label="Views per day for this scene" /></div>
            <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <span style={{ fontWeight: 600 }}>Where people watched</span>
              {DEVICES.map(([n, p, c]) => (
                <div key={n}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span>{n}</span><span className="mono">{p}%</span></div><div style={{ height: 10, borderRadius: 99, background: "var(--hair)", overflow: "hidden" }}><div className="grow" style={{ height: "100%", width: `${p}%`, background: c === "#0077FF" ? c : "var(--blue)", opacity: c === "#0077FF" ? 1 : p / 40, borderRadius: 99 }} /></div></div>
              ))}
            </div>
          </div>
          <div className="panel" style={{ padding: 0, overflowX: "auto" }}>
            <span style={{ fontWeight: 600, display: "block", padding: "22px 24px 8px" }}>Recent sessions</span>
            <table className="data-table"><thead><tr><th scope="col">WHEN</th><th scope="col">DEVICE</th><th scope="col">CITY</th><th scope="col">WATCH TIME</th></tr></thead>
              <tbody>{SESSIONS.map((r) => <tr key={r.when}><td>{r.when}</td><td>{r.device}</td><td>{r.city}</td><td className="mono">{r.watch}</td></tr>)}</tbody></table>
          </div>
        </div>
      )}
    </>
  );
}
