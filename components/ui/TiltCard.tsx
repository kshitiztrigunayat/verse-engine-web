"use client";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

/** Gyroscope tilt: ±9–10° toward the pointer, moving glare, children lifted in Z via .lift/.lift-sm. */
export function TiltCard({ soon, children }: { soon?: boolean; children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const [hov, setHov] = useState(false);
  const move = (e: React.PointerEvent) => {
    if (rm || !wrap.current || !inner.current) return;
    const r = wrap.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    inner.current.style.transform = `rotateX(${((0.5 - y) * 18).toFixed(2)}deg) rotateY(${((x - 0.5) * 21).toFixed(2)}deg)`;
    inner.current.style.setProperty("--gx", `${x * 100}%`);
    inner.current.style.setProperty("--gy", `${y * 100}%`);
  };
  const leave = () => {
    setHov(false);
    if (inner.current) inner.current.style.transform = "";
  };
  return (
    <div ref={wrap} className={`tcard${hov ? " hov" : ""}`} onPointerEnter={() => setHov(true)} onPointerMove={move} onPointerLeave={leave}>
      <div ref={inner} className={`tin${soon ? " soon" : ""}`}>{children}</div>
    </div>
  );
}
