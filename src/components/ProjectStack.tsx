"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectStackProps = {
  projects: Project[];
};

function handlePointerMove(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  target.style.setProperty("--water-x", `${x}px`);
  target.style.setProperty("--water-y", `${y}px`);
}

function handlePointerLeave(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  const target = event.currentTarget;
  target.style.removeProperty("--water-x");
  target.style.removeProperty("--water-y");
}

export default function ProjectStack({ projects }: ProjectStackProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)]"
        >
          <article className="water-card relative flex flex-col border border-[hsl(186_55%_84%)] bg-white shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(186_60%_70%)] hover:shadow-[0_26px_70px_-46px_rgba(48,196,204,0.45)] md:flex-row">
            <div className="relative h-48 w-full shrink-0 border-b border-[hsl(186_55%_84%)] bg-[hsl(186_70%_96%)] transition-colors duration-300 group-hover:bg-[hsl(186_70%_94%)] md:h-44 md:w-60 md:border-b-0 md:border-r">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  fill
                  sizes="(min-width: 768px) 240px, 100vw"
                  className="object-contain p-6 transition duration-300 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.3em] text-slate-400">
                  {project.title}
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between px-6 py-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[hsl(186_70%_30%)]">
                    {project.title}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {project.year}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{project.summary}</p>
                <p className="mt-3 text-sm text-slate-500">{project.focus}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[hsl(186_70%_32%)]">
                {project.stack.slice(0, 4).map((tool) => (
                  <span
                    key={`${project.slug}-${tool}`}
                    className="border border-[hsl(186_60%_80%)] bg-[hsl(186_70%_94%)] px-3 py-1"
                  >
                    {tool}
                  </span>
                ))}
                <span className="ml-auto text-[hsl(186_70%_32%)] transition-transform duration-300 group-hover:translate-x-1">
                  View project →
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
