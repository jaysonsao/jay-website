import Image from "next/image";
import ProjectStack from "@/components/ProjectStack";
import { projects } from "@/data/projects";

const focusAreas = [
  "Building hands-on learning and practice tools",
  "Building backend services that are reliable and easy to maintain",
  "Deploying and running apps in the cloud",
  "Using security and cryptography where they solve real problems",
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
  "Django"
];

const experienceHighlights = [
  "Software Development Lab, Versetal Information Systems (BU Spark!) (2026): Built software features and supported delivery work.",
  "Intern II / Co-op, SafeLogic (2024-2025): Worked on internal tools and FIPS 140-3 support tasks.",
  "Part-Time Developer, BostonCentral.com (2019-Present): Maintain and ship web product updates.",
];

const education = {
  school: "Boston University",
  degree:
    "Bachelor of Arts in Computer Science, Minor in Economics, Minor in Mathematics",
};

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
            Software Engineer specializing in Cryptography, AI Systems, and Developer Tools
            </h1>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p>
                My work includes interview prep tools, terminal-based practice
                apps, and the backend services that support them.
              </p>
              <p>
                Projects include PrepDragon, GrepLab, and other learning-focused
                tools.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center border border-slate-900 bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
              >
                View Resume
              </a>
            </div>
          </div>
          <div
            className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-stone-400/80 bg-[hsl(42_28%_88%)] md:ml-0 md:h-40 md:w-40 dark:border-slate-600 dark:bg-slate-800"
          >
            <Image
              src="/my-face.jpeg"
              alt="Jayson Sao"
              fill
              sizes="(min-width: 768px) 11rem, 9rem"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 space-y-4 border-t border-slate-200 pt-10 dark:border-slate-800">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          What I Care About
        </h2>
        <div className="space-y-3 text-base text-slate-700 dark:text-slate-300">
          <p>
            I care about clarity in both user experience and system design. If a
            system is hard to reason about, it&apos;s hard to trust, maintain, or
            extend.
          </p>
          <p>
            I focus on learning through interaction: practicing real workflows,
            getting feedback, and improving through repetition instead of passive
            reading.
          </p>
          <p>
            I&apos;m most interested in building reliable foundations so people can
            focus on learning and doing the work, not fighting the tool.
          </p>
        </div>
      </section>

      <section id="skills" className="scroll-mt-28 space-y-5 border-t border-slate-200 pt-10 dark:border-slate-800">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Focus Areas
        </h2>
        <div className="space-y-5">
          <ul className="list-disc space-y-2 pl-5 text-base text-slate-700 dark:text-slate-300">
            {focusAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Most of this is best shown in the projects section below.
          </p>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Tools I Use Often
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">{coreTech.join(", ")}</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl space-y-5 border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Work Experience
        </p>
        <ul className="space-y-2 text-base text-slate-700 dark:text-slate-300">
          {experienceHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="max-w-4xl space-y-5 border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Education
        </p>
        <div className="space-y-1 text-slate-700 dark:text-slate-300">
          <p className="text-base font-medium text-slate-900 dark:text-slate-100">
            {education.school}
          </p>
          <p className="text-sm">{education.degree}</p>
        </div>
      </section>

      <section className="max-w-4xl space-y-4 border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Certifications
        </p>
        <div className="space-y-1 text-slate-700 dark:text-slate-300">
          <p className="text-base font-medium text-slate-900 dark:text-slate-100">
            AWS Certified Solutions Architect - Associate
          </p>
          <p className="text-sm">In progress (target: 2026)</p>
          <p className="text-sm">
            Focused on cloud architecture, reliability, and cost-aware system
            design.
          </p>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 space-y-6 border-t border-slate-200 pt-10 dark:border-slate-800">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Featured Projects
          </p>
        </div>
        <ProjectStack projects={projects} />
      </section>
    </div>
  );
}
