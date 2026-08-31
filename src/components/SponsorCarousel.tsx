"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { sponsors } from "@/data/sponsors";

export default function SponsorCarousel({ items }: { items: typeof sponsors }) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRef = useRef(0);
  const isPausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const n = items.length;
  const radius = 300;
  const angleStep = 360 / n;

  useEffect(() => {
    const speed = 0.4;

    const tick = () => {
      if (!isPausedRef.current) {
        rotationRef.current = (rotationRef.current + speed) % 360;
      }

      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `rotateY(${rotationRef.current}deg)`;
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const baseAngle = i * angleStep;
        let effective = (baseAngle + rotationRef.current) % 360;
        if (effective > 180) effective -= 360;
        const distanceFromFront = Math.abs(effective);

        const opacity = 1 - Math.min(distanceFromFront / 140, 0.85);
        const brightness = 0.5 + 0.5 * (1 - Math.min(distanceFromFront / 140, 1));

        card.style.opacity = String(opacity);
        card.style.filter = `brightness(${brightness})`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [angleStep]);

  return (
    <div
      className="carousel-3d-scene relative w-full h-[200px] flex items-center justify-center"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      <div ref={ringRef} className="carousel-3d-ring">
        {items.map((s, i) => {
          const angle = i * angleStep;
          return (
            <div
              key={s.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute"
              style={{
                width: 220,
                height: 140,
                left: -110,
                top: -70,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            >
              <a
                href={s.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#171111] border border-cream/10 px-4 py-4"
              >
                <Image
                  src={s.logo.startsWith('/') ? `..${s.logo}` : s.logo}
                  alt={s.name}
                  width={180}
                  height={100}
                  className="object-contain max-h-24 w-auto"
                />
                <span className="text-xl text-cream/90 font-medium">
                  {s.name}
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}