import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/data/blogs";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <div className="relative">
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Back */}
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground mb-8">
          <Link href="/blogs"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog</Link>
        </Button>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gold" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:text-muted-foreground [&_li]:text-sm [&_em]:text-muted-foreground/70 [&_strong]:text-foreground [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_ol]:text-muted-foreground">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return <h2 key={i}>{line.replace("## ", "")}</h2>;
            }
            if (line.startsWith("- ")) {
              return (
                <ul key={i}>
                  <li>{line.replace("- ", "")}</li>
                </ul>
              );
            }
            if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
              const text = line.replace(/^\d+\.\s/, "");
              // Handle bold text
              const parts = text.split(/(\*\*[^*]+\*\*)/);
              return (
                <p key={i} className="text-sm text-muted-foreground pl-4">
                  {parts.map((part, j) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={j}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </p>
              );
            }
            if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
              return <p key={i}><em>{line.slice(1, -1)}</em></p>;
            }
            if (line.trim() === "") return <br key={i} />;
            return <p key={i}>{line}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
