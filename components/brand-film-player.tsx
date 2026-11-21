"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Source = { src: string; type: string };

export function BrandFilmPlayer({ sources, poster, captions, autoplay, loop }: {
  sources: Source[];
  poster: string;
  captions?: string;
  autoplay: boolean;
  loop: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const player = video.current;
    if (!player || !autoplay) return;

    const query = window.matchMedia("(min-width: 780px) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let startedAutomatically = false;
    let playedOnce = false;
    let inView = false;

    const updatePlayback = () => {
      const eligible = inView && query.matches && !connection?.saveData;
      if (eligible && !playedOnce && player.paused) {
        playedOnce = true;
        player.muted = true;
        startedAutomatically = true;
        void player.play().catch(() => { startedAutomatically = false; });
      } else if (!eligible && startedAutomatically) {
        player.pause();
        startedAutomatically = false;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.65;
      updatePlayback();
    }, { threshold: 0.65 });
    observer.observe(player);
    query.addEventListener("change", updatePlayback);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", updatePlayback);
    };
  }, [autoplay, failed]);

  return (
    <div className="film-media">
      {failed ? (
        <>
          <Image src={poster} alt="" fill sizes="(max-width: 780px) 92vw, 570px" />
          <p className="film-status" role="status">O vídeo está indisponível no momento.</p>
        </>
      ) : (
        <video ref={video} aria-label="Vídeo institucional da CapitalCred" poster={poster}
          muted playsInline controls loop={loop} preload="none" onError={() => setFailed(true)}>
          {sources.map(({ type, src }, index) => (
            <source key={src} src={src} type={type}
              onError={() => { if (index === sources.length - 1) setFailed(true); }} />
          ))}
          {captions && <track kind="captions" srcLang="pt-BR" label="Português (Brasil)" src={captions} />}
          Seu navegador não consegue reproduzir o vídeo institucional.
        </video>
      )}
    </div>
  );
}
