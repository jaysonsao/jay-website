import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectStackProps = {
  projects: Project[];
  showPreview?: boolean;
};

function ProjectCard({
  project,
  showPreview = true,
}: {
  project: Project;
  showPreview?: boolean;
}) {
  if (!showPreview) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-xl border border-black bg-white/70 p-5 no-underline transition hover:bg-slate-100 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)] dark:border-zinc-400 dark:bg-zinc-900/40 dark:hover:bg-zinc-900 dark:focus-visible:ring-zinc-400"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="text-base font-medium text-slate-900 transition group-hover:text-slate-950 dark:text-zinc-100 dark:group-hover:text-white">
            {project.title}
          </span>
          <span className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-zinc-400">
            {project.year}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-zinc-300">
          {project.summary}
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-zinc-300">
          View project →
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)] dark:focus-visible:ring-zinc-400"
    >
      <article className={`relative flex flex-col overflow-hidden border border-stone-300/80 bg-[hsl(42_30%_92%)] transition group-hover:border-stone-400 dark:border-zinc-700 dark:bg-zinc-900 dark:group-hover:border-zinc-500 ${showPreview ? "md:flex-row" : ""}`}>
        {showPreview ? (
          <div className="relative flex w-full shrink-0 items-center justify-center border-b border-stone-300/80 bg-[hsl(42_24%_89%)] p-3 dark:border-zinc-700 dark:bg-zinc-900 md:w-64 md:border-b-0 md:border-r">
            {project.image ? (
              <div className="relative aspect-[47/39] w-full overflow-hidden border border-stone-300/80 bg-[hsl(42_38%_94%)] dark:border-zinc-700 dark:bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  fill
                  sizes="(min-width: 768px) 256px, 100vw"
                  className="object-contain p-1"
                />
              </div>
            ) : (
              <div className="flex aspect-[47/39] w-full items-center justify-center border border-stone-300/80 bg-[hsl(42_38%_94%)] text-sm uppercase tracking-[0.3em] text-slate-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                <span className="px-3 text-center">{project.title}</span>
              </div>
            )}
          </div>
        ) : null}
        <div className="flex flex-1 flex-col justify-center px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-2xl">
              {project.title}
            </h3>
            <span className="border border-stone-300 bg-[hsl(42_34%_93%)] px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {project.year}
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
                What It Is
              </p>
              <p className="text-sm text-slate-700 dark:text-zinc-200">{project.summary}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
                Why It Matters
              </p>
              <p className="text-sm text-slate-700 dark:text-zinc-200">{project.focus}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-700 dark:text-zinc-200">
                {project.stack.map((tool) => (
                  <span
                    key={`${project.slug}-${tool}`}
                    className="border border-stone-300 bg-[hsl(42_34%_93%)] px-2 py-0.5 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm font-semibold text-[hsl(186_68%_36%)] dark:text-zinc-200">
                View Project
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProjectStack({
  projects,
  showPreview = true,
}: ProjectStackProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} showPreview={showPreview} />
      ))}
    </div>
  );
}
