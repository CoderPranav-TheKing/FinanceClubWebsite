import type { Metadata } from "next";
import Image from "next/image";
import { Target, BarChart3, Globe, GraduationCap, Briefcase, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import TypewriterAboutTitle from "@/components/TypewriterAboutTitle";
import DomainBubbles from "@/components/DomainBubbles";
export const metadata: Metadata = {
  title: "About — Finance Club IIT Bombay",
  description: "Learn about Finance Club IIT Bombay — our mission, activities, and opportunities.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      {/* <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
        <div className="accent-orb-crimson top-0 right-0" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="badge-pill badge-gold mb-6">About Us</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            About <span className="text-gradient-gold">Finance Club</span>
          </h1>
          <p className="text-lg text-cream/35 max-w-2xl leading-relaxed">
            IIT Bombay&apos;s premier platform for finance education, research, competitions, and industry exposure.
          </p>
        </div>
      </section>

      <div className="divider" /> */}
      {/* Hero */}
<section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 lg:px-8 grain overflow-hidden">
  <div className="absolute inset-0">
    <Image
      src="/aboutus.jpg"
      alt="Finance Club about us background"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  </div>
  <div className="absolute inset-0 bg-black/72" />
  <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(245,183,49,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(27,107,64,0.14),transparent_28%)]" />

  <div className="relative z-10 max-w-4xl mx-auto">
    <div className="backdrop-blur-md bg-black/35 border border-cream/10 rounded-3xl px-8 py-10 sm:px-10 sm:py-12">
      <div className="badge-pill badge-gold mb-6">About Us</div>
      <TypewriterAboutTitle />
    </div>
  </div>
</section>

      {/* Who We Are */}
<section className="py-24 px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <div className="relative overflow-hidden card-glow-gold p-8 sm:p-12">
      <Image
        src="/art4.jpg"
        alt=""
        fill
        className="object-cover opacity-[0.8] pointer-events-none select-none"
        sizes="(max-width: 1024px) 100vw, 900px"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#141010]/90 via-[#141010]/85 to-[#141010]/95 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-6xl font-extrabold text-gradient-gold mb-6" style={{ fontFamily: "var(--font-display)" }}>Who We Are</h2>
        <div className="space-y-4 text-cream/90 leading-relaxed">
          <p className='text-xl'>
            Finance Club IIT Bombay is the institute&apos;s foremost student body dedicated to finance
            education, research and industry interaction. We are a team of passionate students cultivating
            financial literacy and analytical skills across the IITB community.
          </p>
          <p className='text-xl'>
            Through competitions, bootcamps, guest lectures and publications, we provide hands-on
            exposure to real-world finance : from equity research and trading to private equity,
            venture capital and quantitative finance.
          </p>
          <p className='text-xl'>
            Our events bring together an ambitious community of students at IIT Bombay, while our collaborations with leading financial firms create valuable opportunities for networking and industry engagement.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      <div className="divider-glow" />

      {/* Activities — Bento Grid */}
      {/* Activities — Bento Grid */}
<section className="relative py-24 px-6 lg:px-8 grain overflow-hidden">
  <div className="absolute inset-0">
    <Image
      src="/publi.jpg"
      alt=""
      fill
      className="object-cover"
      sizes="100vw"
    />
  </div>
  <div className="absolute inset-0 bg-black/78" />
  <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_top_right,rgba(27,107,64,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(245,183,49,0.1),transparent_35%)]" />

  <div className="relative z-10 max-w-6xl mx-auto">
    <div className="text-center mb-14">
      <div className="badge-pill badge-crimson mx-auto mb-6">Our Activities</div>
      <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
        What We <span className="text-gradient-crimson">Do</span>
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {[
    { icon: Target, title: "Competitions", desc: "Flagship events attracting hundreds from premier institutions.", color: "text-gold" },
    { icon: GraduationCap, title: "Bootcamps", desc: "Intensive sessions on financial modeling, valuation and trading.", color: "text-crimson-light" },
    { icon: BarChart3, title: "Research", desc: "In-depth research covering equity markets, macro and sectors.", color: "text-cream" },
    { icon: Briefcase, title: "Industry Connect", desc: "Guest lectures and site visits with industry professionals.", color: "text-gold" },
    { icon: Globe, title: "Publications", desc: "Comprehensive primers, market analysis and learning pathways.", color: "text-crimson-light" },
    { icon: TrendingUp, title: "Career Prep", desc: "Curated Resources for interviews, GDs and case studies for finance placements.", color: "text-cream" },
  ].map((item) => (
    <div
      key={item.title}
      className="card-premium p-8 group cursor-default hover:bg-[#141010] transition-colors duration-300"
    >
      <item.icon className={`w-6 h-6 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
      <h3 className="font-bold text-2xl mb-2 text-cream" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
      <p className="text-lg text-cream/60 leading-relaxed">{item.desc}</p>
    </div>
  ))}
</div>
  </div>
</section>

      <div className="divider" />

      {/* Finance Domains */}
      <section className="py-24 px-6 lg:px-8 mesh-gold">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-pill badge-cream mx-auto mb-6">Domains</div>
            <h2 className="text-6xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Areas We <span className="text-gradient-gold">Explore</span>
            </h2>
          </div>
          <DomainBubbles />
        </div>
      </section>

      <div className="divider-glow" />

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 mesh-crimson grain relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gradient-border p-10 sm:p-14 bg-[#0D0A0A]">
            <Image
                src="/art3.jpg"
                alt=""
                fill
                className="object-cover opacity-[0.08] pointer-events-none select-none"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            <h2 className="text-5xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Know the <span className="text-gradient-gold">Team</span>
            </h2>
            <p className="text-cream/50 max-w-md mx-auto mb-8 text-xl">
              Faces behind the club - leading initiatives that impact thousands of students.
            </p>
            <Link href="/team" className="btn-gold">
              Meet the Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
