import { cn } from "@/lib/utils";

const experienceHighlights = [
  {
    title: "Versetal Information Systems BU Spark! Software Development Lab",
    period: "2026",
    detail: "Built software features and supported delivery work.",
  },
  {
    title: "SafeLogic Intern II / Co-op",
    period: "2024-2025",
    detail: "Worked on OpenSSL FIPS 140-3 provider modules, post-quantum LMS signature validation, CI/CD workflows, and internal document intelligence systems for navigating cryptographic compliance standards.",
  },
  {
    title: "BostonCentral.com, Software Developer",
    period: "2019-Present",
    detail: "Built and maintained backend services, analytics systems, newsletter infrastructure, and CMS features for a consumer web platform serving 10M+ annual visitors.",
  },
];

const education = {
  school: "Boston University",
  degree:
    "Bachelor of Arts in Computer Science, Minor in Economics, Minor in Mathematics",
};

const awards = ["2026 CivicHacks Best Original Research Project Award"];

const sectionLabelClass =
  "text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-zinc-400";

const sectionCardClass =
  "rounded-lg border-2 border-black bg-white/80 p-5 dark:border-zinc-400 dark:bg-zinc-900/40";

type ExperienceContentProps = {
  className?: string;
};

export default function ExperienceContent({
  className,
}: ExperienceContentProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-5xl space-y-5 pb-6 pt-0 sm:pt-2",
        className,
      )}
    >
      <section className={sectionCardClass}>
        <p className={sectionLabelClass}>Work Experience</p>
        <ul className="mt-4 space-y-4">
          {experienceHighlights.map((item) => (
            <li
              key={`${item.title}-${item.period}`}
              className="border-l-2 border-slate-900 pl-4 dark:border-zinc-300"
            >
              <p className="text-sm font-medium text-slate-900 dark:text-zinc-100">
                {item.title}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-zinc-400">
                {item.period}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-zinc-300">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <section className={sectionCardClass}>
          <p className={sectionLabelClass}>Education</p>
          <div className="mt-4 space-y-1 text-slate-700 dark:text-zinc-300">
            <p className="text-base font-medium text-slate-900 dark:text-zinc-100">
              {education.school}
            </p>
            <p className="text-sm leading-6">{education.degree}</p>
          </div>
        </section>

        <section className={sectionCardClass}>
          <p className={sectionLabelClass}>Certifications</p>
          <div className="mt-4 space-y-1 text-slate-700 dark:text-zinc-300">
            <p className="text-base font-medium text-slate-900 dark:text-zinc-100">
              AWS Certified Solutions Architect - Associate
            </p>
            <p className="text-sm">In progress (target: May 2026)</p>
            <p className="text-sm leading-6">
              Focused on cloud architecture, reliability, and cost-aware system
              design.
            </p>
          </div>
        </section>
      </div>

      <section className={sectionCardClass}>
        <p className={sectionLabelClass}>Awards</p>
        <ul className="mt-4 space-y-2">
          {awards.map((award) => (
            <li
              key={award}
              className="border-l-2 border-slate-900 pl-4 text-sm leading-6 text-slate-700 dark:border-zinc-300 dark:text-zinc-300"
            >
              {award}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
