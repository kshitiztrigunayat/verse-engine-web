import type { Metadata } from "next";
import { KeysView } from "@/components/studio/KeysView";

export const metadata: Metadata = { title: { absolute: "Verse Engine Studio — Plug-ins and API" } };
export default function Page() { return <KeysView />; }
