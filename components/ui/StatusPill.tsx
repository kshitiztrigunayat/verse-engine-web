type Tone = "ready" | "processing" | "active" | "paused" | "failing" | "connected" | "off";
const TONES: Record<Tone, { bg: string; c: string; bd: string }> = {
  ready: { bg: "rgba(0,119,255,0.35)", c: "#FFFFFF", bd: "#0077FF" },
  active: { bg: "rgba(0,119,255,0.35)", c: "#FFFFFF", bd: "#0077FF" },
  connected: { bg: "rgba(0,119,255,0.3)", c: "#FFFFFF", bd: "#0077FF" },
  processing: { bg: "#001B99", c: "#FFFFFF", bd: "rgba(255,255,255,0.45)" },
  paused: { bg: "transparent", c: "var(--fg)", bd: "var(--hair-strong)" },
  off: { bg: "transparent", c: "var(--fg)", bd: "var(--hair-strong)" },
  failing: { bg: "#FFFFFF", c: "#001B99", bd: "#001B99" },
};
export function StatusPill({ tone, children, pulse }: { tone: Tone; children: React.ReactNode; pulse?: boolean }) {
  const t = TONES[tone];
  return (
    <span className="pill" style={{ background: t.bg, color: t.c, borderColor: t.bd }}>
      {pulse && <span className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor" }} />}
      {children}
    </span>
  );
}
