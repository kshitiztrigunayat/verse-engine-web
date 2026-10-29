import type { Metadata } from "next";
import { UploadView } from "@/components/studio/UploadView";

export const metadata: Metadata = { title: { absolute: "New scene — Upload" } };
export default function Page() { return <UploadView />; }
