import { Sidebar } from "@/components/studio/Sidebar";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio">
      <Sidebar />
      <main id="main" className="studio-main">{children}</main>
    </div>
  );
}
