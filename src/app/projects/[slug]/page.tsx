import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
        >
          ← Back to home
        </Link>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">{project.summary}</p>
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-[hsl(186_55%_84%)] bg-white shadow-[0_24px_60px_-50px_rgba(48,196,204,0.5)]">
          <div className="relative flex h-72 w-full items-center justify-center bg-[hsl(186_70%_96%)]">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain"
                priority
              />
            ) : (
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Preview coming soon
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.3)]">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Role
            </p>
            <p className="mt-2 text-base text-slate-800">{project.role}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.3)]">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Focus
            </p>
            <p className="mt-2 text-base text-slate-800">{project.focus}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.3)]">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Stack
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-[hsl(186_70%_32%)]">
              {project.stack.map((tool) => (
                <span
                  key={`${project.slug}-${tool}`}
                  className="rounded-full border border-[hsl(186_60%_80%)] bg-[hsl(186_70%_94%)] px-3 py-1"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-7 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.25)]">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Overview
          </p>
          <p className="mt-3 text-base text-slate-700">{project.detail.intro}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white px-7 py-6 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.25)]">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Problem
            </p>
            <p className="mt-3 text-base text-slate-700">
              {project.detail.problem}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white px-7 py-6 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.25)]">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Approach
            </p>
            <p className="mt-3 text-base text-slate-700">
              {project.detail.approach}
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-7 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.25)]">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Outcome
          </p>
          <p className="mt-3 text-base text-slate-700">
            {project.detail.outcome}
          </p>
          <div className="mt-5">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Highlights
            </p>
            <ul className="mt-3 space-y-2 text-base text-slate-700">
              {project.highlights.map((highlight) => (
                <li key={`${project.slug}-detail-${highlight}`}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
