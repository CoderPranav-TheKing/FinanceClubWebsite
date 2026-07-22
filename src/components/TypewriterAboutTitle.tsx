"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "About Finance Club";
const SPLIT_INDEX = 6; // length of "About " — where the gold span begins
const TYPE_SPEED_MS = 70;
const PAUSE_BEFORE_PARAGRAPH_MS = 1000;

export default function TypewriterAboutTitle() {
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
  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.0em] leading-tight mb-6"
  style={{ fontFamily: "var(--font-display)" }}
>
        <span className="text-cream">{creamPart}</span>
        <span className="text-gradient-gold">{goldPart}</span>
        {!typingDone && (
          <span className="inline-block w-[3px] h-[0.85em] bg-gold ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
        )}
      </h1>

      <p
        className={`text-xl text-cream/85 max-w-2xl leading-relaxed transition-opacity duration-700 ${
          showParagraph ? "opacity-100" : "opacity-0"
        }`}
      >
        IIT Bombay&apos;s premier platform for finance education, research,
        competitions and industry exposure.
      </p>
    </>
  );
}