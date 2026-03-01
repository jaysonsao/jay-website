import Image from "next/image";
import { notFound } from "next/navigation";
import ProjectBackButton from "@/components/ProjectBackButton";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }
  const introParagraphs = project.detail.intro
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <ProjectBackButton
        className="inline-flex items-center border-0 bg-transparent p-0 text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      />

      <section className="overflow-hidden border border-stone-300 bg-[hsl(42_36%_92%)] dark:border-zinc-700 dark:bg-zinc-900">
        <div className="relative h-80 w-full bg-[hsl(42_24%_86%)] dark:bg-zinc-800 sm:h-[440px]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="100vw"
              className="object-contain p-3 sm:p-5"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-500">
              Preview coming soon
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-10 border-t border-stone-300 pt-8 dark:border-zinc-800 md:grid-cols-[1.4fr,0.6fr]">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-zinc-100">
                {project.title}
              </h1>
              <a
                href={project.link ?? "https://github.com/jaysonsao/equitable"}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-sm font-semibold text-[hsl(186_70%_38%)] transition hover:text-[hsl(186_70%_30%)] dark:text-zinc-200 dark:hover:text-zinc-100"
              >
                Project Link
              </a>
            </div>
          </div>
          <div className="max-w-2xl space-y-4 text-base text-slate-700 dark:text-zinc-300">
            {introParagraphs.map((paragraph, index) => (
              <p key={`${project.slug}-intro-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="h-fit border border-stone-300 bg-[hsl(42_36%_92%)] px-5 py-4 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-zinc-400">
            Tech Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-600 dark:text-zinc-300">
            {project.stack.map((tool) => (
              <span
                key={`${project.slug}-stack-${tool}`}
                className="border border-stone-300 bg-[hsl(42_35%_92%)] px-2 py-0.5 dark:border-zinc-700 dark:bg-zinc-800"
              >
                {tool}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
