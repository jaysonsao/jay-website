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
    <div className="mx-auto flex max-w-5xl flex-col gap-12 sm:gap-16 px-6 sm:px-12 py-10 sm:py-16">
      <section className="space-y-4 text-center sm:text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Bookshelf
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Quality reads from my personal library, along with my thoughts and notes. 
          Feel free to browse through, and reach out to discuss any of them!
        </p>
      </section>

      <section className="grid gap-12 sm:gap-14 sm:grid-cols-2">
        {orderedBooks.map((book) => {
          const statusMeta = getBookStatusMeta(book.status);

          return (
            <Link
              key={book.slug}
              href={`/book/${book.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left h-full">
                <div className="flex flex-col items-center sm:items-start gap-4 h-full">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusMeta.textClassName}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClassName}`}
                      aria-hidden
                    />
                    {statusMeta.label}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                      {book.title}
                    </h3>
                    {book.author && (
                      <p className="text-sm font-medium text-muted-foreground">
                        {book.author}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-auto pt-6 flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-primary">
                    Read review <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
                
                <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-md border border-border/50 bg-secondary shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      fill
                      sizes="(max-width: 640px) 64px, 80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-[10px] uppercase tracking-widest text-muted-foreground">
                      Cover
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
