import type { Metadata } from "next";
import { PluginsView } from "@/components/pages/PluginsView";

export const metadata: Metadata = { title: "Plug-ins" };
export default function Page() { return <PluginsView />; }
