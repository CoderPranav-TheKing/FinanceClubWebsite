"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Handshake,
  Mail,
  Phone,
  Users,
  Target,
  Megaphone,
  Briefcase,
  Send,
  CheckCircle,
  Building2,
  ArrowRight,
} from "lucide-react";
import { sponsors } from "@/data/sponsors";
import ScrollReveal from "@/components/ScrollReveal";

export default function PartnersPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Send via mailto as a fallback (works without backend)
    const subject = encodeURIComponent(
      `Partnership Inquiry from ${name} — ${company || "Individual"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:kunalgore07@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setFormState("sent");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    }, 1000);
  };

  const valueProps = [
    {
      icon: Users,
      title: "Access to Top IITB Students",
      desc: "Engage with 10,000+ students from one of India's most prestigious engineering institutions.",
    },
    {
      icon: Megaphone,
      title: "Large Event Reach",
      desc: "Our events attract 800+ registrations annually with active participation from premier institutions.",
    },
    {
      icon: Target,
      title: "Branding Opportunities",
      desc: "Title sponsorships, logo placement, branded competitions, and social media exposure across our channels.",
    },
    {
      icon: Briefcase,
      title: "Recruitment Pipeline",
      desc: "Direct access to top finance-interested talent for internships, full-time roles, and campus hiring.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 mesh-hero grain overflow-hidden">
        <div className="accent-orb-gold bottom-0 left-[30%]" />
        <div className="accent-orb-crimson top-0 right-[10%]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="badge-pill badge-gold mb-6">
              <Handshake className="w-3 h-3" /> Partnerships
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Partner With{" "}
              <span className="text-gradient-gold">Finance Club</span>
              <br />
              <span className="text-cream/40 text-3xl sm:text-4xl">
                IIT Bombay
              </span>
            </h1>
            <p className="text-lg text-cream/35 max-w-2xl leading-relaxed">
              Collaborate with IIT Bombay&apos;s premier finance society to access
              top talent, build your brand, and create impactful engagements.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider" />

      {/* Value Proposition */}
      <section className="py-24 px-6 lg:px-8 mesh-gold">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="badge-pill badge-cream mx-auto mb-6">
                Why Partner
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The{" "}
                <span className="text-gradient-gold">
                  Value Proposition
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valueProps.map((item) => (
                <div key={item.title} className="card-glow-gold p-8 group">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                    <item.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                  </div>
                  <h3
                    className="font-bold text-lg mb-2 text-cream"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream/30 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider-glow" />

      {/* Past Partners */}
      <section className="py-24 px-6 lg:px-8 mesh-crimson grain">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="badge-pill badge-crimson mx-auto mb-6">
                <Building2 className="w-3 h-3" />
                Track Record
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Past{" "}
                <span className="text-gradient-crimson">Collaborations</span>
              </h2>
              <p className="text-cream/25 mt-4 max-w-lg mx-auto">
                Leading financial institutions that have partnered with
                Finance Club for events, sessions, and competitions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-4xl mx-auto">
              {sponsors.map((s) => (
                <a
                  key={s.id}
                  href={s.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-logo-card group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      src={s.logo}
                      alt={s.name}
                      width={80}
                      height={48}
                      className="object-contain max-h-10"
                    />
                    <span className="text-xs text-cream/20 group-hover:text-cream/50 transition-colors font-medium">
                      {s.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider" />

      {/* Gallery */}
      <section className="py-24 px-6 lg:px-8 mesh-gold">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="badge-pill badge-gold mx-auto mb-6">
                Gallery
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Events in <span className="text-gradient-gold">Action</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="gallery-image relative h-72 md:h-96">
                <Image
                  src="/finfestpubli.jpg"
                  alt="FinFest — Finance Club's flagship event"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                  <div className="badge-pill badge-gold text-[10px] mb-2">
                    FinFest
                  </div>
                  <p className="text-sm text-cream/60">
                    Our flagship annual conference attracting 500+ participants
                  </p>
                </div>
              </div>
              <div className="gallery-image relative h-72 md:h-96">
                <Image
                  src="/publi.jpg"
                  alt="Finance Club event audience"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                  <div className="badge-pill badge-crimson text-[10px] mb-2">
                    Industry Sessions
                  </div>
                  <p className="text-sm text-cream/60">
                    Guest lectures and workshops with top financial
                    institutions
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider-glow" />

      {/* Contact Form */}
      <section className="py-24 px-6 lg:px-8 mesh-crimson grain relative">
        <div className="accent-orb-gold top-0 right-1/4" />
        <div className="max-w-3xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="gradient-border p-8 sm:p-14 bg-[#0D0A0A]">
              <div className="text-center mb-10">
                <Handshake className="w-12 h-12 text-gold mx-auto mb-6" />
                <h2
                  className="text-3xl font-extrabold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Get in <span className="text-gradient-gold">Touch</span>
                </h2>
                <p className="text-cream/25 max-w-md mx-auto">
                  Interested in partnering with us? Fill out the form below and
                  we&apos;ll get back to you.
                </p>
              </div>

              {formState === "sent" ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3
                    className="text-xl font-bold text-cream mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-cream/30 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="btn-ghost text-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-cream/40 uppercase tracking-wider mb-2 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-xl bg-[rgba(20,16,16,0.6)] border border-cream/[0.06] text-cream placeholder:text-cream/20 focus:border-gold/20 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-cream/40 uppercase tracking-wider mb-2 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[rgba(20,16,16,0.6)] border border-cream/[0.06] text-cream placeholder:text-cream/20 focus:border-gold/20 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-cream/40 uppercase tracking-wider mb-2 block">
                      Company / Organisation
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company name"
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(20,16,16,0.6)] border border-cream/[0.06] text-cream placeholder:text-cream/20 focus:border-gold/20 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-cream/40 uppercase tracking-wider mb-2 block">
                      Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      placeholder="Tell us about the partnership you have in mind..."
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(20,16,16,0.6)] border border-cream/[0.06] text-cream placeholder:text-cream/20 focus:border-gold/20 focus:outline-none transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="btn-gold w-full text-sm py-3.5 justify-center disabled:opacity-50"
                  >
                    {formState === "sending" ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct contact */}
              <div className="mt-10 pt-8 border-t border-cream/[0.04]">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/50 mb-4 text-center">
                  Or Reach Out Directly
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <a
                    href="mailto:kunalgore07@gmail.com"
                    className="flex items-center gap-2 text-cream/25 hover:text-gold transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gold/30" />{" "}
                    kunalgore07@gmail.com
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 text-cream/25 hover:text-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gold/30" /> +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
