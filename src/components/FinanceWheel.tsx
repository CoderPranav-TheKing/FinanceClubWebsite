"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Trophy,
  Users,
  Lightbulb,
  BookOpen,
  BarChart3,
  Award,
  X,
} from "lucide-react";

const SECTORS = [
  {
    icon: Trophy,
    title: "Competitions",
    desc: "Flagship events like ERC and FinSearch testing real-world finance skills against top institutions.",
    image: "/Finance-Club/partner_1.png",
    imageScale: 1,
    imageX: 0,
    imageY: 0,
  },
  {
    icon: Users,
    title: "Sessions & Bootcamps",
    desc: "Intensive workshops on financial modeling, valuation and trading strategies.",
    image: "/Finance-Club/partner_2.jpeg",
    imageScale: 1.1,
    imageX: 0,
    imageY: -5,
  },
  {
    icon: Lightbulb,
    title: "Research",
    desc: "Deep-dive initiatives covering equity, macro and alternative investment analysis.",
    image: "/Finance-Club/partner_3.jpeg",
    imageScale: 1.1,
    imageX: 5,
    imageY: 35,
  },
  {
    icon: BookOpen,
    title: "Publications",
    desc: "Market reports, sector analysis and curated primers for every finance domain.",
    image: "/Finance-Club/partner_4.jpeg",
    imageScale: 1.08,
    imageX: 0,
    imageY: -5,
  },
  {
    icon: BarChart3,
    title: "Industry Connect",
    desc: "Guest lectures and sessions with professionals from leading financial firms.",
    image: "/Finance-Club/partner_5.jpeg",
    imageScale: 1.05,
    imageX: 0,
    imageY: -5,
  },
  {
    icon: Award,
    title: "Career Prep",
    desc: "Mock interviews, case studies and placement guidance for finance roles.",
    image: "/Finance-Club/partner_6.jpeg",
    imageScale: 1.55,
    imageX: 0,
    imageY: -22,
  },
];

const SECTOR_COUNT = SECTORS.length;
const ANGLE_STEP = 360 / SECTOR_COUNT;
const START_OFFSET = -90;

function polar(radiusPct: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;

  return {
    left: 50 + radiusPct * Math.cos(rad),
    top: 50 + radiusPct * Math.sin(rad),
  };
}

function wedgeClipPath(startAngle: number, endAngle: number) {
  const REACH = 62;

  const p1 = polar(REACH, startAngle);
  const mid = polar(REACH, (startAngle + endAngle) / 2);
  const p2 = polar(REACH, endAngle);

  return `polygon(
    50% 50%,
    ${p1.left}% ${p1.top}%,
    ${mid.left}% ${mid.top}%,
    ${p2.left}% ${p2.top}%
  )`;
}

export default function FinanceWheel() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchOrSmall =
        typeof window !== "undefined" &&
        (window.innerWidth < 768 ||
          window.matchMedia("(hover: none)").matches ||
          window.matchMedia("(pointer: coarse)").matches);
      setIsMobile(isTouchOrSmall);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close active card on mobile when tapping outside container
  useEffect(() => {
    if (!isMobile || activeIndex === null) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isMobile, activeIndex]);

  const handleSectorClick = (i: number) => {
    if (isMobile) {
      setActiveIndex((prev) => (prev === i ? null : i));
    }
  };

  const handleMouseEnter = (i: number) => {
    if (!isMobile) {
      setActiveIndex(i);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveIndex(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-[88vw] h-[88vw] max-w-[320px] max-h-[320px] sm:w-[460px] sm:h-[460px] sm:max-w-none sm:max-h-none lg:w-[620px] lg:h-[620px]"
    >
      {/* =========================================================
          MAIN WHEEL
      ========================================================= */}
      <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-gold/25 shadow-[0_0_60px_-10px_rgba(245,183,49,0.25)]">
        {SECTORS.map((sector, i) => {
          const startAngle = START_OFFSET + i * ANGLE_STEP;
          const endAngle = startAngle + ANGLE_STEP;
          const bisector = startAngle + ANGLE_STEP / 2;

          const labelPos = polar(30, bisector);
          const isActive = activeIndex === i;

          return (
            <div
              key={sector.title}
              role={isMobile ? "button" : undefined}
              tabIndex={isMobile ? 0 : undefined}
              aria-label={`${sector.title}: ${sector.desc}`}
              aria-pressed={isMobile ? isActive : undefined}
              className={`absolute inset-0 select-none ${
                isMobile
                  ? "cursor-pointer active:scale-[0.98] transition-transform"
                  : "cursor-pointer"
              }`}
              style={{
                clipPath: wedgeClipPath(startAngle, endAngle),
              }}
              onClick={() => handleSectorClick(i)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSectorClick(i);
                }
              }}
            >
              <Image
                src={sector.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out"
                style={{
                  transform: `
                    translate(${sector.imageX}%, ${sector.imageY}%)
                    scale(${isActive ? sector.imageScale + 0.08 : sector.imageScale})
                  `,
                }}
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 460px, 620px"
              />

              {/* Dark overlay */}
              <div
                className={`absolute inset-0 transition-colors duration-300 ${
                  isActive ? "bg-black/35" : "bg-black/62"
                }`}
              />

              {/* Sector label */}
              <div
                className="absolute flex flex-col items-center text-center pointer-events-none"
                style={{
                  left: `${labelPos.left}%`,
                  top: `${labelPos.top}%`,
                  transform: "translate(-50%, -50%)",
                  width: "34%",
                }}
              >
                <sector.icon
                  className={`w-5 h-5 mb-1.5 transition-colors duration-300 ${
                    isActive ? "text-gold-light scale-110" : "text-gold"
                  }`}
                />

                <span
                  className={`font-bold text-xs sm:text-lg lg:text-xl leading-tight whitespace-nowrap transition-colors duration-300 ${
                    isActive ? "text-gold-light" : "text-cream"
                  }`}
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {sector.title}
                </span>
              </div>
            </div>
          );
        })}

        {/* =======================================================
            RADIAL DIVIDERS
        ======================================================= */}
        {SECTORS.map((_, i) => {
          const boundaryAngle = START_OFFSET + i * ANGLE_STEP;

          return (
            <div
              key={`divider-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: "50%",
                height: "1.5px",
                background:
                  "linear-gradient(to right, rgba(245,183,49,0.5), rgba(245,183,49,0.12))",
                transformOrigin: "0 50%",
                transform: `rotate(${boundaryAngle}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* =========================================================
          DESKTOP HOVER DESCRIPTION CARDS
      ========================================================= */}
      {!isMobile &&
        SECTORS.map((sector, i) => {
          const startAngle = START_OFFSET + i * ANGLE_STEP;
          const bisector = startAngle + ANGLE_STEP / 2;
          const petalPos = polar(47, bisector);
          const isHovered = activeIndex === i;

          return (
            <div
              key={`petal-${sector.title}`}
              className={`absolute transition-all duration-300 ease-out z-30 ${
                isHovered
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
              style={{
                left: `${petalPos.left}%`,
                top: `${petalPos.top}%`,
                transform: "translate(-50%, -50%)",
                width: "54%",
              }}
            >
              <div
                className="
                  card-glow-gold
                  rounded-2xl
                  p-4
                  sm:p-5
                  text-center
                  shadow-2xl
                  backdrop-blur-md
                  bg-black/75
                  border border-gold/30
                "
              >
                <p
                  className="
                    text-xs
                    sm:text-base
                    lg:text-lg
                    text-cream/90
                    leading-relaxed
                  "
                >
                  {sector.desc}
                </p>
              </div>
            </div>
          );
        })}

      {/* =========================================================
          MOBILE CLICK POPUP MODAL CARD
      ========================================================= */}
      {isMobile && activeIndex !== null && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center p-3 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="
              card-glow-gold
              rounded-2xl
              p-4
              text-center
              shadow-2xl
              backdrop-blur-xl
              bg-[#141010]/95
              border border-gold/40
              w-full
              max-w-[280px]
              relative
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute top-2.5 right-2.5 p-1 rounded-full text-cream/60 hover:text-gold hover:bg-gold/10 transition-colors"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            {(() => {
              const sector = SECTORS[activeIndex];
              const IconComponent = sector.icon;
              return (
                <>
                  <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-2 text-gold">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h4
                    className="font-bold text-sm text-gold mb-1.5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {sector.title}
                  </h4>
                  <p className="text-xs text-cream/85 leading-relaxed">
                    {sector.desc}
                  </p>
                  <div className="mt-3 pt-2 border-t border-gold/10 flex items-center justify-center">
                    <span className="text-[10px] text-gold/70 uppercase tracking-widest font-medium">
                      Tap anywhere to close
                    </span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* =========================================================
          CENTER HUB
      ========================================================= */}
      <div
        className="absolute rounded-full bg-[#0D0A0A] border border-gold/30 overflow-hidden pointer-events-none z-40"
        style={{
          left: "50%",
          top: "50%",
          width: "16%",
          height: "16%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/Finance-Club/logo.jpg"
          alt="Finance Club logo"
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>
    </div>
  );
}

