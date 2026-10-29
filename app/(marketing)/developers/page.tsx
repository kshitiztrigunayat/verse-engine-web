import type { Metadata } from "next";
import { DevelopersView } from "@/components/pages/DevelopersView";

export const metadata: Metadata = { title: "Developers" };
export default function Page() { return <DevelopersView />; }
