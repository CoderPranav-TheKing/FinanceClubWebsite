export type EventCategory =
  | "competitions"
  | "bootcamps"
  | "sessions"
  | "workshops"
  | "conferences"
  | "finfest"
  | "miscellaneous";

export interface ClubEvent {
  id: string;
  name: string;
  category: EventCategory;
  description: string;
  participationScale: string;
  outcome: string;
  partnerLogo?: string;
  partnerName?: string;
}

export const eventCategories: { id: EventCategory; label: string }[] = [
  { id: "competitions", label: "Competitions" },
  { id: "bootcamps", label: "Bootcamps" },
  { id: "sessions", label: "Sessions" },
  { id: "workshops", label: "Workshops" },
  { id: "conferences", label: "Conferences" },
  { id: "finfest", label: "FinFest" },
  { id: "miscellaneous", label: "Miscellaneous" },
];

export const clubEvents: ClubEvent[] = [
  // ── COMPETITIONS ──
  {
    id: "comp-1",
    name: "Equity Research Competition",
    category: "competitions",
    description:
      "Analyse a publicly listed company and deliver a buy/sell/hold recommendation backed by rigorous financial modelling.",
    participationScale: "200+ participants",
    outcome: "Exposure to equity research, financial modelling, and report writing.",
  },
  {
    id: "comp-2",
    name: "Venture Capital Case Competition",
    category: "competitions",
    description:
      "Evaluate early-stage startups and present an investment thesis from a VC lens.",
    participationScale: "120+ participants",
    outcome: "Hands-on VC deal evaluation and due-diligence skills.",
  },
  {
    id: "comp-3",
    name: "Citadel Trading Competition",
    category: "competitions",
    description:
      "A high-intensity trading challenge in collaboration with Citadel Securities, testing quantitative and market-making skills.",
    participationScale: "150+ participants",
    outcome: "Real-world trading simulation experience with industry mentorship.",
    partnerLogo: "/citadel.png",
    partnerName: "Citadel",
  },
  {
    id: "comp-4",
    name: "IMC Trading Simulation",
    category: "competitions",
    description:
      "Compete on IMC's proprietary trading simulator, managing risk and maximising returns across asset classes.",
    participationScale: "180+ participants",
    outcome: "Algorithmic trading and risk management skills.",
    partnerLogo: "/imc.png",
    partnerName: "IMC Trading",
  },
  {
    id: "comp-5",
    name: "Finance Quiz — CFA Collaboration",
    category: "competitions",
    description:
      "A rigorous finance quiz jointly organised with CFA Institute, covering markets, ethics, and investment analysis.",
    participationScale: "300+ participants",
    outcome: "Strengthened analytical thinking and CFA-level concept exposure.",
    partnerLogo: "/cfa_institute.png",
    partnerName: "CFA Institute",
  },
  {
    id: "comp-8",
    name: "Trading Simulation Events",
    category: "competitions",
    description:
      "Virtual trading challenges using real-time market data to test portfolio construction and execution skills.",
    participationScale: "150+ participants",
    outcome: "Practical exposure to live trading mechanics and P&L management.",
  },

  // ── BOOTCAMPS ──
  {
    id: "boot-1",
    name: "Learners' Space - Fundamentals of Finance",
    category: "bootcamps",
    description:
      "A multi-week structured curriculum introducing students to the basics of finance - from time value of money to portfolio theory.",
    participationScale: "800+ registrations",
    outcome: "Strong foundational knowledge in core finance concepts.",
  },
  {
    id: "boot-2",
    name: "Financial Modeling Bootcamp",
    category: "bootcamps",
    description:
      "Intensive hands-on bootcamp covering DCF, LBO, and comparable-company modelling from scratch.",
    participationScale: "400+ registrations",
    outcome: "Ability to build professional-grade financial models.",
  },

  // ── SESSIONS ──
  {
    id: "sess-2",
    name: "Citadel Securities Session",
    category: "sessions",
    description:
      "Insights into quantitative trading and market-making from Citadel Securities professionals.",
    participationScale: "200+ attendees",
    outcome: "Understanding of quant trading infrastructure and recruiting pipeline.",
    partnerLogo: "/citadel.png",
    partnerName: "Citadel",
  },
  {
    id: "sess-3",
    name: "DCF Valuation Session",
    category: "sessions",
    description:
      "A deep-dive workshop on building Discounted Cash Flow models and equity valuation techniques.",
    participationScale: "180+ attendees",
    outcome: "Mastery of intrinsic valuation methodology.",
  },
  {
    id: "sess-4",
    name: "Mergers & Acquisitions Session",
    category: "sessions",
    description:
      "Exploring M&A deal structures, synergies, and the advisory process in corporate finance.",
    participationScale: "160+ attendees",
    outcome: "Understanding of M&A mechanics and deal execution.",
  },
  {
    id: "sess-6",
    name: "Corporate Careers in Finance",
    category: "sessions",
    description:
      "Panel discussion on careers in corporate finance, treasury, and FP&A roles across industries.",
    participationScale: "200+ attendees",
    outcome: "Broad perspective on non-IB finance career paths.",
  },

  // ── WORKSHOPS ──
  {
    id: "work-1",
    name: "Private Equity Workshop (Warburg Pincus)",
    category: "workshops",
    description:
      "An exclusive workshop on PE deal sourcing, evaluation, and portfolio management led by Warburg Pincus professionals.",
    participationScale: "100+ attendees",
    outcome: "Practical understanding of PE investment lifecycle.",
  },  

  // ── CONFERENCES ──
  {
    id: "conf-1",
    name: "FinFest",
    category: "conferences",
    description:
      "Finance Club's flagship annual conference featuring keynote speakers, workshops, competitions and networking with industry leaders.",
    participationScale: "500+ participants",
    outcome: "Comprehensive exposure to the finance industry across multiple verticals.",
  },

  // ── FINFEST ──
  {
    id: "fest-1",
    name: "Keynote Speaker Sessions",
    category: "finfest",
    description:
      "Talks by industry titans - CXOs, fund managers and policy makers sharing insights on markets and careers.",
    participationScale: "400+ attendees",
    outcome: "Inspiration and network-building with top finance professionals.",
  },
  {
    id: "fest-2",
    name: "FinFest Workshops",
    category: "finfest",
    description:
      "Intensive hands-on workshops during FinFest covering financial modelling, quant strategies and trading.",
    participationScale: "200+ participants",
    outcome: "Skill-building in high-demand finance areas.",
  },
  {
    id: "fest-3",
    name: "FinFest Competitions",
    category: "finfest",
    description:
      "Multiple competitive tracks including trading, case studies and quizzes with significant prize pools.",
    participationScale: "300+ participants",
    outcome: "Competitive benchmarking against top finance talent nationally.",
  },
  {
    id: "fest-4",
    name: "Finance Games at FinFest",
    category: "finfest",
    description:
      "Interactive games simulating market scenarios - from options trading to macro forecasting. Market Mayhem and Forensic Files were the standout games.",
    participationScale: "250+ participants",
    outcome: "Fun, gamified finance learning experience.",
  },

  // ── MISCELLANEOUS ──
  {
    id: "misc-1",
    name: "Internship Preparation Programme",
    category: "miscellaneous",
    description:
      "Structured guidance sessions for students targeting summer internships in finance — covering resume, technicals and interviews.",
    participationScale: "300+ students",
    outcome: "Higher conversion rates for finance internship applications.",
  },
  {
    id: "misc-2",
    name: "Placement Preparation Programme",
    category: "miscellaneous",
    description:
      "Mock interviews, group discussions and case-study practice for final-year placement season.",
    participationScale: "200+ students",
    outcome: "Thorough preparation for Day-0/Day-1 placement processes.",
  },
  {
    id: "misc-3",
    name: "Finance Guides",
    category: "miscellaneous",
    description:
      "Comprehensive written guides covering equity research, DCF, PE/VC, trading, and macroeconomics.",
    participationScale: "1000+ downloads",
    outcome: "Self-paced learning resources accessible to the entire IITB community.",
  },
  {
    id: "misc-4",
    name: "Blog Collaborations",
    category: "miscellaneous",
    description:
      "Student-authored articles published on Medium covering market analysis, sector deep-dives, and career advice.",
    participationScale: "5000+ readers",
    outcome: "Thought leadership and writing skill development.",
  },
  {
    id: "misc-5",
    name: "Infographic Series",
    category: "miscellaneous",
    description:
      "Visual explainers on complex financial concepts — from derivatives pricing to macro indicators.",
    participationScale: "3000+ reach per post",
    outcome: "Bite-sized finance education for social media audiences.",
  },
];
