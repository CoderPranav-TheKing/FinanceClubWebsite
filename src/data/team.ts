export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "manager" | "convener";
  photo: string;
  phone: string;
  email: string;
  linkedin: string;
}

export const teamMembers: TeamMember[] = [
  // ── MANAGERS (2) ──
  {
    id: "1",
    name: "Kunal Gore",
    role: "Club Manager",
    category: "manager",
    photo: "/kunalgore.png",
    phone: "+91 70209 22818",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/kunalgore1936/",
  },
  {
    id: "2",
    name: "Shreya Goyal",
    role: "Club Manager",
    category: "manager",
    photo: "/shreyagoyal.jpeg",
    phone: "+91 98104 65318",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/shreya-goyal-07a4122b6/",
  },

  // ── CONVENERS (6) ──
  {
    id: "3",
    name: "Arnav Singh",
    role: "Convener",
    category: "convener",
    photo: "/arnavsingh.png",
    phone: "+91 91302 05534",
    email: "pranavjaju13@gmail.com",
    linkedin: "https://www.linkedin.com/in/arnav-singh-156765369/",
  },
  {
    id: "4",
    name: "Pranav Jaju",
    role: "Convener",
    category: "convener",
    photo: "/pranavjaju.jpg",
    phone: "+91 88069 22758",
    email: "pranavjaju13@gmail.com",
    linkedin: "https://www.linkedin.com/in/pranav-jaju-43b644376/",
  },
  {
    id: "5",
    name: "Sahana Kamdar",
    role: "Convener",
    category: "convener",
    photo: "/sahanakamdar.jpeg",
    phone: "+91 99202 65393",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/sahana-kamdar-77a328413/",
  },
  {
    id: "6",
    name: "Jainam Bhansali",
    role: "Convener",
    category: "convener",
    photo: "/jainambhansali.jpeg",
    phone: "+91 85840 96969",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/jainam-bhansali-463851369/",
  },
  {
    id: "7",
    name: "Teertha Gandhi",
    role: "Convener",
    category: "convener",
    photo: "/teerthagandhi.png",
    phone: "+91 70305 13616",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/teerthagandhi/",
  },
  {
    id: "8",
    name: "Akshat Verma",
    role: "Convener",
    category: "convener",
    photo: "/akshat.jpg",
    phone: "+91 92890 28166",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/akshat-verma-368070370/",
  },
];
