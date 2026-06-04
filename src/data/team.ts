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
    name: "Ritwik Raghav",
    role: "Club Manager",
    category: "manager",
    photo: "/team/placeholder.jpg",
    phone: "+91 98765 43210",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://linkedin.com/in/ritwikraghav",
  },
  {
    id: "2",
    name: "Kopal Goel",
    role: "Club Manager",
    category: "manager",
    photo: "/team/placeholder.jpg",
    phone: "+91 98765 43211",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://linkedin.com/in/kopalgoel",
  },

  // ── CONVENERS (6) ──
  {
    id: "3",
    name: "Kunal Gore",
    role: "Convener",
    category: "convener",
    photo: "/team/placeholder.jpg",
    phone: "+91 98765 43212",
    email: "kunalgore07@gmail.com",
    linkedin: "https://linkedin.com/in/kunalgore",
  },
  {
    id: "4",
    name: "Deepti Choubey",
    role: "Convener",
    category: "convener",
    photo: "/team/placeholder.jpg",
    phone: "+91 98765 43213",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://linkedin.com/in/deeptichoubey",
  },
  {
    id: "5",
    name: "Venna Kartik",
    role: "Convener",
    category: "convener",
    photo: "/team/placeholder.jpg",
    phone: "+91 98765 43214",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://linkedin.com/in/vennakartik",
  },
  {
    id: "6",
    name: "Rajdeep Agarwal",
    role: "Convener",
    category: "convener",
    photo: "/team/placeholder.jpg",
    phone: "+91 98765 43215",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://linkedin.com/in/rajdeepagarwal",
  },
  {
    id: "7",
    name: "Shashwat Gupta",
    role: "Convener",
    category: "convener",
    photo: "/team/placeholder.jpg",
    phone: "+91 98765 43216",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://linkedin.com/in/shashwatgupta",
  },
  {
    id: "8",
    name: "Shreya Goyal",
    role: "Convener",
    category: "convener",
    photo: "/team/placeholder.jpg",
    phone: "+91 98765 43217",
    email: "financeclub@iitb.ac.in",
    linkedin: "https://linkedin.com/in/shreyagoyal",
  },
];
