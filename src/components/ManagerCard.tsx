"use client";

import Image from "next/image";
import { Phone, Linkedin } from "lucide-react";
import { teamMembers } from "@/data/team";

export default function ManagerCard({ member, compact = false }: { member: typeof teamMembers[0]; compact?: boolean }) {
  const photoSrc = member.photo.startsWith("/") ? member.photo : `/${member.photo.trim()}`;
  const sizeClass = compact ? "w-full h-full" : "w-[300px] h-[380px]";

  return (
    <div className={`relative ${sizeClass} rounded-2xl overflow-hidden group border border-gold/20`}>
      <Image
        src={photoSrc}
        alt={member.name}
        fill
        sizes={compact ? "260px" : "300px"}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        unoptimized
        priority={!compact}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className={`absolute inset-x-0 bottom-0 ${compact ? "p-5" : "p-6"}`}>
        <h3 className={`font-bold ${compact ? "text-lg" : "text-2xl"} text-gold mb-1`} style={{ fontFamily: "var(--font-display)" }}>
          {member.name}
        </h3>
        <p className="text-lg text-cream/60 mb-4">{member.role}</p>
        <div className="space-y-2 text-xs">
          <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors">
            <Phone className="w-3.5 h-3.5 text-gold/60" />
            <span>{member.phone}</span>
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors">
            <Linkedin className="w-3.5 h-3.5 text-gold/60" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}