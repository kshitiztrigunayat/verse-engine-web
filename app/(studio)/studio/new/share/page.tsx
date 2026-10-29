import type { Metadata } from "next";
import { ShareView } from "@/components/studio/ShareView";

export const metadata: Metadata = { title: { absolute: "New scene — Preview and share" } };
export default async function Page({ searchParams }: { searchParams: Promise<{ f?: string; plan?: string }> }) {
  const { f, plan } = await searchParams;
  return <ShareView file={f ?? ""} plan={plan === "1"} />;
}
