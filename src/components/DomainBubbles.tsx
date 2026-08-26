"use client";

const domains = [
  { name: "Equity Research", size: 150, filled: true },
  { name: "Investment Banking", size: 190, filled: false },
  { name: "Private Equity", size: 130, filled: true },
  { name: "Venture Capital", size: 160, filled: false },
  { name: "Quantitative Finance", size: 200, filled: true },
  { name: "Derivatives", size: 120, filled: false },
  { name: "Portfolio Management", size: 280, filled: true },
  { name: "Macroeconomics", size: 170, filled: false },
  { name: "Fintech", size: 110, filled: true },
  { name: "Corporate Finance", size: 180, filled: false },
   { name: "Risk Management", size: 155, filled: true },
  { name: "Sustainable Finance", size: 175, filled: false },
  { name: "Legal Finance", size: 165, filled: true }, 
];

export default function DomainBubbles() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
      {domains.map((d, i) => (
        <div
          key={d.name}
          className={`domain-bubble rounded-full flex items-center justify-center text-center px-4 font-bold cursor-default leading-tight ${
            d.filled
              ? "bg-gold text-[#0D0A0A]"
              : "bg-transparent border-2 border-gold text-gold"
          }`}
          style={{
            width: d.size,
            height: d.size,
            fontSize: Math.max(d.size / 8.5, 14),
            animationDelay: `${(i % 6) * -1.2}s`,
          }}
        >
          {d.name}
        </div>
      ))}
    </div>
  );
}