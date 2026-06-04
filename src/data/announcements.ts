export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "competition" | "event" | "resource" | "general";
  image?: string;
}

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Equity Research Competition — Registrations Open!",
    content: "Finance Club presents the Equity Research Competition! Pick a stock, analyse it, and pitch it. Open to teams of 1-3. No prerequisites required. A perfect window into stock analysis. Register now — link in bio!",
    date: "2026-03-10",
    category: "competition",
    image: "/announcements/erc-poster.jpeg",
  },
  {
    id: "2",
    title: "FinMUN at FinFest — Committees Announced",
    content: "Finance Club presents FinMUN as part of FinFest! Two committees — ECOFIN (UNGA Second Committee) and World Economic Forum (WEF). Prize pool: ₹40K. Join. Negotiate. Resolve. Registrations are open!",
    date: "2026-01-10",
    category: "event",
    image: "/announcements/finmun-poster.jpeg",
  },
  {
    id: "3",
    title: "FinSearch 2026 Announced",
    content: "FinSearch, our multi-round research challenge, is back for 2026. Individual participation only. Three rounds: Quiz, Case Study, and Research Report. Register by March 25th.",
    date: "2026-03-05",
    category: "competition",
  },
  {
    id: "4",
    title: "New Resource: PE/VC Primer Released",
    content: "Our latest guide on Private Equity & Venture Capital fundamentals is now available in the Resources section. Covers deal structures, LBO modeling, and fund economics.",
    date: "2026-01-28",
    category: "resource",
  },
  {
    id: "5",
    title: "Weekend Bootcamp: Financial Modeling",
    content: "Join us this Saturday for an intensive financial modeling bootcamp. Learn to build DCF and LBO models from scratch. Open to all IIT Bombay students.",
    date: "2026-02-20",
    category: "event",
  },
  {
    id: "6",
    title: "Guest Lecture: Career in Quantitative Finance",
    content: "We are hosting a guest lecture on careers in quantitative finance by an IIT Bombay alumnus currently working at a leading quant fund. Don't miss this opportunity!",
    date: "2026-02-10",
    category: "event",
  },
  {
    id: "7",
    title: "Finance Club Recruitment 2026",
    content: "Applications for Finance Club convener positions are now open for the 2026-27 academic year. Apply through the Google Form linked in our social media handles.",
    date: "2026-01-15",
    category: "general",
  },
];
