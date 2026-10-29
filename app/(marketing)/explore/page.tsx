import type { Metadata } from "next";
import { ExploreView } from "@/components/pages/ExploreView";

export const metadata: Metadata = { title: "Explore" };
export default function Page() { return <ExploreView />; }
