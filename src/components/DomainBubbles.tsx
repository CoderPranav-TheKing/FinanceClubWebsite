"use client";

import { useState, useEffect } from "react";

const domains = [
  { name: "Equity Research", size: 150, filled: true },
  { name: "Investment Banking", size: 190, filled: false },
  { name: "Private Equity", size: 130, filled: true },
  { name: "Venture Capital", size: 160, filled: false },
  { name: "Quantitative Finance", size: 200, filled: true },
  { name: "Derivatives", size: 120, filled: false },
  { name: "Portfolio Management", size: 280, filled: true },
  { name: "Macroeconomics", size: 170, filled: false },
  { name: "Fintech", size: 110, filled: true },
  { name: "Corporate Finance", size: 180, filled: false },
  { name: "Risk Management", size: 155, filled: true },
  { name: "Sustainable Finance", size: 175, filled: false },
  { name: "Legal Finance", size: 165, filled: true },
];

export default function DomainBubbles() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setScale(window.innerWidth < 640 ? 0.55 : 1);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 px-2 sm:px-0">
      {domains.map((d, i) => {
        const size = Math.round(d.size * scale);
        const minFont = scale < 1 ? 9 : 14;

        return (
          <div
            key={d.name}
            className={`domain-bubble rounded-full flex items-center justify-center text-center px-2 sm:px-4 font-bold cursor-default leading-tight ${
              d.filled
                ? "bg-gold text-[#0D0A0A]"
                : "bg-transparent border-2 border-gold text-gold"
            }`}
            style={{
              width: size,
              height: size,
              fontSize: Math.max(size / 8.5, minFont),
              animationDelay: `${(i % 6) * -1.2}s`,
            }}
          >
            {d.name}
          </div>
        );
      })}
    </div>
  );
}