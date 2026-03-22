"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PanoramaViewer } from "@/components/panorama/PanoramaViewer";
import { VirtualTour, type VirtualTourConfig } from "@/components/panorama/VirtualTour";

// Local Insta360 sample in /public/images
const SAMPLE_PANORAMA = "/images/entrance.jpg";

const SCENE_IMAGES: Record<string, string> = {
  entrance: "/images/entrance.jpg",
  "corridor-1": "/images/corridor-1.jpg",
  "bathroom-1": "/images/bathroom-1.jpg",
  "bathroom-2": "/images/bathroom-2.jpg",
  "corridor-2": "/images/corridor-2.jpg",
  "kitchen-1": "/images/kitchen-1.jpg",
  "kitchen-2": "/images/kitchen-2.jpg",
  "corridor-3": "/images/corridor-3.jpg",
  "bedroom-1": "/images/bedroom-1.jpg",
  "corridor-4": "/images/corridor-4.jpg",
  "living-1": "/images/living-1.jpg",
  "living-2": "/images/living-2.jpg",
  balcony: "/images/balcony.jpg",
};

const SCENE_TITLES: Record<string, string> = {
  entrance: "Entrance",
  "corridor-1": "Corridor 1",
  "bathroom-1": "Bathroom 1",
  "bathroom-2": "Bathroom 2",
  "corridor-2": "Corridor 2",
  "kitchen-1": "Kitchen 1",
  "kitchen-2": "Kitchen 2",
  "corridor-3": "Corridor 3",
  "bedroom-1": "Bedroom 1",
  "corridor-4": "Corridor 4",
  "living-1": "Living 1",
  "living-2": "Living 2",
  balcony: "Balcony",
};

// Forward path exactly as requested by the walking-flow map.
const FORWARD_LINKS: Record<string, string[]> = {
  entrance: ["corridor-1"],
  "corridor-1": ["bathroom-1", "corridor-2"],
  "bathroom-1": ["bathroom-2"],
  "bathroom-2": [],
  "corridor-2": ["kitchen-1", "corridor-3"],
  "kitchen-1": ["kitchen-2"],
  "kitchen-2": [],
  "corridor-3": ["bedroom-1", "corridor-4"],
  "bedroom-1": [],
  "corridor-4": ["living-1"],
  "living-1": ["living-2"],
  "living-2": ["balcony"],
  balcony: [],
};

type HotspotPlacement = {
  yaw: number;
  pitch: number;
  targetYaw?: number;
  targetPitch?: number;
};

// Fine-tune arrows per connection: "from->to".
// Update yaw/pitch values here until each arrow matches the door direction.
const HOTSPOT_PLACEMENT_OVERRIDES: Record<string, HotspotPlacement> = {
  // Keep entrance arrow centered and obvious on first load.
  "entrance->corridor-1": { yaw: 180, pitch: -20 },
  "corridor-1->entrance": { yaw: 170, pitch: -8, targetYaw: 10, targetPitch: -2 },

  "corridor-1->bathroom-1": { yaw: -55, pitch: -9, targetYaw: 130, targetPitch: -2 },
  "bathroom-1->corridor-1": { yaw: 120, pitch: -9, targetYaw: -20, targetPitch: -2 },

  "corridor-1->corridor-2": { yaw: 15, pitch: -8, targetYaw: 165, targetPitch: -2 },
  "corridor-2->corridor-1": { yaw: 175, pitch: -8, targetYaw: 0, targetPitch: -2 },

  "bathroom-1->bathroom-2": { yaw: 10, pitch: -8, targetYaw: 180, targetPitch: -2 },
  "bathroom-2->bathroom-1": { yaw: 180, pitch: -8, targetYaw: 0, targetPitch: -2 },

  "corridor-2->kitchen-1": { yaw: -60, pitch: -8, targetYaw: 120, targetPitch: -2 },
  "kitchen-1->corridor-2": { yaw: 120, pitch: -8, targetYaw: -20, targetPitch: -2 },

  "corridor-2->corridor-3": { yaw: 8, pitch: -8, targetYaw: 175, targetPitch: -2 },
  "corridor-3->corridor-2": { yaw: 178, pitch: -8, targetYaw: -5, targetPitch: -2 },

  "kitchen-1->kitchen-2": { yaw: 0, pitch: -8, targetYaw: 180, targetPitch: -2 },
  "kitchen-2->kitchen-1": { yaw: 178, pitch: -8, targetYaw: 0, targetPitch: -2 },

  "corridor-3->bedroom-1": { yaw: -65, pitch: -9, targetYaw: 130, targetPitch: -2 },
  "bedroom-1->corridor-3": { yaw: 125, pitch: -9, targetYaw: -20, targetPitch: -2 },

  "corridor-3->corridor-4": { yaw: 15, pitch: -8, targetYaw: 175, targetPitch: -2 },
  "corridor-4->corridor-3": { yaw: 178, pitch: -8, targetYaw: 5, targetPitch: -2 },

  "corridor-4->living-1": { yaw: -55, pitch: -8, targetYaw: 120, targetPitch: -2 },
  "living-1->corridor-4": { yaw: 125, pitch: -8, targetYaw: -20, targetPitch: -2 },

  "living-1->living-2": { yaw: 15, pitch: -8, targetYaw: 175, targetPitch: -2 },
  "living-2->living-1": { yaw: 178, pitch: -8, targetYaw: 0, targetPitch: -2 },

  "living-2->balcony": { yaw: 0, pitch: -8, targetYaw: 180, targetPitch: -2 },
  "balcony->living-2": { yaw: 178, pitch: -8, targetYaw: 0, targetPitch: -2 },
};

function buildBidirectionalLinks(links: Record<string, string[]>) {
  const adjacency: Record<string, Set<string>> = Object.fromEntries(
    Object.keys(SCENE_IMAGES).map((sceneId) => [sceneId, new Set<string>()])
  );

  Object.entries(links).forEach(([from, targets]) => {
    targets.forEach((to) => {
      adjacency[from].add(to);
      adjacency[to].add(from);
    });
  });

  return Object.fromEntries(
    Object.entries(adjacency).map(([sceneId, targets]) => [sceneId, [...targets]])
  );
}

function createHotspots(fromSceneId: string, targets: string[]) {
  if (targets.length === 0) return [];
  if (targets.length === 1) {
    const onlyTarget = targets[0];
    const placement = HOTSPOT_PLACEMENT_OVERRIDES[`${fromSceneId}->${onlyTarget}`];
    return [
      {
        pitch: placement?.pitch ?? -8,
        yaw: placement?.yaw ?? 20,
        type: "scene" as const,
        text: `Go to ${SCENE_TITLES[onlyTarget]}`,
        sceneId: onlyTarget,
        targetYaw: placement?.targetYaw,
        targetPitch: placement?.targetPitch,
      },
    ];
  }

  return targets.map((sceneId, index) => {
    const step = 70 / (targets.length - 1);
    const yaw = -35 + step * index;
    const placement = HOTSPOT_PLACEMENT_OVERRIDES[`${fromSceneId}->${sceneId}`];
    return {
      pitch: placement?.pitch ?? -8,
      yaw: placement?.yaw ?? yaw,
      type: "scene" as const,
      text: `Go to ${SCENE_TITLES[sceneId]}`,
      sceneId,
      targetYaw: placement?.targetYaw,
      targetPitch: placement?.targetPitch,
    };
  });
}

const SCENE_LINKS = buildBidirectionalLinks(FORWARD_LINKS);

const SAMPLE_TOUR_CONFIG: VirtualTourConfig = {
  firstScene: "entrance",
  sceneFadeDuration: 1000,
  author: "Imerso Demo",
  scenes: Object.fromEntries(
    Object.entries(SCENE_IMAGES).map(([sceneId, panorama]) => [
      sceneId,
      {
        id: sceneId,
        title: SCENE_TITLES[sceneId],
        panorama,
        yaw: sceneId === "entrance" ? 180 : 0,
        pitch: 0,
        hfov: 100,
        hotSpots: createHotspots(sceneId, SCENE_LINKS[sceneId] ?? []),
      },
    ])
  ),
};

export default function DemoPage() {
  const [mode, setMode] = useState<"single" | "tour">("single");

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,15,0.9)] backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#b0b0d0] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <div className="flex gap-4">
            <button
              onClick={() => setMode("single")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                mode === "single"
                  ? "bg-gradient-to-r from-primary to-[#764ba2] text-white"
                  : "bg-white/10 text-[#b0b0d0] hover:bg-white/20"
              }`}
            >
              360° Foto
            </button>
            <button
              onClick={() => setMode("tour")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                mode === "tour"
                  ? "bg-gradient-to-r from-primary to-[#764ba2] text-white"
                  : "bg-white/10 text-[#b0b0d0] hover:bg-white/20"
              }`}
            >
              Tour Caminhável
            </button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#764ba2]">
            Demonstração 360°
          </h1>
          <p className="text-[#b0b0d0] mb-8">
            {mode === "single"
              ? "Arraste para explorar a foto 360°. Use suas próprias fotos do Insta360 em /public/images/"
              : "Clique nos pontos destacados para navegar entre os ambientes."}
          </p>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50" key={mode}>
            {mode === "single" ? (
              <PanoramaViewer
                imageUrl={SAMPLE_PANORAMA}
                height={500}
                title="Demonstração 360°"
                author="Imerso"
                compass
              />
            ) : (
              <VirtualTour config={SAMPLE_TOUR_CONFIG} height={500} />
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
