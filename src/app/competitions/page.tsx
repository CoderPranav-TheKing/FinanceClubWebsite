"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  Calendar,
  Trophy,
  Clock,
  Sparkles,
  GraduationCap,
  Mic,
  Wrench,
  Building2,
  Star,
  Layers,
} from "lucide-react";
import { competitions } from "@/data/competitions";
import {
  clubEvents,
  eventCategories,
  type EventCategory,
} from "@/data/events";
import ScrollReveal from "@/components/ScrollReveal";

const categoryIcons: Record<EventCategory, typeof Trophy> = {
  competitions: Trophy,
  bootcamps: GraduationCap,
  sessions: Mic,
  workshops: Wrench,
  conferences: Building2,
  finfest: Star,
  miscellaneous: Layers,
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<EventCategory | "all">("all");

  const active = competitions.filter((c) => c.status === "active");
  const upcoming = competitions.filter((c) => c.status === "upcoming");
  const past = competitions.filter((c) => c.status === "past");

  const filteredEvents =
    activeTab === "all"
      ? clubEvents
      : clubEvents.filter((e) => e.category === activeTab);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
        <div className="accent-orb-gold top-[10%] left-[10%]" />
        <div className="accent-orb-crimson top-[20%] right-[5%]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="badge-pill badge-gold mb-6">
              <Trophy className="w-3 h-3" /> Events & Competitions
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-gold">Events</span>
            </h1>
            <p className="text-lg text-cream/35 max-w-2xl leading-relaxed">
              From flagship competitions to industry workshops — explore
              everything Finance Club has delivered over the last 2 years.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider" />

      {/* Active Competitions */}
      {active.length > 0 && (
        <section className="py-20 px-6 lg:px-8 mesh-gold">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-gold animate-glow-pulse" />
                <h2
                  className="text-2xl font-bold text-gradient-gold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Active Competitions
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {active.map((comp) => (
                  <div key={comp.id} className="card-glow-gold p-7 group">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="badge-pill badge-gold text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-glow-pulse" />
                          Active
                        </span>
                        {comp.partnerLogo && (
                          <Image
                            src={comp.partnerLogo}
                            alt={comp.partnerName || ""}
                            width={24}
                            height={24}
                            className="object-contain rounded"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-cream/20">
                        <Users className="w-3 h-3" />
                        {comp.maxTeamSize > 1
                          ? `Teams of ${comp.maxTeamSize}`
                          : "Individual"}
                      </div>
                    </div>
                    <h3
                      className="text-xl font-bold mb-2 text-cream group-hover:text-gold transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {comp.name}
                    </h3>
                    <p className="text-sm text-cream/25 mb-5 line-clamp-2 leading-relaxed">
                      {comp.shortDescription}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-cream/20 mb-5">
                      <Calendar className="w-3 h-3 text-gold/40" />
                      Register by{" "}
                      {new Date(comp.registrationDeadline).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </div>
                    <Link
                      href={`/competitions/${comp.slug}`}
                      className="btn-gold w-full text-sm py-2.5 justify-center"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <>
          <div className="divider-glow" />
          <section className="py-20 px-6 lg:px-8 mesh-crimson grain">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-5 h-5 text-crimson-light" />
                  <h2
                    className="text-2xl font-bold text-gradient-crimson"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Upcoming
                  </h2>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.map((comp) => (
                    <div
                      key={comp.id}
                      className="card-glow-crimson p-7 group"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <span className="badge-pill badge-crimson text-[10px]">
                            Upcoming
                          </span>
                          {comp.partnerLogo && (
                            <Image
                              src={comp.partnerLogo}
                              alt={comp.partnerName || ""}
                              width={24}
                              height={24}
                              className="object-contain rounded"
                            />
                          )}
                        </div>
                      </div>
                      <h3
                        className="text-xl font-bold mb-2 text-cream group-hover:text-gold transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {comp.name}
                      </h3>
                      <p className="text-sm text-cream/25 mb-5 line-clamp-2 leading-relaxed">
                        {comp.shortDescription}
                      </p>
                      <Link
                        href={`/competitions/${comp.slug}`}
                        className="btn-ghost w-full text-sm py-2.5 justify-center"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        </>
      )}

      <div className="divider" />

      {/* ===== ALL EVENTS — TABBED ===== */}
      <section className="py-24 px-6 lg:px-8 mesh-gold">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="badge-pill badge-cream mx-auto mb-6">
                <Sparkles className="w-3 h-3" />
                2 Years of Impact
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                All <span className="text-gradient-gold">Events</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              <button
                onClick={() => setActiveTab("all")}
                className={`badge-pill cursor-pointer transition-all ${
                  activeTab === "all" ? "badge-gold" : "badge-cream"
                }`}
              >
                All
              </button>
              {eventCategories.map((cat) => {
                const Icon = categoryIcons[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setActiveTab(
                        cat.id === activeTab ? "all" : cat.id
                      )
                    }
                    className={`badge-pill cursor-pointer transition-all ${
                      activeTab === cat.id ? "badge-gold" : "badge-cream"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Event Cards */}
          <ScrollReveal delay={300}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.map((event) => {
                const CatIcon = categoryIcons[event.category];
                return (
                  <div
                    key={event.id}
                    className="card-premium p-6 group hover:bg-[#141010]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge-pill badge-cream text-[9px] capitalize">
                        <CatIcon className="w-3 h-3" />
                        {event.category}
                      </span>
                      {event.partnerLogo && (
                        <Image
                          src={event.partnerLogo}
                          alt={event.partnerName || ""}
                          width={28}
                          height={28}
                          className="object-contain rounded"
                        />
                      )}
                    </div>
                    <h3
                      className="font-bold text-lg mb-2 text-cream group-hover:text-gold transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {event.name}
                    </h3>
                    <p className="text-xs text-cream/25 leading-relaxed mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-gold/40 font-semibold">
                        {event.participationScale}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-cream/20">
                No events in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Competitions */}
      {past.length > 0 && (
        <>
          <div className="divider" />
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <Trophy className="w-5 h-5 text-cream/20" />
                  <h2
                    className="text-2xl font-bold text-cream/30"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Past Competitions
                  </h2>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {past.map((comp) => (
                    <div
                      key={comp.id}
                      className="card-premium p-6 group opacity-50 hover:opacity-100 transition-opacity"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {comp.partnerLogo && (
                          <Image
                            src={comp.partnerLogo}
                            alt={comp.partnerName || ""}
                            width={20}
                            height={20}
                            className="object-contain rounded"
                          />
                        )}
                        <h3
                          className="font-bold text-cream group-hover:text-gold transition-colors"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {comp.name}
                        </h3>
                      </div>
                      <p className="text-xs text-cream/20 mb-3">
                        {comp.shortDescription}
                      </p>
                      <Link
                        href={`/competitions/${comp.slug}`}
                        className="btn-ghost w-full text-xs py-2 justify-center"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
