import type { Metadata } from "next";
import Image from "next/image";
import { Trophy, BookOpen, CalendarDays, Info } from "lucide-react";
import { announcements } from "@/data/announcements";

export const metadata: Metadata = {
  title: "Announcements — Finance Club IIT Bombay",
  description: "Latest announcements from Finance Club IIT Bombay.",
};

const categoryConfig: Record<string, { icon: typeof Trophy; label: string; badge: string }> = {
  competition: { icon: Trophy, label: "Competition", badge: "badge-gold" },
  event: { icon: CalendarDays, label: "Event", badge: "badge-crimson" },
  resource: { icon: BookOpen, label: "Resource", badge: "badge-cream" },
  general: { icon: Info, label: "General", badge: "badge-cream" },
};

export default function AnnouncementsPage() {
  const sorted = [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
        <div className="accent-orb-gold top-0 left-[20%]" />
        <div className="accent-orb-crimson bottom-0 right-[10%]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="badge-pill badge-gold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-glow-pulse" /> Stay Updated
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-gradient-gold">Announcements</span>
          </h1>
          <p className="text-lg text-cream/35 max-w-2xl leading-relaxed">
            The latest from Finance Club IIT Bombay.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* List */}
      <section className="py-16 px-6 lg:px-8 mesh-gold">
        <div className="max-w-4xl mx-auto space-y-6">
          {sorted.map((ann, i) => {
            const config = categoryConfig[ann.category] || categoryConfig.general;
            const Icon = config.icon;
            const isFirst = i === 0;
            return (
              <div key={ann.id} className={`${isFirst ? "card-glow-gold" : "card-premium"} overflow-hidden`}>
                <div className={`flex flex-col ${ann.image ? "md:flex-row" : ""}`}>
                  {ann.image && (
                    <div className="relative w-full md:w-64 h-52 md:h-auto shrink-0">
                      <Image src={ann.image} alt={ann.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 256px" />
                    </div>
                  )}
                  <div className="flex-1 p-7">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${ann.category === "competition" ? "bg-gold/10" : "bg-crimson/10"} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 ${ann.category === "competition" ? "text-gold" : "text-crimson-light"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <span className={`badge-pill ${config.badge} text-[9px]`}>{config.label}</span>
                          <span className="text-[10px] text-cream/15">
                            {new Date(ann.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-cream" style={{ fontFamily: "var(--font-display)" }}>{ann.title}</h3>
                        <p className="text-sm text-cream/30 leading-relaxed">{ann.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
