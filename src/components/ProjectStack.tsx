"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectStackProps = {
  projects: Project[];
};

function WaterProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)]"
    >
      <article className="water-card relative flex flex-col border border-[hsl(186_45%_70%)] bg-[hsl(210_28%_18%)] text-slate-100 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.6)] md:flex-row">
        <div className="relative h-56 w-full shrink-0 border-b border-[hsl(186_40%_45%)] bg-[hsl(210_30%_22%)] md:h-52 md:w-72 md:border-b-0 md:border-r">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(min-width: 768px) 240px, 100vw"
              className="object-contain p-6"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.3em] text-slate-400">
              {project.title}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center px-6 py-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.24em] text-slate-300">
              {project.year}
            </span>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.title}
            </h3>
          </div>
          <div className="mt-5">
            <div className="space-y-3 text-center">
              <p className="text-sm text-slate-200">{project.summary}</p>
              <p className="text-sm text-slate-300">{project.focus}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[hsl(186_70%_70%)]">
              {project.stack.slice(0, 4).map((tool) => (
                <span
                  key={`${project.slug}-${tool}`}
                  className="border border-[hsl(186_55%_55%)] bg-[hsl(210_30%_24%)] px-3 py-1"
                >
                  {tool}
                </span>
              ))}
              <span className="text-[hsl(186_70%_70%)]">
                View project →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProjectStack({ projects }: ProjectStackProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <WaterProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
