import { Briefcase, GraduationCap, Download } from "lucide-react";
import type { TimelineEntry } from "@/types/content";
import type { Site } from "@/types/content";

export default function WorkEducation({
  entries,
  site,
}: {
  entries: TimelineEntry[];
  site: Site;
}) {
  if (entries.length === 0) return null;

  return (
    <section id="work-education" className="py-24 border-t border-base-800">
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
              Work &amp; Education
            </h2>
          </div>

          {site.resumeReady && (
            <a
              href={site.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full card-border hover:border-white/30 transition-colors text-white px-5 py-2.5 text-sm"
            >
              <Download size={16} />
              Download CV
            </a>
          )}
        </div>

        <ol className="mt-12 relative border-l border-base-700 ml-1">
          {entries.map((entry, i) => (
            <li key={i} className="ml-6 pb-10 last:pb-0">
              <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-base-950 border border-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/40">
                {entry.type === "work" ? (
                  <Briefcase size={14} />
                ) : (
                  <GraduationCap size={14} />
                )}
                <span className="font-mono">{entry.period}</span>
              </div>
              <h3 className="mt-1.5 text-base font-semibold text-white">
                {entry.title} · {entry.place}
              </h3>
              {entry.description && (
                <p className="mt-1.5 text-sm text-white/55 leading-relaxed">
                  {entry.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
