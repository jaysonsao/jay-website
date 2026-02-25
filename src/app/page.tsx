import Link from "next/link";
import ExperienceContent from "@/components/ExperienceContent";
import { projects } from "@/data/projects";

const featuredProjects = projects.slice(0, 3);

const sectionClass =
  "min-h-[72vh] scroll-mt-24 bg-background dark:bg-zinc-950";

const shellClass = "mx-auto flex w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12";

const cardClass =
  "relative flex w-full flex-col overflow-hidden rounded-[26px] border-2 border-black bg-background p-6 sm:p-8 dark:bg-zinc-950";

const sectionEyebrowClass =
  "text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-zinc-400";

const sectionTitleClass =
  "mt-2 text-3xl font-black leading-[0.95] tracking-[-0.02em] text-slate-900 dark:text-zinc-100 sm:text-4xl";

const innerCardClass =
  "rounded-xl border border-black bg-white/70 p-5 dark:border-zinc-400 dark:bg-zinc-900/40";

type SectionChromeProps = {
  marker: string;
  stripeClass: string;
};

function SectionChrome({ marker, stripeClass }: SectionChromeProps) {
  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 ${stripeClass}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 flex items-center gap-2"
      >
        <span className="inline-flex h-6 min-w-7 items-center justify-center border border-slate-400 bg-background px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-200">
          {marker}
        </span>
        <span className="h-px w-16 bg-slate-400/70 dark:bg-zinc-500/70" />
      </div>
    </>
  );
}

type SectionDividerProps = {
  label: string;
};

function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className="mx-auto flex w-full max-w-6xl items-center gap-3 px-6 py-2 sm:px-8"
    >
      <span className="h-px flex-1 bg-slate-300 dark:bg-zinc-700" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-zinc-400">
        {label}
      </span>
      <span className="h-px flex-1 bg-slate-300 dark:bg-zinc-700" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 pb-24 pt-2 sm:pt-6">
      <div className="relative w-full border-y border-slate-300 bg-background dark:border-zinc-700 dark:bg-zinc-950">
        <section id="home-landing" className={sectionClass}>
          <div className={shellClass}>
            <div className={`${cardClass} justify-between`}>
              <SectionChrome
                marker="01"
                stripeClass="bg-gradient-to-r from-slate-900 via-slate-600 to-transparent dark:from-zinc-100 dark:via-zinc-300 dark:to-transparent"
              />
              <div className="mx-auto w-full max-w-4xl space-y-5 text-center">
                <p className="mx-auto inline-flex items-center rounded-full border border-black bg-background px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-800 dark:border-zinc-400 dark:bg-zinc-950 dark:text-zinc-200">
                  Landing
                </p>
                <h1 className="mx-auto max-w-3xl text-3xl font-black leading-[0.95] tracking-[-0.02em] text-slate-900 dark:text-zinc-100 sm:text-5xl">
                  Hi, I&apos;m Jay.
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-7 text-slate-700 dark:text-zinc-300">
                  I&apos;m a software engineer aspiring to work with AI systems and
                  cryptography. I spend most of my build time on products that
                  teach, simplify hard workflows, or make systems feel less
                  opaque.
                </p>
              </div>

              <div className="mt-2 flex flex-wrap justify-center gap-3 sm:mt-3">
                <Link
                  href="/#home-projects"
                  className="inline-flex items-center justify-center rounded-md border border-slate-900 bg-slate-900 px-5 py-2 text-sm font-semibold text-white no-underline transition hover:bg-slate-800 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  View Projects ↓
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider label="Intro to About" />

        <section id="home-about" className={sectionClass}>
          <div className={shellClass}>
            <div className={cardClass}>
              <SectionChrome
                marker="02"
                stripeClass="bg-gradient-to-r from-rose-700 via-amber-600 to-transparent dark:from-zinc-200 dark:via-zinc-400 dark:to-transparent"
              />
              <div className="mb-8 text-center">
                <p className={sectionEyebrowClass}>
                  About
                </p>
                <h2 className={sectionTitleClass}>
                  Background and Focus Areas
                </h2>
              </div>

              <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-[1.4fr_1fr]">
                <div className="space-y-4 text-[15px] leading-7 text-slate-700 dark:text-zinc-300">
                  <p>
                    I care about doing things the right way.
                  </p>
                  <p>
                    Clean products. Clear thinking. Careful planning.
                  </p>
                  <p>
                    I&apos;m motivated by the challenge of transforming complex
                    problems into elegant systems. I value structure, precision,
                    and long-term thinking over shortcuts. For me, technology is
                    not about noise — it&apos;s about building quietly powerful
                    solutions that stand the test of time.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-black bg-white/70 p-4 dark:border-zinc-400 dark:bg-zinc-900/40">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
                      Currently focused on
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-zinc-300">
                      <li>AI system workflows and agent design</li>
                      <li>Cryptography-adjacent engineering standards</li>
                      <li>Interactive learning product design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider label="About to Experience" />

        <section id="home-experience" className={sectionClass}>
          <div className={shellClass}>
            <div className={cardClass}>
              <SectionChrome
                marker="03"
                stripeClass="bg-gradient-to-r from-emerald-700 via-cyan-600 to-transparent dark:from-zinc-200 dark:via-zinc-400 dark:to-transparent"
              />
              <div className="mb-7 text-center">
                <p className={sectionEyebrowClass}>
                  Experience
                </p>
                <h2 className={sectionTitleClass}>
                  Work, Education, Certifications
                </h2>
              </div>
              <ExperienceContent className="max-w-none pb-0 pt-0" />
            </div>
          </div>
        </section>

        <SectionDivider label="Experience to Projects" />

        <section id="home-projects" className={sectionClass}>
          <div className={shellClass}>
            <div className={cardClass}>
              <SectionChrome
                marker="04"
                stripeClass="bg-gradient-to-r from-sky-700 via-indigo-600 to-transparent dark:from-zinc-200 dark:via-zinc-400 dark:to-transparent"
              />
              <div className="mb-6 space-y-3 text-center">
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
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className={`${innerCardClass} block no-underline transition hover:bg-slate-100 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)] dark:hover:bg-zinc-900 dark:focus-visible:ring-zinc-400`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-base font-medium text-slate-900 dark:text-zinc-100">
                        {project.title}
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-400">
                        {project.year}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-zinc-300">
                      {project.summary}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-zinc-300">
                      View project →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
