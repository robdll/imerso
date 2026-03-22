"use client";

import React, { useEffect, useRef } from "react";

// Pannellum attaches to window - load CSS and JS
import "pannellum/build/pannellum.css";

export interface PanoramaViewerProps {
  /** URL to equirectangular 360 image (2:1 aspect ratio) */
  imageUrl: string;
  /** Container height (default: 400px) */
  height?: string | number;
  /** Container width (default: 100%) */
  width?: string | number;
  /** Initial pitch in degrees (-90 to 90) */
  pitch?: number;
  /** Initial yaw in degrees (-180 to 180) */
  yaw?: number;
  /** Horizontal field of view in degrees */
  hfov?: number;
  /** Show compass */
  compass?: boolean;
  /** Enable auto-rotate */
  autoRotate?: number;
  /** Title shown in UI */
  title?: string;
  /** Author shown in UI */
  author?: string;
  className?: string;
}

export function PanoramaViewer({
  imageUrl,
  height = 400,
  width = "100%",
  pitch = 0,
  yaw = 0,
  hfov = 100,
  compass = false,
  autoRotate = 0,
  title,
  author,
  className = "",
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const initViewer = async () => {
      await import("pannellum");
      const pannellum = (window as unknown as { pannellum: { viewer: (el: HTMLElement, config: object) => { destroy: () => void } } }).pannellum;
      if (!pannellum?.viewer) return;

      const config: Record<string, unknown> = {
        type: "equirectangular",
        panorama: imageUrl,
        autoLoad: true,
        mouseZoom: false,
        pitch,
        yaw,
        hfov,
        compass,
        autoRotate: autoRotate > 0 ? autoRotate : undefined,
      };

      if (title) config.title = title;
      if (author) config.author = author;

      try {
        viewerRef.current = pannellum.viewer(container, config);
      } catch (err) {
        console.error("Pannellum viewer error:", err);
      }
    };

    initViewer();

    return () => {
      if (viewerRef.current?.destroy) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [imageUrl, pitch, yaw, hfov, compass, autoRotate, title, author]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        minHeight: 200,
      }}
    />
  );
}
