"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/competitions", label: "Events" },
  { href: "/game", label: "Ticker Game" },
  { href: "/resources", label: "Resources" },
  { href: "/team", label: "Team" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handler, { passive: true });

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* FLOATING PILL NAVBAR */}
      <nav
        className={`nav-float transition-all duration-500 ${
          scrolled ? "!top-2" : "top-4"
        }`}
      >
        <div className="flex items-center gap-1">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-[rgba(245,183,49,0.06)] transition-colors"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-[rgba(245,183,49,0.15)]">
              <Image
                src="/logo.jpg"
                alt="Finance Club"
                fill
                className="object-cover"
                sizes="28px"
              />
            </div>

            <span
              className="text-xs font-bold text-cream hidden sm:block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              FC
            </span>
          </Link>

          {/* Separator */}
          <div className="w-px h-5 bg-[rgba(245,230,208,0.08)] mx-1 hidden md:block" />

          {/* Nav Links */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  isActive(link.href) ? "nav-link-active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-[rgba(245,230,208,0.08)] mx-1 hidden md:block" />

          {/* CTA */}
          <Link href="/sponsors" className="nav-cta hidden md:flex">
            Partner
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-cream/50 hover:text-cream transition-colors ml-1"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-[99] md:hidden">
          <div
            className="absolute inset-0 bg-[#0D0A0A]/95 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          />

          <div className="relative flex flex-col items-center justify-center h-full gap-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-2xl font-bold py-3 transition-colors ${
                  isActive(link.href)
                    ? "text-[#FFF8EC]"
                    : "text-cream/60 hover:text-gold"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.label}
              </Link>
            ))}

            <div className="divider-glow w-24 my-4" />

            <Link
              href="/sponsors"
              onClick={() => setOpen(false)}
              className="btn-gold text-sm mt-2"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}