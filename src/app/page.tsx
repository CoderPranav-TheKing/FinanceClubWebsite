"use client";

import Link from "next/link";
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

export default function HomePage() {
  const activeCompetitions = competitions.filter(
    (c) => c.status === "active" || c.status === "upcoming"
  );
  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <div>
      {/* ===== HERO — FULL SCREEN IMAGE ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/bg1.png"
          alt="Finance Club IIT Bombay"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Dark overlay */}
        <div className="hero-image-overlay" />
        {/* Grain */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            opacity: 0.35,
          }}
        />

        {/* Accent orbs */}
        <div className="accent-orb-gold top-[10%] right-[5%] z-[2]" />
        <div
          className="accent-orb-crimson bottom-[15%] left-[5%] z-[2]"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
          <div className="max-w-3xl animate-slide-up">
            <div className="badge-pill badge-gold mb-8">
              <Sparkles className="w-3 h-3" />
              IIT Bombay&apos;s Premier Finance Society
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-gold">Finance</span>{" "}
              <span className="text-cream">Club</span>
              <br />
              <span className="text-cream/40 text-4xl sm:text-5xl lg:text-6xl">
                IIT Bombay
              </span>
            </h1>

            <p className="text-base sm:text-lg text-cream/50 max-w-lg mb-10 leading-relaxed">
              Building structured pathways into finance careers through
              world-class competitions, research, and industry exposure.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/competitions" className="btn-gold">
                <Trophy className="w-4 h-4" />
                Explore Competitions
              </Link>
              <Link href="/resources" className="btn-ghost">
                View Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats strip */}
            <div className="flex items-center gap-8 mt-16 pt-8 border-t border-cream/[0.06]">
              {[
                { value: "15+", label: "Events Annually" },
                { value: "800+", label: "Registrations" },
                { value: "8+", label: "Industry Partners" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-extrabold text-gold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-cream/30 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ===== WHAT WE DO — BENTO GRID ===== */}
      <section className="py-32 px-6 lg:px-8 relative mesh-gold">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge-pill badge-crimson mx-auto mb-6">
                What We Do
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Building{" "}
                <span className="text-gradient-crimson">Finance Acumen</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bento-grid">
              {[
                {
                  icon: Trophy,
                  title: "Competitions",
                  desc: "Flagship events like ERC and FinSearch testing real-world finance skills against top institutions.",
                  color: "text-gold",
                },
                {
                  icon: Users,
                  title: "Sessions & Bootcamps",
                  desc: "Intensive workshops on financial modeling, valuation, and trading strategies.",
                  color: "text-crimson-light",
                },
                {
                  icon: Lightbulb,
                  title: "Research",
                  desc: "Deep-dive initiatives covering equity, macro, and alternative investment analysis.",
                  color: "text-cream",
                },
                {
                  icon: BookOpen,
                  title: "Publications",
                  desc: "Market reports, sector analysis, and curated primers for every finance domain.",
                  color: "text-gold",
                },
                {
                  icon: BarChart3,
                  title: "Industry Connect",
                  desc: "Guest lectures and sessions with professionals from leading financial firms.",
                  color: "text-crimson-light",
                },
                {
                  icon: Award,
                  title: "Career Prep",
                  desc: "Mock interviews, case studies, and placement guidance for finance roles.",
                  color: "text-cream",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group cursor-default hover:bg-[#141010] transition-colors duration-300 relative"
                >
                  <item.icon
                    className={`w-6 h-6 ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <h3
                    className="font-bold text-lg mb-2 text-cream"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream/35 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider-glow" />

      {/* ===== IMPACT / SCALE ===== */}
      <section className="py-32 px-6 lg:px-8 relative mesh-crimson grain">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge-pill badge-gold mx-auto mb-6">
                <Zap className="w-3 h-3" />
                Our Impact
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Scale That <span className="text-gradient-gold">Matters</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  value: "15+",
                  label: "Events Annually",
                  icon: Calendar,
                  glow: "card-glow-gold",
                },
                {
                  value: "800+",
                  label: "Registrations",
                  icon: Users,
                  glow: "card-glow-crimson",
                },
                {
                  value: "8+",
                  label: "Industry Partners",
                  icon: Building2,
                  glow: "card-glow-gold",
                },
                {
                  value: "15+",
                  label: "Quant Strategies",
                  icon: TrendingUp,
                  glow: "card-glow-crimson",
                },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.glow} p-8 text-center`}>
                  <stat.icon className="w-7 h-7 text-gold/60 mx-auto mb-4" />
                  <div
                    className="text-4xl font-extrabold text-cream mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-cream/30">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider" />

      {/* ===== FEATURED COMPETITIONS ===== */}
      <section className="py-32 px-6 lg:px-8 relative mesh-gold grain">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <ScrollReveal>
              <div className="badge-pill badge-gold mb-6">
                <Trophy className="w-3 h-3" /> Competitions
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Compete Against the{" "}
                <span className="text-gradient-gold">Best Minds</span>
              </h2>
              <p className="text-cream/35 mb-8 leading-relaxed max-w-md text-lg">
                Our flagship competitions attract top talent from premier
                institutions across the country.
              </p>
              <Link href="/competitions" className="btn-crimson">
                All Competitions <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>

            {/* Right — Comp cards */}
            <ScrollReveal delay={300}>
              <div className="space-y-4">
                {activeCompetitions.slice(0, 4).map((comp) => (
                  <Link key={comp.id} href={`/competitions/${comp.slug}`}>
                    <div className="card-glow-gold p-6 flex items-center justify-between group mb-4">
                      <div className="flex items-center gap-4 min-w-0">
                        {comp.partnerLogo && (
                          <Image
                            src={comp.partnerLogo}
                            alt={comp.partnerName || ""}
                            width={32}
                            height={32}
                            className="object-contain shrink-0 rounded"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                                comp.status === "active"
                                  ? "text-gold"
                                  : "text-cream/30"
                              }`}
                            >
                              {comp.status === "active" && (
                                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-glow-pulse" />
                              )}
                              {comp.status}
                            </span>
                          </div>
                          <h4
                            className="font-bold text-cream group-hover:text-gold transition-colors truncate"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {comp.name}
                          </h4>
                          <p className="text-xs text-cream/25 mt-1 line-clamp-1">
                            {comp.shortDescription}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-cream/15 group-hover:text-gold transition-colors shrink-0 ml-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="divider-glow" />

      {/* ===== INVESTMENT TEAM HIGHLIGHT ===== */}
      <section className="py-32 px-6 lg:px-8 relative mesh-crimson grain">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="badge-pill badge-crimson mb-6">
                  <TrendingUp className="w-3 h-3" />
                  Investment Team
                </div>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Student-Run{" "}
                  <span className="text-gradient-crimson">
                    Investment Initiative
                  </span>
                </h2>
                <p className="text-cream/35 mb-6 leading-relaxed text-lg">
                  Our Investment Team runs structured research across equity,
                  quantitative finance, and venture capital — developing 15+
                  strategies and publishing market-leading analysis.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Equity Research", "Quant Finance", "Venture Capital"].map(
                    (div) => (
                      <span
                        key={div}
                        className="badge-pill badge-gold text-xs font-normal normal-case tracking-normal"
                      >
                        {div}
                      </span>
                    )
                  )}
                </div>
                <Link href="/investment-team" className="btn-gold">
                  Explore Investment Team{" "}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "15+", label: "Quantitative Strategies" },
                  { value: "3", label: "Structured Divisions" },
                  { value: "20+", label: "Research Reports" },
                  { value: "5+", label: "Blog Publications" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="card-glow-crimson p-6 text-center"
                  >
                    <div
                      className="text-3xl font-extrabold text-cream mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-cream/25">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider" />

      {/* ===== PARTNERS HIGHLIGHT — LOGO GRID + GALLERY ===== */}
      <section className="py-32 px-6 lg:px-8 relative mesh-gold">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge-pill badge-cream mx-auto mb-6">
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
          </ScrollReveal>

          {/* Logo Grid */}
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
              {sponsors.map((s) => (
                <div key={s.id} className="partner-logo-card">
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={100}
                    height={50}
                    className="object-contain max-h-12"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Gallery */}
          <ScrollReveal delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="gallery-image relative h-64 md:h-80">
                <Image
                  src="/finfestpubli.jpg"
                  alt="FinFest audience at Finance Club events"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="gallery-image relative h-64 md:h-80">
                <Image
                  src="/publi.jpg"
                  alt="Event audience at Finance Club sessions"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <Link href="/sponsors" className="btn-gold">
                Partner With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider-glow" />

      {/* ===== LATEST BLOGS ===== */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
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
          </ScrollReveal>

          <ScrollReveal delay={200}>
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
                      {post.author}
                    </div>
                    <h3
                      className="font-bold text-lg mb-3 text-cream group-hover:text-gold transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-sm text-cream/25 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-gold/40 mt-5 group-hover:text-gold transition-colors font-semibold uppercase tracking-wider">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
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
            <div className="gradient-border p-10 sm:p-16 bg-[#0D0A0A]">
              <div className="badge-pill badge-gold mx-auto mb-6">
                Join the Community
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to{" "}
                <span className="text-gradient-gold">Level Up</span>?
              </h2>
              <p className="text-cream/30 max-w-md mx-auto mb-10 leading-relaxed">
                Compete in flagship events, access curated resources, and be
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
