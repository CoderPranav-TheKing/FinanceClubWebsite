"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const M: any = motion.div;

const NOTE_IMAGES = ["./note-1.png", "./note-2.png", "./note-3.png", "./note-4.png"];
const TYPED_TEXT = "Finance Club";
const TYPE_SPEED_MS = 85;
const SLOT_COUNT = 34; // evenly spaced columns across the pile width — guarantees no gaps

// Mound shape: flat plateau in the center, sloped shoulders. Returns 0..1.
function moundHeight(xFrac: number) {
  const center = 0.5;
  const plateauHalfWidth = 0.2;
  const shoulderWidth = 0.3;
  const dist = Math.abs(xFrac - center);
  if (dist <= plateauHalfWidth) return 1;
  if (dist >= plateauHalfWidth + shoulderWidth) return 0;
  const t = (dist - plateauHalfWidth) / shoulderWidth;
  return 1 - t * t * (3 - 2 * t);
}

interface NoteConfig {
  id: number;
  img: string;
  finalX: number; // px, relative to pile container's own width
  finalY: number; // px from bottom
  rotation: number;
  scale: number;
  delay: number;
  duration: number;
  driftX: number;
}

function generateNotes(pileWidth: number, pileMaxHeight: number): NoteConfig[] {
  const notes: NoteConfig[] = [];
  let id = 0;

  // Walk evenly spaced slots across the full width so coverage is
  // guaranteed — no random gaps like a pure-random scatter can leave.
  for (let s = 0; s < SLOT_COUNT; s++) {
    const xFrac = (s + 0.5) / SLOT_COUNT;
    const envelope = moundHeight(xFrac);
    const slotMaxHeight = envelope * pileMaxHeight;

    // Taller slots (center) get more stacked notes; shoulders get fewer.
    const notesInSlot = 1 + Math.round(envelope * 3.2);

    for (let n = 0; n < notesInSlot; n++) {
      const jitterX = (Math.random() - 0.5) * (pileWidth / SLOT_COUNT) * 1.4;
      const finalX = xFrac * pileWidth + jitterX;
      const finalY = Math.random() * Math.max(slotMaxHeight, pileMaxHeight * 0.05);

      notes.push({
        id: id++,
        img: NOTE_IMAGES[id % NOTE_IMAGES.length],
        finalX,
        finalY,
        rotation: (Math.random() - 0.5) * 34, // moderate — keeps notes reading as flat bills, not shards
        scale: 0.62 + Math.random() * 0.4,
        delay: Math.random() * 1.2,
        duration: 0.8 + Math.random() * 0.55,
        driftX: (Math.random() - 0.5) * 50,
      });
    }
  }

  return notes.sort((a, b) => a.finalY - b.finalY);
}

export default function HeroMoneyPile() {
  const pileRef = useRef<HTMLDivElement | null>(null);
  const [pileWidth, setPileWidth] = useState(900);
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    const update = () => {
      setViewportHeight(window.innerHeight);
      if (pileRef.current) setPileWidth(pileRef.current.clientWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pileMaxHeight = viewportHeight * 0.4;
  const notes = useMemo(
    () => generateNotes(pileWidth, pileMaxHeight),
    [pileWidth, pileMaxHeight]
  );

  const [pileSettled, setPileSettled] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  const totalPileTime = useMemo(() => {
    const last = Math.max(...notes.map((n) => n.delay + n.duration));
    return last * 1000 + 250;
  }, [notes]);

  useEffect(() => {
    const t = setTimeout(() => setPileSettled(true), totalPileTime);
    return () => clearTimeout(t);
  }, [totalPileTime]);

  useEffect(() => {
    if (!pileSettled || typedChars >= TYPED_TEXT.length) return;
    const t = setTimeout(() => setTypedChars((c) => c + 1), TYPE_SPEED_MS);
    return () => clearTimeout(t);
  }, [pileSettled, typedChars]);

  const typingDone = typedChars >= TYPED_TEXT.length;

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-end">
      <div className="absolute inset-0 mesh-hero grain pointer-events-none" />

      <div
        className="relative z-20 text-center pointer-events-none"
        style={{ marginBottom: pileMaxHeight * 0.6 }}
      >
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-[0.04em] whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-gradient-gold">{TYPED_TEXT.slice(0, typedChars)}</span>
          {!typingDone && pileSettled && (
            <span className="inline-block w-[3px] h-[0.9em] bg-gold ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
          )}
        </h1>
      </div>

      <div
        ref={pileRef}
        className="relative w-[900px] max-w-[92vw]"
        style={{ height: pileMaxHeight + 60 }}
      >
        {notes.map((note) => (
          <M
            key={note.id}
            className="absolute bottom-0"
            style={{
              left: note.finalX,
              width: 110 * note.scale,
              height: 110 * note.scale,
              marginLeft: -(110 * note.scale) / 2,
            }}
            initial={{
              y: -(viewportHeight + 200),
              x: note.driftX,
              rotate: note.rotation + (Math.random() - 0.5) * 220,
              opacity: 0,
            }}
            animate={{ y: -note.finalY, x: 0, rotate: note.rotation, opacity: 1 }}
            transition={{
              delay: note.delay,
              duration: note.duration,
              type: "spring",
              bounce: 0.18,
              damping: 12,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={note.img}
              alt=""
              className="w-full h-full object-contain select-none pointer-events-none"
              style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))" }}
              draggable={false}
            />
          </M>
        ))}

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "85%",
            height: 50,
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)",
          }}
        />
      </div>
    </section>
  );
}