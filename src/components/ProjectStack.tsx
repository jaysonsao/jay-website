import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectStackProps = {
  projects: Project[];
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)] dark:focus-visible:ring-[hsl(186_70%_72%)]"
    >
      <article className="relative flex flex-col overflow-hidden border border-stone-300/80 bg-[hsl(42_30%_92%)] transition group-hover:border-stone-400 dark:border-slate-700 dark:bg-[hsl(217_25%_16%)] dark:group-hover:border-slate-500 md:flex-row">
        <div className="relative flex w-full shrink-0 items-center justify-center border-b border-stone-300/80 bg-[hsl(42_24%_89%)] p-3 dark:border-slate-700 dark:bg-slate-900 md:w-80 md:border-b-0 md:border-r">
          {project.image ? (
            <div className="relative aspect-[47/39] w-full overflow-hidden border border-stone-300/80 bg-[hsl(42_38%_94%)] dark:border-slate-700 dark:bg-slate-950">
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div className="flex aspect-[47/39] w-full items-center justify-center border border-stone-300/80 bg-[hsl(42_38%_94%)] text-sm uppercase tracking-[0.3em] text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
              <span className="px-3 text-center">{project.title}</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              {project.title}
            </h3>
            <span className="border border-stone-300 bg-[hsl(42_34%_93%)] px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {project.year}
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                What It Is
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200">{project.summary}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Why It Matters
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200">{project.focus}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">
                {project.stack.map((tool) => (
                  <span
                    key={`${project.slug}-${tool}`}
                    className="border border-stone-300 bg-[hsl(42_34%_93%)] px-2 py-0.5 dark:border-slate-700 dark:bg-slate-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm font-semibold text-[hsl(186_68%_36%)] dark:text-[hsl(186_70%_72%)]">
                View Project
              </span>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
            {project.highlights.slice(0, 3).map((highlight) => (
              <span
                key={`${project.slug}-${highlight}`}
                className="border border-stone-300 bg-[hsl(42_34%_93%)] px-2 py-0.5 dark:border-slate-700 dark:bg-slate-800"
              >
                {highlight}
              </span>
            ))}
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
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
