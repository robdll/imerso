"use client";

import React, { useEffect, useRef } from "react";

import "pannellum/build/pannellum.css";

export interface TourHotspot {
  pitch: number;
  yaw: number;
  type: "scene" | "info";
  text: string;
  sceneId?: string;
  targetYaw?: number;
  targetPitch?: number;
}

export interface TourScene {
  id: string;
  title: string;
  panorama: string;
  yaw?: number;
  pitch?: number;
  hfov?: number;
  hotSpots?: TourHotspot[];
}

export interface VirtualTourConfig {
  firstScene: string;
  sceneFadeDuration?: number;
  author?: string;
  scenes: Record<string, TourScene>;
}

export interface VirtualTourProps {
  config: VirtualTourConfig;
  height?: string | number;
  width?: string | number;
  className?: string;
}

export function VirtualTour({
  config,
  height = 500,
  width = "100%",
  className = "",
}: VirtualTourProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const initViewer = async () => {
      await import("pannellum");
      const pannellum = (window as unknown as { pannellum: { viewer: (el: HTMLElement, cfg: object) => { destroy: () => void } } }).pannellum;
      if (!pannellum?.viewer) return;

      const pannellumConfig = {
        default: {
          autoLoad: true,
          firstScene: config.firstScene,
          sceneFadeDuration: config.sceneFadeDuration ?? 1000,
          author: config.author,
        },
        scenes: Object.fromEntries(
          Object.entries(config.scenes).map(([id, scene]) => [
            id,
            {
              title: scene.title,
              panorama: scene.panorama,
              type: "equirectangular" as const,
              yaw: scene.yaw ?? 0,
              pitch: scene.pitch ?? 0,
              hfov: scene.hfov ?? 100,
              hotSpots: scene.hotSpots ?? [],
            },
          ])
        ),
      };

      try {
        viewerRef.current = pannellum.viewer(container, pannellumConfig);
      } catch (err) {
        console.error("Pannellum tour error:", err);
      }
    };

    initViewer();

    return () => {
      if (viewerRef.current?.destroy) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [config]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        minHeight: 300,
      }}
    />
  );
}
