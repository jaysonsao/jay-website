import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <div className="space-y-10">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
      >
        ← Back to home
      </Link>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-40px_rgba(15,23,42,0.25)]">
        <div className="relative h-80 w-full bg-slate-100 sm:h-[440px]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-400">
              Preview coming soon
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-[1.4fr,0.6fr]">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              {project.title}
            </h1>
            <p className="text-base text-slate-600">{project.summary}</p>
          </div>
          <p className="max-w-2xl text-base text-slate-700">
            A detailed project story is coming soon. This placeholder will be
            replaced with the final case study.
          </p>
          <a
            href={project.link ?? "https://example.com"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-semibold text-[hsl(186_70%_38%)] transition hover:text-[hsl(186_70%_30%)]"
          >
            Project link →
          </a>
        </div>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Tech Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-600">
            {project.stack.map((tool) => (
              <span
                key={`${project.slug}-stack-${tool}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1"
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
