import type { Metadata } from "next";
import { AnalyticsView } from "@/components/studio/AnalyticsView";

export const metadata: Metadata = { title: { absolute: "Verse Engine Studio — Analytics" } };
export default async function Page({ searchParams }: { searchParams: Promise<{ scene?: string }> }) {
  const { scene } = await searchParams;
  return <AnalyticsView initial={scene} />;
}
