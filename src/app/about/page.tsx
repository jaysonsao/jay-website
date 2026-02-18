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
  "max-w-4xl space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-6 pt-0 sm:pt-2">
      <section className={contentSectionClass}>
        <p className={sectionLabelClass}>Work Experience</p>
        <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          {experienceHighlights.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className={contentSectionClass}>
        <p className={sectionLabelClass}>Education</p>
        <div className="space-y-1 text-slate-700 dark:text-slate-300">
          <p className="text-base font-medium text-slate-900 dark:text-slate-100">
            {education.school}
          </p>
          <p className="text-sm">{education.degree}</p>
        </div>
      </section>

      <section className={contentSectionClass}>
        <p className={sectionLabelClass}>Certifications</p>
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
    </div>
  );
}
