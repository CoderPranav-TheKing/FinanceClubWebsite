export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "link" | "video" | "submission";
  category: string;
  url: string;
  date: string;
}

export const resources: Resource[] = [
  {
    id: "1",
    title: "Introduction to Equity Research",
    description: "A comprehensive guide covering the fundamentals of equity research, including valuation techniques, financial modeling, and report writing.",
    type: "pdf",
    category: "Guides",
    url: "/resources/equity-research-guide.pdf",
    date: "2026-01-15",
  },
  {
    id: "2",
    title: "DCF Modeling Masterclass",
    description: "Step-by-step guide to building a Discounted Cash Flow model from scratch with real company data.",
    type: "pdf",
    category: "Guides",
    url: "/resources/dcf-guide.pdf",
    date: "2026-02-01",
  },
  {
    id: "3",
    title: "Understanding Options & Derivatives",
    description: "Video lecture series on options pricing, Greeks, and trading strategies by industry professionals.",
    type: "video",
    category: "Videos",
    url: "https://youtube.com/playlist?list=example",
    date: "2025-12-10",
  },
  {
    id: "4",
    title: "ERC 2025 Winning Submission",
    description: "Award-winning equity research report from last year's Equity Research Challenge competition.",
    type: "submission",
    category: "Winning Submissions",
    url: "/resources/erc-2025-winner.pdf",
    date: "2025-11-01",
  },
  {
    id: "5",
    title: "Bloomberg Terminal Guide",
    description: "Quick reference guide for navigating Bloomberg Terminal functions most useful for students.",
    type: "link",
    category: "Guides",
    url: "https://example.com/bloomberg-guide",
    date: "2025-09-20",
  },
  {
    id: "6",
    title: "Private Equity & Venture Capital Primer",
    description: "An introduction to PE/VC covering deal structures, LBO modeling, and fund economics.",
    type: "pdf",
    category: "Guides",
    url: "/resources/pe-vc-primer.pdf",
    date: "2026-01-28",
  },
  {
    id: "7",
    title: "FinSearch 2025 Case Study Solutions",
    description: "Detailed solutions and analysis walkthrough for FinSearch 2025 case study rounds.",
    type: "submission",
    category: "Winning Submissions",
    url: "/resources/finsearch-2025-solutions.pdf",
    date: "2025-10-15",
  },
  {
    id: "8",
    title: "Macroeconomics for Finance",
    description: "Video series explaining macroeconomic indicators and their impact on financial markets.",
    type: "video",
    category: "Videos",
    url: "https://youtube.com/playlist?list=macro-example",
    date: "2026-02-15",
  },
];
