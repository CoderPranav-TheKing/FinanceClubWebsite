"use client";

import { useState } from "react";
import { Search, BookOpen, Video, Link as LinkIcon, FileUp, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { resources, type Resource } from "@/data/resources";

const typeIcons: Record<Resource["type"], typeof BookOpen> = {
  pdf: BookOpen, video: Video, link: LinkIcon, submission: FileUp,
};

const categories = Array.from(new Set(resources.map((r) => r.category)));

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = resources.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
        <div className="accent-orb-gold bottom-0 right-[10%]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="badge-pill badge-cream mb-6">
            <BookOpen className="w-3 h-3" /> Learn & Grow
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-gradient-gold">Resources</span>
          </h1>
          <p className="text-lg text-cream/35 max-w-2xl leading-relaxed mb-10">
            Curated guides, materials, and references built by the team.
          </p>
          <div className="max-w-lg relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/20" />
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 bg-[rgba(20,16,16,0.6)] border-cream/[0.06] focus:border-gold/20 rounded-xl text-sm text-cream placeholder:text-cream/20"
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Content */}
      <section className="py-12 px-6 lg:px-8 mesh-gold">
        <div className="max-w-6xl mx-auto">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={`badge-pill cursor-pointer transition-all ${!activeCategory ? "badge-gold" : "badge-cream"}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`badge-pill cursor-pointer capitalize transition-all ${activeCategory === cat ? "badge-gold" : "badge-cream"}`}
              >
                {cat.replace(/-/g, " ")}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((resource) => {
              const Icon = typeIcons[resource.type];
              return (
                <a key={resource.id} href={resource.url || "#"} target="_blank" rel="noopener noreferrer">
                  <div className="card-glow-gold p-7 group h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" />
                      <span className="badge-pill badge-cream text-[9px]">{resource.category.replace(/-/g, " ")}</span>
                    </div>
                    <h3 className="font-bold mb-2 text-cream group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-display)" }}>{resource.title}</h3>
                    <p className="text-xs text-cream/25 leading-relaxed mb-3">{resource.description}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-gold/30 group-hover:text-gold transition-colors font-semibold uppercase tracking-wider">
                      <ExternalLink className="w-3 h-3" /> Open
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-cream/20">No resources match your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
