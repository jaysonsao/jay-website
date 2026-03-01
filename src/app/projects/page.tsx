import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { projects } from "@/data/projects";

const sectionClass = "min-h-[72vh] bg-background dark:bg-zinc-900";

const shellClass = "mx-auto flex w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12";

const cardClass =
  "relative flex w-full flex-col overflow-hidden rounded-[26px] border-2 border-black bg-background p-6 sm:p-8 dark:bg-zinc-900";

const sectionEyebrowClass =
  "text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-zinc-400";

const sectionTitleClass =
  "mt-2 text-3xl font-black leading-[0.95] tracking-[-0.02em] text-slate-900 dark:text-zinc-100 sm:text-4xl";

export default function ProjectsPage() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 pb-16 pt-2 sm:pt-6">
      <div className="relative w-full border-y border-slate-300 bg-background dark:border-zinc-700 dark:bg-zinc-900">
        <section className={sectionClass}>
          <div className={shellClass}>
            <div className={cardClass}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-700 via-indigo-600 to-transparent dark:from-zinc-200 dark:via-zinc-400 dark:to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 flex items-center"
              >
                <span className="h-px w-16 bg-slate-400/70 dark:bg-zinc-500/70" />
              </div>

              <FadeInOnScroll className="mb-6 space-y-3 text-center">
                <p className={sectionEyebrowClass}>
                  Projects
                </p>
                <h1 className={sectionTitleClass}>
                  All Projects
                </h1>
              </FadeInOnScroll>

              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project, index) => (
                  <FadeInOnScroll key={project.slug} delayMs={index * 70}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group relative block overflow-hidden rounded-xl border border-black bg-[hsl(42_34%_93%)] no-underline transition hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)] dark:border-zinc-400 dark:bg-zinc-900 dark:focus-visible:ring-zinc-400"
                    >
                      <div className="relative aspect-[5/4] w-full">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.imageAlt ?? project.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition duration-300 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="h-full w-full bg-[hsl(42_34%_88%)] dark:bg-zinc-800" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                          <p className="text-base font-semibold text-white sm:text-lg">
                            {project.title}
                          </p>
                          <span className="inline-flex shrink-0 items-center rounded-md border border-white/70 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white transition group-hover:bg-black/40">
                            View Project
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeInOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
