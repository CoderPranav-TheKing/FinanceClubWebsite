"use client";

import { useEffect, useRef, useState } from "react";
import type { WheelEvent } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Link from "next/link";
import { Maximize2, X, ArrowRight } from "lucide-react";
import { competitions } from "@/data/competitions";

const TRACK_WIDTH = 3000;
const TRACK_HEIGHT = 360;

const EXPANDED_WIDTH = 1600;
const EXPANDED_HEIGHT = 800;

export default function RoadmapTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const milestoneRefs = useRef<HTMLDivElement[]>([]);
  const [targets, setTargets] = useState<number[]>([]);
  const [hintDismissed, setHintDismissed] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const [modalScale, setModalScale] = useState(0.3);

  useEffect(() => {
    setMounted(true);
    try {
      const v = localStorage.getItem("fc_roadmap_hint_dismissed");
      if (v) setHintDismissed(true);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const computeModalScale = () => {
      const el = modalContainerRef.current;
      if (!el) return;
      const availW = el.clientWidth;
      const availH = el.clientHeight;
      const scale = Math.min(availW / EXPANDED_WIDTH, availH / EXPANDED_HEIGHT);
      setModalScale(scale);
    };

    computeModalScale();
    window.addEventListener("resize", computeModalScale);
    return () => window.removeEventListener("resize", computeModalScale);
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const orderedSlugs = [
    "portfolio-management",
    "finsearch",
    "erc-2026",
    "citadel-trader-id",
    "investment-banking-case",
  ];

  const items = orderedSlugs
    .map((s) => competitions.find((c) => c.slug === s))
    .filter(Boolean) as typeof competitions;

  const M: any = motion.div;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onResize = () => {
      computeTargets();
    };
    window.addEventListener("resize", onResize);
    const t = setTimeout(computeTargets, 120);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, []);

  const clamp = (v: number, a: number, b: number) =>
    Math.max(a, Math.min(b, v));

  function computeTargets() {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const viewportW = container.clientWidth;
    const minX = Math.min(0, viewportW - track.clientWidth);
    const centers = items.map((_, i) => {
      const el = milestoneRefs.current[i];
      if (!el) return 0;
      const elRect = el.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const center = elRect.left - trackRect.left + elRect.width / 2;
      return center;
    });
    const newTargets = centers.map((c) => clamp(viewportW / 2 - c, minX, 0));
    setTargets(newTargets);
    const cur = x.get();
    const clamped = clamp(cur, minX, 0);
    if (clamped !== cur) x.set(clamped);
  }

  const tPositions = [0.02, 0.18, 0.45, 0.72, 0.95].slice(0, items.length);

  const positions = tPositions.map((t, i) => {
    const xPos = t * TRACK_WIDTH;
    const above = i % 2 === 0;
    const y = above ? TRACK_HEIGHT * 0.32 : TRACK_HEIGHT * 0.68;
    return { x: xPos, y, above };
  });

  const PaperTexture = () => (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "url('/roadmapbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.18,
        filter: "grayscale(60%) brightness(0.9) contrast(1.1)",
        mixBlendMode: "lighten",
      }}
    />
  );

  const RoadSVG = () => (
    <svg
      viewBox={`0 0 ${TRACK_WIDTH} ${TRACK_HEIGHT}`}
      width={TRACK_WIDTH}
      height={TRACK_HEIGHT}
      className="block"
    >
      <defs>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={`M40 260 C800 20 ${TRACK_WIDTH / 2} 20 ${TRACK_WIDTH - 40} 240`}
        stroke="#0b0b0b"
        strokeWidth={34}
        strokeLinecap="round"
        fill="none"
        className="road-path"
      />
      <path
        d={`M40 260 C800 20 ${TRACK_WIDTH / 2} 20 ${TRACK_WIDTH - 40} 240`}
        stroke="#2A8F5C"
        strokeWidth={44}
        strokeOpacity={0.06}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M40 260 C800 20 ${TRACK_WIDTH / 2} 20 ${TRACK_WIDTH - 40} 240`}
        stroke="#F5B731"
        strokeWidth={4}
        strokeDasharray="18 12"
        strokeLinecap="round"
        fill="none"
        className="road-flow"
      />
    </svg>
  );

  const Milestones = ({ interactive }: { interactive: boolean }) => (
    <>
      {items.map((c, i) => {
        const pos = positions[i];
        const isActive = c!.status === "active";
        return (
          <div
            key={c!.slug}
            ref={(el) => {
              if (interactive && el) milestoneRefs.current[i] = el;
            }}
            style={{ position: "absolute", left: pos.x, top: pos.y }}
            className="-translate-x-1/2 -translate-y-1/2 milestone"
          >
            <Link href={`/competitions/${c!.slug}`}>
              <M
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`milestone-card ${
                  isActive ? "milestone-active" : ""
                }`}
                style={{ minWidth: 260 }}
              >
                <div className="text-xxs text-gold">
                  {new Date(c!.registrationDeadline).toLocaleString("en-IN", {
                    month: "short",
                  })}
                </div>
                <div className="text-lg font-semibold text-cream mt-2">
                  {c!.name}
                </div>
                <div className="text-sm text-cream/40 mt-2 flex items-center justify-between">
                  <span>{isActive ? "Live Now" : "Upcoming"}</span>
                  <span className="text-gold">→</span>
                </div>
              </M>
            </Link>
            <div className={`milestone-glow ${isActive ? "active" : ""}`} />
          </div>
        );
      })}
    </>
  );

  const expandedPositions = [
    { x: 90, y: 620 },
    { x: 480, y: 180 },
    { x: 900, y: 420 },
    { x: 1290, y: 660 },
    { x: 1520, y: 200 },
  ];

  const ExpandedRoadSVG = () => (
    <svg
      viewBox={`0 0 ${EXPANDED_WIDTH} ${EXPANDED_HEIGHT}`}
      width={EXPANDED_WIDTH}
      height={EXPANDED_HEIGHT}
      className="block"
    >
      <path
        d="M60 650 C400 100, 700 100, 900 400 C1100 700, 1300 700, 1540 200"
        stroke="#0b0b0b"
        strokeWidth={34}
        strokeLinecap="round"
        fill="none"
        className="road-path"
      />
      <path
        d="M60 650 C400 100, 700 100, 900 400 C1100 700, 1300 700, 1540 200"
        stroke="#2A8F5C"
        strokeWidth={44}
        strokeOpacity={0.06}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 650 C400 100, 700 100, 900 400 C1100 700, 1300 700, 1540 200"
        stroke="#F5B731"
        strokeWidth={4}
        strokeDasharray="18 12"
        strokeLinecap="round"
        fill="none"
        className="road-flow"
      />
    </svg>
  );

  const ExpandedMilestones = () => (
    <>
      {items.map((c, i) => {
        const pos = expandedPositions[i];
        const isActive = c!.status === "active";
        return (
          <div
            key={c!.slug}
            style={{ position: "absolute", left: pos.x, top: pos.y }}
            className="-translate-x-1/2 -translate-y-1/2 milestone"
          >
            <Link href={`/competitions/${c!.slug}`}>
              <M
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`milestone-card ${
                  isActive ? "milestone-active" : ""
                }`}
                style={{ minWidth: 260 }}
              >
                <div className="text-xxs text-gold">
                  {new Date(c!.registrationDeadline).toLocaleString("en-IN", {
                    month: "short",
                  })}
                </div>
                <div className="text-lg font-semibold text-cream mt-2">
                  {c!.name}
                </div>
                <div className="text-sm text-cream/40 mt-2 flex items-center justify-between">
                  <span>{isActive ? "Live Now" : "Upcoming"}</span>
                  <span className="text-gold">→</span>
                </div>
              </M>
            </Link>
            <div className={`milestone-glow ${isActive ? "active" : ""}`} />
          </div>
        );
      })}
    </>
  );

  // ===== CLEAN MOBILE VERTICAL TIMELINE =====
  if (isMobile) {
    return (
      <div className="relative pl-6 space-y-6">
        {/* Timeline Path Line */}
        <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />

        {items.map((c) => {
          const isActive = c!.status === "active";
          return (
            <div key={c!.slug} className="relative group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[1.95rem] top-4 w-3 h-3 rounded-full border-2 ${
                  isActive
                    ? "bg-gold border-gold shadow-[0_0_8px_#f5b731]"
                    : "bg-[#141010] border-cream/30"
                }`}
              />

              <Link href={`/competitions/${c!.slug}`} className="block">
                <div className="backdrop-blur-md bg-black/40 border border-cream/10 rounded-xl p-4 transition-all active:scale-[0.98]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gold">
                      {new Date(c!.registrationDeadline).toLocaleString(
                        "en-IN",
                        { month: "short" }
                      )}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        isActive
                          ? "border-gold/40 text-gold bg-gold/10"
                          : "border-cream/10 text-cream/40"
                      }`}
                    >
                      {isActive ? "Live Now" : "Upcoming"}
                    </span>
                  </div>

                  <div className="text-base font-bold text-cream mt-2">
                    {c!.name}
                  </div>
                  <p className="text-xs text-cream/50 mt-1 line-clamp-2 leading-relaxed">
                    {c!.shortDescription}
                  </p>

                  <div className="mt-3 flex items-center text-xs text-gold font-medium gap-1">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  // ===== DESKTOP VIEW =====
  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-[520px] overflow-hidden roadmap-wrapper"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            const cur = x.get();
            let idx = 0;
            if (targets.length) {
              let best = 0;
              let bestDist = Infinity;
              targets.forEach((t, i) => {
                const d = Math.abs(t - cur);
                if (d < bestDist) {
                  bestDist = d;
                  best = i;
                }
              });
              idx = best;
            }
            const next =
              e.key === "ArrowLeft"
                ? Math.max(0, idx - 1)
                : Math.min(items.length - 1, idx + 1);
            if (targets[next] !== undefined)
              animate(x, targets[next], {
                type: "spring",
                stiffness: 300,
                damping: 28,
              });
          }
        }}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <PaperTexture />

        <button
          onClick={() => setIsExpanded(true)}
          className="absolute top-3 right-3 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-gold/15 text-cream/60 text-xs hover:text-gold hover:border-gold/30 transition-colors"
          aria-label="Expand roadmap"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View Full Roadmap</span>
        </button>

        <M
          ref={trackRef}
          className="absolute left-0 top-0 h-full"
          style={{ x, width: TRACK_WIDTH }}
          drag="x"
          dragMomentum={true}
          dragElastic={0.12}
          onDragStart={() => {
            setIsDragging(true);
          }}
          onDragEnd={(_e: any, info: PanInfo) => {
            setIsDragging(false);
            const cur = x.get();
            if (!targets.length) {
              computeTargets();
            }
            const t = targets.length ? targets : [];
            if (!t.length) return;
            let best = 0;
            let bestDist = Infinity;
            t.forEach((val, i) => {
              const d = Math.abs(val - cur);
              if (d < bestDist) {
                bestDist = d;
                best = i;
              }
            });
            animate(x, t[best], {
              type: "spring",
              stiffness: 300,
              damping: 28,
            });
            try {
              localStorage.setItem("fc_roadmap_hint_dismissed", "1");
              setHintDismissed(true);
            } catch {}
          }}
          onWheel={(e: WheelEvent) => {
            e.preventDefault();
            const delta = e.deltaY;
            const container = containerRef.current;
            const track = trackRef.current;
            if (!container || !track) return;
            const viewportW = container.clientWidth;
            const minX = Math.min(0, viewportW - track.clientWidth);
            const cur = x.get();
            const next = clamp(cur - delta, minX, 0);
            animate(x, next, { type: "tween", duration: 0.28 });
            try {
              localStorage.setItem("fc_roadmap_hint_dismissed", "1");
              setHintDismissed(true);
            } catch {}
          }}
        >
          <RoadSVG />
          <Milestones interactive={true} />
        </M>

        <div className="road-fade-left pointer-events-none" aria-hidden={true} />
        <div className="road-fade-right pointer-events-none" aria-hidden={true} />

        {mounted && !hintDismissed && (
          <div className="road-hint pointer-events-none" aria-hidden={true}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-black/50 border border-gold/10 text-cream text-sm">
              <span>Drag to explore</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="#F5B731"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* ===== FULLSCREEN EXPANDED MODAL ===== */}
      {isExpanded && (
        <div className="fixed inset-0 z-[200] bg-[#0D0A0A]/97 backdrop-blur-md flex items-center justify-center p-6">
          <PaperTexture />

          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-gold/15 text-cream/70 text-sm hover:text-gold hover:border-gold/30 transition-colors"
          >
            <X className="w-4 h-4" /> Close
          </button>

          <div
            ref={modalContainerRef}
            className="relative w-full h-full max-w-[1800px] flex items-center justify-center"
          >
            <div
              style={{
                width: EXPANDED_WIDTH,
                height: EXPANDED_HEIGHT,
                transform: `scale(${modalScale})`,
                transformOrigin: "center center",
              }}
              className="relative"
            >
              <ExpandedRoadSVG />
              <ExpandedMilestones />
            </div>
          </div>
        </div>
      )}
    </>
  );
}