import type { Site } from "@/types/content";

export default function Footer({ site }: { site: Site }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-800 py-8">
      <div className="section-shell flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-white/40">
          © {year} {site.name} — {site.role}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-white/50 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-white/50 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.links.email}`}
            className="text-white/50 hover:text-white transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
