export default function NewLayout({ children }: { children: React.ReactNode }) {
  return <main id="main" style={{ minHeight: "100vh" }}>{children}</main>;
}
