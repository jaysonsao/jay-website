import Link from "next/link";
import ProjectStack from "@/components/ProjectStack";
import { projects } from "@/data/projects";

const focusAreas = [
  "Full-Stack Product Engineering",
  "Distributed Systems & Infrastructure",
  "Cryptography & Security",
  "Developer Tooling & Education",
];

const coreTech = [
  "TypeScript",
  "Go",
  "Python",
  "React",
  "Next.js",
  "AWS",
  "PostgreSQL",
  "MongoDB",
];

const experienceHighlights = [
  "Versetal Information Systems (BU Spark!), Software Development Lab (2026)",
  "SafeLogic Intern II / Co-op, internal tools and FIPS 140-3 support (2024-2025)",
  "BostonCentral.com, part-time software development (2019-Present)",
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-14 pb-20 pt-6 sm:pt-10">
      <section className="space-y-6 border-b border-slate-200 pb-10 dark:border-slate-800">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Jayson Sao
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Full-stack developer building interactive learning tools and systems
              software.
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              PrepDragon · GrepLab · Distributed systems · Cryptography
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center border border-slate-900 bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
              >
                View Projects
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
              >
                Resume
              </a>
            </div>
          </div>
          <div
            aria-label="Headshot placeholder"
            className="mx-auto grid h-36 w-36 shrink-0 place-items-center rounded-full border-2 border-stone-400/80 bg-[hsl(42_28%_88%)] md:-ml-12 md:mx-0 md:h-44 md:w-44 dark:border-slate-600 dark:bg-slate-800"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Photo
            </span>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 space-y-4 border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">About</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          How I work
        </h2>
        <div className="space-y-3 text-base text-slate-700 dark:text-slate-300">
          <p>
            I&apos;m a software engineer who enjoys building systems that teach,
            adapt, and scale.
          </p>
          <p>
            I care about clarity in both user experience and system design, so the
            product and architecture stay easy to reason about.
          </p>
          <p>
            My work spans interactive learning tools, distributed systems, and
            cryptography with an emphasis on robust and explainable behavior.
          </p>
          <p>
            I&apos;m most interested in problems where infrastructure depth directly
            improves human understanding.
          </p>
        </div>
      </section>

      <section id="skills" className="scroll-mt-28 space-y-5 border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Skills / Focus Areas
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Focus Areas</h3>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {focusAreas.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Core Tech</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">{coreTech.join(" · ")}</p>
          </div>
        </div>
      </section>

      <section className="space-y-5 border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Experience
        </p>
        <ul className="grid gap-3 text-base text-slate-700 dark:text-slate-300 md:grid-cols-3">
          {experienceHighlights.map((item) => (
            <li
              key={item}
              className="border border-stone-300/80 bg-[hsl(42_30%_90%)] px-4 py-3 dark:border-slate-700 dark:bg-[hsl(217_25%_16%)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="scroll-mt-28 space-y-6 border-t border-slate-200 pt-10 dark:border-slate-800">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Featured Projects
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Project work first.
          </h2>
        </div>
        <ProjectStack projects={projects} />
      </section>
    </div>
  );
}
