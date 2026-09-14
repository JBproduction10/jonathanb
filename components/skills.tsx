import type { SkillGroup } from "@/types/content";

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="py-24 border-t border-base-800">
      <div className="section-shell">
        <div className="text-center">
          <p className="eyebrow">Skills</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Technologies I work with
          </h2>
          <p className="mt-3 text-white/45 max-w-xl mx-auto">
            A comprehensive toolkit for building modern, performant web applications
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs uppercase tracking-wide text-white/40">
                {group.category}
              </h3>
              <div className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex items-center gap-3 rounded-xl card-border bg-base-900 px-4 py-3.5 text-sm text-white/80 transition-colors hover:border-accent/60"
                  >
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:scale-125"
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
