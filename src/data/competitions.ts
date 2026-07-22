export interface Competition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  status: "active" | "upcoming" | "past";
  registrationDeadline: string;
  submissionDeadline: string;
  resultsDate: string;
  rules: string[];
  allowTeams: boolean;
  maxTeamSize: number;
  image: string;
  partnerLogo?: string;
  partnerName?: string;
}

export const competitions: Competition[] = [
  {
    id: "pm-2026",
    slug: "portfolio-management",
    name: "Portfolio Management Competition",
    shortDescription: "A portfolio construction and management challenge for aspiring investors.",
    description:
      "Details for this competition will be announced soon. This placeholder page indicates the competition is under development and will include full rules, timelines and submission guidelines.",
    status: "upcoming",
    registrationDeadline: "2026-07-10",
    submissionDeadline: "2026-07-20",
    resultsDate: "2026-07-30",
    rules: [
      "Details will be published soon.",
    ],
    allowTeams: true,
    maxTeamSize: 4,
    image: "/competitions/portfolio.jpg",
  },
  {
    id: "finsearch-2026",
    slug: "finsearch",
    name: "FinSearch",
    shortDescription: "A multi-round research and stock-pitch challenge.",
    description:
      "Details for this competition will be announced soon. This placeholder page indicates the competition is under development and will include full rules, timelines and submission guidelines.",
    status: "upcoming",
    registrationDeadline: "2026-07-15",
    submissionDeadline: "2026-06-25",
    resultsDate: "2026-07-05",
    rules: [
      "Details will be published soon.",
    ],
    allowTeams: false,
    maxTeamSize: 1,
    image: "/competitions/finsearch.jpg",
  },
  {
    id: "1",
    slug: "erc-2026",
    name: "Equity Research Competition 2026",
    shortDescription:
      "Analyse a publicly listed company and present an investment thesis with a buy/sell/hold recommendation.",
    description:
      "The Equity Research Competition is Finance Club's flagship competition. Participants analyse a publicly listed company, building a comprehensive financial model and presenting a detailed equity research report with a buy, sell, or hold recommendation. Teams are evaluated on the depth of analysis, quality of financial modelling, and clarity of presentation.",
    status: "active",
    registrationDeadline: "2026-07-01",
    submissionDeadline: "2026-04-15",
    resultsDate: "2026-04-25",
    rules: [
      "Teams of 2–4 members allowed",
      "Report must be in PDF format, max 15 pages",
      "Financial model must be submitted as an Excel file",
      "Company assigned will be announced after registration closes",
      "Plagiarism will result in disqualification",
    ],
    allowTeams: true,
    maxTeamSize: 4,
    image: "/competitions/erc.jpg",
  },
  {
    id: "2",
    slug: "vc-case-2026",
    name: "Venture Capital Case Competition",
    shortDescription:
      "Evaluate early-stage startups from a VC lens and present an investment thesis.",
    description:
      "The VC Case Competition challenges participants to evaluate startups, perform due diligence, and present an investment thesis. Teams assess market opportunity, business model viability, and provide term-sheet recommendations.",
    status: "active",
    registrationDeadline: "2026-04-05",
    submissionDeadline: "2026-04-20",
    resultsDate: "2026-04-30",
    rules: [
      "Teams of 2–3 members",
      "Case released 48 hours before deadline",
      "Presentation format: PPT, max 15 slides",
      "Must include a proposed term sheet",
    ],
    allowTeams: true,
    maxTeamSize: 3,
    image: "/competitions/vc-case.jpg",
  },
  {
    id: "3",
    slug: "citadel-trading-2026",
    name: "Citadel Trading Competition",
    shortDescription:
      "High-intensity trading challenge in collaboration with Citadel Securities.",
    description:
      "A high-intensity trading challenge in collaboration with Citadel Securities, testing quantitative and market-making skills. Participants compete on a simulated trading platform to maximise P&L while managing risk.",
    status: "upcoming",
    registrationDeadline: "2026-05-01",
    submissionDeadline: "2026-05-15",
    resultsDate: "2026-05-25",
    rules: [
      "Individual participation",
      "Real-time simulated trading platform",
      "Risk limits will be enforced",
      "Top performers invited for networking with Citadel team",
    ],
    allowTeams: false,
    maxTeamSize: 1,
    image: "/competitions/trading.jpg",
    partnerLogo: "/citadel.png",
    partnerName: "Citadel",
  },
  {
    id: "citadel-trader-2026",
    slug: "citadel-trader-id",
    name: "Citadel Trader ID Challenge",
    shortDescription: "A trading and market-making challenge with quantitative components.",
    description:
      "Details for this competition will be announced soon. This placeholder page indicates the competition is under development and will include full rules, timelines and submission guidelines.",
    status: "upcoming",
    registrationDeadline: "2026-11-01",
    submissionDeadline: "2026-11-20",
    resultsDate: "2026-11-30",
    rules: [
      "Details will be published soon.",
    ],
    allowTeams: false,
    maxTeamSize: 1,
    image: "/competitions/citadel.jpg",
    partnerLogo: "/citadel.png",
    partnerName: "Citadel",
  },
  {
    id: "4",
    slug: "imc-simulation-2026",
    name: "IMC Trading Simulation",
    shortDescription:
      "Compete on IMC's proprietary trading simulator managing risk across asset classes.",
    description:
      "Compete on IMC's proprietary trading simulator, managing risk and maximising returns across asset classes. This event gives participants a taste of life on a professional trading desk.",
    status: "upcoming",
    registrationDeadline: "2026-05-10",
    submissionDeadline: "2026-05-20",
    resultsDate: "2026-05-30",
    rules: [
      "Teams of 2–3 members",
      "Live trading window: 3 hours",
      "Portfolio constraints apply",
      "Winners receive fast-tracked interview opportunity at IMC",
    ],
    allowTeams: true,
    maxTeamSize: 3,
    image: "/competitions/trading.jpg",
    partnerLogo: "/imc.png",
    partnerName: "IMC Trading",
  },
  {
    id: "ibcc-2027",
    slug: "investment-banking-case",
    name: "Investment Banking Case Competition",
    shortDescription: "Transaction-focused M&A and pitch cases for aspiring bankers.",
    description:
      "Details for this competition will be announced soon. This placeholder page indicates the competition is under development and will include full rules, timelines and submission guidelines.",
    status: "upcoming",
    registrationDeadline: "2027-01-05",
    submissionDeadline: "2027-01-20",
    resultsDate: "2027-01-30",
    rules: [
      "Details will be published soon.",
    ],
    allowTeams: true,
    maxTeamSize: 4,
    image: "/competitions/ibcc.jpg",
  },
  {
    id: "5",
    slug: "finance-quiz-cfa-2025",
    name: "Finance Quiz — CFA Collaboration",
    shortDescription:
      "A rigorous finance quiz jointly organised with CFA Institute.",
    description:
      "A rigorous finance quiz jointly organised with CFA Institute, covering markets, ethics, and investment analysis. Open to all skill levels with tiered difficulty rounds.",
    status: "past",
    registrationDeadline: "2025-11-01",
    submissionDeadline: "2025-11-10",
    resultsDate: "2025-11-15",
    rules: [
      "Individual participation",
      "Three rounds: Prelims, Semis, Finals",
      "No calculators in prelims",
      "CFA curriculum-aligned content",
    ],
    allowTeams: false,
    maxTeamSize: 1,
    image: "/competitions/quiz.jpg",
    partnerLogo: "/cfa_institute.png",
    partnerName: "CFA Institute",
  },
];
