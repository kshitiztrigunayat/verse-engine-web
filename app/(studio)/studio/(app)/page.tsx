import type { Metadata } from "next";
import { ScenesView } from "@/components/studio/ScenesView";

export const metadata: Metadata = { title: { absolute: "Verse Engine Studio — Scenes" } };
export default function Page() { return <ScenesView />; }
