"use client";
import Link from "next/link";
import { useState } from "react";
import { PageTitle } from "./Header";
import { BarChart } from "@/components/ui/BarChart";
import { CopyButton } from "@/components/ui/CopyButton";
import { Cube } from "@/components/ui/Cube";
import { StatusPill } from "@/components/ui/StatusPill";
import { Tabs } from "@/components/ui/Tabs";
import { DAILY, SCENES, fmt } from "@/lib/api/mock";
import { ROUTES } from "@/lib/links";

const KPIS = [["Scenes created", "6"], ["Total views", fmt(11332)], ["Total watch time", "288h 05m"], ["Unique sessions", fmt(8045)]];

export function ScenesView() {
  const [f, setF] = useState("all");
  const [q, setQ] = useState("");
  const list = SCENES.filter((s) => (f === "all" || s.status.toLowerCase() === f) && s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="row-between">
        <PageTitle eyebrow="STUDIO" serif="Your" wide="Scenes" sub="Everything you’ve uploaded or published from a plug-in." />
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ minWidth: 220 }}><label className="sr-only" htmlFor="q">Search scenes</label><input id="q" className="inp" type="search" placeholder="Search scenes" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <Link className="cta cta-blue" href={ROUTES.newScene} style={{ minHeight: 48 }}>+ New scene</Link>
        </div>
      </div>

      <section aria-label="Global analytics" style={{ marginTop: 40 }}>
        <span className="mono eyebrow" style={{ color: "var(--muted)" }}>GLOBAL ANALYTICS · LAST 30 DAYS</span>
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {KPIS.map(([l, v], i) => <div key={l} className="kpi fadeup" style={{ animationDelay: `${i * 0.06}s` }}><span style={{ color: "var(--body)" }}>{l}</span><span className="wide" style={{ fontSize: 34, fontWeight: 700 }}>{v}</span></div>)}
        </div>
        <div className="panel" style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, gap: 8, flexWrap: "wrap" }}><span style={{ fontWeight: 600 }}>Views across all scenes</span><span className="mono label" style={{ fontSize: 11, letterSpacing: "0.1em" }}>PEAK 310 TODAY</span></div>
          <BarChart data={DAILY} max={320} label="Views per day over the last 30 days, rising to a peak of 310 today" />
          <div className="mono" style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}><span>30 DAYS AGO</span><span>TODAY</span></div>
        </div>
      </section>

      <section aria-label="Scenes" style={{ marginTop: 48 }}>
        <div className="row-between" style={{ alignItems: "center", marginBottom: 20 }}>
          <span className="mono eyebrow" style={{ color: "var(--muted)" }}>ALL SCENES ({list.length})</span>
          <Tabs label="Filter scenes" value={f} onChange={setF} items={[["all", "All"], ["ready", "Ready"], ["processing", "Processing"]] as const} />
        </div>
        {list.length ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 20 }}>
            {list.map((s, i) => {
              const ready = s.status === "Ready";
              return (
                <article key={s.id} className="scard lift-card">
                  <div className="force-dark" style={{ position: "relative", height: 170, background: i % 2 ? "#070B1F" : "#001B99", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <Cube size="sm" />
                    <span style={{ position: "absolute", top: 14, left: 14 }}><StatusPill tone={ready ? "ready" : "processing"} pulse={!ready}>{s.status.toUpperCase()}</StatusPill></span>
                    <span className="mono" style={{ position: "absolute", top: 14, right: 14, fontSize: 10, letterSpacing: "0.12em", padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(232,241,255,0.35)" }}>{s.source}</span>
                  </div>
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                    <div><div style={{ fontWeight: 600, fontSize: 18 }}>{s.name}</div><div className="mono" style={{ marginTop: 6, fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)" }}>{`${fmt(s.views)} VIEWS · ${fmt(s.sessions)} SESSIONS · ${s.date}`.toUpperCase()}</div></div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <CopyButton text={`verse.ctruh.com/s/${s.id}`} />
                      <Link className="cta cta-ghost cta-sm" href={ROUTES.analytics(s.id)}>Analytics</Link>
                      <Link className="cta cta-blue cta-sm" href={ROUTES.newShare}>Open</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : <div className="panel" role="status">No scenes match. Try another filter or <Link href={ROUTES.newScene} style={{ color: "var(--label)", fontWeight: 600 }}>upload a new scene</Link>.</div>}
      </section>
    </>
  );
}
