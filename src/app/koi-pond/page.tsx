import KoiPond from "@/components/KoiPond";

export default function KoiPondPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-12 pt-4 sm:pt-8">
      <section className="space-y-2 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Koi Pond
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          Interactive koi pond
        </h1>
      </section>
      <KoiPond />
    </div>
  );
}
