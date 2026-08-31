"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/blogs";

// NOTE:
// Since this page uses "use client" for the typewriter effect,
// Next.js does not allow exporting metadata from this same file.
// Move metadata to layout.tsx if you want to keep it.

export default function BlogsPage() {
  const TYPED_TEXT = "Blog";
  const TYPE_SPEED_MS = 110;
  const PAUSE_BEFORE_PARAGRAPH_MS = 450;

  const [typed, setTyped] = useState(0);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    if (typed >= TYPED_TEXT.length) {
      const timeout = setTimeout(() => {
        setShowParagraph(true);
      }, PAUSE_BEFORE_PARAGRAPH_MS);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setTyped((current) => current + 1);
    }, TYPE_SPEED_MS);

    return () => clearTimeout(timeout);
  }, [typed]);

  const typingDone = typed >= TYPED_TEXT.length;

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center pt-1 pb-20 px-6 lg:px-8 grain overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="../art3.jpg"
            alt="Finance Club blog background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Subtle ambient lighting */}
        <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(circle_at_top_left,rgba(245,183,49,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(27,107,64,0.16),transparent_30%)]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="backdrop-blur-md bg-black/35 border border-cream/10 rounded-3xl px-8 py-10 sm:px-10 sm:py-12">
            
            {/* Badge */}
            <div className="badge-pill badge-gold mb-6">
              <Sparkles className="w-3 h-3" />
              Insights
            </div>

            {/* Typewriter Title */}
            <h1
              className="text-5xl sm:text-8xl lg:text-6xl font-extrabold tracking-[0.03em] leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-gold">
                {TYPED_TEXT.slice(0, typed)}
              </span>

              {!typingDone && (
                <span className="inline-block w-[3px] h-[0.85em] bg-gold ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
              )}
            </h1>

            {/* Description */}
            <p
              className={`text-xl sm:text-3xl text-cream/85 max-w-2xl leading-relaxed transition-opacity duration-700 ${
                showParagraph ? "opacity-100" : "opacity-0"
              }`}
            >
              Insights, analysis and career guides from Finance Club members.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ================= BLOG LIST ================= */}
      <section className="py-16 px-6 lg:px-8 mesh-crimson">
        <div className="max-w-3xl mx-auto space-y-5">
          {blogPosts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="block"
            >
              <div
                className={`${
                  i === 0 ? "card-glow-crimson" : "card-premium"
                } p-7 sm:p-8 group`}
              >
                {/* Latest badge */}
                {i === 0 && (
                  <div className="badge-pill badge-gold text-[10px] mb-4">
                    <Sparkles className="w-3 h-3" />
                    Latest
                  </div>
                )}

                {/* Date and author */}
                <div className="text-[10px] text-cream/25 mb-3 font-medium uppercase tracking-wider">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}

                  <span className="mx-1.5">·</span>

                  {post.author}
                </div>

                {/* Title */}
                <h2
                  className="text-xl sm:text-3xl font-bold mb-3 text-cream group-hover:text-gold transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-lg text-cream/55 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read */}
                <span className="inline-flex items-center gap-1.5 text-[10px] text-gold/40 group-hover:text-gold transition-colors font-semibold uppercase tracking-wider">
                  Read
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}