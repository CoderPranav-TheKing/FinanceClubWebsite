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

    shortDescription:
      "Design a client-centric investment portfolio by balancing returns, risk, and long-term financial goals.",

    description:
      "The Portfolio Management Competition challenges participants to step into the role of a portfolio manager and design an investment strategy for a realistic client scenario. Teams are required to balance expected returns, risk tolerance, financial objectives, and changing market conditions while constructing a well-reasoned portfolio. The competition emphasises practical financial planning and translates academic concepts in asset allocation and portfolio construction into client-centric investment decisions.",

    status: "upcoming",

    registrationDeadline: "2026-06-13",

    submissionDeadline: "2026-07-20",

    resultsDate: "2026-07-30",

    rules: [
      "Teams of up to 4 members are allowed.",
      "Participants will be given a client scenario and portfolio construction objective.",
      "Portfolio recommendations must account for returns, risk, financial goals, and market conditions.",
      "All assumptions and investment decisions must be clearly justified.",
      "The final submission must follow the format and evaluation criteria released by the organisers.",
    ],

    allowTeams: true,

    maxTeamSize: 4,

    image: "/competitions/portfolio.jpg",

    partnerName: "FPA Academy",
  },

  {
    id: "finsearch-2026",

    slug: "finsearch",

    name: "FinSearch",

    shortDescription:
      "A research-focused programme where teams investigate challenging finance topics under structured mentorship.",

    description:
      "FinSearch is a research-focused initiative designed to encourage investigation, independent thinking, and the development of deeper research interests in finance. Participants work in small teams on diverse topics spanning areas such as quantitative finance, venture capital, ESG investing, deep reinforcement learning, and other emerging financial themes. Each team is supported by a mentor and provided with curated learning modules and research roadmaps. Participants progress through structured milestones, including a mid-term report and a final research report accompanied by a presentation and video summarising their findings.",

    status: "upcoming",

    registrationDeadline: "2026-06-24",

    submissionDeadline: "2026-06-25",

    resultsDate: "2026-07-05",

    rules: [
      "Teams of 3–4 members are allowed.",
      "No prior prerequisites are required to participate.",
      "Each team will work on an allocated or selected finance research topic.",
      "A mentor will guide the team throughout the research process.",
      "Teams must complete a mid-term report according to the prescribed guidelines.",
      "The final submission must include a structured research report with supporting analysis and data.",
      "Teams will also prepare a presentation and video summarising their research findings.",
    ],

    allowTeams: true,

    maxTeamSize: 4,

    image: "/competitions/finsearch.jpg",
  },

  {
    id: "1",

    slug: "erc-2026",

    name: "Equity Research Competition 2026",

    shortDescription:
      "Analyse a publicly listed company, build an investment thesis, and pitch a buy, sell, or hold recommendation.",

    description:
      "The Equity Research Competition is Finance Club's flagship stock-picking and analysis competition. Participants select and analyse a publicly listed company on the Indian stock market, conducting detailed research to develop a clear investment thesis. Teams evaluate the company's business, financial performance, industry positioning, valuation, risks, and future prospects before presenting a well-supported buy, sell, or hold recommendation. Participants are expected to combine rigorous analysis with strong financial modelling and communicate their conclusions through a structured equity research report and pitch presentation.",

    status: "active",

    registrationDeadline: "2026-09-26",

    submissionDeadline: "2026-04-15",

    resultsDate: "2026-04-25",

    rules: [
      "Teams of 1–3 members are allowed.",
      "Teams may select a publicly listed company from the Indian stock market.",
      "The analysis should include the company's business model, industry, financial performance, valuation, and key risks.",
      "Participants must develop a clear buy, sell, or hold investment recommendation.",
      "A structured equity research report and pitch presentation must be submitted in the prescribed format.",
      "All assumptions, financial models, data sources, and conclusions must be clearly supported.",
      "Plagiarism or misrepresentation of analysis will result in disqualification.",
    ],

    allowTeams: true,

    maxTeamSize: 3,

    image: "/competitions/erc.jpg",
  },
  {
    id: "ibcc-2027",

    slug: "investment-banking-case",

    name: "Investment Banking Case Competition",

    shortDescription:
      "Solve transaction-focused M&A and IPO cases and build decision-ready investment banking pitch decks.",

    description:
      "The Investment Banking Case Competition is an experiential competition designed to simulate real-world investment banking mandates and decision-making environments. Participants work through complex financial scenarios across two tracks — Mergers & Acquisitions and Initial Public Offerings. Teams are expected to evaluate strategic alternatives, apply valuation thinking, analyse transaction considerations, and build structured investment theses before delivering clear, decision-ready pitch decks. The competition emphasises the analytical rigour, commercial awareness, and narrative clarity expected in high-stakes financial roles.",

    status: "upcoming",

    registrationDeadline: "2026-12-01",

    submissionDeadline: "2027-01-20",

    resultsDate: "2027-01-30",

    rules: [
      "Teams of up to 4 members are allowed.",
      "The competition consists of transaction-focused case tracks such as Mergers & Acquisitions and Initial Public Offerings.",
      "Teams must analyse the provided financial and strategic scenario under the stated case constraints.",
      "Recommendations should be supported by structured analysis and appropriate valuation thinking.",
      "The final deliverable must be presented as a clear and decision-ready pitch deck.",
      "All submissions must follow the format, timeline, and evaluation criteria released with the case.",
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
      "Test your understanding of financial analysis, quantitative methods, and investment principles through a CFA-aligned challenge.",

    description:
      "The Finance Quiz — CFA Collaboration is a rigorous finance competition conducted in association with the CFA Institute. Structured as a CFA Scholarship Test, the competition evaluates participants across financial analysis, quantitative methods, investment principles, and other concepts aligned with the CFA Level I curriculum. The event is designed to test both conceptual understanding and the ability to apply financial knowledge under competitive conditions, while giving participants exposure to globally recognised standards in investment education.",

    status: "past",

    registrationDeadline: "2027-01-17",

    submissionDeadline: "2025-11-10",

    resultsDate: "2025-11-15",

    rules: [
      "Individual participation is required.",
      "The competition evaluates financial analysis, quantitative methods, and investment principles.",
      "Questions are designed around concepts aligned with the CFA Level I curriculum.",
      "Participants must follow the format and timing announced for each round or stage.",
      "External assistance or unauthorised materials are prohibited unless explicitly permitted.",
      "Top performers may be eligible for prizes, scholarships, or other announced rewards.",
    ],

    allowTeams: false,

    maxTeamSize: 1,

    image: "/competitions/quiz.jpg",

    partnerLogo: "/cfa_institute.png",

    partnerName: "CFA Institute",
  },
  {
    id: "5",

    slug: "finance-quiz-cfa-2025",

    name: "Vittharth",

    shortDescription:
      "Test your understanding of financial analysis, quantitative methods, and investment principles through a CFA-aligned challenge.",

    description:
      "The Finance Quiz — CFA Collaboration is a rigorous finance competition conducted in association with the CFA Institute. Structured as a CFA Scholarship Test, the competition evaluates participants across financial analysis, quantitative methods, investment principles, and other concepts aligned with the CFA Level I curriculum. The event is designed to test both conceptual understanding and the ability to apply financial knowledge under competitive conditions, while giving participants exposure to globally recognised standards in investment education.",

    status: "past",

    registrationDeadline: "2026-06-07",

    submissionDeadline: "2025-11-10",

    resultsDate: "2025-11-15",

    rules: [
      "Individual participation is required.",
      "The competition evaluates financial analysis, quantitative methods, and investment principles.",
      "Questions are designed around concepts aligned with the CFA Level I curriculum.",
      "Participants must follow the format and timing announced for each round or stage.",
      "External assistance or unauthorised materials are prohibited unless explicitly permitted.",
      "Top performers may be eligible for prizes, scholarships, or other announced rewards.",
    ],

    allowTeams: false,

    maxTeamSize: 1,

    image: "/competitions/quiz.jpg",

    partnerLogo: "/cfa_institute.png",

    partnerName: "CFA Institute",
  },
];