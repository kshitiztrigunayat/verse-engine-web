import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = { title: "About" };
export default function Page() { return <AboutView />; }
