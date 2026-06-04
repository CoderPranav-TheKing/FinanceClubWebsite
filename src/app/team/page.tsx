import type { Metadata } from "next";
import { Mail, Phone, Linkedin, User } from "lucide-react";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Team — Finance Club IIT Bombay",
  description: "Meet the team behind Finance Club IIT Bombay.",
};

function TeamCard({ member, accent }: { member: typeof teamMembers[0]; accent: "gold" | "crimson" }) {
  const isGold = accent === "gold";
  return (
    <div className={`${isGold ? "card-glow-gold" : "card-glow-crimson"} p-7 group text-center`}>
      <div className={`w-20 h-20 mx-auto mb-5 rounded-full border ${isGold ? "border-gold/20" : "border-crimson/20"} flex items-center justify-center ${isGold ? "bg-gold/[0.04]" : "bg-crimson/[0.04]"} group-hover:${isGold ? "border-gold/40" : "border-crimson/40"} transition-colors`}>
        <User className={`w-8 h-8 ${isGold ? "text-gold/40" : "text-crimson-light/40"}`} />
      </div>

      <h3 className="font-bold text-lg text-cream group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
      <p className="text-[11px] text-cream/25 mt-0.5 mb-4">{member.role}</p>

      <div className="space-y-2 text-xs">
        <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-cream/25 hover:text-gold transition-colors justify-center">
          <Mail className="w-3.5 h-3.5 text-gold/30" />
          <span className="truncate">{member.email}</span>
        </a>
        <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-cream/25 hover:text-gold transition-colors justify-center">
          <Phone className="w-3.5 h-3.5 text-gold/30" />
          <span>{member.phone}</span>
        </a>
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cream/25 hover:text-gold transition-colors justify-center">
          <Linkedin className="w-3.5 h-3.5 text-gold/30" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const managers = teamMembers.filter((m) => m.category === "manager");
  const conveners = teamMembers.filter((m) => m.category === "convener");

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
        <div className="accent-orb-gold top-0 left-0" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="badge-pill badge-gold mb-6">The People</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Our <span className="text-gradient-gold">Team</span>
          </h1>
          <p className="text-lg text-cream/35 max-w-2xl leading-relaxed">
            The people behind Finance Club IIT Bombay. Reach out for queries, collaborations, or to connect.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Managers */}
      <section className="py-24 px-6 lg:px-8 mesh-gold">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge-pill badge-gold mb-4">Leadership</div>
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-gradient-gold">Managers</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {managers.map((m) => <TeamCard key={m.id} member={m} accent="gold" />)}
          </div>
        </div>
      </section>

      <div className="divider-glow" />

      {/* Conveners */}
      <section className="py-24 px-6 lg:px-8 mesh-crimson grain">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge-pill badge-crimson mb-4">Core Team</div>
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-gradient-crimson">Conveners</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {conveners.map((m) => <TeamCard key={m.id} member={m} accent="crimson" />)}
          </div>
        </div>
      </section>
    </div>
  );
}
