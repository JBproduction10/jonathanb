"use client";

import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import type { Site } from "@/types/content";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ site }: { site: Site }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // "dark" reflects whether the light theme is currently OFF (i.e. we're
  // showing the moon icon). Initialized to true so server/client markup
  // matches; the real value is read from the DOM (set by the inline
  // theme-init script in layout.tsx) right after mount.
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(!document.documentElement.classList.contains("light"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("light", !next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore (e.g. storage disabled)
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-base-950/85 border-b border-base-800 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav className="section-shell flex items-center justify-between h-16">
        <a href="#" className="font-bold tracking-tight text-lg text-white">
          {site.shortName}
          <span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-white/70 hover:text-white transition-colors"
          >
            {dark ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            className="md:hidden text-white/80"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-base-800 bg-base-950/95 backdrop-blur">
          <div className="section-shell flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-white/80 hover:text-white text-sm border-b border-base-800 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
