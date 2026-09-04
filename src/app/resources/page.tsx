"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  BookOpen,
  Video,
  Link as LinkIcon,
  FileUp,
  ExternalLink,
  Map,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { resources, type Resource } from "@/data/resources";
import LearningRoadmap from "@/components/LearningRoadmap";

const typeIcons: Record<Resource["type"], typeof BookOpen> = {
  pdf: BookOpen,
  video: Video,
  link: LinkIcon,
  submission: FileUp,
};

const categories = Array.from(new Set(resources.map((r) => r.category)));

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const TYPED_TEXT = "Resources";
  const TYPE_SPEED_MS = 90;
  const PAUSE_BEFORE_PARAGRAPH_MS = 500;

  const [typed, setTyped] = useState(0);
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    if (typed >= TYPED_TEXT.length) {
      const t = setTimeout(
        () => setShowRest(true),
        PAUSE_BEFORE_PARAGRAPH_MS
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setTyped((c) => c + 1),
      TYPE_SPEED_MS
    );

    return () => clearTimeout(t);
  }, [typed]);

  const typingDone = typed >= TYPED_TEXT.length;

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !activeCategory || r.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 lg:px-8 grain overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Finance-Club/resources123.png"
            alt="Finance Club resources background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/72" />

        <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(circle_at_top_left,rgba(245,183,49,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(27,107,64,0.14),transparent_28%)]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-black/35 border border-cream/10 rounded-3xl px-8 py-10 sm:px-10 sm:py-12">
            <div className="badge-pill badge-cream mb-6">
              <BookOpen className="w-3 h-3" /> Learn & Grow
            </div>

            <h1
              className="text-5xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.02em] leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-gold">
                {TYPED_TEXT.slice(0, typed)}
              </span>

              {!typingDone && (
                <span className="inline-block w-[3px] h-[0.85em] bg-gold ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
              )}
            </h1>

            <div
              className={`transition-opacity duration-700 ${
                showRest ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-2xl lg:text-2xl text-cream/85 max-w-2xl leading-relaxed mb-10">
                Curated guides, materials and references built by the team.
              </p>

              <div className="max-w-lg relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />

                <Input
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-11 h-12 bg-[rgba(20,16,16,0.6)] border-cream/[0.06] focus:border-gold/20 rounded-xl text-sm text-cream placeholder:text-cream/40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 lg:px-8 mesh-gold">
        <div className="max-w-6xl mx-auto">

          {/* Category pills + buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`badge-pill cursor-pointer transition-all ${
                  !activeCategory ? "badge-gold" : "badge-cream"
                }`}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(
                      cat === activeCategory ? null : cat
                    )
                  }
                  className={`badge-pill cursor-pointer capitalize transition-all ${
                    activeCategory === cat
                      ? "badge-gold"
                      : "badge-cream"
                  }`}
                >
                  {cat.replace(/-/g, " ")}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Visit LinkTree */}
              <a
                href="https://lnk.bio/financeclubiitb?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAad8VDflnvILpn-hG6IzoTNmy7myl6HHSHJj33U2Pr_5Pk1NBSFzzctQUHh1BA_aem_tDhea25hvZb_lFLwLLQc5A"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-5 py-2.5
                  rounded-full
                  bg-gold
                  text-[#0D0A0A]
                  border border-gold
                  font-bold
                  text-sm
                  tracking-wide
                  shadow-[0_0_20px_rgba(245,183,49,0.35)]
                  hover:shadow-[0_0_30px_rgba(245,183,49,0.65)]
                  hover:scale-105
                  transition-all duration-300
                  cursor-pointer
                "
              >
                <LinkIcon className="w-4 h-4" />
                Visit LinkTree
              </a>

              {/* View FinLearn Roadmap */}
              <a
                href="#finlearn-roadmap"
                className="
                  inline-flex items-center gap-2
                  px-5 py-2.5
                  rounded-full
                  bg-gold
                  text-[#0D0A0A]
                  border border-gold
                  font-bold
                  text-sm
                  tracking-wide
                  shadow-[0_0_20px_rgba(245,183,49,0.35)]
                  hover:shadow-[0_0_30px_rgba(245,183,49,0.65)]
                  hover:scale-105
                  transition-all duration-300
                  cursor-pointer
                "
              >
                <Map className="w-4 h-4" />
                View FinLearn Roadmap
              </a>

            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((resource) => {
              const Icon = typeIcons[resource.type];

              return (
                <a
                  key={resource.id}
                  href={resource.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="card-glow-gold p-7 group h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" />

                      <span className="badge-pill badge-cream text-[9px]">
                        {resource.category.replace(/-/g, " ")}
                      </span>
                    </div>

                    <h3
                      className="font-bold mb-2 text-cream group-hover:text-gold transition-colors text-lg"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {resource.title}
                    </h3>

                    <p className="text-s text-cream/65 leading-relaxed mb-3">
                      {resource.description}
                    </p>

                    <span className="inline-flex items-center gap-1 text-[10px] text-gold/30 group-hover:text-gold transition-colors font-semibold uppercase tracking-wider">
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-cream/20">
                No resources match your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FinLearn Roadmap */}
      <section
        id="finlearn-roadmap"
        className="py-12 px-6 lg:px-8 relative mesh-crimson grain overflow-hidden"
      >
        <div className="accent-orb-gold top-[10%] left-[8%]" />
        <div className="accent-orb-crimson bottom-[10%] right-[10%]" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="relative overflow-hidden backdrop-blur-md border border-cream/10 rounded-3xl px-8 py-10 sm:px-12 sm:py-12 inline-block mb-14">
            <Image
              src="/Finance-Club/art8.JPG"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />

            <div className="absolute inset-0 bg-black/90" />

            <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_top_left,rgba(27,107,64,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(245,183,49,0.12),transparent_32%)]" />

            <div className="relative z-10">
              <div className="badge-pill badge-crimson mx-auto mb-6">
                Learning Roadmap
              </div>

              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-[0.02em] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Finance Learning{" "}
                <span className="text-gradient-crimson">
                  Roadmap
                </span>
              </h2>

              <p className="text-cream/80 max-w-2xl mx-auto text-xl">
                A curated path for students starting out in finance - from
                market basics to placement-ready technicals and the CFA
                track. Click any sector to explore.
              </p>
            </div>
          </div>

          <LearningRoadmap />
        </div>
      </section>
    </div>
  );
}