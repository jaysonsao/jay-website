import ProjectStack from "@/components/ProjectStack";
import { projects } from "@/data/projects";

const sectionLabelClass =
  "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400";

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 pb-16 pt-6 sm:pt-10">
      <section className="space-y-3 border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className={sectionLabelClass}>Projects</p>
        <ProjectStack projects={projects} showPreview={false} />
      </section>
    </div>
  );
}
