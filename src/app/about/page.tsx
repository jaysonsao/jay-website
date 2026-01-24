const highlights = [
  { label: "Years in product/design", value: "8+" },
  { label: "Shipped platforms", value: "Fintech, analytics, SaaS" },
  { label: "Stack", value: "Next.js · React · TS · Tailwind" },
  { label: "Based", value: "Boston / remote" },
];

const timeline = [
  { year: "2025", title: "Exploring AI + physical systems", note: "Research collaborations; looking for spring/summer roles." },
  { year: "2024", title: "Safelogic (Co-Op)", note: "Engineering + design for secure workflows." },
  { year: "2022-2023", title: "Independent practice", note: "Design/engineering sprints for early-stage teams." },
  { year: "2019-2021", title: "Northwind (Founding designer)", note: "Design system + analytics collab features." },
];

const values = [
  {
    title: "Clarity first",
    description:
      "I keep problem statements and success metrics visible so design, PM, and engineering stay aligned.",
  },
  {
    title: "Prototype to learn",
    description:
      "Small, testable builds beat big decks. I ship interactive proofs to de-risk decisions early.",
  },
  {
    title: "Systems with escape hatches",
    description:
      "I like tidy component libraries—but only if they stay flexible enough for novel use-cases.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 pb-16 pt-12 sm:pt-16">
      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.28)] md:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            About
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            I design and build product surfaces that stay nimble as they scale.
          </h1>
          <p className="text-base text-slate-600">
            I’m Jayson, a product designer and front-end engineer who moves between
            research, systems, and code. I like teams that prototype early, ship
            often, and document just enough to keep momentum.
          </p>
          <p className="text-base text-slate-600">
            This page stays organized and skimmable: quick stats, values, a simple
            timeline, and ways to collaborate.
          </p>
        </div>
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[hsl(186_60%_82%)] bg-white px-4 py-3 shadow-[0_12px_30px_-24px_rgba(48,196,204,0.3)]"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Values
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          How I like to work
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-3xl border border-[hsl(186_60%_82%)] bg-white p-6 shadow-[0_16px_40px_-30px_rgba(48,196,204,0.3)]"
            >
              <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Timeline
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Recent roles & tracks
        </h2>
        <div className="space-y-4">
          {timeline.map((item) => (
            <article
              key={item.year}
              className="flex flex-col gap-3 rounded-3xl border border-[hsl(186_60%_82%)] bg-white px-6 py-5 shadow-[0_16px_40px_-30px_rgba(48,196,204,0.3)] md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-sm text-slate-600 md:max-w-xl">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.28)] md:grid-cols-[1.4fr,0.6fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            What partnering looks like
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li>• Quick discovery to pin the problem and success metrics.</li>
            <li>• Clickable prototypes or coded proofs inside the first sprint.</li>
            <li>• Lightweight systemization so new features stay consistent.</li>
            <li>• Hands-on build support (Next.js/React/TS/Tailwind).</li>
          </ul>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 text-sm text-slate-700">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Availability
          </p>
          <p>
            Open for Spring/Summer 2026 research or build roles; also available for
            short design/engineering sprints.
          </p>
          <a
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 font-medium text-white transition hover:translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            href="mailto:hello@jayson.design"
          >
            Schedule a chat
          </a>
        </div>
      </section>
    </div>
  );
}
