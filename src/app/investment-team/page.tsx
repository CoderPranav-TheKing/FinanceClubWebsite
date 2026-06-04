import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  Lightbulb,
  BookOpen,
  FileText,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Investment Team",
  description:
    "Finance Club IIT Bombay's student-run investment initiative — equity research, quantitative finance, and venture capital.",
};

const divisions = [
  {
    icon: BarChart3,
    title: "Equity Research",
    desc: "In-depth fundamental analysis of publicly listed companies — building financial models, industry reports, and investment theses.",
    color: "text-gold",
    glow: "card-glow-gold",
  },
  {
    icon: TrendingUp,
    title: "Quant Finance",
    desc: "Developing quantitative strategies using statistical modelling, algorithmic trading, and systematic risk management.",
    color: "text-crimson-light",
    glow: "card-glow-crimson",
  },
  {
    icon: Lightbulb,
    title: "Venture Capital",
    desc: "Evaluating startup opportunities through market sizing, competitive analysis, and term-sheet structuring.",
    color: "text-cream",
    glow: "card-glow-gold",
  },
];

const blogs = [
  {
    title: "Understanding Factor Investing in Indian Markets",
    link: "#",
  },
  {
    title: "A Deep Dive into India's Fintech Landscape",
    link: "#",
  },
  {
    title: "Quantitative Momentum Strategies: A Primer",
    link: "#",
  },
  {
    title: "IPO Analysis Framework for Retail Investors",
    link: "#",
  },
  {
    title: "ESG Investing in Emerging Markets",
    link: "#",
  },
];

const reports = [
  {
    title: "Sector Report: Indian IT Services 2026",
    link: "#",
  },
  {
    title: "Equity Research: Reliance Industries",
    link: "#",
  },
  {
    title: "Macro Outlook: RBI Policy Impact Analysis",
    link: "#",
  },
  {
    title: "Quant Strategy Backtest: Mean Reversion",
    link: "#",
  },
];

export default function InvestmentTeamPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
        <div className="accent-orb-crimson top-0 right-[10%]" />
        <div className="accent-orb-gold bottom-0 left-[20%]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="badge-pill badge-crimson mb-6">
            <TrendingUp className="w-3 h-3" />
            Investment Team
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Student-Run{" "}
            <span className="text-gradient-crimson">Investment Initiative</span>
          </h1>
          <p className="text-lg text-cream/35 max-w-2xl leading-relaxed">
            A student-driven investment initiative at IIT Bombay, running
            structured research across equity analysis, quantitative finance,
            and venture capital evaluation.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* About */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card-glow-gold p-8 sm:p-12">
            <h2
              className="text-2xl font-extrabold text-gradient-gold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              About the Team
            </h2>
            <div className="space-y-4 text-cream/35 leading-relaxed">
              <p>
                The Investment Team is Finance Club&apos;s dedicated research
                wing — a group of driven students who go beyond coursework to
                develop practical, market-facing skills in finance.
              </p>
              <p>
                Structured into <strong className="text-cream/60">three divisions</strong>
                {" "} — Equity Research, Quant Finance, and Venture Capital — the
                team produces original research, develops quantitative
                strategies, and publishes market analysis that reflects
                professional-grade rigour.
              </p>
              <p>
                With <strong className="text-cream/60">15+ quantitative strategies</strong>{" "}
                developed and a growing body of published work, the Investment
                Team is positioning itself as a serious student-run investment
                initiative.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-glow" />

      {/* Divisions */}
      <section className="py-24 px-6 lg:px-8 mesh-crimson grain">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-pill badge-crimson mx-auto mb-6">
              <Target className="w-3 h-3" />
              Divisions
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Work{" "}
              <span className="text-gradient-crimson">Highlights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {divisions.map((div) => (
              <div key={div.title} className={`${div.glow} p-8 group`}>
                <div
                  className={`w-12 h-12 rounded-xl ${
                    div.color === "text-gold"
                      ? "bg-gold/10"
                      : div.color === "text-crimson-light"
                      ? "bg-crimson/10"
                      : "bg-cream/[0.06]"
                  } flex items-center justify-center mb-5`}
                >
                  <div.icon
                    className={`w-6 h-6 ${div.color} group-hover:scale-110 transition-transform`}
                  />
                </div>
                <h3
                  className="font-bold text-xl mb-3 text-cream"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {div.title}
                </h3>
                <p className="text-sm text-cream/30 leading-relaxed">
                  {div.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
            {[
              { value: "15+", label: "Quantitative Strategies" },
              { value: "3", label: "Structured Divisions" },
              { value: "20+", label: "Research Outputs" },
            ].map((stat) => (
              <div key={stat.label} className="card-premium p-6 text-center">
                <div
                  className="text-2xl font-extrabold text-gold mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-cream/25 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Blog Section */}
      <section className="py-24 px-6 lg:px-8 mesh-gold">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-pill badge-gold mx-auto mb-6">
              <BookOpen className="w-3 h-3" />
              Blog
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Published{" "}
              <span className="text-gradient-gold">Analysis</span>
            </h2>
            <p className="text-cream/25 mt-4 max-w-lg mx-auto">
              Original articles published by team members on Medium.
            </p>
          </div>

          <div className="space-y-3">
            {blogs.map((blog) => (
              <a
                key={blog.title}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card-glow-gold p-5 flex items-center justify-between group mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-gold/60" />
                    </div>
                    <h4 className="font-semibold text-cream group-hover:text-gold transition-colors truncate">
                      {blog.title}
                    </h4>
                  </div>
                  <ExternalLink className="w-4 h-4 text-cream/15 group-hover:text-gold transition-colors shrink-0 ml-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-glow" />

      {/* Reports Section */}
      <section className="py-24 px-6 lg:px-8 mesh-crimson grain">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-pill badge-crimson mx-auto mb-6">
              <FileText className="w-3 h-3" />
              Reports
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Research{" "}
              <span className="text-gradient-crimson">Publications</span>
            </h2>
            <p className="text-cream/25 mt-4 max-w-lg mx-auto">
              Downloadable research reports and strategy papers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reports.map((report) => (
              <a
                key={report.title}
                href={report.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card-glow-crimson p-6 group h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-crimson-light/60" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-cream group-hover:text-gold transition-colors mb-1">
                        {report.title}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] text-gold/30 group-hover:text-gold transition-colors font-semibold uppercase tracking-wider">
                        <ExternalLink className="w-3 h-3" /> Download
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gradient-border p-10 sm:p-14 bg-[#0D0A0A]">
            <Briefcase className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2
              className="text-3xl font-extrabold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Interested in{" "}
              <span className="text-gradient-gold">Joining</span>?
            </h2>
            <p className="text-cream/25 max-w-md mx-auto mb-8 leading-relaxed">
              Applications for the Investment Team open during recruitment
              season. Reach out to learn more.
            </p>
            <Link href="/team" className="btn-gold">
              Contact the Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
