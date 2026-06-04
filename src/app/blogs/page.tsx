import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog — Finance Club IIT Bombay",
  description: "Insights and analysis from Finance Club IIT Bombay.",
};

export default function BlogsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
        <div className="accent-orb-crimson top-0 right-0" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="badge-pill badge-crimson mb-6">Insights</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-gradient-crimson">Blog</span>
          </h1>
          <p className="text-lg text-cream/35 max-w-2xl leading-relaxed">
            Insights, analysis, and career guides from Finance Club members.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Blog List */}
      <section className="py-16 px-6 lg:px-8 mesh-crimson">
        <div className="max-w-3xl mx-auto space-y-5">
          {blogPosts.map((post, i) => (
            <Link key={post.id} href={`/blogs/${post.slug}`}>
              <div className={`${i === 0 ? "card-glow-crimson" : "card-premium"} p-7 sm:p-8 group`}>
                {i === 0 && (
                  <div className="badge-pill badge-gold text-[10px] mb-4">
                    <Sparkles className="w-3 h-3" /> Latest
                  </div>
                )}
                <div className="text-[10px] text-cream/15 mb-3 font-medium uppercase tracking-wider">
                  {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  <span className="mx-1.5">·</span>
                  {post.author}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-cream group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {post.title}
                </h2>
                <p className="text-sm text-cream/25 mb-4 leading-relaxed">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-gold/30 group-hover:text-gold transition-colors font-semibold uppercase tracking-wider">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
