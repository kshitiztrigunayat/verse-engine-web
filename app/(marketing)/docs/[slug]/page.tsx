import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsView } from "@/components/pages/DocsView";
import { DOC_PAGES } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return DOC_PAGES.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = DOC_PAGES.find((x) => x.slug === slug);
  return { title: p ? `Docs · ${p.title}` : "Docs" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!DOC_PAGES.some((p) => p.slug === slug)) notFound();
  return <DocsView slug={slug} />;
}
