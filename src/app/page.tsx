"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LogoCarousel from "@/components/LogoCarousel";
import HeroMoneyPile from "@/components/HeroMoneyPile";
import FinanceWheel from "@/components/FinanceWheel";
import Image from "next/image";
import {
  ArrowRight,
  Trophy,
  BookOpen,
  Users,
  Lightbulb,
  Calendar,
  FileText,
  Video,
  Award,
  ChevronRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Building2,
} from "lucide-react";
import { sponsors } from "@/data/sponsors";
import { competitions } from "@/data/competitions";
import { blogPosts } from "@/data/blogs";
import ScrollReveal from "@/components/ScrollReveal";
import RoadmapTimeline from "@/components/competitions/RoadmapTimeline";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function HomePage() {
  const activeCompetitions = competitions.filter(
    (c) => c.status === "active" || c.status === "upcoming"
  );
  const latestBlogs = blogPosts.slice(0, 3);

   const REAL = "Finance Club";
  const REAL_SPLIT = 7; 
  const LINE2 = "IIT BOMBAY";

    const TYPE_SPEED = typeof window !== "undefined" && window.innerWidth < 640 ? 10 : 30;
  const TYPE_SPEED_LINE1 = typeof window !== "undefined" && window.innerWidth < 640 ? 6 : 30;
  const PAUSE_BEFORE_LINE2 = 300;
  const PAUSE_BEFORE_REST = 1000;

  // Phases: "type2" -> "line2" -> "done"
  const [phase, setPhase] = useState("type2");
  const [typedReal, setTypedReal] = useState(0);
  const [typedLine2, setTypedLine2] = useState(0);
  const [showRest, setShowRest] = useState(false);

  // Phase 1: Type "Finance Club"

  // Phase 3: Type "Finance Club"
    useEffect(() => {
    if (phase !== "type2") return;
    if (typedReal < REAL.length) {
      const t = setTimeout(() => setTypedReal((c) => c + 1), TYPE_SPEED_LINE1);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("line2"), PAUSE_BEFORE_LINE2);
    return () => clearTimeout(t);
  }, [phase, typedReal]);

  // Phase 4: Type "IIT BOMBAY" and unlock the rest of the page
  // Phase 4: Type "IIT BOMBAY", then pause before revealing the rest
useEffect(() => {
  if (phase !== "line2") return;

  if (typedLine2 < LINE2.length) {
    const t = setTimeout(
      () => setTypedLine2((c) => c + 1),
      TYPE_SPEED
    );

    return () => clearTimeout(t);
  }

  // Give the completed title some breathing room
  const t = setTimeout(() => {
    setPhase("done");
    setShowRest(true);
  }, PAUSE_BEFORE_REST);

  return () => clearTimeout(t);
}, [phase, typedLine2]);

    const line1Done = phase === "type2" || phase === "line2" || phase === "done";
  const line2Done = typedLine2 >= LINE2.length;

  return (
    <>
      <div>
        {/* ===== HERO — FULL SCREEN IMAGE ===== */}
        {/* ===== HERO — FULL SCREEN IMAGE ===== */}
<section className="relative min-h-0 lg:min-h-screen w-full flex items-start overflow-hidden">  {/* Background Image Container */}
  <div className="absolute inset-0 w-full h-full">
    <Image
      src="/Finance-Club/bg1.png"
      alt="Finance Club IIT Bombay"
      fill
      className="object-cover"
      priority
      sizes="100vw"
      quality={90}
    />
    <div className="hero-image-overlay" />
    <div
      className="absolute inset-0 z-[2] pointer-events-none"
      style={{
        background:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
        opacity: 0.35,
      }}
    />
    <div className="accent-orb-gold top-[10%] right-[5%] z-[2]" />
    <div className="accent-orb-crimson bottom-[15%] left-[5%] z-[2]" style={{ animationDelay: "1.5s" }} />
  </div>

  {/* Content Layer */}
  <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-24 sm:pt-32 pb-10 lg:pb-16 xl:-translate-x-10">
    {/* Badge */}
<div className="badge-pill badge-gold mb-5 sm:mb-8 text-xs sm:text-sm lg:text-base px-3 py-1 sm:px-3.5 sm:py-1.5 lg:px-4 whitespace-nowrap">
  <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"/>
  IIT Bombay&apos;s Premier Finance Society
</div>

    {/* Main Headline */}
    <h1
      className="whitespace-normal sm:whitespace-nowrap font-extrabold tracking-[0.03em] sm:tracking-[0.08em] leading-[1.2]  mb-4 sm:mb-6 select-none pt-2 sm:pt-3"
      style={{
  fontFamily: "var(--font-rocksalt)",
  fontSize: "clamp(3.8rem, 7.5vw, 9rem)",
}}
    >
          <span 
  className="inline-block w-full min-h-[2.4em] sm:min-h-[1.2em] align-top"
>
                    <span className="text-gradient-gold" style={{ willChange: "contents" }}>
              {REAL.slice(0, Math.min(typedReal, REAL_SPLIT))}
            </span>
        <span className="text-cream">
          {REAL.slice(REAL_SPLIT, typedReal)}
        </span>
        {!line1Done && (
          <span className="inline-block w-[4px] h-[0.85em] bg-gold ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
        )}
      </span>

      <br />
            <span
        className="text-cream/60 font-semibold tracking-wider block mt-1 sm:mt-0 pt-8 sm:pt-2 min-h-[1.2em] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
        }}
      >
        {LINE2.slice(0, typedLine2)}
        {line1Done && !line2Done && (
          <span className="inline-block w-[3px] h-[0.75em] bg-cream/40 ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
        )}
      </span>
    </h1>

     <div
      aria-hidden={!showRest}
      className={`transition-all duration-700 ease-out ${
        showRest
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Paragraph */}
      <p className="text-lg sm:text-3xl lg:text-2xl text-cream/90 sm:text-cream/80 max-w-2xl mb-6 sm:mb-10 leading-relaxed font-normal">
        Building structured pathways into finance careers through
        world-class competitions, research and industry exposure.
      </p>

      {/* ===== ALIGNED METRICS & ACTIONS ROW ===== */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 max-w-15xl pt-10">
        {/* Glass Stats Grid Box */}
        <div className="backdrop-blur-md bg-black/30 border border-cream/10 rounded-2xl py-4 sm:py-6 grid grid-cols-3 divide-x divide-cream/10 w-full lg:w-auto lg:min-w-[500px] shrink-0">
          {[
            { value: "15+", label: "Events Annually" },
            { value: "2000+", label: "Registrations" },
            { value: "8+", label: "Industry Partners" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-1.5 sm:px-4">
              <div
                className="text-2xl sm:text-3xl font-extrabold text-gold mb-0.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-[9px] sm:text-xs text-cream/50 uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons: Side-by-side compact on mobile, original layout on desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-start lg:justify-end w-full lg:w-auto lg:pb-1 lg:pr-2 lg:px-85">
          <Link href="/competitions" className="btn-gold w-full sm:flex-initial text-center justify-center whitespace-nowrap text-xs sm:text-base py-2.5 sm:py-3.5 px-4 sm:px-8">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Explore Competitions</span>
          </Link>
          <Link href="/resources" className="btn-ghost w-full sm:flex-initial text-center justify-center whitespace-nowrap text-xs sm:text-base py-2.5 sm:py-3.5 px-4 sm:px-8">
            <span>View Resources</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
        {/* ===== WHAT WE DO — WHEEL ===== */}
        <section className="py-10 px-6 lg:px-8 relative mesh-gold overflow-hidden">
          <div className="accent-orb-gold top-[10%] left-[5%]" />
          <div className="accent-orb-crimson bottom-[10%] right-[8%]" />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <ScrollReveal>
                <div className="badge-pill badge-gold mb-6 mx-auto">
                  What We Do
                </div>
                <h2
                  className="text-4xl sm:text-4xl lg:text-5xl font-extrabold tracking-[0.02em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Building{" "}
                  <span className="text-gradient-gold">Finance Acumen</span>
                </h2>
                <p className="text-cream/35 mt-5 text-lg sm:text-xl lg:text-2xl lg:leading-relaxed max-w-4xl mx-auto text-center sm:text-center">
                  From flagship competitions to published research - structured
                  pathways across every major finance discipline. Hover over any
                  sector to explore what it covers.
                </p>
            </ScrollReveal>
              
            <ScrollReveal delay={200}>
              <div className="mt-15 sm:mt-28 pb-25">
                <FinanceWheel />
              </div>
            </ScrollReveal>
          </div>
        </section>
         <section className="py-10 px-6 lg:px-8 relative mesh-gold overflow-hidden">


          {/* ===== IMPACT / SCALE ===== */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-cream/10">
              <Image
                src="/Finance-Club/art5.JPG"
                alt=""
                fill
                className="object-cover opacity-[0.8] pointer-events-none select-none"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#141010]/90 via-[#141010]/85 to-[#141010]/95 pointer-events-none" />

              <ScrollReveal>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-12 pb-12 px-6 sm:px-12">
                  <div>
                    <div className="badge-pill badge-gold mb-6">
                      <Zap className="w-3 h-3" />
                      Our Impact
                    </div>
                    <h2
                      className="text-4xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Scale That <span className="text-gradient-gold">Matters</span>
                    </h2>
                    <p className="text-cream/60 mt-5 text-base sm:text-xl lg:text-2xl lg:leading-relaxed max-w-md">
                      Year after year, our events and initiatives reach hundreds of
                      students and connect them with leading financial firms.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "15+", label: "Events Annually", icon: Calendar, glow: "card-glow-gold" },
                      { value: "2000+", label: "Registrations", icon: Users, glow: "card-glow-crimson" },
                      { value: "8+", label: "Industry Partners", icon: Building2, glow: "card-glow-gold" },
                      { value: "20+", label: "Sessions and Workshops", icon: TrendingUp, glow: "card-glow-crimson" },
                    ].map((stat) => (
                      <div key={stat.label} className={`${stat.glow} p-6 text-center`}>
                        <stat.icon className="w-6 h-6 text-gold/60 mx-auto mb-3" />
                        <div
                          className="text-2xl lg:text-3xl font-extrabold text-cream mb-1"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          <AnimatedCounter value={stat.value} />
                        </div>
                        <div className="text-xs lg:text-lg text-cream/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        

          {/* ===== FEATURED COMPETITIONS — ROADMAP ===== */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <div className="lg:col-span-4">
        <div className="badge-pill badge-gold mb-6">Competitions</div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-[0.02em] leading-[1.35]" style={{ fontFamily: "var(--font-display)" }}>
          Compete Against the <span className="text-gradient-gold">Best Minds</span>
        </h2>
        <p className="text-cream/35 mb-6 text-xl">
          Our flagship competitions create a structured pathway into finance throughout the academic year.
        </p>
        <Link href="/competitions" className="btn-crimson inline-flex items-center gap-2">
          View All Competitions
        </Link>
      </div>

      <div className="lg:col-span-8">
        <div className="card-premium p-4 sm:p-6 rounded-2xl border border-cream/10">
          <div className="relative">
            <ScrollReveal>
              {/* Height is dynamic (auto) on mobile, fixed on desktop */}
              <div className="h-auto md:h-[420px] lg:h-[520px]">
                <RoadmapTimeline />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  </div>
          </section>

          <div className="divider-glow" />

          {/* ===== PARTNERS HIGHLIGHT ===== */}
          <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0">
              <div className="relative col-span-1 row-span-2">
                <Image src="/Finance-Club/partner_3.jpeg" alt="" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative col-span-1 row-span-1">
                <Image src="/Finance-Club/finfestpubli.jpg" alt="" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative col-span-1 row-span-1">
                <Image src="/Finance-Club/publi.jpg" alt="" fill className="object-cover" sizes="50vw" />
              </div>
            </div>

            <div className="absolute inset-0 bg-black/82" />
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(245,183,49,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(27,107,64,0.14),transparent_28%)]" />

            <div className="relative z-10 max-w-[1300px] mx-auto">
              <ScrollReveal>
                <div className="backdrop-blur-md bg-black/50 border border-cream/10 rounded-3xl px-8 py-10 sm:px-12 sm:py-14">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
                    <div>
                      <div className="badge-pill badge-cream mb-6">
                        <Building2 className="w-3 h-3" />
                        Our Partners
                      </div>
                      <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Industry{" "}
                        <span className="text-gradient-gold">Collaborators</span>
                      </h2>
                    </div>
                    <Link href="/sponsors" className="btn-gold shrink-0">
                      Partner With Us <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <LogoCarousel />
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ===== LATEST BLOGS ===== */}
          <section className="relative py-16 px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0">
              <div className="relative col-span-1 row-span-2">
                <Image src="/Finance-Club/publi.jpg" alt="" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative col-span-1 row-span-1">
                <Image src="/Finance-Club/finfestpubli.jpg" alt="" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative col-span-1 row-span-1">
                <Image src="/Finance-Club/partner_3.jpeg" alt="" fill className="object-cover" sizes="50vw" />
              </div>
            </div>

            <div className="absolute inset-0 bg-black/82" />
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(27,107,64,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,183,49,0.12),transparent_28%)]" />

            <div className="relative z-10 max-w-[1300px] mx-auto">
              <ScrollReveal>
                <div className="backdrop-blur-md bg-black/50 border border-cream/10 rounded-3xl px-8 py-10 sm:px-12 sm:py-14">
                  <div className="flex items-end justify-between mb-14">
                    <div>
                      <div className="badge-pill badge-crimson mb-6">Insights</div>
                      <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Latest from the{" "}
                        <span className="text-gradient-crimson">Blog</span>
                      </h2>
                    </div>
                    <Link
                      href="/blogs"
                      className="hidden sm:flex btn-ghost text-sm py-2.5 px-5"
                    >
                      All Posts <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {latestBlogs.map((post, i) => (
                      <Link key={post.id} href={`/blogs/${post.slug}`}>
                        <div
                          className={`${
                            i === 0 ? "card-glow-crimson" : "card-premium"
                          } p-7 group h-full`}
                        >
                          <div className="text-[10px] text-cream/20 mb-3 font-medium uppercase tracking-wider">
                            {new Date(post.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                            <span className="mx-1.5">·</span>
                          </div>
                          <h3
                            className="font-bold text-xl mb-3 text-cream group-hover:text-gold transition-colors"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {post.title}
                          </h3>
                          <p className="text-lg text-cream/25 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs text-gold/40 mt-5 group-hover:text-gold transition-colors font-semibold uppercase tracking-wider">
                            Read <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <div className="divider" />

        {/* ===== CTA ===== */}
        <section className="py-32 px-6 lg:px-8 mesh-crimson grain relative">
          <div className="accent-orb-gold top-0 left-1/4" />
          <div className="accent-orb-crimson bottom-0 right-1/4" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="gradient-border relative overflow-hidden p-10 sm:p-16 bg-[#0D0A0A]">
                <Image
                  src="/Finance-Club/art2.JPG"
                  alt=""
                  fill
                  className="object-cover opacity-[0.08] pointer-events-none select-none"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-[#0D0A0A]/85 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <div className="badge-pill badge-gold mx-auto mb-6">
                    Join the Community
                  </div>
                  <h2
                    className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Ready to{" "}
                    <span className="text-gradient-gold">Level Up</span>?
                  </h2>
                  <p className="text-cream/50 max-w-3xl mx-auto mb-10 leading-relaxed text-lg lg:text-xl">
                    Compete in flagship events, access curated resources and be
                    part of IIT Bombay&apos;s most active finance community.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="/competitions" className="btn-gold">
                      <Trophy className="w-4 h-4" /> Competitions
                    </Link>
                    <Link href="/team" className="btn-crimson">
                      Meet the Team
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}