"use client";

import { useEffect, useRef } from "react";

export function TimelineProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const timeline = line?.closest(".timeline");
    if (!line || !timeline) return;

    const preferences = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let stopScroll: (() => void) | undefined;
    let revision = 0;

    function setup() {
      const current = ++revision;
      observer?.disconnect();
      stopScroll?.();
      line?.style.removeProperty("--line-progress");
      if (preferences.matches || !line || !timeline || !("IntersectionObserver" in window)) return;

      observer = new IntersectionObserver(([entry], watcher) => {
        if (!entry.isIntersecting) return;
        watcher.disconnect();
        void import("motion").then(({ scroll }) => {
          if (current !== revision) return;
          stopScroll = scroll((progress: number) => line.style.setProperty("--line-progress", String(progress)), {
            target: timeline,
            offset: ["start 92%", "end 65%"],
          });
        }).catch(() => {
          line.style.removeProperty("--line-progress");
        });
      }, { rootMargin: "240px" });
      observer.observe(timeline);
    }

    setup();
    preferences.addEventListener("change", setup);
    return () => {
      revision++;
      observer?.disconnect();
      stopScroll?.();
      preferences.removeEventListener("change", setup);
    };
  }, []);

  return (
    <div className="timeline-track" aria-hidden="true">
      <div className="timeline-progress" ref={lineRef} />
    </div>
  );
}
