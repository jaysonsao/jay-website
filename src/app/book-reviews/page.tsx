import Image from "next/image";
import Link from "next/link";
import { bookReviews } from "@/data/book-reviews";

export default function BookReviewsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-10 sm:pt-12">
      <section className="space-y-3 border-b border-slate-200 pb-8 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
          Book Reviews
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
          Quality reads from my shelf
        </h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Light notes from books that stuck, quick to scan and easy to reuse in
          product work.
        </p>
      </section>

      <section className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
        {bookReviews.map((book) => (
          <Link
            key={book.slug}
            href={`/book-reviews/${book.slug}`}
            className="group block h-full no-underline hover:no-underline"
          >
            <article className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-stone-300/80 bg-[hsl(42_30%_90%)] px-5 py-4 shadow-[0_8px_20px_-18px_rgba(15,23,42,0.55)] transition group-hover:border-stone-400 group-hover:shadow-[0_14px_28px_-20px_rgba(15,23,42,0.7)] dark:border-slate-700 dark:bg-[hsl(217_25%_16%)] dark:group-hover:border-slate-500">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[hsl(186_60%_32%)] dark:text-[hsl(186_70%_72%)]">
                    <span
                      className="inline-flex h-2 w-2 bg-[hsl(186_70%_50%)] dark:bg-[hsl(186_70%_72%)]"
                      aria-hidden
                    />
                    <span>Read & noted</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-slate-700 dark:text-slate-100 dark:group-hover:text-slate-200">
                    {book.title}
                  </h3>
                  {book.author ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
                  ) : null}
                </div>
                <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden border border-stone-300 bg-[hsl(42_35%_92%)] p-0.5 dark:border-slate-700 dark:bg-slate-800">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      fill
                      sizes="64px"
                      className="object-contain p-0.5"
                    />
                  ) : (
                    <div className="absolute inset-1 grid place-content-center bg-gradient-to-br from-[hsl(42_35%_90%)] via-[hsl(42_28%_86%)] to-[hsl(42_35%_90%)] text-center text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 dark:text-slate-500">
                      Cover
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-4 text-xs uppercase tracking-[0.18em] text-slate-400 transition group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400">
                <span>View review</span>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}
