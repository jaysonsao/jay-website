import Link from "next/link";

const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "shadcn/ui",
  "Math.js",
  "Rapid prototyping",
  "Design systems",
];

const projectSlots = [
  { title: "Project slot A", hint: "Link or embed a live demo." },
  { title: "Project slot B", hint: "Case study, prototype, or repo." },
  { title: "Project slot C", hint: "In-progress experiment." },
  { title: "Project slot D", hint: "Reserve for the next drop." },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 pb-16 pt-12 sm:pt-16">
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-slate-500">
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
          <p className="max-w-3xl text-lg text-slate-600">
            A lighter grid for work-in-flight. I build fast, measurable product
            surfaces and keep the system tidy enough to evolve—more interactive
            previews coming as the projects land.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            About / CV
          </Link>
          <a
            href="mailto:hello@jayson.design"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
          >
            Let’s talk
          </a>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Tools & focus
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              The small kit I reach for first.
            </h2>
          </div>
          <span className="text-xs text-slate-500">Always evolving</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-[hsl(186_60%_82%)] bg-[hsl(186_70%_94%)] px-3 py-2 text-sm text-slate-800 shadow-[0_12px_30px_-24px_rgba(48,196,204,0.35)]"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Projects
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Placeholders ready for links and previews.
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Hover for lift · future inline video / iframe
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projectSlots.map((slot) => (
            <article
              key={slot.title}
              className="group flex min-h-[180px] flex-col justify-between rounded-3xl border border-[hsl(186_55%_84%)] bg-white px-6 py-6 shadow-[0_24px_60px_-50px_rgba(48,196,204,0.5)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_70px_-46px_rgba(48,196,204,0.6)]"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  {slot.title}
                </h3>
                <p className="text-sm text-slate-500">{slot.hint}</p>
              </div>
              <div className="flex items-center justify-between pt-4 text-sm text-slate-400">
                <span>Paste link</span>
                <span className="rounded-full border border-[hsl(186_60%_80%)] bg-[hsl(186_70%_94%)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[hsl(186_75%_32%)]">
                  empty
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

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

      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-[0_24px_60px_-50px_rgba(15,23,42,0.28)]">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Next step
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
          Want your work to be the first link here?
        </h2>
        <p className="mt-4 text-base text-slate-600">
          Send a brief or idea—I&apos;ll reply with a tiny plan and a spot reserved on the
          wall (with an interactive embed if you want).
        </p>
        <a
          href="mailto:hello@jayson.design"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 font-medium text-white transition hover:translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
        >
          Start a conversation
        </a>
      </section>
    </div>
  );
}
