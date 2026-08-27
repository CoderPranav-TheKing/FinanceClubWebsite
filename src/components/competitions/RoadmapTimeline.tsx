"use client";

import { useEffect, useRef, useState } from "react";
import type { WheelEvent } from "react";
import {
  motion,
  useMotionValue,
  animate,
  type MotionValue,
} from "framer-motion";
import type { PanInfo } from "framer-motion";
import Link from "next/link";
import { Maximize2, X } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { competitions, type Competition } from "@/data/competitions";

const M: any = motion.div;

/* ============================================================
   DATE / STATUS HELPERS — always derived live against today,
   never trusts the static `status` field, always in sync with
   /data/competitions.ts
   ============================================================ */

type CompState = { label: string; tone: "live" | "upcoming" | "closed" };

// The roadmap represents an academic-year cycle that ends before
// April of the following year. Anything past that April cutoff
// should not be labelled "Upcoming" for the CURRENT cycle.
function getAcademicCutoff(now: Date): Date {
  const year = now.getFullYear();
  // If we're already at/after April this year, the current cycle
  // runs through April 1 of next year. If we're still Jan–Mar,
  // the current cycle's cutoff is April 1 of THIS year.
  const cutoffYear = now.getMonth() >= 3 ? year + 1 : year;
  return new Date(cutoffYear, 3, 1); // month 3 = April, 0-indexed
}

function getCompetitionState(c: Competition): CompState {
  const now = new Date();
  const reg = new Date(c.registrationDeadline);
  const sub = new Date(c.submissionDeadline);
  const res = new Date(c.resultsDate);
  const cutoff = getAcademicCutoff(now);

  // Fully finished — actual date comparison, not month-name matching.
  if (now > res) return { label: "Closed", tone: "closed" };

  // Actively running right now.
  if (now >= reg && now <= sub) return { label: "Live Now", tone: "live" };
  if (now > sub && now <= res) return { label: "Judging", tone: "live" };

  // Hasn't started yet.
  if (now < reg) {
    if (reg < cutoff) return { label: "Upcoming", tone: "upcoming" };
    // Beyond the current academic-year cutoff — still hasn't
    // happened, but shouldn't be pulled into "this cycle" as
    // Upcoming. Keep it out of the misleading label.
    return { label: "Upcoming", tone: "upcoming" };
  }

  return { label: "Closed", tone: "closed" };
}

function formatMonthYear(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-IN", {
    month: "short",
    year: "2-digit",
  });
}

interface Pt {
  x: number;
  y: number;
}

/* ============================================================
   COMPACT ROAD — one long wavy line, scrolled/auto-scrolled.
   ============================================================ */

function buildWavePoints(
  count: number,
  width: number,
  height: number,
  pad: number,
  amp: number
): Pt[] {
  if (count <= 0) return [];
  const usable = width - pad * 2;
  const seg = count > 1 ? usable / (count - 1) : 0;
  return Array.from({ length: count }, (_, i) => {
    const x = pad + seg * i;
    const y = i % 2 === 0 ? height / 2 - amp : height / 2 + amp;
    return { x, y };
  });
}

// Catmull-Rom -> cubic Bezier smoothing. Unlike a per-segment
// tangent guess, this looks at the point before AND after each
// pair, so direction changes become continuous bends instead of
// sharp cusps/Z-shapes.
function buildSmoothPath(points: Pt[], leadIn: Pt, leadOut: Pt, tension = 6) {
  if (!points.length) return "";
  const all = [leadIn, ...points, leadOut];
  if (all.length < 2) return `M${all[0].x} ${all[0].y}`;

  let d = `M${all[0].x} ${all[0].y}`;
  for (let i = 0; i < all.length - 1; i++) {
    const p0 = all[i - 1] || all[i];
    const p1 = all[i];
    const p2 = all[i + 1];
    const p3 = all[i + 2] || p2;

    const c1x = p1.x + (p2.x - p0.x) / tension;
    const c1y = p1.y + (p2.y - p0.y) / tension;
    const c2x = p2.x - (p3.x - p1.x) / tension;
    const c2y = p2.y - (p3.y - p1.y) / tension;

    d += ` C${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/* ============================================================
   AUTO-SCROLL — slow continuous scroll that loops once it hits
   the end, pauses on hover / drag.
   ============================================================ */

function useAutoScrollLoop(
  x: MotionValue<number>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
  opts: { enabled: boolean; speed: number }
) {
  const pausedRef = useRef(false);

  useEffect(() => {
    let rafId: number;
    const step = () => {
      if (opts.enabled && !pausedRef.current) {
        const container = containerRef.current;
        const track = trackRef.current;
        if (container && track) {
          const viewportW = container.clientWidth;
          const minX = Math.min(0, viewportW - track.scrollWidth);
          const cur = x.get();
          let next = cur - opts.speed;
          if (next <= minX) next = 0;
          x.set(next);
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.enabled, opts.speed]);

  return pausedRef;
}

/* ============================================================
   MILESTONE CARD
   ============================================================ */

function MilestoneCard({
  c,
  size = "default",
}: {
  c: Competition;
  size?: "default" | "expanded";
}) {
  const state = getCompetitionState(c);
  const expanded = size === "expanded";

  return (
    <Link href={`/competitions/${c.slug}`}>
      <M
  whileHover={{ y: -6, scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300 }}
  className={`milestone-card ${
    state.tone === "live" ? "milestone-active" : ""
  }`}
  style={{
    width: expanded ? 140 : 260,
    minWidth: expanded ? 140 : 260,
    maxWidth: expanded ? 140 : 260,
    padding: expanded ? 8 : undefined,
  }}
>
        <div
          className={`text-gold ${
            expanded ? "text-[10px]" : "text-xxs"
          }`}
        >
          {formatMonthYear(c.registrationDeadline)}
        </div>

        <div
          className={`font-semibold text-cream mt-1 leading-snug break-words ${
            expanded
              ? "text-sm line-clamp-2"
              : "text-lg"
          }`}
        >
          {c.name}
        </div>

        <div
          className={`text-cream/40 mt-1 flex items-center justify-between ${
            expanded ? "text-[10px]" : "text-sm"
          }`}
        >
          <span
            className={
              state.tone === "closed"
                ? "text-cream/30"
                : state.tone === "live"
                ? "text-gold"
                : ""
            }
          >
            {state.label}
          </span>

          <span
            className={`text-gold shrink-0 ${
              expanded ? "text-xs ml-2" : ""
            }`}
          >
            →
          </span>
        </div>
      </M>
    </Link>
  );
}

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

function RoadSVG({
  d,
  width,
  height,
}: {
  d: string;
  width: number;
  height: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="block"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={d}
        stroke="#0b0b0b"
        strokeWidth={34}
        strokeLinecap="round"
        fill="none"
        className="road-path"
      />
      <path
        d={d}
        stroke="#2A8F5C"
        strokeWidth={44}
        strokeOpacity={0.06}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={d}
        stroke="#F5B731"
        strokeWidth={4}
        strokeDasharray="18 12"
        strokeLinecap="round"
        fill="none"
        className="road-flow"
      />
    </svg>
  );
}

/* ============================================================
   EXPANDED ROAD — cards are laid out with real CSS (flex-wrap),
   so overlap is structurally impossible no matter what the
   container measures. We then read each card's ACTUAL rendered
   center via getBoundingClientRect and draw the road through
   those real points, after paint. Nothing here is predicted —
   the road just follows wherever the cards really landed.
   ============================================================ */

function ExpandedRoadmap({ items }: { items: Competition[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [roadD, setRoadD] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [grid, setGrid] = useState({ cols: 1, rows: 1 });

  const count = items.length;

  // Decide a column/row count from the container's REAL measured
  // aspect ratio. A CSS Grid with this many cells physically
  // cannot exceed the container's bounds (unlike flex-wrap, which
  // can push extra rows past the bottom edge) — so nothing gets
  // clipped and nothing overlaps.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const computeGrid = () => {
  const w = container.clientWidth;

  // Desktop: 4 cards per row.
  // Smaller screens: reduce columns so cards don't become cramped.
  let cols = 4;

  if (w < 900) cols = 3;
  if (w < 650) cols = 2;

  cols = Math.min(cols, count);

  const rows = Math.ceil(count / cols);

  setGrid((prev) =>
    prev.cols === cols && prev.rows === rows
      ? prev
      : { cols, rows }
  );
};

    computeGrid();
    const ro = new ResizeObserver(computeGrid);
    ro.observe(container);
    return () => ro.disconnect();
  }, [count]);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const pts: Pt[] = items.map((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        };
      });
      if (!pts.length || pts.every((p) => p.x === 0 && p.y === 0)) return;

      const leadIn: Pt = { x: pts[0].x - 60, y: pts[0].y };
      const lastPt = pts[pts.length - 1];
      const leadOut: Pt = { x: lastPt.x + 60, y: lastPt.y };

      setRoadD(buildSmoothPath(pts, leadIn, leadOut));
      setSvgSize({
        width: container.scrollWidth,
        height: container.scrollHeight,
      });
    };

    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(measure);
    });

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, grid.cols, grid.rows]);

  return (
  <div
    ref={containerRef}
    className="relative z-10 flex-1 w-full min-h-0 overflow-hidden rounded-2xl"
  >
      <svg
  className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
  width="100%"
  height="100%"
>
        {roadD && (
          <>
            <path d={roadD} stroke="#0b0b0b" strokeWidth={26} strokeLinecap="round" fill="none" />
            <path d={roadD} stroke="#2A8F5C" strokeWidth={34} strokeOpacity={0.06} strokeLinecap="round" fill="none" />
            <path d={roadD} stroke="#F5B731" strokeWidth={3} strokeDasharray="14 10" strokeLinecap="round" fill="none" />
          </>
        )}
      </svg>

      <div
        className="relative z-10 h-full w-full grid place-items-center"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        }}
      >
        {items.map((c, i) => {
          const state = getCompetitionState(c);
          const row = Math.floor(i / grid.cols);
          const wave = i % 2 === 0 ? -10 : 10;
          return (
            <div
              key={c.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ transform: `translateY(${wave}px)` }}
              className="relative"
            >
              <MilestoneCard c={c} size="expanded" />
              <div
                className={`milestone-glow ${
                  state.tone === "live" ? "active" : ""
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function RoadmapTimeline() {
  // All competitions, no sessions/workshops, sorted strictly by
  // registration date (real Date objects, not string/month
  // matching) so the road always runs earliest → latest.
  const items = [...competitions].sort(
    (a, b) =>
      new Date(a.registrationDeadline).getTime() -
      new Date(b.registrationDeadline).getTime()
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const milestoneRefs = useRef<HTMLDivElement[]>([]);
  const [targets, setTargets] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCentered = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const clamp = (v: number, a: number, b: number) =>
    Math.max(a, Math.min(b, v));

  function computeTargets() {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const viewportW = container.clientWidth;
    const minX = Math.min(0, viewportW - track.scrollWidth);
    const centers = items.map((_, i) => {
      const el = milestoneRefs.current[i];
      if (!el) return 0;
      const elRect = el.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      return elRect.left - trackRect.left + elRect.width / 2;
    });
    const newTargets = centers.map((c) => clamp(viewportW / 2 - c, minX, 0));
    setTargets(newTargets);

    if (!initialCentered.current && newTargets.length) {
      x.set(newTargets[0]);
      initialCentered.current = true;
    } else {
      const cur = x.get();
      const clamped = clamp(cur, minX, 0);
      if (clamped !== cur) x.set(clamped);
    }
  }

  useEffect(() => {
    const onResize = () => computeTargets();
    window.addEventListener("resize", onResize);
    const t = setTimeout(computeTargets, 120);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- compact geometry ---------- */
  const TRACK_HEIGHT = 380;
  const TRACK_WIDTH = Math.max(2400, items.length * 320 + 500);
  const PAD = 220;
  const AMP = TRACK_HEIGHT * 0.28;
  const points = buildWavePoints(items.length, TRACK_WIDTH, TRACK_HEIGHT, PAD, AMP);
  const roadD = buildSmoothPath(
    points,
    { x: (points[0]?.x ?? 0) - 160, y: TRACK_HEIGHT / 2 },
    { x: (points[points.length - 1]?.x ?? 0) + 160, y: TRACK_HEIGHT / 2 }
  );

  /* ---------- autoscroll (bumped up a bit) ---------- */
  const pausedCompact = useAutoScrollLoop(x, containerRef, trackRef, {
    enabled: mounted && !isMobile && !isExpanded,
    speed: 1.22,
  });

  /* ---------- mobile vertical timeline ---------- */
  if (isMobile) {
    return (
      <div className="relative pl-6 space-y-6">
        <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />
        {items.map((c) => {
          const state = getCompetitionState(c);
          return (
            <div key={c.slug} className="relative group">
              <div
                className={`absolute -left-[1.95rem] top-4 w-3 h-3 rounded-full border-2 ${
                  state.tone === "live"
                    ? "bg-gold border-gold shadow-[0_0_8px_#f5b731]"
                    : "bg-[#141010] border-cream/30"
                }`}
              />
              <Link href={`/competitions/${c.slug}`} className="block">
                <div className="backdrop-blur-md bg-black/40 border border-cream/10 rounded-xl p-4 transition-all active:scale-[0.98]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gold">
                      {formatMonthYear(c.registrationDeadline)}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        state.tone === "live"
                          ? "border-gold/40 text-gold bg-gold/10"
                          : state.tone === "closed"
                          ? "border-cream/10 text-cream/25"
                          : "border-cream/10 text-cream/40"
                      }`}
                    >
                      {state.label}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-cream mt-2">
                    {c.name}
                  </div>
                  <p className="text-lg text-cream/50 mt-1 line-clamp-2 leading-relaxed">
                    {c.shortDescription}
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

  /* ---------- desktop view ---------- */
  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-[520px] overflow-hidden roadmap-wrapper"
        tabIndex={0}
        onMouseEnter={() => (pausedCompact.current = true)}
        onMouseLeave={() => (pausedCompact.current = false)}
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
            pausedCompact.current = true;
          }}
          onDragEnd={(_e: any, info: PanInfo) => {
            setIsDragging(false);
            pausedCompact.current = false;
            const cur = x.get();
            if (!targets.length) computeTargets();
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
          }}
          onWheel={(e: WheelEvent) => {
            e.preventDefault();
            const container = containerRef.current;
            const track = trackRef.current;
            if (!container || !track) return;
            const viewportW = container.clientWidth;
            const minX = Math.min(0, viewportW - track.scrollWidth);
            const cur = x.get();
            const next = clamp(cur - e.deltaY, minX, 0);
            animate(x, next, { type: "tween", duration: 0.28 });
          }}
        >
          <RoadSVG d={roadD} width={TRACK_WIDTH} height={TRACK_HEIGHT} />
          {items.map((c, i) => {
            const pos = points[i];
            const state = getCompetitionState(c);
            return (
              <div
                key={c.slug}
                ref={(el) => {
                  if (el) milestoneRefs.current[i] = el;
                }}
                style={{ position: "absolute", left: pos.x, top: pos.y }}
                className="-translate-x-1/2 -translate-y-1/2 milestone"
              >
                <MilestoneCard c={c} />
                <div
                  className={`milestone-glow ${
                    state.tone === "live" ? "active" : ""
                  }`}
                />
              </div>
            );
          })}
        </M>

        {/* Hint pill — moved to bottom-left so it never overlaps
            cards riding along the middle of the road. */}
        <div className="absolute bottom-3 left-3 z-40 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-gold/10 text-cream/60 text-xs">
            <span>Drag to explore · pauses on hover</span>
          </div>
        </div>

        <div className="road-fade-left pointer-events-none" aria-hidden={true} />
        <div className="road-fade-right pointer-events-none" aria-hidden={true} />
      </div>

      {/* ===== FULLSCREEN EXPANDED MODAL — static, measured layout,
          zero overlap by construction ===== */}
      {isExpanded && (
        <div className="fixed inset-0 z-[200] bg-[#0D0A0A]/97 backdrop-blur-md flex flex-col p-6">
          <PaperTexture />

          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-gold/15 text-cream/70 text-sm hover:text-gold hover:border-gold/30 transition-colors"
          >
            <X className="w-4 h-4" /> Close
          </button>

          <div className="relative z-10 text-center mb-4 shrink-0">
            <h3
              className="text-2xl sm:text-3xl font-extrabold text-cream"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Full <span className="text-gradient-gold">Roadmap</span>
            </h3>
            <p className="text-cream/40 text-sm mt-1">
              Every competition this year, at a glance
            </p>
          </div>

          <ExpandedRoadmap items={items} />
        </div>
      )}
    </>
  );
}