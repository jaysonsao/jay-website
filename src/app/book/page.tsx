import Image from "next/image";
import Link from "next/link";
import { bookReviews } from "@/data/book-reviews";
import { getBookStatusMeta, type BookStatus } from "@/lib/bookStatus";

const statusSortOrder: Record<BookStatus, number> = {
  "read-noted": 0,
  read: 1,
  "in-progress": 2,
  "not-started": 3,
};

export default function BookReviewsPage() {
  const orderedBooks = [...bookReviews].sort((left, right) => {
    const statusDiff =
      statusSortOrder[left.status] - statusSortOrder[right.status];
    if (statusDiff !== 0) {
      return statusDiff;
    }
    return left.title.localeCompare(right.title);
  });

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-3 sm:pt-4">
      <section className="space-y-3 border-b border-slate-200 pb-8 dark:border-slate-800">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
          Book Reviews
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
          Quality reads from my shelf
        </h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Below you will find some of my favorite reads from my very own personal
          library, along with my thoughts on them. Feel free to browse through,
          and even reach out to discuss them!
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {orderedBooks.map((book) => {
          const statusMeta = getBookStatusMeta(book.status);

          return (
            <Link
              key={book.slug}
              href={`/book/${book.slug}`}
              className="block h-full no-underline hover:no-underline"
            >
              <article className="flex h-full flex-col justify-between overflow-hidden rounded-md border border-stone-300/80 bg-[hsl(42_30%_90%)] px-5 py-4 dark:border-slate-700 dark:bg-[hsl(217_25%_16%)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div
                      className={`flex w-fit items-center justify-start gap-2 self-start text-left text-[11px] uppercase tracking-[0.18em] ${statusMeta.textClassName}`}
                    >
                      <span
                        className={`inline-flex h-2 w-2 rounded-full ${statusMeta.dotClassName}`}
                        aria-hidden
                      />
                      <span>{statusMeta.label}</span>
                    </div>
                    <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-slate-100">
                      {book.title}
                    </h3>
                    {book.author ? (
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {book.author}
                      </p>
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
                <div className="pt-4 text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  <span>View review</span>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
