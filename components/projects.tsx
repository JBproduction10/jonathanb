import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types/content";

function ProjectMedia({ project }: { project: Project }) {
  const frame = (
    <>
      <div className="relative aspect-video rounded-2xl card-border bg-base-900 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        {project.previewUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-950/0 group-hover:bg-base-950/55 transition-colors duration-300">
            <span className="flex items-center gap-2 rounded-full bg-white text-base-950 text-sm font-semibold px-5 py-2.5 opacity-0 translate-y-2 scale-95 shadow-lg group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300">
              <ExternalLink size={15} />
              Preview Project
            </span>
          </div>
        )}
      </div>

      {/* Phone mockup — reuses the same screenshot, cropped to its right
          edge, to suggest the responsive/mobile view without needing a
          second image asset per project. Hidden until the card is
          hovered. */}
      <div className="pointer-events-none absolute -bottom-7 -right-3 sm:-right-6 w-[30%] aspect-[9/19] rounded-[1.4rem] border-[3px] border-[#1f2430] bg-[#0b0d12] shadow-2xl overflow-hidden opacity-0 translate-y-3 scale-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
        <Image
          src={project.image}
          alt=""
          aria-hidden
          fill
          className="object-cover object-right"
          sizes="20vw"
        />
      </div>
    </>
  );

  if (project.previewUrl) {
    return (
      <a
        href={project.previewUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open live preview of ${project.title}`}
        className="group relative block pb-7 pr-3 sm:pr-6"
      >
        {frame}
      </a>
    );
  }

  return <div className="relative pb-7 pr-3 sm:pr-6">{frame}</div>;
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 border-t border-base-800">
      <div className="section-shell">
        <div className="text-center">
          <p className="eyebrow">Projects</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Featured Work
          </h2>
          <p className="mt-3 text-white/45 max-w-xl mx-auto">
            A selection of projects showcasing my skills in frontend development
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20">
          {projects.map((project, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={project.slug}
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  reversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ProjectMedia project={project} />

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-white/55 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs rounded-full card-border bg-base-800 text-white/60 px-3 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    {project.previewUrl && (
                      <a
                        href={project.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-soft transition-colors text-white text-sm font-medium px-5 py-2.5"
                      >
                        <ExternalLink size={15} />
                        Preview Project
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View on GitHub"
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full card-border text-white/70 hover:text-white hover:border-white/30 transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
