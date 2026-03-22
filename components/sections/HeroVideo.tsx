"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mq.matches) {
        video.pause();
      } else {
        void video.play();
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className="w-full h-auto aspect-video object-cover transform transition-transform duration-700 group-hover:scale-105"
      autoPlay
      muted
      playsInline
      loop
      preload="metadata"
      aria-label="Demonstração de tour virtual 360°"
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
