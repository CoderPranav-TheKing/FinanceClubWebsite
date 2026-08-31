"use client";
import { useState, useEffect } from "react";
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

// Get current year and month
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec

// Dynamically filter competitions happening this month
const thisMonthItems = competitions
  .filter((comp) => {
    // We can check if any of the major dates fall into the current month and year.
    // Using registrationDeadline or submissionDeadline as a fallback anchor.
    const referenceDateStr = comp.registrationDeadline || comp.submissionDeadline || comp.resultsDate;
    
    if (!referenceDateStr) return false;

    const eventDate = new Date(referenceDateStr);
    return (
      eventDate.getFullYear() === currentYear &&
      eventDate.getMonth() === currentMonth
    );
  })
  .map((comp) => ({
    name: comp.name,
    description: comp.shortDescription || comp.description,
    href: `/competitions/${comp.slug}`,
    status: comp.status // you can pass this along to adjust badges if needed
  }));

function getEventHref(event: {
  id: string;
  name: string;
  category: EventCategory;
}) {
  // Only competition cards have individual pages right now
  if (event.category !== "competitions") {
    return null;
  }

  const aliases: Record<string, string> = {
    "Citadel Trading ID Challenge": "citadel-trader-id",
  };

  // Handle known naming differences first
  if (aliases[event.name]) {
    return `/competitions/${aliases[event.name]}`;
  }

  // Match event names with competition data
  const directMatch = competitions.find(
    (competition) =>
      competition.name.toLowerCase().includes(event.name.toLowerCase()) ||
      event.name.toLowerCase().includes(competition.name.toLowerCase())
  );

  if (directMatch) {
    return `/competitions/${directMatch.slug}`;
  }

  return null;
}

function CompetitionCard({
  title,
  description,
  href,
  badgeLabel,
}: {
  title: string;
  description: string;
  href: string;
  badgeLabel: string;
}) {
  return (
    <Link href={href} className="block h-full">
      <div className="card-premium p-6 group hover:bg-[#141010] h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="badge-pill badge-cream text-[9px] capitalize">
            {badgeLabel}
          </span>
        </div>
        <h3
          className="font-bold text-lg mb-2 text-cream group-hover:text-gold transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <p className="text-lg text-cream/70 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<EventCategory | "all">("all");
  const TYPED_TEXT = "Events";
const TYPE_SPEED_MS = 90;
const PAUSE_BEFORE_PARAGRAPH_MS = 500;

const [typed, setTyped] = useState(0);
const [showParagraph, setShowParagraph] = useState(false);

useEffect(() => {
  if (typed >= TYPED_TEXT.length) {
    const t = setTimeout(() => setShowParagraph(true), PAUSE_BEFORE_PARAGRAPH_MS);
    return () => clearTimeout(t);
  }
  const t = setTimeout(() => setTyped((c) => c + 1), TYPE_SPEED_MS);
  return () => clearTimeout(t);
}, [typed]);

const typingDone = typed >= TYPED_TEXT.length;
  const past = competitions.filter((c) => c.status === "past");

  const filteredEvents =
    activeTab === "all"
      ? clubEvents
      : clubEvents.filter((e) => e.category === activeTab);

  return (
    <div>
      {/* Hero */}
      {/* <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
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

      <div className="divider" /> */}
{/* Hero */}
{/* Hero */}
<section className="relative min-h-screen flex items-center pt-1 pb-20 px-6 lg:px-8 grain overflow-hidden">
  <div className="absolute inset-0">
    <Image
      src="/Finance-Club/partner_1.png"
      alt="Finance Club events collage background"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  </div>
  <div className="absolute inset-0 bg-black/70" />
  <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(circle_at_top_left,rgba(245,183,49,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(27,107,64,0.14),transparent_28%)]" />

  <div className="relative z-10 max-w-4xl mx-auto">
    <ScrollReveal>
      <div className="backdrop-blur-md bg-black/35 border border-cream/10 rounded-3xl px-8 py-10 sm:px-10 sm:py-12">
        <div className="badge-pill badge-gold mb-6">
          <Trophy className="w-3 h-3" /> Events & Competitions
        </div>
        <h1
  className="text-5xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.03em] leading-tight mb-6"
  style={{ fontFamily: "var(--font-display)" }}
>
  <span className="text-gradient-gold">{TYPED_TEXT.slice(0, typed)}</span>
  {!typingDone && (
    <span className="inline-block w-[3px] h-[0.85em] bg-gold ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
  )}
</h1>
<p
  className={`text-2xl text-cream/85 max-w-2xl leading-relaxed transition-opacity duration-700 ${
    showParagraph ? "opacity-100" : "opacity-0"
  }`}
>
  From flagship competitions to industry workshops, explore
  everything Finance Club has delivered over the last 2 years.
</p>
      </div>
    </ScrollReveal>
  </div>
      </section>
      {/* This Month */}
<section className="py-8 px-6 lg:px-8 mesh-gold">
  <div className="max-w-6xl mx-auto">
    <ScrollReveal>
      <div className="flex items-center justify-center gap-3 mb-4 text-center">
        <span className="w-2 h-2 rounded-full bg-gold animate-glow-pulse" />
        <h2
          className="text-3xl font-bold text-gradient-gold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          This Month
        </h2>
      </div>
    </ScrollReveal>
    <ScrollReveal delay={150}>
      {thisMonthItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {thisMonthItems.map((item) => (
            <CompetitionCard
              key={item.name}
              title={item.name}
              description={item.description}
              href={item.href}
              badgeLabel={item.status?.toUpperCase() || "UPCOMING"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-lg text-cream/50">No competitions scheduled for this month.</p>
        </div>
      )}
    </ScrollReveal>
  </div>
</section>

      <div className="divider" />

      {/* ===== ALL EVENTS — TABBED ===== */}
<section className="py-12 px-6 lg:px-8 mesh-gold">
  <div className="max-w-6xl mx-auto">
    <ScrollReveal>
      <div className="relative overflow-hidden rounded-3xl border border-cream/10 mb-12">
        <Image
          src="/Finance-Club/art7.JPG"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-black/78" />
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_top_left,rgba(245,183,49,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(27,107,64,0.14),transparent_32%)]" />

        <div className="relative z-10 py-14 px-6">
          <div className="text-center mb-10">
            <div className="badge-pill badge-cream mx-auto mb-6">
              <Sparkles className="w-3 h-3" />
              2 Years of Impact
            </div>
            <h2
              className="text-5xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All <span className="text-gradient-gold">Events</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
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
                    setActiveTab(cat.id === activeTab ? "all" : cat.id)
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
        </div>
      </div>
    </ScrollReveal>

    {/* Event Cards — unchanged, sits below the boxed panel */}
    <ScrollReveal delay={300}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((event) => {
  const CatIcon = categoryIcons[event.category];
  const href = getEventHref(event);

  const card = (
    <div
      className={`card-premium p-6 group h-full ${
        href
          ? "hover:bg-[#141010] cursor-pointer"
          : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="badge-pill badge-cream text-[9px] capitalize">
          <CatIcon className="w-3 h-3" />
          {event.category}
        </span>

        {event.partnerLogo ? (
          <div className="relative w-10 h-10">
            <Image
              src={event.partnerLogo}
              alt={event.partnerName || "Partner"}
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
        ) : (
          <div />
        )}
      </div>

      <h3
        className={`font-bold text-xl mb-2 text-cream transition-colors ${
          href ? "group-hover:text-gold" : ""
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {event.name}
      </h3>

      <p className="text-lg text-cream/70 leading-relaxed mb-4 line-clamp-3">
        {event.description}
      </p>

      <div className="flex items-center justify-between text-[13px]">
        <span className="text-gold font-semibold">
          {event.participationScale}
        </span>

        {href && (
          <ArrowRight className="w-4 h-4 text-cream/50 group-hover:text-gold transition-colors" />
        )}
      </div>
    </div>
  );

  return href ? (
    <Link key={event.id} href={href} className="block h-full">
      {card}
    </Link>
  ) : (
    <div key={event.id} className="h-full">
      {card}
    </div>
  );
})}
      </div>
    </ScrollReveal>

    {filteredEvents.length === 0 && (
      <div className="text-center py-16">
        <p className="text-cream/20">No events in this category yet.</p>
      </div>
    )}
  </div>
</section>

      {/* Past Competitions
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
      )} */}
    </div>
  );
}
