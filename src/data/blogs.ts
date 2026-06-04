export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "indian-market-outlook-2026",
    title: "Indian Market Outlook 2026: Key Sectors to Watch",
    author: "Arjun Mehta",
    date: "2026-03-01",
    excerpt: "An analysis of the Indian equity market heading into FY27, highlighting sectors poised for growth amid evolving macroeconomic conditions.",
    content: `The Indian equity market continues to present compelling opportunities as we move into FY27. With GDP growth projected at 6.8%, several structural tailwinds are driving sector-specific opportunities.

## Technology & Digital Infrastructure

India's digital transformation is accelerating. With the government's push toward Digital India 2.0, companies in cloud computing, cybersecurity, and digital payments are expected to see sustained growth. The IT services sector, while facing near-term headwinds from global slowdowns, remains structurally positioned for long-term gains.

## Financial Services

The BFSI sector stands to benefit from rising credit penetration and a growing middle class. With the RBI's accommodative stance likely to continue, NBFCs and fintech companies could see significant tailwinds.

## Renewable Energy

India's commitment to achieving 500 GW of renewable energy capacity by 2030 is creating massive investment opportunities. Solar and wind energy companies, along with green hydrogen players, deserve attention.

## Risks to Watch

- Global commodity price fluctuations
- Geopolitical tensions affecting FDI flows  
- Currency volatility impacting import-dependent sectors

*The views expressed are personal and do not constitute investment advice.*`,
    image: "/blog/market-outlook.jpg",
  },
  {
    id: "2",
    slug: "breaking-into-investment-banking",
    title: "Breaking into Investment Banking: A Student's Guide",
    author: "Priya Sharma",
    date: "2026-02-15",
    excerpt: "A practical roadmap for IIT Bombay students looking to build a career in investment banking, from skill-building to interview preparation.",
    content: `Investment banking remains one of the most sought-after career paths for students interested in finance. Here's a comprehensive guide based on our interactions with alumni and industry professionals.

## Building Your Foundation

Start with understanding the core concepts: financial accounting, corporate finance, and valuation. Resources like Damodaran's courses and Wall Street Prep can accelerate your learning.

## Key Skills to Develop

1. **Financial Modeling** - Build models from scratch, not just templates
2. **Valuation** - Master DCF, comparable companies, and precedent transactions
3. **Industry Knowledge** - Follow markets, read equity research reports
4. **Communication** - Be concise and structured in your thinking

## The Recruitment Timeline

Most IB recruitment at IIT Bombay happens through campus placements. Preparation should start at least 6 months before the placement season.

## Interview Preparation

Focus on technical questions (LBO, M&A, valuation) and fit questions. Practice with peers and attend Finance Club's mock interview sessions.

*Best of luck with your preparation! Reach out to the Finance Club team for mentorship.*`,
    image: "/blog/ib-guide.jpg",
  },
  {
    id: "3",
    slug: "cryptocurrency-regulations-india",
    title: "Understanding Cryptocurrency Regulations in India",
    author: "Rahul Gupta",
    date: "2026-01-20",
    excerpt: "A deep dive into India's evolving regulatory landscape for cryptocurrencies and digital assets.",
    content: `The cryptocurrency regulatory landscape in India has undergone significant changes over the past few years. This article examines the current state of crypto regulations and what it means for investors and traders.

## Current Regulatory Framework

India's approach to crypto regulation has been characterized by a gradual shift from skepticism to a framework-based approach. Key developments include clarity on taxation and compliance requirements.

## Tax Implications

Cryptocurrency gains are taxed at 30% with an additional TDS of 1% on transfers. Understanding these implications is crucial for anyone trading digital assets.

## The Road Ahead

With India's G20 presidency having pushed for global crypto regulation standards, we can expect more clarity in the coming years.

*This article is for educational purposes only and does not constitute financial or legal advice.*`,
  },
];
