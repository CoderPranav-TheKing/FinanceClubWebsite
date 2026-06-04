import type { Metadata } from "next";
import { Target, BarChart3, Globe, GraduationCap, Briefcase, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Finance Club IIT Bombay",
  description: "Learn about Finance Club IIT Bombay — our mission, activities, and opportunities.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
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

      <div className="divider" />

      {/* Who We Are */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card-glow-gold p-8 sm:p-12">
            <h2 className="text-2xl font-extrabold text-gradient-gold mb-6" style={{ fontFamily: "var(--font-display)" }}>Who We Are</h2>
            <div className="space-y-4 text-cream/35 leading-relaxed">
              <p>
                Finance Club IIT Bombay is the institute&apos;s foremost student body dedicated to finance
                education, research, and industry interaction. A team of passionate students cultivating
                financial literacy and analytical skills across the IITB community.
              </p>
              <p>
                Through competitions, bootcamps, guest lectures, and publications, we provide hands-on
                exposure to real-world finance — from equity research and trading to private equity,
                venture capital, and quantitative finance.
              </p>
              <p>
                Our events attract participation from top institutions across India, and our collaborations
                with leading financial firms create valuable networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-glow" />

      {/* Activities — Bento Grid */}
      <section className="py-24 px-6 lg:px-8 mesh-crimson grain relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-pill badge-crimson mx-auto mb-6">Our Activities</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              What We <span className="text-gradient-crimson">Do</span>
            </h2>
          </div>
          <div className="bento-grid">
            {[
              { icon: Target, title: "Competitions", desc: "Flagship events attracting hundreds from premier institutions.", color: "text-gold" },
              { icon: GraduationCap, title: "Bootcamps", desc: "Intensive sessions on financial modeling, valuation, and trading.", color: "text-crimson-light" },
              { icon: BarChart3, title: "Research", desc: "In-depth research covering equity markets, macro, and sectors.", color: "text-cream" },
              { icon: Briefcase, title: "Industry Connect", desc: "Guest lectures and site visits with industry professionals.", color: "text-gold" },
              { icon: Globe, title: "Publications", desc: "Comprehensive primers, market analysis, and learning pathways.", color: "text-crimson-light" },
              { icon: TrendingUp, title: "Career Prep", desc: "Mock interviews, GDs, and case studies for finance placements.", color: "text-cream" },
            ].map((item) => (
              <div key={item.title} className="group cursor-default hover:bg-[#141010] transition-colors duration-300">
                <item.icon className={`w-6 h-6 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-lg mb-2 text-cream" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                <p className="text-sm text-cream/30 leading-relaxed">{item.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Areas We <span className="text-gradient-gold">Explore</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Equity Research", "Investment Banking", "Private Equity", "Venture Capital",
              "Quantitative Finance", "Derivatives", "Macroeconomics", "Corporate Finance",
              "Fintech", "Sustainable Finance", "Risk Management", "Portfolio Management",
            ].map((area) => (
              <span key={area} className="badge-pill badge-gold text-xs font-normal normal-case tracking-normal">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-glow" />

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 mesh-crimson grain relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gradient-border p-10 sm:p-14 bg-[#0D0A0A]">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Be Part of the <span className="text-gradient-gold">Team</span>
            </h2>
            <p className="text-cream/30 max-w-md mx-auto mb-8">
              Apply to lead initiatives that impact thousands of students.
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
