"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Users, User, CheckCircle, Clock, FileUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { competitions } from "@/data/competitions";

const ACCEPTED_TYPES = ".pdf,.ppt,.pptx,.zip,.py,.js,.ts,.c,.cpp,.java";
const MAX_FILE_SIZE_MB = 50;

export default function CompetitionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const competition = competitions.find((c) => c.slug === slug);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  if (!competition) return notFound();

  const isActive = competition.status === "active";
  const registrationOpen = new Date(competition.registrationDeadline) > new Date();
  const submissionOpen = new Date(competition.submissionDeadline) > new Date();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSubmissionSuccess(true);
  };

  return (
    <div className="relative">
      {/* Back Link */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Link href="/competitions"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Competitions</Link>
        </Button>
      </div>

      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={isActive ? "gradient-gold text-background" : competition.status === "upcoming" ? "border-teal text-teal" : "border-muted-foreground text-muted-foreground"}>
              {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              {competition.allowTeams ? <Users className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              {competition.allowTeams ? `Team (up to ${competition.maxTeamSize})` : "Individual"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{competition.name}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{competition.description}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Timeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Registration Opens", date: competition.registrationDeadline, icon: Calendar, active: registrationOpen },
              { label: "Submission Deadline", date: competition.submissionDeadline, icon: Clock, active: submissionOpen },
              { label: "Results Announcement", date: competition.resultsDate, icon: CheckCircle, active: false },
            ].map((item) => (
              <div key={item.label} className={`glass rounded-xl p-6 ${item.active ? "border-gold/30" : ""}`}>
                <item.icon className={`w-6 h-6 mb-3 ${item.active ? "text-gold" : "text-muted-foreground"}`} />
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold">{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Rules & Guidelines</h2>
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6">
              <ul className="space-y-3">
                {competition.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center text-xs font-bold text-background shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Registration Form */}
      {isActive && registrationOpen && (
        <section className="py-12 px-4 bg-card/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Register Now</h2>
            <Card className="bg-card/50 border-border">
              <CardContent className="p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                    <Input placeholder="Your name" required className="bg-input border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <Input type="email" placeholder="your.email@iitb.ac.in" required className="bg-input border-border" />
                  </div>
                  {competition.allowTeams && (
                    <>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Team Name *</label>
                        <Input placeholder="Your team name" required className="bg-input border-border" />
                      </div>
                      {Array.from({ length: competition.maxTeamSize - 1 }, (_, i) => (
                        <div key={i} className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Member {i + 2} Name {i === 0 ? "*" : ""}</label>
                            <Input placeholder={`Member ${i + 2}`} required={i === 0} className="bg-input border-border" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Member {i + 2} Email {i === 0 ? "*" : ""}</label>
                            <Input type="email" placeholder="email@iitb.ac.in" required={i === 0} className="bg-input border-border" />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <Button type="submit" className="w-full gradient-gold text-background font-semibold hover:opacity-90">
                    Register
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Submission Section */}
      {isActive && (
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Submit Your Work</h2>
            {submissionOpen ? (
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Team / Participant Name *</label>
                      <Input placeholder="Your team or name" required className="bg-input border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Submission File *</label>
                      <Input
                        type="file"
                        accept={ACCEPTED_TYPES}
                        required
                        className="bg-input border-border file:text-gold file:bg-transparent file:border-0 file:font-medium"
                      />
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Max {MAX_FILE_SIZE_MB}MB. Accepted: PDF, PPT, PPTX, ZIP, code files.
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Comments (optional)</label>
                      <Textarea placeholder="Any additional notes..." className="bg-input border-border" />
                    </div>
                    <Button type="submit" className="w-full gradient-gold text-background font-semibold hover:opacity-90">
                      <FileUp className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/30 border-border">
                <CardContent className="p-8 text-center">
                  <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Submissions are closed.</p>
                  <p className="text-xs text-muted-foreground mt-1">Deadline was {new Date(competition.submissionDeadline).toLocaleDateString("en-IN")}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Success Dialogs */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Registration Successful
            </DialogTitle>
            <DialogDescription>
              Your registration has been recorded successfully. Good luck!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccess(false)} className="gradient-gold text-background">Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showSubmissionSuccess} onOpenChange={setShowSubmissionSuccess}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Submission Successful
            </DialogTitle>
            <DialogDescription>
              Your submission has been recorded successfully.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSubmissionSuccess(false)} className="gradient-gold text-background">Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
