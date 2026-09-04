"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Trophy,
  Users,
  Lightbulb,
  BookOpen,
  BarChart3,
  Award,
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <div className="relative mx-auto w-[88vw] h-[88vw] max-w-[320px] max-h-[320px] sm:w-[460px] sm:h-[460px] sm:max-w-none sm:max-h-none lg:w-[620px] lg:h-[620px]">

      {/* =========================================================
          MAIN WHEEL
      ========================================================= */}
      <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-gold/25 shadow-[0_0_60px_-10px_rgba(245,183,49,0.25)]">

        {SECTORS.map((sector, i) => {
          const startAngle = START_OFFSET + i * ANGLE_STEP;
          const endAngle = startAngle + ANGLE_STEP;
          const bisector = startAngle + ANGLE_STEP / 2;

          const labelPos = polar(30, bisector);
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={sector.title}
              className="absolute inset-0 cursor-default"
              style={{
                clipPath: wedgeClipPath(startAngle, endAngle),
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={sector.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out"
                style={{
                  transform: `
                    translate(${sector.imageX}%, ${sector.imageY}%)
                    scale(${isHovered ? sector.imageScale + 0.08 : sector.imageScale})
                  `,
                }}
                sizes="620px"
              />

              {/* Dark overlay */}
              <div
                className={`absolute inset-0 transition-colors duration-300 ${
                  isHovered ? "bg-black/40" : "bg-black/62"
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
                <sector.icon className="w-5 h-5 text-gold mb-1.5" />

                <span
                  className="font-bold text-sm sm:text-lg lg:text-xl text-cream leading-tight whitespace-nowrap"
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
          HOVER DESCRIPTION CARDS
          
          IMPORTANT:
          47% brings them much closer to the wheel.
          44% keeps them compact so they don't float far away.
          They intentionally overlap the wheel slightly.
      ========================================================= */}
      {SECTORS.map((sector, i) => {
        const startAngle = START_OFFSET + i * ANGLE_STEP;
        const bisector = startAngle + ANGLE_STEP / 2;

        // Previously 64%.
        // 47% puts the cards much closer to the wheel.
        const petalPos = polar(isMobile ? 36 : 47, bisector);

        const isHovered = hoveredIndex === i;

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
  width: isMobile ? "50%" : "44%",
  maxWidth: isMobile ? "210px" : "none",
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
                bg-black/65
                border border-gold/20
              "
            >
              <p
                className="
                  text-xs
                  sm:text-base
                  lg:text-lg
                  text-cream/80
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