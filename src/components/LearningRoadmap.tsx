"use client";

import { useState } from "react";
import Image from "next/image";
import {
  TrendingUp,
  BarChart3,
  Briefcase,
  Award,
  BookOpen,
  X,
  ExternalLink,
} from "lucide-react";

interface ResourceItem {
  title: string;
  desc: string;
  url?: string;
  author?: string;
}

interface RoadmapSection {
  id: string;
  icon: typeof TrendingUp;
  label: string;
  tagline: string;
  resources: ResourceItem[];
}

const SECTIONS: RoadmapSection[] = [
  {
    id: "fundamentals",
    icon: TrendingUp,
    label: "Market & Business Fundamentals",
    tagline: "Start Here",
    resources: [
      {
        title: "Zerodha Varsity",
        desc: "The best free starting point for understanding Indian markets — stock market basics, fundamental and technical analysis, F&O, personal finance, and financial modelling, all in bite-sized modules with quizzes.",
        url: "https://zerodha.com/varsity/",
      },
      {
        title: "Zerodha Varsity — YouTube Modules",
        desc: "Video versions of the Varsity curriculum for those who prefer watching over reading.",
        url: "https://www.youtube.com/@varsitybyzerodha",
      },
      {
        title: "Zerodha YouTube — Daily Market Recaps",
        desc: "Good for building the habit of staying current with markets, not just learning theory.",
        url: "https://www.youtube.com/@varsitybyzerodha",
      },
      {
        title: "Think School",
        desc: "Not finance-technical, but essential for business understanding — real company case studies on why businesses win, fail, and how strategy plays out.",
        url: "https://www.youtube.com/@ThinkSchool",
      },
      {
        title: "The Economic Times",
        desc: "Works best as a daily habit rather than a one-time read. Just the front page and markets section every day is enough to start.",
        url: "https://economictimes.indiatimes.com/",
      },
    ],
  },
  {
    id: "modelling",
    icon: BarChart3,
    label: "Financial Modelling & Valuation",
    tagline: "Core Skills",
    resources: [
      {
        title: "The Valuation School — Channel",
        desc: "Financial modelling and valuation content, broken into structured playlists.",
        url: "https://www.youtube.com/@thevaluationschool",
      },
      {
        title: "The Valuation School — Playlists",
        desc: "Organized playlists covering modelling and valuation topic by topic.",
        url: "https://www.youtube.com/@thevaluationschool/playlists",
      },
      {
        title: "Aswath Damodaran — YouTube",
        desc: "Known as the Dean of Valuation, and probably the single most credible free resource out there.",
        url: "https://www.youtube.com/channel/UCLvnJL8htRR1T9cbSccaoVw",
      },
      {
        title: "Aswath Damodaran — Website",
        desc: "Datasets, slides, and spreadsheets covering both valuation and accounting fundamentals in real depth.",
        url: "https://pages.stern.nyu.edu/~adamodar/",
      },
    ],
  },
  {
    id: "placement",
    icon: Briefcase,
    label: "Placement Prep: Core Technicals",
    tagline: "Interview Ready",
    resources: [
      {
        title: "Breaking Into Wall Street (BIWS)",
        desc: "Structured courses on 3-statement modelling, DCF, M&A, and LBO modelling — widely used as a self-study curriculum for IB and PE prep.",
        url: "https://breakingintowallstreet.com/",
      },
      {
        title: "The 400 Questions Guide",
        desc: "A free 200+ page guide covering fit and behavioral questions along with technicals across accounting, valuation, M&A, and LBOs (BIWS / Mergers & Inquisitions).",
        url: "https://mergersandinquisitions.com/400-questions-investment-banking/",
      },
      {
        title: "The Red Book — WSP IB Interview Guide",
        desc: "Over 1,000 real IB and PE interview questions and answers, organized by topic: accounting, valuation, M&A, LBO, industry-specific, and behavioral.",
        url: "https://www.wallstreetprep.com/self-study-programs/the-red-book/",
      },
      {
        title: "3-Statement Analysis",
        desc: "Already covered inside both BIWS and the Red Book above — BIWS's \"Core Financial Modeling\" course is built almost entirely around this if you want it as a standalone module.",
        url: "https://breakingintowallstreet.com/",
      },
    ],
  },
  {
    id: "cfa",
    icon: Award,
    label: "CFA Track",
    tagline: "Certification Path",
    resources: [
      {
        title: "Schweser CFA Level 1",
        desc: "The standard prep provider alongside the official CFA Institute curriculum.",
        url: "https://www.schweser.com/cfa/level-1/study-materials",
      },
      {
        title: "Schweser CFA Level 2",
        desc: "Level 2 study materials from Kaplan Schweser.",
        url: "https://www.schweser.com/cfa/level-2/study-materials",
      },
      {
        title: "Schweser CFA Level 3",
        desc: "Level 3 study materials from Kaplan Schweser.",
        url: "https://www.schweser.com/cfa/level-3/study-materials",
      },
      {
        title: "Schweser Free Trial & Materials",
        desc: "Useful for students who want to sample the notes before committing.",
        url: "https://www.schweser.com/cfa/level-1/free-study-materials",
      },
    ],
  },
  {
    id: "books",
    icon: BookOpen,
    label: "Books",
    tagline: "Deep Reading",
    resources: [
      { title: "One Up on Wall Street", author: "Peter Lynch", desc: "How to think about businesses as investments." },
      { title: "The Intelligent Investor", author: "Benjamin Graham", desc: "The fundamentals of value investing." },
      { title: "Poor Charlie's Almanack", author: "Charlie Munger", desc: "Mental models and judgment." },
      { title: "Investment Banking: Valuation, LBOs, M&A, and IPOs", author: "Rosenbaum & Pearl", desc: "The standard technical reference for IB." },
      { title: "Valuation: Measuring and Managing the Value of Companies", author: "McKinsey & Co. (Koller et al.)", desc: "The definitive corporate valuation reference." },
      { title: "Liar's Poker", author: "Michael Lewis", desc: "Wall Street culture and bond trading in the 1980s." },
      { title: "Barbarians at the Gate", author: "Burrough & Helyar", desc: "The RJR Nabisco LBO — a classic PE case study." },
      { title: "The Big Short", author: "Michael Lewis", desc: "The 2008 crisis, told through the people who saw it coming." },
    ],
  },
];

const SECTOR_COUNT = SECTIONS.length;
const ANGLE_STEP = 360 / SECTOR_COUNT;
const START_OFFSET = -90;
const GAP_DEG = 7; // visual spacing between sectors
const INNER_RADIUS = 24; // % — radius of the empty hole in the middle
const OUTER_RADIUS = 48; // % — radius of the sectors' outer edge

function polar(radiusPct: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: 50 + radiusPct * Math.cos(rad),
    top: 50 + radiusPct * Math.sin(rad),
  };
}

// True donut-wedge polygon: samples points along both the outer and inner
// arcs so each sector has its own curved edges — no shared parent mask
// needed, which is what makes real gaps between sectors possible.
function donutWedgeClipPath(startAngle: number, endAngle: number) {
  const steps = 10;
  const outerPoints = [];
  const innerPoints = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = startAngle + t * (endAngle - startAngle);
    outerPoints.push(polar(OUTER_RADIUS, angle));
  }
  for (let i = steps; i >= 0; i--) {
    const t = i / steps;
    const angle = startAngle + t * (endAngle - startAngle);
    innerPoints.push(polar(INNER_RADIUS, angle));
  }
  const all = [...outerPoints, ...innerPoints];
  return `polygon(${all.map((p) => `${p.left}% ${p.top}%`).join(", ")})`;
}

export default function LearningRoadmap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeSection = SECTIONS.find((s) => s.id === activeId) ?? null;

  return (
    <div className="relative">
      <div className="relative mx-auto w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[560px] lg:h-[560px]">
        {SECTIONS.map((section, i) => {
          const startAngle = START_OFFSET + i * ANGLE_STEP + GAP_DEG / 2;
          const endAngle = START_OFFSET + (i + 1) * ANGLE_STEP - GAP_DEG / 2;
          const bisector = (startAngle + endAngle) / 2;
          const labelPos = polar(INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) * 0.48, bisector);

          return (
            <button
              key={section.id}
              onClick={() => setActiveId(section.id)}
              className="absolute inset-0 cursor-pointer group"
              style={{ clipPath: donutWedgeClipPath(startAngle, endAngle) }}
              aria-label={`Open ${section.label}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C1616] to-[#141010] border border-gold/15 transition-colors duration-300 group-hover:from-[#231C1C] group-hover:border-gold/40" />

              <div
  className="absolute flex flex-col items-center text-center pointer-events-none px-1"
  style={{
    left: `${labelPos.left}%`,
    top: `${labelPos.top}%`,
    transform: "translate(-50%, -50%)",
    width: "26%",
  }}
>
  <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold mb-1.5 transition-transform duration-300 group-hover:scale-110" />
  <span
    className="font-bold text-[9px] sm:text-[10px] lg:text-[11px] text-cream leading-[1.15]"
    style={{ fontFamily: "var(--font-display)" }}
  >
                  {section.label}
                </span>
                <span className="text-[9px] text-gold/50 mt-1 uppercase tracking-wider">
                  {section.tagline}
                </span>
              </div>
            </button>
          );
        })}

        {/* Center hub */}
        <div
          className="absolute rounded-full bg-[#0D0A0A] border border-gold/30 overflow-hidden pointer-events-none z-10 flex items-center justify-center"
          style={{
            left: "50%",
            top: "50%",
            width: `28%`,
            height: `28%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image src="/logo.jpg" alt="Finance Club logo" fill className="object-cover" sizes="120px" />
        </div>
      </div>

      {/* ===== FULLSCREEN CONTENT MODAL ===== */}
      {activeSection && (
        <div className="fixed inset-0 z-[200] bg-[#0D0A0A]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto backdrop-blur-md bg-black/40 border border-gold/20 rounded-3xl p-6 sm:p-10">
  <button
    onClick={() => setActiveId(null)}
    className="sticky top-0 float-right mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-gold/15 text-cream/70 text-sm hover:text-gold hover:border-gold/30 transition-colors z-10"
  >
    <X className="w-4 h-4" /> Close
  </button>

  <div className="clear-both pt-4">
    <div className="relative overflow-hidden backdrop-blur-md border border-cream/10 rounded-2xl px-6 py-6 sm:px-8 sm:py-7 mb-8">
      <Image
        src="/art1.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 700px"
      />
      <div className="absolute inset-0 bg-black/78" />
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_top_left,rgba(245,183,49,0.15),transparent_35%)]" />

      <div className="relative z-10">
    <div className="badge-pill badge-gold mb-4">
      <activeSection.icon className="w-3 h-3" />
      {activeSection.tagline}
    </div>
    <h3
      className="text-2xl sm:text-3xl font-extrabold text-cream"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {activeSection.label}
                  </h3>
                  </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeSection.resources.map((r) => (
                  <div key={r.title} className="card-glow-gold p-5">
                    <h4
                      className="font-bold text-sm text-cream mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {r.title}
                    </h4>
                    {r.author && (
                      <p className="text-xs text-gold/60 mb-2">{r.author}</p>
                    )}
                    <p className="text-xs text-cream/60 leading-relaxed mb-3">
                      {r.desc}
                    </p>
                    {r.url && (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-gold/70 hover:text-gold transition-colors font-semibold uppercase tracking-wider"
                      >
                        <ExternalLink className="w-3 h-3" /> Visit
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}