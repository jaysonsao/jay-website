import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bookReviews } from "@/data/book-reviews";
import { getBookStatusMeta } from "@/lib/bookStatus";

export function generateStaticParams() {
  return bookReviews.map((book) => ({ slug: book.slug }));
}

export default async function BookReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = bookReviews.find((item) => item.slug === slug);

  if (!book) {
    notFound();
  }
  const statusMeta = getBookStatusMeta(book.status);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 pb-16 pt-10 sm:pt-12">
      <Link
        href="/book-reviews"
        className="text-xs uppercase tracking-[0.3em] text-slate-500 no-underline transition hover:text-slate-700 hover:no-underline dark:text-slate-400 dark:hover:text-slate-200"
      >
        ← Back to book reviews
      </Link>

      <article className="space-y-8">
        <header className="grid gap-6 border-b border-stone-300 pb-8 dark:border-slate-800 sm:grid-cols-[1fr,140px] sm:items-start">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Review Notes
            </p>
            <div
              className={`inline-flex w-fit items-center justify-start gap-2 self-start text-left text-xs uppercase tracking-[0.2em] ${statusMeta.textClassName}`}
            >
              <span className={`inline-flex h-2 w-2 rounded-full ${statusMeta.dotClassName}`} aria-hidden />
              <span>{statusMeta.label}</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
              {book.title}
            </h1>
            {book.author ? (
              <p className="text-base text-slate-600 dark:text-slate-300">{book.author}</p>
            ) : null}
          </div>
          {book.image ? (
            <div className="relative aspect-[3/4] w-28 overflow-hidden border border-stone-300 bg-[hsl(42_35%_92%)] p-1 dark:border-slate-700 dark:bg-slate-800">
              <Image
                src={book.image}
                alt={`Cover of ${book.title}`}
                fill
                sizes="112px"
                className="object-contain p-1"
                priority
              />
            </div>
          ) : null}
        </header>

        <div className="space-y-5 text-base leading-8 text-slate-700 dark:text-slate-200">
          {book.review.map((paragraph, index) => (
            <p key={`${book.slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
