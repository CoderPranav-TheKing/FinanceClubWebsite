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
  // ── MIXED EVENT ORDER ──

  {
    id: "comp-1",
    name: "Equity Research Competition",
    category: "competitions",
    description:
      "A two-week stock analysis challenge culminating in a detailed investment pitch.",
    participationScale: "200+ participants",
    outcome: "Exposure to equity research, financial modelling, and pitch-deck writing.",
  },

  {
    id: "boot-1",
    name: "Learners' Space - Fundamentals of Finance",
    category: "bootcamps",
    description:
      "A four-week bootcamp covering core finance concepts, markets, asset classes and analysis.",
    participationScale: "820+ registrations",
    outcome: "90+ students completed the bootcamp and received a certificate of completion.",
  },

  {
    id: "sess-1",
    name: "The Art of Fundraising - Venture Capital",
    category: "sessions",
    description:
      "A practical walkthrough of startup fundraising, evaluation and the venture capital lifecycle.",
    participationScale: "150+ attendees",
    outcome: "A practical foundation in venture investing and the investor mindset.",
  },

  {
    id: "misc-1",
    name: "Internship Preparation Programme",
    category: "miscellaneous",
    description:
      "IIT Bombay students shared strategies and experiences from top finance and quant internships.",
    participationScale: "300+ students",
    outcome: "Higher conversion rates for finance internship applications.",
  },

  {
    id: "comp-2",
    name: "Investment Banking Case Competition",
    category: "competitions",
    description:
      "A deal simulation across M&A and IPO tracks, built around real-world banking mandates.",
    participationScale: "120+ participants",
    outcome: "Hands-on experience with deal evaluation, valuation thinking, and narrative building.",
  },

  {
    id: "work-1",
    name: "Private Equity Workshop (Warburg Pincus)",
    category: "workshops",
    description:
      "An exclusive workshop exploring private equity deal sourcing, evaluation and portfolio management.",
    participationScale: "100+ attendees",
    outcome: "Practical understanding of PE investment lifecycle.",
  },

  {
    id: "sess-2",
    name: "Citadel Securities Session",
    category: "sessions",
    description:
      "An insider look at quantitative trading, market-making and careers at Citadel Securities.",
    participationScale: "200+ attendees",
    outcome: "Understanding of quant trading infrastructure and recruiting pipeline.",
    partnerLogo: "/citadel.png",
    partnerName: "Citadel",
  },

  {
    id: "fest-1",
    name: "Keynote Speaker Session",
    category: "finfest",
    description:
      "A keynote on the future of finance, consulting and the changing corporate landscape.",
    participationScale: "400+ attendees",
    outcome: "A firsthand, macro view of how real-world corporate strategy is made.",
  },

  {
    id: "comp-3",
    name: "Citadel Trading ID Challenge",
    category: "competitions",
    description:
      "A fast-paced trading simulation inspired by real-world market-making environments.",
    participationScale: "150+ participants",
    outcome: "Hands-on exposure to trading psychology and market microstructure.",
    partnerLogo: "/citadel.png",
    partnerName: "Citadel",
  },

  {
    id: "boot-2",
    name: "Quant101 - Winter School of Quantitative Finance",
    category: "bootcamps",
    description:
      "A month-long introduction to quant finance, derivatives, risk, and algorithmic trading.",
    participationScale: "1200+ registrations",
    outcome: "One of the club's most successful academic programs, building a strong analytical foundation in quant finance.",
    partnerName: "IAQS",
  },

  {
    id: "sess-3",
    name: "Career Advice in Investment Banking",
    category: "sessions",
    description:
      "Industry insights on breaking into investment banking and building a career in finance.",
    participationScale: "150+ attendees",
    outcome: "Clarity on industry expectations, career progression, and strategic positioning.",
  },

  {
    id: "conf-1",
    name: "FinFest",
    category: "conferences",
    description:
      "Finance Club's flagship three-day summit featuring competitions, speakers, workshops and networking.",
    participationScale: "500+ participants",
    outcome: "Comprehensive exposure to the finance industry across multiple verticals.",
  },

  {
    id: "comp-4",
    name: "Finance Quiz - CFA Collaboration",
    category: "competitions",
    description:
      "A CFA-focused finance quiz testing investment, quantitative and analytical knowledge.",
    participationScale: "300+ participants",
    outcome: "Benchmarked readiness for globally recognised finance qualifications.",
    partnerLogo: "/cfa_institute.png",
    partnerName: "CFA Institute",
  },

  {
    id: "sess-4",
    name: "Mergers & Acquisitions Session",
    category: "sessions",
    description:
      "An introduction to M&A structures, synergies, valuations and the deal advisory process.",
    participationScale: "160+ attendees",
    outcome: "Understanding of M&A mechanics and deal execution.",
  },

  {
    id: "misc-2",
    name: "Placement Preparation Programme",
    category: "miscellaneous",
    description:
      "Alumni shared interview strategies and placement advice across banking, quant, and trading roles.",
    participationScale: "200+ students",
    outcome: "Thorough preparation for Day-0/Day-1 placement processes.",
  },

  {
    id: "fest-2",
    name: "FINMUN",
    category: "finfest",
    description:
      "Finance Club's finance-focused MUN exploring global economics, trade and policymaking.",
    participationScale: "200+ participants",
    outcome: "Sharper policy articulation and negotiation skills in complex financial-geopolitical scenarios.",
  },

  {
    id: "comp-5",
    name: "Zerodha Varsity Quiz",
    category: "competitions",
    description:
      "A competitive quiz testing financial concepts, markets and real-world investing knowledge.",
    participationScale: "200+ participants",
    outcome: "Strengthened analytical thinking and applied market knowledge.",
    partnerLogo: "/zerodha.png",
    partnerName: "Zerodha",
  },

  {
    id: "sess-5",
    name: "Finance Meets Sustainability",
    category: "sessions",
    description:
      "An exploration of green finance, ESG investing and the future of sustainable capital markets.",
    participationScale: "150+ attendees",
    outcome: "A nuanced understanding of sustainable finance and its intersection with policy.",
  },

  {
    id: "boot-3",
    name: "FinSearch",
    category: "bootcamps",
    description:
      "A two-month research programme tackling advanced finance topics with faculty-style mentorship.",
    participationScale: "Open to all, no prerequisites",
    outcome: "Developed independent research and analytical skills in applied finance topics.",
  },

  {
    id: "misc-3",
    name: "Finance Guides",
    category: "miscellaneous",
    description:
      "Practical guides covering market making, equity research and Bloomberg Terminal workflows.",
    participationScale: "1000+ downloads",
    outcome: "Self-paced learning resources accessible to the entire IITB community.",
  },

  {
    id: "comp-6",
    name: "Portfolio Management Competition",
    category: "competitions",
    description:
      "A portfolio-building challenge balancing client goals, risk and long-term returns.",
    participationScale: "320+ registrations",
    outcome: "Practical financial planning experience translating theory into client-centric strategy.",
    partnerName: "FPA Academy",
  },

  {
    id: "sess-6",
    name: "Corporate Careers in Finance",
    category: "sessions",
    description:
      "A panel exploring careers in corporate finance, treasury and FP&A across industries.",
    participationScale: "200+ attendees",
    outcome: "Broad perspective on non-IB finance career paths.",
  },

  {
    id: "fest-3",
    name: "FinFest Competitions",
    category: "finfest",
    description:
      "Competitive challenges spanning forensic finance, fraud detection and CFA-level concepts.",
    participationScale: "300+ participants",
    outcome: "Competitive benchmarking against top finance talent nationally.",
  },

  {
    id: "sess-7",
    name: "Legal and Financial Frameworks for Businesses",
    category: "sessions",
    description:
      "A startup-focused session on business structuring, funding, IP, taxation and compliance.",
    participationScale: "120+ attendees",
    outcome: "Practical insight into setting up and managing a compliant, scalable venture.",
  },

  {
    id: "misc-4",
    name: "FinSights Newsletter",
    category: "miscellaneous",
    description:
      "A monthly newsletter breaking down major finance, business, and market developments.",
    participationScale: "5 editions, Jun-Oct",
    outcome: "Strengthened students' ability to stay informed and think critically about real-world finance.",
    partnerName: "Finshots",
  },

  {
    id: "sess-8",
    name: "Quantitative Equity Research and Trading",
    category: "sessions",
    description:
      "A masterclass on factor models, data-driven strategies and careers in quantitative finance.",
    participationScale: "180+ attendees",
    outcome: "A strong conceptual and practical grounding in data-driven financial ecosystems.",
  },

  {
    id: "fest-4",
    name: "Market Mayhem",
    category: "finfest",
    description:
      "A live trading game where teams reacted to breaking news and shifting market conditions.",
    participationScale: "250+ participants",
    outcome: "Hands-on understanding of market dynamics and financial analysis under pressure.",
  },

  {
    id: "sess-9",
    name: "Quantitative Arbitrage and Applied Relative Value",
    category: "sessions",
    description:
      "An introduction to pairs trading, statistical arbitrage and exploiting market inefficiencies.",
    participationScale: "150+ attendees",
    outcome: "A structured perspective on quantitative strategies used in algorithmic trading.",
  },

  {
    id: "misc-5",
    name: "The Finance Bulletin",
    category: "miscellaneous",
    description:
      "An insight-driven publication decoding markets, capital flows, innovation and global finance.",
    participationScale: "7300+ Instagram, 5200+ LinkedIn followers",
    outcome: "Informed, trend-aware perspectives on global and domestic finance for students.",
  },

  {
    id: "sess-10",
    name: "Session on CFA Journey",
    category: "sessions",
    description:
      "A guide to the CFA journey, finance careers, scholarships and professional certifications.",
    participationScale: "200+ attendees",
    outcome: "Clarity on career pathways and the role of professional certification in finance.",
    partnerLogo: "/cfa_institute.png",
    partnerName: "CFA Institute",
  },

  {
    id: "fest-5",
    name: "Speaker Session on Applied Risk in Quantitative Finance",
    category: "finfest",
    description:
      "A practical session on measuring and managing market, credit and financial risk.",
    participationScale: "150+ attendees",
    outcome: "A structured understanding of quantitative risk management in real financial decision-making.",
    partnerName: "IAQS",
  },

  {
    id: "sess-11",
    name: "AI and Automation in Equity Research",
    category: "sessions",
    description:
      "An exploration of how AI is reshaping equity research and the analyst skill set.",
    participationScale: "150+ attendees",
    outcome: "A forward-looking perspective on the future of equity research.",
  },

  {
    id: "misc-6",
    name: "Did You Know - How Wars Shape Markets?",
    category: "miscellaneous",
    description:
      "An infographic series exploring how geopolitical conflicts influence markets and asset prices.",
    participationScale: "3000+ reach per post",
    outcome: "Sharper, historically-grounded interpretation of market movements during crises.",
  },

  {
    id: "sess-12",
    name: "Bridging CFA Concepts to Real World Stock Analysis",
    category: "sessions",
    description:
      "A practical bridge between CFA frameworks and real-world equity research techniques.",
    participationScale: "150+ attendees",
    outcome: "A structured, application-oriented approach to equity research.",
    partnerName: "Financial Planning Academy",
  },

  {
    id: "sess-13",
    name: "Beyond the Ticker - Deep Dive into Equity Research",
    category: "sessions",
    description:
      "A Bernstein panel on professional equity research, sales and careers in the industry.",
    participationScale: "180+ attendees",
    outcome: "Realistic clarity on career pathways and recruitment expectations in equity research.",
    partnerName: "Bernstein",
  },
];