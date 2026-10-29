import type { Metadata, Viewport } from "next";
import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/600.css";
import "@fontsource/metropolis/700.css";
import "@fontsource/metropolis/800.css";
import "@fontsource/metropolis/600-italic.css";
import "@fontsource/metropolis/700-italic.css";
import Script from "next/script";
import "./globals.css";

// Brand typeface: Metropolis (Ctruh brand guidelines). H1 Bold, H2 SemiBold, body Regular.

export const metadata: Metadata = {
  title: { default: "Verse Engine by Ctruh", template: "Verse Engine by Ctruh — %s" },
  description:
    "Any 3D world, as a link. Verse Engine by Ctruh turns any 3D file, editor project or floor plan into one link that opens on a laptop, a phone or a headset.",
};

export const viewport: Viewport = { themeColor: "#001B99", width: "device-width", initialScale: 1 };

// Runs before paint: stored choice → prefers-color-scheme → light.
const themeScript = `(function(){try{var t=localStorage.getItem('verse-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`;

// Marks the landing preloader as already seen (this session, or reduced motion) before first paint.
const plScript = `try{if(sessionStorage.getItem('verse-pl')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.pl='seen'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
    >
      <body>
        <Script id="verse-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript + ";" + plScript }} />
        {children}
      </body>
    </html>
  );
}
