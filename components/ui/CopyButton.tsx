"use client";
import { useCopy } from "@/lib/hooks";

export function CopyButton({ text, label = "Copy link", className = "cta cta-ghost cta-sm" }: { text: string; label?: string; className?: string }) {
  const [copied, copy] = useCopy();
  return (
    <button type="button" className={className} onClick={() => copy(text)} aria-live="polite">
      {copied ? "Copied ✓" : label}
    </button>
  );
}
