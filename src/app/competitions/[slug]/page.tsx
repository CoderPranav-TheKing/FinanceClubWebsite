"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Users,
  User,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { competitions } from "@/data/competitions";

const FINANCE_CLUB_LINKTREE =
  "https://l.instagram.com/?u=https%3A%2F%2Flnk.bio%2Ffinanceclubiitb%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAafQ-_qN_4OhVuT9yScv0-xdgVCIM_ePnRks6ofMwi8uJkWNrACrKw7JB-cYEg_aem_bpUMoiyH9L5zryStaUVJ-Q&e=AUDKKIDci_XsqrCp-nzmr2egaO8ESKn7ZujI_PTsdzjrgtXVAvw4ogDoSCo_NeARi051m7DcxPiJI_BbCNq7XS8Ng7WhzI36fXRxjuMG8u7wpE799BR0j8xSPiILcARRe-lKgg7vnuIs";

export default function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const competition = competitions.find((c) => c.slug === slug);

  const [showSuccess, setShowSuccess] = useState(false);

  if (!competition) return notFound();

  const isActive = competition.status === "active";

  const registrationOpen =
    new Date(competition.registrationDeadline) > new Date();

  const openingSoon = competition.status === "upcoming";

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleBackToCompetitions = () => {
    router.push("/competitions");
  };

  const registrationDate = new Date(
    competition.registrationDeadline
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const resultsDate = new Date(
    competition.resultsDate
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-[#0D0A0A] text-cream">
      {/* =========================================================
          HERO BANNER
      ========================================================= */}

      <section className="relative w-full aspect-[2560/1170] overflow-hidden">
        <Image
          src="/FinClubBanner.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* BACK BUTTON */}

        <div className="absolute top-[4%] left-[3%] z-30">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleBackToCompetitions}
            className="cursor-pointer text-white/80 hover:text-white bg-black/30 hover:bg-black/45 backdrop-blur-sm text-[clamp(11px,1.1vw,14px)] border border-white/10 transition-all"
            style={{
              fontFamily: "var(--font-display)",
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Competitions
          </Button>
        </div>

        {/* COMPETITION INFO */}

        <div className="absolute inset-0 flex items-center">
          <div className="w-[56%] ml-auto pr-[5%] text-right">
            {/* STATUS */}

            <div className="flex flex-wrap items-center justify-end gap-2 mb-[1.2%]">
              <Badge
                className={`text-[clamp(10px,1vw,13px)] ${
                  isActive
                    ? "gradient-gold text-background"
                    : competition.status === "upcoming"
                    ? "border-teal text-teal"
                    : "border-muted-foreground text-muted-foreground"
                }`}
                style={{
                  fontFamily: "var(--font-display)",
                }}
              >
                {competition.status.charAt(0).toUpperCase() +
                  competition.status.slice(1)}
              </Badge>

              {openingSoon && (
                <Badge
                  className="border-gold text-gold text-[clamp(10px,1vw,13px)]"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Coming Soon
                </Badge>
              )}

              <span
                className="flex items-center gap-1 text-[clamp(10px,1vw,13px)] text-white/70"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                {competition.allowTeams ? (
                  <Users className="w-3.5 h-3.5" />
                ) : (
                  <User className="w-3.5 h-3.5" />
                )}

                {competition.allowTeams
                  ? `Team (up to ${competition.maxTeamSize})`
                  : "Individual"}
              </span>
            </div>

            {/* COMPETITION TITLE */}

            <h1
              className="text-[clamp(1.6rem,4vw,4rem)] font-semibold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              {competition.name}
            </h1>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESCRIPTION
      ========================================================= */}

      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-6xl mx-auto text-left">
          <p
            className="text-xl sm:text-2xl text-cream/60 max-w-6xl mx-auto leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            {competition.description}
          </p>
        </div>
      </section>

      {/* =========================================================
          TIMELINE
      ========================================================= */}

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl text-[#F5E6D0] mb-12"
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            Timeline
          </h2>

          <div className="rounded-[2rem] border border-gold/25 bg-[#110E0E] px-8 py-12 sm:px-14 sm:py-16 flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-0 sm:divide-x sm:divide-[#F5E6D0]/10">
            {/* REGISTRATION DATE */}

            <div className="flex-1 flex flex-col items-center px-6 sm:px-10">
              <Calendar className="w-9 h-9 sm:w-10 sm:h-10 text-gold mb-6" />

              <p
                className="text-xs sm:text-sm uppercase tracking-[0.18em] text-cream/50 mb-3"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                Registration Opens
              </p>

              <p
                className="text-4xl sm:text-4xl lg:text-5xl leading-none text-[#F5E6D0]"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                {registrationDate}
              </p>
            </div>

            {/* RESULTS DATE */}

            <div className="flex-1 flex flex-col items-center px-6 sm:px-10">
              <CheckCircle className="w-9 h-9 sm:w-10 sm:h-10 text-gold/75 mb-6" />

              <p
                className="text-xs sm:text-sm uppercase tracking-[0.18em] text-cream/50 mb-3"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                Results Announcement
              </p>

              <p
                className="text-4xl sm:text-4xl lg:text-5xl leading-none text-[#F5E6D0]"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                {resultsDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACTIVE COMPETITION REGISTRATION
      ========================================================= */}

      {isActive && registrationOpen && (
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-4xl sm:text-5xl font-semibold text-[#F5E6D0] text-center mb-10"
              style={{
                fontFamily: "var(--font-body)",
              }}
            >
              Register Now
            </h2>

            <Card className="bg-[#151111] border-gold/15 rounded-[2rem]">
              <CardContent className="p-6 sm:p-10">
                <form onSubmit={handleRegister} className="space-y-5">
                  <div>
                    <label
                      className="text-sm text-cream/70 mb-2 block"
                      style={{
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Full Name *
                    </label>

                    <Input
                      placeholder="Your name"
                      required
                      className="bg-black/20 border-white/10"
                    />
                  </div>

                  <div>
                    <label
                      className="text-sm text-cream/70 mb-2 block"
                      style={{
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Email *
                    </label>

                    <Input
                      type="email"
                      placeholder="your.email@iitb.ac.in"
                      required
                      className="bg-black/20 border-white/10"
                    />
                  </div>

                  {competition.allowTeams && (
                    <>
                      <Separator className="bg-white/10 my-6" />

                      <div>
                        <label
                          className="text-sm text-cream/70 mb-2 block"
                          style={{
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Team Name *
                        </label>

                        <Input
                          placeholder="Your team name"
                          required
                          className="bg-black/20 border-white/10"
                        />
                      </div>

                      {Array.from(
                        {
                          length: competition.maxTeamSize - 1,
                        },
                        (_, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          >
                            <div>
                              <label
                                className="text-sm text-cream/70 mb-2 block"
                                style={{
                                  fontFamily: "var(--font-body)",
                                }}
                              >
                                Member {i + 2} Name{" "}
                                {i === 0 ? "*" : ""}
                              </label>

                              <Input
                                placeholder={`Member ${i + 2}`}
                                required={i === 0}
                                className="bg-black/20 border-white/10"
                              />
                            </div>

                            <div>
                              <label
                                className="text-sm text-cream/70 mb-2 block"
                                style={{
                                  fontFamily: "var(--font-body)",
                                }}
                              >
                                Member {i + 2} Email{" "}
                                {i === 0 ? "*" : ""}
                              </label>

                              <Input
                                type="email"
                                placeholder="email@iitb.ac.in"
                                required={i === 0}
                                className="bg-black/20 border-white/10"
                              />
                            </div>
                          </div>
                        )
                      )}
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full gradient-gold text-[#1A1208] hover:opacity-90 py-6 text-base sm:text-lg rounded-xl mt-3"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Register
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* =========================================================
          FIND OUT MORE
      ========================================================= */}

      <section className="px-6 sm:px-8 pt-20 pb-28 sm:pt-24 sm:pb-36">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl tracking-tight text-[#F5E6D0] mb-7"
            style={{
              fontFamily: "var(--font-display)",
            }}
          >
            Want to Know More?
          </h2>

          <p
            className="max-w-3xl mx-auto text-xl sm:text-2xl leading-relaxed text-cream/55 mb-11"
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            Find further details, updates, and information about this
            competition through Finance Club IIT Bombay.
          </p>

          <Button
            asChild
            size="lg"
            className="gradient-gold text-[#1A1208] hover:opacity-90 px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-2xl"
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            <a
              href={FINANCE_CLUB_LINKTREE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find More About the Competition Here
            </a>
          </Button>
        </div>
      </section>

      {/* =========================================================
          REGISTRATION SUCCESS DIALOG
      ========================================================= */}

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-[#151111] border-gold/20">
          <DialogHeader>
            <DialogTitle
              className="flex items-center gap-2 text-[#F5E6D0]"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              Registration Successful
            </DialogTitle>

            <DialogDescription
              className="text-cream/50"
              style={{
                fontFamily: "var(--font-body)",
              }}
            >
              Your registration has been recorded successfully. Good luck!
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={() => setShowSuccess(false)}
            className="gradient-gold text-[#1A1208] hover:opacity-90"
            style={{
              fontFamily: "var(--font-display)",
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}