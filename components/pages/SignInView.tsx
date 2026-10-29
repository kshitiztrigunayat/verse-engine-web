"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lockup } from "@/components/brand/Lockup";
import { Cube } from "@/components/ui/Cube";
import { Tabs } from "@/components/ui/Tabs";
import { ROUTES } from "@/lib/links";

export function SignInView() {
  const router = useRouter();
  const [up, setUp] = useState(false);
  const [method, setMethod] = useState<"email" | "token">("email");
  const [sent, setSent] = useState(false);
  const email = method === "email";
  // [PLACEHOLDER auth provider] — until one is wired, submit continues to Studio with the mock session.
  const submit = (e: React.FormEvent) => { e.preventDefault(); router.push(ROUTES.studio); };

  return (
    <div className="signin-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", minHeight: "100vh" }}>
      <div className="force-dark hide-md" style={{ position: "relative", overflow: "hidden", background: "#070B1F", padding: 48, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>{[0, -1.5, -3, -4.5].map((d) => <div key={d} className="frame" style={{ animationDelay: `${d}s` }} />)}</div>
        <Cube style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%,-50%)", filter: "drop-shadow(0 0 40px rgba(0,119,255,0.8))" }} />
        <div style={{ position: "relative" }}><Lockup sub="STUDIO · BY CTRUH" /></div>
        <div style={{ position: "relative" }}>
          <h2 className="h-light"><span className="serif" style={{ display: "block", fontSize: "clamp(52px, 5.5vw, 80px)" }}>Your scenes</span><span className="wide" style={{ display: "block", fontSize: "clamp(32px, 3.6vw, 52px)", letterSpacing: "-0.02em" }}>ARE WAITING.</span></h2>
          <p className="mono" style={{ marginTop: 18, fontSize: 12, letterSpacing: "0.14em", color: "rgba(232,241,255,0.8)" }}>FREE TO START · VIEWERS NEVER PAY</p>
        </div>
      </div>
      <main id="main" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <form onSubmit={submit} style={{ width: "min(100%, 440px)", display: "flex", flexDirection: "column", gap: 22 }}>
          <div className="only-mobile" style={{ marginBottom: 8 }}><Lockup sub="STUDIO · BY CTRUH" /></div>
          <div key={String(up)} className="fadeup">
            <span className="mono label eyebrow">{up ? "CREATE ACCOUNT" : "SIGN IN"}</span>
            <h1 className="wide" style={{ marginTop: 10, fontWeight: 600, lineHeight: 1.05, fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>{up ? "Start your first scene." : "Welcome back."}</h1>
            <p style={{ marginTop: 10, color: "var(--body)" }}>{up ? "Free to start. No card needed." : "Sign in to open Verse Engine Studio."}</p>
          </div>
          <Tabs label="Sign-in method" value={method} onChange={(m) => setMethod(m)} items={[["email", "Email & password"], ["token", "Name + API token"]] as const} />
          {(up || !email) && <label className="fld fadeup" htmlFor="f-name">NAME<input id="f-name" className="inp" autoComplete="name" placeholder="Your name" required /></label>}
          {email ? (
            <>
              <label className="fld" htmlFor="f-email">WORK EMAIL<input id="f-email" className="inp" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
              <label className="fld" htmlFor="f-pass">PASSWORD<input id="f-pass" className="inp" type="password" autoComplete={up ? "new-password" : "current-password"} placeholder="••••••••" required /></label>
              {!up && <button type="button" onClick={() => setSent(true)} style={{ alignSelf: "flex-start", background: "none", border: 0, padding: "10px 0", cursor: "pointer", color: "var(--label)", fontWeight: 600, textDecoration: "underline", minHeight: 44 }} aria-live="polite">{sent ? "Reset link sent ✓" : "Forgot password?"}</button>}
            </>
          ) : (
            <div className="fadeup" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label className="fld" htmlFor="f-token">API TOKEN<input id="f-token" className="inp" type="password" placeholder="vrs_••••••••" required /></label>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>Lost your token? Add an email to your account so you can always get back in.</p>
            </div>
          )}
          <button className="cta cta-blue cta-lg" type="submit">{up ? "Create account" : "Sign in"} →</button>
          <p style={{ color: "var(--body)" }}>{up ? "Already have an account?" : "New to Verse Engine?"}{" "}<button type="button" onClick={() => { setUp(!up); setSent(false); }} style={{ background: "none", border: 0, padding: "10px 0", cursor: "pointer", color: "var(--label)", fontWeight: 700, textDecoration: "underline" }}>{up ? "Sign in" : "Create an account"}</button></p>
          <Link href={ROUTES.home} className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)" }}>← BACK TO VERSE ENGINE</Link>
        </form>
      </main>
      <style>{`@media(max-width:1100px){.signin-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
