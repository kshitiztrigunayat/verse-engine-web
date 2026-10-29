"use client";
import { useInView } from "@/lib/hooks";

/** Endless text strip. Decorative (aria-hidden); pauses off-screen; frozen under reduced motion via CSS. */
export function Marquee({ text, reverse, outline, size = 54, weight = 500 }: { text: string; reverse?: boolean; outline?: boolean; size?: number; weight?: number }) {
  const [ref, vis] = useInView<HTMLDivElement>("100px");
  const chunk = <span style={{ paddingRight: 48 }}>{text}</span>;
  return (
    <div ref={ref} aria-hidden="true" style={{ overflow: "hidden" }}>
      <div className={`mq wide${reverse ? " rev" : ""}${outline ? " outline" : ""}${vis ? "" : " paused"}`} style={{ fontSize: size, fontWeight: weight, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
        {chunk}{chunk}
      </div>
    </div>
  );
}
