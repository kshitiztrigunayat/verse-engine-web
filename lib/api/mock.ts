// Mock API clients. Same shapes the real API will return — swap the bodies for fetch() calls later
// [PLACEHOLDER endpoints]. Latency is simulated so loading states stay honest.
import type { ApiKey, Plugin, Scene, Session, Webhook } from "./types";

const wait = <T,>(v: T, ms = 120) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const SCENES: Scene[] = [
  { id: "sc-1042", name: "Prestige Lakeview 3BHK", source: "INSTANT HOME", status: "Ready", views: 1284, sessions: 902, watch: 2472, date: "18 Oct 2026" },
  { id: "sc-1039", name: "Aurora sofa configurator", source: "BLENDER", status: "Ready", views: 3410, sessions: 2205, watch: 5800, date: "15 Oct 2026" },
  { id: "sc-1036", name: "Indiranagar showroom tour", source: "UNREAL", status: "Ready", views: 876, sessions: 540, watch: 3485, date: "12 Oct 2026" },
  { id: "sc-1033", name: "HSR office scan", source: "UPLOAD · E57", status: "Processing", views: 0, sessions: 0, watch: 0, date: "21 Oct 2026" },
  { id: "sc-1030", name: "Runner X sneaker drop", source: "UNITY", status: "Ready", views: 5120, sessions: 3988, watch: 4338, date: "06 Oct 2026" },
  { id: "sc-1027", name: "Whitefield villa 12", source: "INSTANT HOME", status: "Ready", views: 642, sessions: 410, watch: 1190, date: "02 Oct 2026" },
];
export const DAILY = [92, 110, 98, 130, 124, 150, 141, 170, 162, 155, 190, 178, 205, 196, 184, 220, 214, 240, 205, 198, 230, 262, 270, 248, 236, 290, 276, 240, 268, 310];
export const SESSIONS: Session[] = [
  { when: "Today, 10:42", device: "Phone · Chrome", city: "Bengaluru", watch: "6m 12s" },
  { when: "Today, 09:15", device: "Desktop · Safari", city: "Mumbai", watch: "11m 40s" },
  { when: "Yesterday, 21:03", device: "Phone · Safari", city: "Pune", watch: "3m 05s" },
  { when: "Yesterday, 18:27", device: "Headset · Quest Browser", city: "San Francisco", watch: "14m 22s" },
  { when: "20 Oct, 16:50", device: "Desktop · Edge", city: "Hyderabad", watch: "7m 48s" },
];
export const WEBHOOK_DAILY = [162, 155, 190, 178, 205, 196, 184, 220, 214, 240, 205, 198, 230, 262, 270, 248, 236, 290, 276, 240];
const WEBHOOKS: Webhook[] = [
  { id: "wh-1", name: "CRM sync", url: "https://api.lakeview-homes.in/verse/crm", events: ["scene.ready", "scene.viewed"], status: "Active", views: 4320, sessions: 2980, watch: "86h", ok: "99.6%" },
  { id: "wh-2", name: "Slack alerts", url: "https://hooks.slack.example/verse", events: ["scene.ready", "scene.failed"], status: "Active", views: 1210, sessions: 860, watch: "31h", ok: "100%" },
  { id: "wh-3", name: "BI export", url: "https://bi.example.com/ingest/verse", events: ["scene.viewed"], status: "Paused", views: 880, sessions: 610, watch: "18h", ok: "97.2%" },
  { id: "wh-4", name: "Staging test", url: "https://staging.example.com/hook", events: ["scene.failed"], status: "Failing", views: 12, sessions: 9, watch: "0h", ok: "41.0%" },
];
const KEYS: ApiKey[] = [
  { id: "k1", name: "Production", tail: "9f2a", created: "02 Sep 2026", used: "Today" },
  { id: "k2", name: "Website embed", tail: "7c41", created: "14 Sep 2026", used: "Yesterday" },
  { id: "k3", name: "Blender plug-in", tail: "e03b", created: "01 Oct 2026", used: "18 Oct 2026" },
];
const PLUGINS: Plugin[] = [
  { id: "blender", name: "Blender", initial: "B", version: "v2.4.1 · signed in", connected: true },
  { id: "unity", name: "Unity", initial: "U", version: "Not installed", connected: false },
  { id: "unreal", name: "Unreal", initial: "UE", version: "v1.8.0 · signed in", connected: true },
];

export const api = {
  listScenes: () => wait(SCENES),
  getScene: (id: string) => wait(SCENES.find((s) => s.id === id) ?? SCENES[1]),
  listSessions: () => wait(SESSIONS),
  listWebhooks: () => wait(WEBHOOKS),
  listKeys: () => wait(KEYS),
  listPlugins: () => wait(PLUGINS),
};

export const fmt = (n: number) => n.toLocaleString("en-IN");
export const hrs = (m: number) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;
