import { Zap, Eye, LayoutPanelLeft, Target, Clock } from "lucide-react";
import type { Strength } from "@/data/strengths";

// Icons map 1:1 with the order of data/strengths.ts. If you reorder or add
// entries there, keep this array in sync (falls back to Zap otherwise).
const icons = [Zap, Eye, LayoutPanelLeft, Target, Clock];

export default function Strengths({ strengths }: { strengths: Strength[] }) {
  return (
    <section className="py-24 border-t border-base-800">
      <div className="section-shell">
        <div className="text-center">
          <p className="eyebrow">Strengths</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            What sets me apart
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {strengths.map((strength, i) => {
            const Icon = icons[i] ?? Zap;
            return (
              <div
                key={strength.title}
                className="group rounded-2xl card-border bg-base-900 p-7 transition-colors hover:border-accent/60"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-base-800 text-white/80 transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <Icon size={18} />
                </div>
                <h3 className="mt-5 text-white font-semibold">
                  {strength.title}
                </h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">
                  {strength.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
