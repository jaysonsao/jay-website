import ProjectStack from "@/components/ProjectStack";
import NavHashLink from "@/components/NavHashLink";
import { projects } from "@/data/projects";

const experienceHighlights = [
  "Versetal Information Systems BU Spark! Software Development Lab (2026): Built software features and supported delivery work.",
  "SafeLogic Intern II / Co-op (2024-2025): Worked on internal tools and FIPS 140-3 support tasks.",
  "BostonCentral.com, Software Developer (2019-Present): Maintain and ship web product updates.",
];

const education = {
  school: "Boston University",
  degree:
    "Bachelor of Arts in Computer Science, Minor in Economics, Minor in Mathematics",
};

const sectionLabelClass =
  "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400";

const contentSectionClass =
  "max-w-4xl space-y-5 border-t border-slate-200 pt-10 dark:border-slate-800";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-14 pb-20 pt-6 sm:pt-10">
      <section className="max-w-4xl space-y-6 border-b border-slate-200 pb-10 dark:border-slate-800">
        <div className="space-y-6">
          <h1 className="max-w-3xl text-lg font-medium leading-8 text-slate-800 dark:text-slate-200 sm:text-xl sm:leading-9">
            Hi, I&apos;m Jay. I&apos;m a software engineer aspiring to work with AI
            systems and cryptography. I love skiing, reading all things science fiction, and
            playing rugby. I also dabble in graphic design and writing, and I&apos;ll
            be posting some of that here. Welcome to my home on the internet.
          </h1>
          <div className="flex flex-wrap gap-2">
            <NavHashLink
              href="/#projects"
              targetId="projects"
              className="inline-flex items-center justify-center border border-slate-900 bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            >
              View Projects
            </NavHashLink>
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
      </section>

      <section className={contentSectionClass}>
        <p className={sectionLabelClass}>
          Work Experience
        </p>
        <ul className="space-y-2 text-base text-slate-700 dark:text-slate-300">
          {experienceHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={contentSectionClass}>
        <p className={sectionLabelClass}>
          Education
        </p>
        <div className="space-y-1 text-slate-700 dark:text-slate-300">
          <p className="text-base font-medium text-slate-900 dark:text-slate-100">
            {education.school}
          </p>
          <p className="text-sm">{education.degree}</p>
        </div>
      </section>

      <section className={contentSectionClass}>
        <p className={sectionLabelClass}>
          Certifications
        </p>
        <div className="space-y-1 text-slate-700 dark:text-slate-300">
          <p className="text-base font-medium text-slate-900 dark:text-slate-100">
            AWS Certified Solutions Architect - Associate
          </p>
          <p className="text-sm">In progress (target: March 2026)</p>
          <p className="text-sm">
            Focused on cloud architecture, reliability, and cost-aware system
            design.
          </p>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 space-y-6 border-t border-slate-200 pt-10 dark:border-slate-800">
        <div className="space-y-2">
          <p className={sectionLabelClass}>
            Featured Projects
          </p>
        </div>
        <ProjectStack projects={projects} showPreview={false} />
      </section>
    </div>
  );
}
