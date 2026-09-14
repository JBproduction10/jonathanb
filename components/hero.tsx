import { Github, ChevronDown } from "lucide-react";
import type { Site } from "@/types/content";

export default function Hero({ site }: { site: Site }) {
  const [line1, line2, line3] = site.heroHeadline;

  return (
    <section id="main" className="relative pt-40 pb-20 overflow-hidden">
      {/* decorative corner outlines */}
      <div className="pointer-events-none absolute -left-10 top-24 h-28 w-28 rounded-3xl border border-base-700/70 hidden sm:block" />
      <div className="pointer-events-none absolute -right-12 top-44 h-16 w-16 rounded-2xl border border-base-700/70 hidden sm:block" />

      <div className="section-shell relative flex flex-col items-center text-center">
        {site.availableForWork && (
          <div className="inline-flex items-center gap-2 rounded-full card-border bg-base-900 px-4 py-1.5 text-xs text-white/70 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for work
          </div>
        )}

        <h1 className="text-4xl sm:text-6xl md:text-[4rem] font-bold tracking-tight leading-[1.12] max-w-4xl">
          <span className="block text-white">{line1}</span>
          <span className="block text-white/35">{line2}</span>
          <span className="block text-white">
            {line3}
            <span className="text-accent">.</span>
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-base sm:text-lg text-white/50 leading-relaxed">
          {site.heroSubline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-accent hover:bg-accent-soft transition-colors text-white font-medium px-7 py-3.5 text-sm"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full card-border hover:border-white/30 transition-colors text-white px-7 py-3.5 text-sm"
          >
            Contact Me
          </a>
        </div>

        <a
          href={site.links.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="mt-10 inline-flex items-center justify-center h-11 w-11 rounded-full card-border text-white/70 hover:text-white hover:border-white/30 transition-colors"
        >
          <Github size={18} />
        </a>

        <a
          href="#about"
          aria-label="Scroll to About"
          className="mt-10 text-white/30 hover:text-white/60 transition-colors"
        >
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
}
