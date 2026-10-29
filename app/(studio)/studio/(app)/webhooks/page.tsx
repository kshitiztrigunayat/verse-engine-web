import type { Metadata } from "next";
import { WebhooksView } from "@/components/studio/WebhooksView";

export const metadata: Metadata = { title: { absolute: "Verse Engine Studio — Webhooks" } };
export default function Page() { return <WebhooksView />; }
