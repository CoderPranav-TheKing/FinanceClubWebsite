export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
}

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Jane Street",
    logo: "/janestreet.png",
    website: "https://www.janestreet.com",
  },
  {
    id: "2",
    name: "IMC Trading",
    logo: "/imc.png",
    website: "https://www.imc.com",
  },
  {
    id: "3",
    name: "Citadel",
    logo: "/citadel.png",
    website: "https://www.citadel.com",
  },
  {
    id: "4",
    name: "Bernstein",
    logo: "/bernstein.png",
    website: "https://www.bernstein.com",
  },
  {
    id: "5",
    name: "Barclays",
    logo: "/barclays.png",
    website: "https://www.barclays.com",
  },
  {
    id: "6",
    name: "TRC",
    logo: "/trc.png",
    website: "#",
  },
  {
    id: "7",
    name: "Aditya Birla",
    logo: "/adityabirla.png",
    website: "https://www.adityabirla.com",
  },
  {
    id: "8",
    name: "CFA Institute",
    logo: "/cfa_institute.png",
    website: "https://www.cfainstitute.org",
  },
];
