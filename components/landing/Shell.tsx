"use client";
import { createContext, useContext, useState } from "react";
import { usePreloaderSeen } from "@/lib/hooks";
import { Preloader } from "./Preloader";
import { SmoothScroll } from "./SmoothScroll";
import { FloatingPill } from "./FloatingPill";

const Entered = createContext(true);
export const useEntered = () => useContext(Entered);

/** Holds the preloader state; hero entrance animations wait for `entered`. */
export function LandingShell({ children }: { children: React.ReactNode }) {
  const [done, setEntered] = useState(false);
  const seen = usePreloaderSeen();
  const entered = done || seen;
  return (
    <Entered.Provider value={entered}>
      <SmoothScroll />
      <Preloader onEnter={() => setEntered(true)} />
      {children}
      <FloatingPill />
    </Entered.Provider>
  );
}
