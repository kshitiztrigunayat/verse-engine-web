import { SiteNav } from "@/components/site/SiteNav";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SiteNav />
      <main id="main">{children}</main>
    </>
  );
}
