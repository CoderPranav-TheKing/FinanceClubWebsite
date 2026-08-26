import { notFound } from "next/navigation";
import Link from "next/link";

import { ArrowLeft, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/data/blogs";


type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}


export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}


export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-[#0D0A0A] text-cream">

      {/* ==================== HERO / BANNER ==================== */}
      <section className="pt-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(245,183,49,0.18)] bg-[linear-gradient(115deg,#20150e_0%,#342013_45%,#17100d_100%)] min-h-[340px] sm:min-h-[400px]">

            {/* Subtle ambient glow */}
            <div className="absolute top-0 left-[18%] w-[500px] h-[500px] rounded-full bg-gold/[0.07] blur-[140px]" />

            {/* Decorative lines */}
            <div className="absolute inset-y-0 left-[35%] w-px bg-[rgba(245,230,208,0.04)]" />
            <div className="absolute inset-x-0 bottom-[28%] h-px bg-[rgba(245,230,208,0.04)]" />

            {/* Back button */}
            {/* Back button */}
<Link
  href="/blogs"
  className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 pointer-events-auto inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/[0.08] px-4 py-2 text-sm text-cream/60 transition-all duration-300 hover:border-[rgba(245,183,49,0.25)] hover:bg-white/[0.04] hover:text-cream"
>
  <ArrowLeft className="w-4 h-4" />
  <span>Back to Blog</span>
</Link>


            {/* Hero content */}
            <div className="relative z-10 flex min-h-[340px] sm:min-h-[400px] items-end p-7 sm:p-12 lg:p-16">

              <div className="max-w-4xl">

                {/* Blog label */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,183,49,0.22)] bg-[rgba(245,183,49,0.07)] px-4 py-2 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(245,183,49,0.7)]" />

                  <span
                    className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-gold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Finance Club Insights
                  </span>
                </div>


                {/* Title */}
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-[#FFF8EC]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h1>


                {/* Metadata */}
                <div className="flex items-center gap-3 mt-7 text-sm text-cream/60">

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold" />

                    <span>{formattedDate}</span>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== ARTICLE CONTENT ==================== */}
      <article className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-24">

        {/* Article intro / excerpt */}
        <p
          className="max-w-4xl text-xl sm:text-2xl leading-relaxed text-cream/75 mb-12"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {post.excerpt}
        </p>


        <Separator className="bg-[rgba(245,183,49,0.12)] mb-12" />


        {/* Main content */}
        <div className="max-w-4xl blog-content">

          {post.content.split("\n").map((line, i) => {
            const trimmedLine = line.trim();

            /* H2 */
            if (trimmedLine.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-2xl sm:text-3xl font-bold text-[#FFF8EC] mt-14 mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {trimmedLine.replace("## ", "")}
                </h2>
              );
            }


            /* Bullet points */
            if (trimmedLine.startsWith("- ")) {
              return (
                <div
                  key={i}
                  className="flex gap-3 text-base sm:text-lg leading-relaxed text-cream/70 mb-3"
                >
                  <span className="text-gold mt-[0.1em]">•</span>

                  <span>
                    {trimmedLine.replace("- ", "")}
                  </span>
                </div>
              );
            }


            /* Numbered list */
            if (/^\d+\.\s/.test(trimmedLine)) {
              const number = trimmedLine.match(/^(\d+)\./)?.[1];
              const text = trimmedLine.replace(/^\d+\.\s/, "");

              return (
                <div
                  key={i}
                  className="flex gap-4 text-base sm:text-lg leading-relaxed text-cream/70 mb-4"
                >
                  <span className="text-gold font-semibold min-w-6">
                    {number}.
                  </span>

                  <span>{renderBoldText(text)}</span>
                </div>
              );
            }


            /* Italic/emphasis line */
            if (
              trimmedLine.startsWith("*") &&
              trimmedLine.endsWith("*") &&
              !trimmedLine.startsWith("**")
            ) {
              return (
                <p
                  key={i}
                  className="text-base sm:text-lg italic text-cream/50 my-6"
                >
                  {trimmedLine.slice(1, -1)}
                </p>
              );
            }


            /* Empty line */
            if (trimmedLine === "") {
              return <div key={i} className="h-3" />;
            }


            /* Normal paragraph */
            return (
              <p
                key={i}
                className="text-base sm:text-lg leading-[1.85] text-cream/70 mb-6"
              >
                {renderBoldText(trimmedLine)}
              </p>
            );
          })}

        </div>


        {/* Bottom divider */}
        <div className="mt-20">
          <Separator className="bg-[rgba(245,183,49,0.12)] mb-8" />

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-cream/50 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore more insights
          </Link>
        </div>

      </article>
    </div>
  );
}


/* ==================== BOLD TEXT HELPER ==================== */

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[#F5E6D0]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}
