import type { Metadata } from "next";
import { LandingShell } from "@/components/landing/Shell";
import { Hero } from "@/components/landing/Hero";
import { LensScene } from "@/components/landing/LensScene";
import { Proof } from "@/components/landing/Proof";
import { HowToStart } from "@/components/landing/HowToStart";
import { Realities } from "@/components/landing/Realities";
import { Tools } from "@/components/landing/Tools";
import { Dare } from "@/components/landing/Dare";
import { BehindCurtain } from "@/components/landing/BehindCurtain";
import { Library } from "@/components/landing/Library";
import { Portal } from "@/components/landing/Portal";

export const metadata: Metadata = { title: { absolute: "Verse Engine by Ctruh — Any 3D model, as a link" } };

export default function Landing() {
  return (
    <>
      <LandingShell>
        <Hero />
        <LensScene />
        <Proof />
        <HowToStart />
        <Realities />
        <Tools />
        <Dare />
        <BehindCurtain />
        <Library />
        <Portal />
      </LandingShell>
    </>
  );
}
