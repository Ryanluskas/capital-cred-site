import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { BrandFilmPlayer } from "@/components/brand-film-player";

const poster = "/images/capitalcred-video-poster.webp";

export function CapitalCredBrandFilm() {
  const sources = [
    { src: "/videos/capitalcred-brand-film.webm", type: "video/webm" },
    { src: "/videos/capitalcred-brand-film.mp4", type: "video/mp4" },
  ].filter(({ src }) => existsSync(join(process.cwd(), "public", src.slice(1))));
  const captions = "/videos/capitalcred-brand-film.pt-BR.vtt";
  const hasCaptions = existsSync(join(process.cwd(), "public", captions.slice(1)));

  return sources.length ? (
    <BrandFilmPlayer
      sources={sources}
      poster={poster}
      captions={hasCaptions ? captions : undefined}
      autoplay={process.env.BRAND_FILM_AUTOPLAY === "true"}
      loop={process.env.BRAND_FILM_LOOP === "true"}
    />
  ) : (
    <div className="film-media">
      <Image src={poster} alt="" fill sizes="(max-width: 780px) 92vw, (max-width: 1300px) 45vw, 570px" />
    </div>
  );
}
