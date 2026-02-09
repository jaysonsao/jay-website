import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "shadcn/ui",
  "Math.js",
  "Rapid prototyping",
  "Design systems",
];


export default function Home() {
  const marqueeProjects = [...projects, ...projects];

  return (
    <div className="w-full space-y-14 pb-16 pt-12 sm:pt-16">
      <section className="space-y-6">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Projects
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Sliding window into recent work.
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Hover to pause · click to open
          </span>
        </div>
        <div className="px-0">
          <div className="group relative overflow-hidden rounded-3xl border border-[hsl(186_55%_84%)] bg-white shadow-[0_30px_80px_-60px_rgba(48,196,204,0.6)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white via-white/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white via-white/80 to-transparent" />
            <div className="marquee-track flex w-max gap-6 px-6 py-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {marqueeProjects.map((project, index) => (
                <Link
                  key={`${project.slug}-${index}`}
                  href={`/projects/${project.slug}`}
                  className="group/item relative flex w-[260px] flex-col overflow-hidden rounded-3xl border border-[hsl(186_55%_84%)] bg-white shadow-[0_20px_50px_-40px_rgba(15,23,42,0.45)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(48,196,204,0.6)] sm:w-[300px]"
                >
                  <div className="relative flex h-36 w-full items-center justify-center overflow-hidden border-b border-[hsl(186_55%_84%)] bg-[hsl(186_70%_96%)]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        fill
                        sizes="300px"
                        className="object-contain transition duration-300 group-hover/item:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[hsl(186_70%_94%)] text-sm uppercase tracking-[0.3em] text-slate-400">
                        {project.title}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col px-5 py-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-slate-900">
                        {project.title}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {project.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-[hsl(186_70%_32%)]">
                      {project.stack.slice(0, 3).map((tool) => (
                        <span
                          key={`${project.slug}-${tool}`}
                          className="rounded-full border border-[hsl(186_60%_80%)] bg-[hsl(186_70%_94%)] px-3 py-1"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover/item:max-h-28 group-hover/item:opacity-100">
                      <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        Quick notes
                      </div>
                      <ul className="mt-2 space-y-1 text-sm text-slate-600">
                        {project.highlights.map((highlight) => (
                          <li key={`${project.slug}-${highlight}`}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <Link
                key={`${project.slug}-bar`}
                href={`/projects/${project.slug}`}
                className="flex flex-col items-center justify-center gap-1 border border-[hsl(186_55%_84%)] bg-[hsl(186_70%_92%)] px-4 py-4 text-center text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:bg-[hsl(186_70%_88%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)]"
              >
                <span>{project.title}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-600">
                  {project.year}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl space-y-14">
        <header className="space-y-5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.32em] text-slate-500">
            <span>Jayson Sao</span>
            <span className="h-px w-10 bg-slate-300" aria-hidden />
            <span>Product design + engineering</span>
            <span className="h-px w-10 bg-slate-300" aria-hidden />
            <span>Boston / remote</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Portfolio-in-progress...
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              A lighter grid for work-in-flight. I build fast, measurable product
              surfaces and keep the system tidy enough to evolve—more interactive
              previews coming as the projects land.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              Resume
            </a>
            <a
              href="mailto:hello@jayson.design"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
            >
              Let’s talk
            </a>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                Tools & focus
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                The small kit I reach for first.
              </h2>
            </div>
            <span className="text-xs text-slate-500">Always evolving</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[hsl(186_60%_82%)] bg-[hsl(186_70%_94%)] px-3 py-2 text-sm text-slate-800 shadow-[0_12px_30px_-24px_rgba(48,196,204,0.35)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white px-8 py-10 md:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Current focus
            </p>
            <ul className="space-y-3 text-base text-slate-700">
              <li className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" aria-hidden />
                <span>Interface engineering for AI-enabled products.</span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" aria-hidden />
                <span>Design systems that can start lean and scale.</span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" aria-hidden />
                <span>Rapid prototypes that graduate to production without rewrites.</span>
              </li>
            </ul>link
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Availability
            </p>
            <p className="text-base text-slate-800">
              Open for Spring/Summer 2026 collaborations; light retainers and quick
              design/build sprints.
            </p>
            <div className="text-sm text-slate-500">
              Based in Boston, remote-friendly. Experimental interactive previews coming
              soon—ask if you want early access.
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-[0_24px_60px_-50px_rgba(15,23,42,0.28)]">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Next step
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Want your work to be the first link here?
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Send a brief or idea—I&apos;ll reply with a tiny plan and a spot reserved on the
            wall (with an interactive embed if you want).
          </p>
          <a
            href="mailto:hello@jayson.design"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 font-medium text-white transition hover:translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            Start a conversation
          </a>
        </section>
      </div>
    </div>
  );
}
