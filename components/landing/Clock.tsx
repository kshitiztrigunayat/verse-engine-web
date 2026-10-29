"use client";
import { useNow } from "@/lib/hooks";

const two = (n: number) => String(n).padStart(2, "0");
export function Clock() {
  const now = useNow();
  const d = new Date((now ?? 0) + 330 * 60000); // IST = UTC+5:30
  return <span style={{ fontSize: 22, color: "var(--fg)", letterSpacing: "0.04em" }} suppressHydrationWarning>{now === null ? "--:--:--" : `${two(d.getUTCHours())}:${two(d.getUTCMinutes())}:${two(d.getUTCSeconds())}`}</span>;
}
