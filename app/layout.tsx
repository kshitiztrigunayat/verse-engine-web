import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Verse Engine by Ctruh", template: "Verse Engine by Ctruh — %s" },
  description:
    "Any 3D world, as a link. Verse Engine by Ctruh turns any 3D file, editor project or floor plan into one link that opens on a laptop, a phone or a headset.",
};

export const viewport: Viewport = { themeColor: "#070B1F", width: "device-width", initialScale: 1 };

// Runs before paint: stored choice → prefers-color-scheme → dark.
const themeScript = `(function(){try{var t=localStorage.getItem('verse-theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`;

// Marks the landing preloader as already seen (this session, or reduced motion) before first paint.
const plScript = `try{if(sessionStorage.getItem('verse-pl')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.pl='seen'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${archivo.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <Script id="verse-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript + ";" + plScript }} />
        {children}
      </body>
    </html>
  );
}
