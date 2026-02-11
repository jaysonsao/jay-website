import { projects } from "@/data/projects";
import ProjectStack from "@/components/ProjectStack";
import KoiPond from "@/components/KoiPond";
import AboutContent from "@/components/AboutContent";

export default function Home() {
  return (
    <div className="w-full pb-16 pt-12 sm:pt-16">
      <div className="flex justify-center pb-6">
        <a
          href="/#about"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          jump to about &darr;
        </a>
      </div>
      <div className="-mx-6">
        <KoiPond />
      </div>
      <div className="mx-auto w-full max-w-5xl space-y-14 px-6 sm:px-8">
        <section className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                Projects
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                A stacked view of recent work.
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Click a card for details
            </span>
          </div>
          <ProjectStack projects={projects} />
        </section>

        <div className="space-y-14">
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
              I build fast, measurable product systems—especially for AI-enabled tools and developer experiences.
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
            </ul>
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

        </div>

        <section id="about" className="scroll-mt-28">
          <AboutContent />
        </section>
    </div>
    </div>
  );
}
