import Image from "next/image";
import Link from "next/link";
import ExperienceContent from "@/components/ExperienceContent";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { projects } from "@/data/projects";

const featuredProjects = projects.slice(0, 4);

const sectionClass =
  "min-h-[72vh] scroll-mt-24 bg-background dark:bg-zinc-900";

const shellClass = "mx-auto flex w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12";

const cardClass =
  "relative flex w-full flex-col overflow-hidden rounded-[22px] border-2 border-black bg-background p-6 sm:p-8 dark:bg-zinc-900";

const sectionEyebrowClass =
  "text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-zinc-400";

const sectionTitleClass =
  "mt-2 text-3xl font-black leading-[0.95] tracking-[-0.02em] text-slate-900 dark:text-zinc-100 sm:text-4xl";

type SectionChromeProps = {
  stripeClass: string;
};

function SectionChrome({ stripeClass }: SectionChromeProps) {
  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 ${stripeClass}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 flex items-center"
      >
        <span className="h-px w-16 bg-slate-400/70 dark:bg-zinc-500/70" />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 pb-24 pt-2 sm:pt-6">
      <div className="relative w-full border-y border-slate-300 bg-background dark:border-zinc-700 dark:bg-zinc-900">
        <section id="home-landing" className={sectionClass}>
          <div className={shellClass}>
            <div className={`${cardClass} justify-between`}>
              <SectionChrome
                stripeClass="bg-gradient-to-r from-slate-900 via-slate-600 to-transparent dark:from-zinc-100 dark:via-zinc-300 dark:to-transparent"
              />
              <FadeInOnScroll className="mx-auto w-full max-w-4xl space-y-5 text-center">
                <h1 className="mx-auto max-w-3xl text-3xl font-black leading-[0.95] tracking-[-0.02em] text-slate-900 dark:text-zinc-100 sm:text-5xl">
                  Hi, I&apos;m Jay.
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-7 text-slate-700 dark:text-zinc-300">
                  Software engineer focused on AI systems, cryptography, and
                  building useful products.
                </p>
              </FadeInOnScroll>

              <FadeInOnScroll
                delayMs={120}
                className="mt-2 flex flex-wrap justify-center gap-3 sm:mt-3"
              >
                <a
                  href="#home-projects"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-md border border-slate-900 bg-slate-900 px-5 py-2 text-sm font-semibold text-white no-underline transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.8)] hover:no-underline active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:hover:shadow-[0_10px_24px_-14px_rgba(244,244,245,0.6)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-zinc-800/20"
                  />
                  <span className="relative inline-flex items-center gap-2">
                    <span>View Projects</span>
                    <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                      ↓
                    </span>
                  </span>
                </a>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        <section id="home-about" className={sectionClass}>
          <div className={shellClass}>
            <div className={cardClass}>
              <SectionChrome
                stripeClass="bg-gradient-to-r from-rose-700 via-amber-600 to-transparent dark:from-zinc-200 dark:via-zinc-400 dark:to-transparent"
              />
              <FadeInOnScroll className="mb-8 text-center">
                <p className={sectionEyebrowClass}>
                  About
                </p>
                <h2 className={sectionTitleClass}>
                  Background and Focus Areas
                </h2>
              </FadeInOnScroll>

              <div className="mx-auto w-full max-w-4xl">
                <div className="rounded-lg border-2 border-black bg-white/80 p-6 dark:border-zinc-400 dark:bg-zinc-900/40">
                  <div className="space-y-5 text-[17px] leading-8 text-slate-700 dark:text-zinc-300">
                    <FadeInOnScroll delayMs={40}>
                      <p>
                      I&apos;m motivated by the challenge of transforming complex
                      problems into thoughtful, elegant systems. I value
                      structure, precision, and long-term thinking over
                      shortcuts.
                      </p>
                    </FadeInOnScroll>
                    <FadeInOnScroll delayMs={120}>
                      <p>
                      What is most important to me is building quietly powerful
                      solutions that stand the test of time. My focus is
                      especially drawn to cryptography and security, the design
                      of trustworthy systems, and the real-world applications of
                      AI.
                      </p>
                    </FadeInOnScroll>
                    <FadeInOnScroll delayMs={200}>
                      <p>
                      But most importantly, I care about the people on the other
                      side of the code. I love building tools that help others
                      learn, create, and move forward more easily. Whether it is
                      simplifying a workflow, designing something intuitive, or
                      supporting a team through a tough technical challenge, I
                      aim to build software that makes life better for the
                      people who use it.
                      </p>
                    </FadeInOnScroll>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="home-experience" className={sectionClass}>
          <div className={shellClass}>
            <div className={cardClass}>
              <SectionChrome
                stripeClass="bg-gradient-to-r from-emerald-700 via-cyan-600 to-transparent dark:from-zinc-200 dark:via-zinc-400 dark:to-transparent"
              />
              <FadeInOnScroll className="mb-7 text-center">
                <p className={sectionEyebrowClass}>
                  Experience
                </p>
                <h2 className={sectionTitleClass}>
                  Work, Education, Certifications
                </h2>
              </FadeInOnScroll>
              <FadeInOnScroll delayMs={100}>
                <ExperienceContent className="max-w-none pb-0 pt-0" />
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        <section id="home-projects" className={sectionClass}>
          <div className={shellClass}>
            <div className={cardClass}>
              <SectionChrome
                stripeClass="bg-gradient-to-r from-sky-700 via-indigo-600 to-transparent dark:from-zinc-200 dark:via-zinc-400 dark:to-transparent"
              />
              <FadeInOnScroll className="mb-6 space-y-3 text-center">
                <div>
                  <p className={sectionEyebrowClass}>
                    Projects
                  </p>
                  <h2 className={sectionTitleClass}>
                    Featured Work
                  </h2>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-md border border-black px-4 py-1.5 text-sm font-semibold text-slate-900 no-underline transition hover:bg-slate-100 hover:no-underline dark:border-zinc-400 dark:text-zinc-100 dark:hover:bg-zinc-900"
                >
                  Open full projects page
                </Link>
              </FadeInOnScroll>

              <div className="grid gap-4 md:grid-cols-2">
                {featuredProjects.map((project, index) => (
                  <FadeInOnScroll key={project.slug} delayMs={index * 90}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group relative block overflow-hidden rounded-lg border-2 border-black bg-[hsl(42_34%_93%)] no-underline transition hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)] dark:border-zinc-400 dark:bg-zinc-900 dark:focus-visible:ring-zinc-400"
                    >
                      <div className="relative aspect-[16/10] w-full">
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
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
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
