import type { Site } from "@/types/content";

export default function About({ site }: { site: Site }) {
  const { about } = site;

  return (
    <section id="about" className="py-24 border-t border-base-800">
      <div className="section-shell">
        <p className="eyebrow">{about.eyebrow}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white max-w-2xl leading-tight">
          {about.heading} <span className="text-white/35">{about.headingAccent}</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-white/55 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="rounded-2xl card-border bg-base-900 p-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-white/45">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-base-700">
              <p className="text-sm text-white/70 mb-4">Core Values</p>
              <div className="flex flex-wrap gap-2">
                {about.coreValues.map((value) => (
                  <span
                    key={value}
                    className="text-xs rounded-full card-border bg-base-800 text-white/70 px-3 py-1.5"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
