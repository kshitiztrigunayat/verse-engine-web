import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PluginGuideView } from "@/components/pages/PluginGuideView";
import { EDITOR_KEYS, PLUGIN_GUIDES, type EditorKey } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return EDITOR_KEYS.map((editor) => ({ editor })); }

export async function generateMetadata({ params }: { params: Promise<{ editor: string }> }): Promise<Metadata> {
  const { editor } = await params;
  const g = PLUGIN_GUIDES[editor as EditorKey];
  return { title: g ? `${g.name} plug-in install guide` : "Plug-in install guide" };
}

export default async function Page({ params }: { params: Promise<{ editor: string }> }) {
  const { editor } = await params;
  if (!EDITOR_KEYS.includes(editor as EditorKey)) notFound();
  return <PluginGuideView editor={editor as EditorKey} />;
}
