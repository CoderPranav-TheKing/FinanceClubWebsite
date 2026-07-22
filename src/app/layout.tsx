import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Aboreto } from 'next/font/google'
import { Lato } from "next/font/google";
import { Newsreader } from 'next/font/google'
import { Rock_Salt } from 'next/font/google'

const rockSalt = Rock_Salt({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rocksalt',
})

const test = Newsreader({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sans',
})

const test2 = Lato({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
})

const fascinate = Aboreto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fascinate',
})

const inter = Inter({
  variable: "--font-extr",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-ex",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Finance Club IIT Bombay",
    template: "%s | Finance Club IIT Bombay",
  },
  description: "The premier finance society at IIT Bombay — competitions, research, resources, and industry exposure for aspiring finance professionals.",
  keywords: ["Finance Club", "IIT Bombay", "finance", "competitions", "equity research", "trading", "investment banking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fascinate.variable} ${rockSalt.variable} ${spaceGrotesk.variable} ${test.variable} ${test2.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
