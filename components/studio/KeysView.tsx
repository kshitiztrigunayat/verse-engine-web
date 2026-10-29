"use client";
import Link from "next/link";
import { useState } from "react";
import { PageTitle } from "./Header";
import { CopyButton } from "@/components/ui/CopyButton";
import { StatusPill } from "@/components/ui/StatusPill";
import type { ApiKey, Plugin } from "@/lib/api/types";
import { ROUTES } from "@/lib/links";

const PLUGS: Plugin[] = [
  { id: "blender", name: "Blender", initial: "B", version: "v2.4.1 · signed in", connected: true },
  { id: "unity", name: "Unity", initial: "U", version: "Not installed", connected: false },
  { id: "unreal", name: "Unreal", initial: "UE", version: "v1.8.0 · signed in", connected: true },
];
const KEYS: ApiKey[] = [
  { id: "k1", name: "Production", tail: "9f2a", created: "02 Sep 2026", used: "Today" },
  { id: "k2", name: "Website embed", tail: "7c41", created: "14 Sep 2026", used: "Yesterday" },
  { id: "k3", name: "Blender plug-in", tail: "e03b", created: "01 Oct 2026", used: "18 Oct 2026" },
];

export function KeysView() {
  const [keys, setKeys] = useState(KEYS);
  const [act, setAct] = useState<Record<string, boolean>>({});
  const [fresh, setFresh] = useState<string | null>(null);
  const create = () => {
    const r = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setFresh(`vrs_example_${r}`);
    setKeys([...keys, { id: `k${Date.now()}`, name: "New key", tail: r.slice(-4), created: "Today", used: "Never" }]);
  };
  return (
    <>
      <PageTitle eyebrow="STUDIO · PLUG-INS & API" serif="Plug in," wide="Power up" sub="Connect your tools and manage the keys your apps use." />
      <section aria-labelledby="inst" style={{ marginTop: 40 }}>
        <div className="row-between" style={{ alignItems: "center", marginBottom: 18 }}><span id="inst" className="mono eyebrow" style={{ color: "var(--muted)" }}>INSTALLED PLUG-INS</span><Link href={ROUTES.plugins} style={{ fontWeight: 600 }}>Browse all plug-ins →</Link></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {PLUGS.map((p) => (
            <div key={p.id} className="panel" style={{ display: "flex", flexDirection: "column", gap: 18, borderColor: p.connected ? "rgba(0,119,255,0.6)" : undefined }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span className="wide" aria-hidden="true" style={{ width: 46, height: 46, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, background: p.connected ? "#0077FF" : "var(--surface-2)", color: p.connected ? "#fff" : "var(--fg)" }}>{p.initial}</span>
                <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}><span style={{ fontWeight: 600, fontSize: 18 }}>{p.name}</span><span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{p.version}</span></div>
              </div>
              <StatusPill tone={p.connected ? "connected" : "off"}>{p.connected ? "● CONNECTED" : "NOT CONNECTED"}</StatusPill>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button type="button" className={`cta cta-sm ${p.connected ? "cta-ghost" : "cta-blue"}`} onClick={() => setAct({ ...act, [p.id]: true })}>{act[p.id] ? (p.connected ? "Up to date ✓" : "Downloading…") : p.connected ? "Check for update" : "Download"}</button>
                <Link className="cta cta-ghost cta-sm" href={ROUTES.plugin(p.id)}>Install guide</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="keys" style={{ marginTop: 56 }}>
        <div className="row-between" style={{ alignItems: "center", marginBottom: 20 }}>
          <div><h2 id="keys" className="wide" style={{ fontWeight: 500, fontSize: 26 }}>API KEYS</h2><span style={{ color: "var(--body)" }}>Use these with the REST API, the SDK and plug-in sign-in.</span></div>
          <button type="button" className="cta cta-blue" onClick={create}>+ Create key</button>
        </div>
        {fresh && (
          <div className="panel fadeup" role="status" style={{ marginBottom: 16, borderColor: "var(--blue)", background: "rgba(0,119,255,0.12)", display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontWeight: 600 }}>New key created. Copy it now — it won’t be shown again.</span>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}><code className="mono" style={{ padding: "12px 16px", borderRadius: 12, background: "var(--surface-2)", overflowWrap: "anywhere", fontSize: 13 }}>{fresh}</code><CopyButton text={fresh} label="Copy" /></div>
          </div>
        )}
        <div className="panel" style={{ padding: 0, overflowX: "auto" }}>
          <table className="data-table">
            <thead><tr><th scope="col">NAME</th><th scope="col">KEY</th><th scope="col">CREATED</th><th scope="col">LAST USED</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id}><td>{k.name}</td><td><code className="mono">vrs_••••{k.tail}</code></td><td className="mono">{k.created}</td><td className="mono">{k.used}</td>
                  <td style={{ textAlign: "right" }}><button type="button" className="cta cta-ghost cta-sm" aria-label={`Revoke ${k.name}`} onClick={() => setKeys(keys.filter((x) => x.id !== k.id))}>Revoke</button></td></tr>
              ))}
              {!keys.length && <tr><td colSpan={5} style={{ color: "var(--muted)" }}>No keys. Create one to connect a plug-in or the API.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
