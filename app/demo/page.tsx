"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VirtualTour, type VirtualTourConfig } from "@/components/panorama/VirtualTour";

const HOTSPOT_STORAGE_KEY = "imerso-tour-hotspot-overrides-v1";
const TOUR_HFOV = 120;
const SHOW_CONFIG_PANEL = false;

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

const DEFAULT_HOTSPOT_PLACEMENT_OVERRIDES: Record<string, HotspotPlacement> = {
  "entrance->corridor-1": { yaw: 180, pitch: -20, targetYaw: -121 },
  "corridor-1->entrance": { yaw: 8, pitch: -20, targetYaw: 180, targetPitch: 7 },
  "corridor-1->bathroom-1": { yaw: -80, pitch: -20, targetYaw: -99, targetPitch: -2 },
  "bathroom-1->corridor-1": { yaw: 91, pitch: -20, targetYaw: -120, targetPitch: -2 },
  "corridor-1->corridor-2": { yaw: -173, pitch: -20, targetYaw: -127, targetPitch: -2 },
  "corridor-2->corridor-1": { yaw: 5, pitch: -20, targetYaw: 0, targetPitch: -2 },
  "bathroom-1->bathroom-2": { yaw: -90, pitch: -20, targetYaw: 50, targetPitch: -2 },
  "bathroom-2->bathroom-1": { yaw: 78, pitch: -20, targetYaw: 76, targetPitch: -2 },
  "corridor-2->kitchen-1": { yaw: -80, pitch: -20, targetYaw: -80, targetPitch: -2 },
  "kitchen-1->corridor-2": { yaw: 92, pitch: -20, targetYaw: -20, targetPitch: -2 },
  "corridor-2->corridor-3": { yaw: -170, pitch: -20, targetYaw: 175, targetPitch: -2 },
  "corridor-3->corridor-2": { yaw: -8, pitch: -20, targetYaw: -5, targetPitch: -2 },
  "kitchen-1->kitchen-2": { yaw: -92, pitch: -20, targetYaw: 180, targetPitch: -2 },
  "kitchen-2->kitchen-1": { yaw: 83, pitch: -20, targetYaw: 59, targetPitch: -2 },
  "corridor-3->bedroom-1": { yaw: -95, pitch: -20, targetYaw: 130, targetPitch: -2 },
  "bedroom-1->corridor-3": { yaw: 68, pitch: -20, targetYaw: -133, targetPitch: -2 },
  "corridor-3->corridor-4": { yaw: 173, pitch: -20, targetYaw: -158, targetPitch: -2 },
  "corridor-4->corridor-3": { yaw: 0, pitch: -20, targetYaw: -38, targetPitch: -2 },
  "corridor-4->living-1": { yaw: -159, pitch: -20, targetYaw: -49, targetPitch: -2 },
  "living-1->corridor-4": { yaw: 15, pitch: -20, targetYaw: -20, targetPitch: -2 },
  "living-1->living-2": { yaw: -70, pitch: -20, targetYaw: -63, targetPitch: -2 },
  "living-2->living-1": { yaw: 73, pitch: -20, targetYaw: 0, targetPitch: -2 },
  "living-2->balcony": { yaw: -114, pitch: -20, targetYaw: 61, targetPitch: -2 },
  "balcony->living-2": { yaw: 52, pitch: -20, targetYaw: 0, targetPitch: -2 },
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

function createHotspots(
  fromSceneId: string,
  targets: string[],
  hotspotOverrides: Record<string, HotspotPlacement>
) {
  if (targets.length === 0) return [];
  if (targets.length === 1) {
    const onlyTarget = targets[0];
    const placement = hotspotOverrides[`${fromSceneId}->${onlyTarget}`];
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
    const placement = hotspotOverrides[`${fromSceneId}->${sceneId}`];
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
const SCENE_IDS = Object.keys(SCENE_IMAGES);
const HOTSPOT_LINK_OPTIONS = Object.entries(SCENE_LINKS).flatMap(([fromSceneId, targets]) =>
  targets.map((toSceneId) => `${fromSceneId}->${toSceneId}`)
);
const HOTSPOT_TUNER_INITIAL_LINK = HOTSPOT_LINK_OPTIONS[0] ?? "";
const HOTSPOT_TUNER_INITIAL_PLACEMENT =
  DEFAULT_HOTSPOT_PLACEMENT_OVERRIDES[HOTSPOT_TUNER_INITIAL_LINK];

export default function DemoPage() {
  const [startSceneId, setStartSceneId] = useState("entrance");
  const [jumpSceneId, setJumpSceneId] = useState("entrance");
  const [selectedLink, setSelectedLink] = useState(HOTSPOT_TUNER_INITIAL_LINK);
  const [copied, setCopied] = useState(false);
  const [hotspotOverrides, setHotspotOverrides] = useState<Record<string, HotspotPlacement>>(
    DEFAULT_HOTSPOT_PLACEMENT_OVERRIDES
  );
  const [uiYaw, setUiYaw] = useState(Math.round(HOTSPOT_TUNER_INITIAL_PLACEMENT?.yaw ?? 0));
  const [uiTargetYaw, setUiTargetYaw] = useState(
    Math.round(HOTSPOT_TUNER_INITIAL_PLACEMENT?.targetYaw ?? 0)
  );
  const [uiTargetPitch, setUiTargetPitch] = useState(
    Math.round(HOTSPOT_TUNER_INITIAL_PLACEMENT?.targetPitch ?? 0)
  );

  useEffect(() => {
    const raw = localStorage.getItem(HOTSPOT_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Record<string, HotspotPlacement>;
      setHotspotOverrides({ ...DEFAULT_HOTSPOT_PLACEMENT_OVERRIDES, ...parsed });
    } catch {
      // Ignore invalid saved data and keep defaults.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HOTSPOT_STORAGE_KEY, JSON.stringify(hotspotOverrides));
  }, [hotspotOverrides]);

  const syncTunerFields = (link: string, sourceOverrides = hotspotOverrides) => {
    const placement =
      sourceOverrides[link] ??
      DEFAULT_HOTSPOT_PLACEMENT_OVERRIDES[link] ??
      ({ yaw: 0, pitch: -8, targetYaw: 0, targetPitch: 0 } as HotspotPlacement);
    setUiYaw(Math.round(placement.yaw ?? 0));
    setUiTargetYaw(Math.round(placement.targetYaw ?? 0));
    setUiTargetPitch(Math.round(placement.targetPitch ?? 0));
  };

  useEffect(() => {
    syncTunerFields(selectedLink);
  }, [selectedLink, hotspotOverrides]);

  const SAMPLE_TOUR_CONFIG: VirtualTourConfig = useMemo(
    () => ({
      firstScene: startSceneId,
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
            hfov: TOUR_HFOV,
            hotSpots: createHotspots(sceneId, SCENE_LINKS[sceneId] ?? [], hotspotOverrides),
          },
        ])
      ),
    }),
    [hotspotOverrides, startSceneId]
  );

  const updateSelectedLinkPlacement = (patch: Partial<HotspotPlacement>) => {
    if (!selectedLink) return;
    setHotspotOverrides((prev) => {
      const current =
        prev[selectedLink] ??
        DEFAULT_HOTSPOT_PLACEMENT_OVERRIDES[selectedLink] ??
        ({ yaw: 0, pitch: -8 } as HotspotPlacement);
      return {
        ...prev,
        [selectedLink]: { ...current, ...patch },
      };
    });
  };

  const copyOverrides = async () => {
    await navigator.clipboard.writeText(JSON.stringify(hotspotOverrides, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const resetSelectedLink = () => {
    if (!selectedLink) return;
    setHotspotOverrides((prev) => {
      const next = { ...prev };
      const defaultValue = DEFAULT_HOTSPOT_PLACEMENT_OVERRIDES[selectedLink];
      if (defaultValue) next[selectedLink] = defaultValue;
      else delete next[selectedLink];
      return next;
    });
  };

  const loadSelectedScene = () => {
    setStartSceneId(jumpSceneId);
    const firstLinkFromScene = (SCENE_LINKS[jumpSceneId] ?? [])[0];
    if (firstLinkFromScene) {
      setSelectedLink(`${jumpSceneId}->${firstLinkFromScene}`);
    }
  };

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
          <div className="text-sm text-[#b0b0d0]">Tour Caminhável</div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#764ba2]">
            Tour Caminhável 360°
          </h1>
          <p className="text-[#b0b0d0] mb-8">Clique nos pontos destacados para navegar entre os ambientes.</p>

          <div className={`grid gap-6 ${SHOW_CONFIG_PANEL ? "lg:grid-cols-[minmax(0,1fr)_340px]" : "grid-cols-1"}`}>
            <div
              className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50"
              key={startSceneId}
            >
              <VirtualTour key={startSceneId} config={SAMPLE_TOUR_CONFIG} height={500} />
            </div>

            {SHOW_CONFIG_PANEL && (
              <aside className="p-5 rounded-xl bg-slate-900/30 border border-white/10 h-fit lg:sticky lg:top-28">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-primary">Hotspot Tuner</h2>
                  <span className="text-xs text-[#b0b0d0] bg-white/10 px-2 py-1 rounded">
                    Live apply + auto save
                  </span>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-[#b0b0d0] mb-2">Start from scene</label>
                  <div className="flex gap-2">
                    <select
                      className="flex-1 rounded-lg bg-slate-950/60 border border-white/15 px-3 py-2 text-sm"
                      value={jumpSceneId}
                      onChange={(e) => setJumpSceneId(e.target.value)}
                    >
                      {SCENE_IDS.map((sceneId) => (
                        <option key={sceneId} value={sceneId}>
                          {SCENE_TITLES[sceneId]}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={loadSelectedScene}
                      className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition text-sm whitespace-nowrap"
                    >
                      Load
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-[#b0b0d0] mb-2">Link</label>
                  <select
                    className="w-full rounded-lg bg-slate-950/60 border border-white/15 px-3 py-2 text-sm"
                    value={selectedLink}
                    onChange={(e) => {
                      const nextLink = e.target.value;
                      setSelectedLink(nextLink);
                      syncTunerFields(nextLink);
                    }}
                  >
                    {HOTSPOT_LINK_OPTIONS.map((link) => (
                      <option key={link} value={link}>
                        {link}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4">
                  <label className="block">
                    <span className="block text-sm text-[#b0b0d0] mb-2">yaw ({uiYaw})</span>
                    <input
                      type="range"
                      min={-180}
                      max={180}
                      step={1}
                      value={uiYaw}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setUiYaw(next);
                        updateSelectedLinkPlacement({ yaw: next });
                      }}
                      className="w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm text-[#b0b0d0] mb-2">targetYaw ({uiTargetYaw})</span>
                    <input
                      type="range"
                      min={-180}
                      max={180}
                      step={1}
                      value={uiTargetYaw}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setUiTargetYaw(next);
                        updateSelectedLinkPlacement({ targetYaw: next });
                      }}
                      className="w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm text-[#b0b0d0] mb-2">targetPitch ({uiTargetPitch})</span>
                    <input
                      type="range"
                      min={-90}
                      max={90}
                      step={1}
                      value={uiTargetPitch}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setUiTargetPitch(next);
                        updateSelectedLinkPlacement({ targetPitch: next });
                      }}
                      className="w-full"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={copyOverrides}
                    className="px-3 py-1 rounded bg-gradient-to-r from-primary to-[#764ba2] text-white text-sm"
                  >
                    {copied ? "Copied" : "Copy JSON"}
                  </button>
                  <button
                    onClick={resetSelectedLink}
                    className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition text-sm"
                  >
                    Reset selected link
                  </button>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
