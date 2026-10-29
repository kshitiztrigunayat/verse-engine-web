"use client";
import { useRef, useState } from "react";

/** ~90s film on the evolution of 3D. Click-to-play (never autoplays), loads nothing until played, captioned. */
export function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const showButton = !started || ended;

  const play = () => {
    const v = video.current;
    if (!v) return;
    setStarted(true);
    setEnded(false);
    if (v.ended) v.currentTime = 0;
    void v.play();
  };

  return (
    <div className="force-dark" style={{ marginTop: 56, position: "relative", aspectRatio: "16 / 9", borderRadius: 28, overflow: "hidden", background: "#001B99", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 50px 140px rgba(0,119,255,0.35)" }}>
      <video
        ref={video}
        poster="/hero-film-poster.jpg"
        preload="none"
        playsInline
        controls={started}
        aria-label="Film: from bulky hardware to a shareable link"
        onPlay={() => { setPlaying(true); setEnded(false); }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setEnded(true); }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "#001B99" }}
      >
        <source src="/hero-film.mp4" type="video/mp4" />
        <track kind="captions" srcLang="en" label="English" src="/hero-film.en.vtt" default />
      </video>
      {showButton && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(rgba(0,27,153,0.05), rgba(0,27,153,0.35))" }}>
          <button className="playbig ringpulse" type="button" onClick={play} aria-label={ended ? "Replay the film" : "Play the film"} style={{ width: 104, height: 104, borderRadius: "50%", border: 0, background: "#0077FF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            {ended ? (
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /></svg>
            ) : (
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z" /></svg>
            )}
          </button>
        </div>
      )}
      <span className="sr-only" aria-live="polite">{playing ? "Film playing" : ""}</span>
    </div>
  );
}
