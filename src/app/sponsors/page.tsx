"use client";

import { useState, useEffect } from "react";
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
import SponsorCarousel from "@/components/SponsorCarousel";
import ScrollReveal from "@/components/ScrollReveal";

export default function PartnersPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const fullHeading = "Partner With Finance Club";
  const [typedHeading, setTypedHeading] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedHeading(fullHeading.slice(0, i));
      if (i >= fullHeading.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);
  const partnerWithLen = "Partner With ".length;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const heroCollageImages = [
    "../partner_1.png",
    "../partner_2.jpeg",
    "../partner_3.jpeg",
    "../partner_4.jpeg",
    "../partner_5.jpeg",
    "../partner_6.jpeg",
  ];

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
    window.location.href = `mailto:convener.finance.iitb@gmail.com?subject=${subject}&body=${body}`;

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
      desc: "Our events attract 2000+ registrations annually with active participation students from all disciplines.",
    },
    {
      icon: Target,
      title: "Branding Opportunities",
      desc: "Title sponsorships, logo placement, branded competitions and social media exposure across our channels.",
    },
    {
      icon: Briefcase,
      title: "Recruitment Pipeline",
      desc: "Direct access to top finance-interested talent for internships, full-time roles and campus hiring.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hidden sm:grid grid-cols-3 grid-rows-2 gap-0">
          {heroCollageImages.map((src, index) => (
            <div key={src} className="relative min-h-0 min-w-0">
              <Image
                src={src}
                alt={`Partner collage ${index + 1}`}
                fill
                priority={index === 0}
                sizes="33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 sm:hidden">
          <Image
            src="../partner_1.png"
            alt="Partner collage background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/70 sm:bg-black/75" />
        <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(circle_at_top_left,rgba(245,183,49,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(27,107,64,0.14),transparent_28%)]" />
        {/* <div className="relative z-10 max-w-4xl mx-auto">
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
            <p className="text-lg text-cream/70 max-w-2xl leading-relaxed">
              Collaborate with IIT Bombay&apos;s premier finance society to access
              top talent, build your brand, and create impactful engagements.
            </p>
          </ScrollReveal>
        </div> */}
        <div className="relative z-10 max-w-4xl mx-auto">
  <ScrollReveal>
    <div className="backdrop-blur-md bg-black/40 border border-cream/10 rounded-3xl px-8 py-10 sm:px-10 sm:py-12">
      <div className="badge-pill badge-gold mb-6">
        <Handshake className="w-3 h-3" /> Partnerships
      </div>
      <h1
        className="text-5xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6 min-h-[1.2em] sm:min-h-[1.2em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="text-cream">
          {typedHeading.slice(0, partnerWithLen)}
        </span>
        <span className="text-gradient-gold">
          {typedHeading.slice(partnerWithLen)}
        </span>
        <span className="inline-block w-[2px] h-[0.9em] bg-gold align-middle ml-1 animate-pulse" />
        <br />
        <span
          className={`text-cream/50 text-4xl sm:text-4xl inline-block transition-all duration-1000 ease-out ${
            typingDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          IIT Bombay
        </span>
      </h1>
      <p
        className={`text-2xl text-cream/85 max-w-2xl leading-relaxed transition-all duration-1200 ease-out ${
          typingDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        Collaborate with IIT Bombay&apos;s premier finance society to access
        top talent, build your brand and create impactful engagements.
      </p>
    </div>
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
                className="text-5xl sm:text-5xl font-extrabold tracking-tight"
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
                    className="font-bold text-xl mb-2 text-cream"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-lg text-cream/60 leading-relaxed">
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
<section className="py-24 px-6 lg:px-8 mesh-crimson grain relative overflow-hidden">
  <Image
    src="../partner_1.png"
    alt=""
    fill
    className="object-cover opacity-[0.88] pointer-events-none select-none"
    sizes="100vw"
  />
  <div className="absolute inset-0 bg-[#0D0A0A]/85 pointer-events-none" />
  <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,rgba(27,107,64,0.15),transparent_45%)]" />

  <div className="max-w-5xl mx-auto relative z-10">
    <ScrollReveal>
      <div className="text-center mb-14">
        <div className="badge-pill badge-crimson mx-auto mb-6">
          <Building2 className="w-3 h-3" />
          Track Record
        </div>
        <h2
          className="text-5xl sm:text-5xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Past{" "}
          <span className="text-gradient-crimson">Collaborations</span>
        </h2>
        <p className="text-2xl text-cream/55 mt-4 max-w-xl mx-auto">
          Leading financial institutions that have partnered with
          Finance Club for events, sessions and competitions.
        </p>
      </div>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <SponsorCarousel items={sponsors} />
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
                className="text-5xl sm:text-5xl font-extrabold tracking-tight"
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
                  src="../finfestpubli.jpg"
                  alt="FinFest — Finance Club's flagship event"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                  <div className="badge-pill badge-gold text-[10px] mb-1">
                    FinFest
                  </div>
                  <p className="text-lg text-cream/70">
                    Our flagship annual conference attracting 500+ participants
                  </p>
                </div>
              </div>
              <div className="gallery-image relative h-72 md:h-96">
                <Image
                  src="../publi.jpg"
                  alt="Finance Club event audience"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                  <div className="badge-pill badge-crimson text-[10px] mb-2">
                    Industry Sessions
                  </div>
                  <p className="text-lg text-cream/70">
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
            <div className="gradient-border relative overflow-hidden p-8 sm:p-14 bg-[#0D0A0A]">
  <Image
    src="../art1.JPG"
    alt=""
    fill
    className="object-cover opacity-[0.2] pointer-events-none select-none"
    sizes="(max-width: 1024px) 100vw, 800px"
  />
  <div className="absolute inset-0 bg-[#0D0A0A]/80 pointer-events-none" />
  <div className="relative z-10 text-center mb-10">
                <Handshake className="w-12 h-12 text-gold mx-auto mb-6" />
                <h2
                  className="text-5xl font-extrabold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Get in <span className="text-gradient-gold">Touch</span>
                </h2>
                <p className="text-cream/70 max-w-md mx-auto text-xl">
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
                      <label className="text-xs font-semibold text-cream/80 uppercase tracking-wider mb-2 block">
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
                      <label className="text-xs font-semibold text-cream/80 uppercase tracking-wider mb-2 block">
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
                    <label className="text-xs font-semibold text-cream/80 uppercase tracking-wider mb-2 block">
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
                    <label className="text-xs font-semibold text-cream/80 uppercase tracking-wider mb-2 block">
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
                    href="convener.finance.iitb@gmail.com"
                    className="flex items-center gap-2 text-cream/45 hover:text-gold transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gold/30" />{" "}
                    financeclub@iitb.ac.in
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 text-cream/45 hover:text-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gold/30" /> +91 70209 22818 | +91 98104 65318
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
