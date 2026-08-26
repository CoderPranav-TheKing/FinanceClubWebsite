"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "Our Team";
const SPLIT_INDEX = 4; // length of "Our " — where the gold span begins
const TYPE_SPEED_MS = 90;
const PAUSE_BEFORE_PARAGRAPH_MS = 500;

export default function TypewriterTeamTitle() {
  const [typed, setTyped] = useState(0);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    if (typed >= FULL_TEXT.length) {
      const t = setTimeout(() => setShowParagraph(true), PAUSE_BEFORE_PARAGRAPH_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((c) => c + 1), TYPE_SPEED_MS);
    return () => clearTimeout(t);
  }, [typed]);

  const typingDone = typed >= FULL_TEXT.length;
  const visible = FULL_TEXT.slice(0, typed);
  const creamPart = visible.slice(0, Math.min(typed, SPLIT_INDEX));
  const goldPart = visible.slice(SPLIT_INDEX);

  return (
    <>
      <h1
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="text-cream">{creamPart}</span>
        <span className="text-gradient-gold">{goldPart}</span>
        {!typingDone && (
          <span className="inline-block w-[3px] h-[0.85em] bg-gold ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
        )}
      </h1>

      <p
        className={`text-2xl text-cream/85 max-w-2xl leading-relaxed transition-opacity duration-700 ${
          showParagraph ? "opacity-100" : "opacity-0"
        }`}
      >
        The people behind Finance Club IIT Bombay. Reach out for queries,
        collaborations or to connect.
      </p>
    </>
  );
}