"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { sponsors } from "@/data/sponsors";

export default function LogoCarousel() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRef = useRef(0);
  const isPausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const n = sponsors.length;
  const radius = 250; // distance of each card from the center — tune for ring size
  const angleStep = 360 / n;

  useEffect(() => {
    const speed = 0.4; // degrees per frame — lower = slower spin

    const tick = () => {
      if (!isPausedRef.current) {
        rotationRef.current = (rotationRef.current + speed) % 360;
      }

      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `rotateY(${rotationRef.current}deg)`;
      }

      // Fade + dim cards based on how close they currently are to "front"
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const baseAngle = i * angleStep;
        let effective = (baseAngle + rotationRef.current) % 360;
        if (effective > 180) effective -= 360; // normalize to -180..180
        const distanceFromFront = Math.abs(effective); // 0 = facing viewer, 180 = facing away

        const opacity = 1 - Math.min(distanceFromFront / 140, 0.85);
      

        card.style.opacity = String(opacity);
        card.style.filter = "none";
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
      className="carousel-3d-scene relative w-full h-[320px] flex items-center justify-center"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      <div ref={ringRef} className="carousel-3d-ring">
        {sponsors.map((s, i) => {
          const angle = i * angleStep;
          return (
            <div
  key={s.id}
  ref={(el) => { cardRefs.current[i] = el; }}
  className="partner-logo-card absolute flex flex-col items-center justify-center gap-4 !p-4"
  style={{
    width: 170,
    height: 230,
    left: -85,
    top: -115,
    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
  }}
>
  <div className="relative w-full h-32 rounded-xl bg-cream/95 flex items-center justify-center p-4">
    <Image
      src={s.logo}
      alt={s.name}
      fill
      className="object-contain p-3"
      sizes="170px"
    />
  </div>
  <span className="text-l font-semibold text-cream/70 text-center leading-tight">
    {s.name}
  </span>
</div>
          );
        })}
      </div>
    </div>
  );
}