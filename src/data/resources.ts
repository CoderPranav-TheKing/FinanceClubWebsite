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
    url: "https://drive.google.com/file/d/1XWASx4Xg-gxkDSQtZvr3uDkL4RWdTSfj/view",
    date: "2026-01-15",
  },
  {
    id: "3",
    title: "Understanding Options & Derivatives",
    description: "Video lecture series on options pricing, Greeks, and trading strategies by industry professionals.",
    type: "video",
    category: "Videos",
    url: "https://www.youtube.com/watch?v=-mO0YOTcCiQ&list=PLX2SHiKfualFiusiT9G5uE9jU3vetvW2x",
    date: "2025-12-10",
  },
  {
    id: "4",
    title: "ERC 2025 Winning Submission",
    description: "Award-winning equity research report from last year's Equity Research Challenge competition.",
    type: "submission",
    category: "Winning Submissions",
    url: "https://drive.google.com/drive/folders/1PNqnspprRyHPsCdAY_WQB2wceEoRtZ6H?usp=sharing",
    date: "2025-11-01",
  },
  {
    id: "10",
    title: "PMC 2025 Winning Submissions",
    description: "Top 3 Consolidated Portfolio reports from last year's Portfolio Management Competition.",
    type: "submission",
    category: "Winning Submissions",
    url: "https://drive.google.com/drive/folders/1tiOd_Kudx3KaXH8X-eMmqc2KWTCxLsBQ?usp=sharing",
    date: "2025-11-01",
  },
  {
    id: "5",
    title: "Bloomberg Terminal Guide",
    description: "Quick reference guide for navigating Bloomberg Terminal functions most useful for students.",
    type: "link",
    category: "Guides",
    url: "https://drive.google.com/drive/folders/1tC5hABxyNhy1FHQtyQqGPIhN96ChvJB7",
    date: "2025-09-20",
  },
  {
    id: "6",
    title: "Market Making Guide",
    description: "An introduction to PE/VC covering deal structures, LBO modeling, and fund economics.",
    type: "pdf",
    category: "Guides",
    url: "https://drive.google.com/file/d/1UwjCu83XFp6AJrBXYoYzVW9r7WlFu6Op/view",
    date: "2026-01-28",
  },
  {
    id: "11",
    title: "PMC 2026 Winning Submissions",
    description: "Top 3 Consolidated Portfolio reports from this year's Portfolio Management Competition.",
    type: "pdf",
    category: "Winning Submissions",
    url: "https://drive.google.com/drive/folders/1reV18-YL8i4Xt7fuH9hrUQzhGmUs7qe3?usp=sharing",
    date: "2026-01-28",
  },
  {
    id: "13",
    title: "IBCC 2026 Winning Submissions",
    description: "Top 2 Consolidated Investment Banking reports from this year's Investment Banking Case Competition.",
    type: "pdf",
    category: "Winning Submissions",
    url: "https://drive.google.com/drive/folders/1UnxeuEV2fWvRvKE1nsKPF-Okq9STZmkL",
    date: "2026-06-15",
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
    id: "9",
    title: "Finsights - 2025 Edition",
    description: "Monthly newsletter series in collaboration with Finshots to deliver concise, high-quality insights on key developments across finance and business.",
    type: "pdf",
    category: "Information Dissemination",
    url: "https://drive.google.com/drive/folders/1LJrLAyN8FfG0VTiZACSGBHZ1EA6qlk5c",
    date: "2026-02-15",
  },
];
