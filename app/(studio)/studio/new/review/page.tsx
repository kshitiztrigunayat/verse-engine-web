import type { Metadata } from "next";
import { ReviewView } from "@/components/studio/ReviewView";

export const metadata: Metadata = { title: { absolute: "New scene — Review floor plan" } };
export default async function Page({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  const { f } = await searchParams;
  return <ReviewView file={f ?? ""} />;
}
