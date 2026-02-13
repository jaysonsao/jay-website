import Image from "next/image";

const bookReviews = [
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    takeaway: "add later",
    image: "/covers/project_hail_mary.jpg",
  },
  {
    title: "Artemis",
    author: "Andy Weir",
    takeaway: "add later",
    image: "/covers/artemis.jpg",
  },
  {
    title: "Armada",
    author: "Ernest Cline",
    takeaway: "add later",
    image: "/covers/armada.jpg",
  },
  {
    title: "We Are Legion (We are Bob)",
    author: "Dennis E. Taylor",
    takeaway: "add later",
    image: "/covers/we_are_legion.jpg",
  },
  {
    title: "For We Are Many",
    author: "Dennis E. Taylor",
    takeaway: "add later",
    image: "/covers/many.jpeg",
  },
  {
    title: "The Mountain in the Sea",
    author: "",
    takeaway: "add later",
    image: "/covers/mountain.avif",
  },
  {
    title: "Ocean",
    author: "David Attenborough",
    takeaway: "add later",
    image: "/covers/ocean.jpg",
  },
  {
    title: "Abundance",
    author: "Ezra Klein & Derek Thompson",
    takeaway: "add later",
    image: "/covers/abundance.jpg",
  },
  {
    title: "The Four Realms of Existence",
    author: "Joseph E. LeDoux",
    takeaway: "add later",
    image: "/covers/realms.jpg",
  },
];

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

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {bookReviews.map((book) => (
          <article
            key={book.title}
            className="flex h-full flex-col justify-between border border-slate-300/80 bg-[hsl(210_30%_98%)] px-5 py-4 transition hover:border-slate-400 dark:border-slate-700 dark:bg-[hsl(217_25%_16%)] dark:hover:border-slate-500"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[hsl(186_60%_32%)] dark:text-[hsl(186_70%_72%)]">
                  <span
                    className="inline-flex h-2 w-2 bg-[hsl(186_70%_50%)] dark:bg-[hsl(186_70%_72%)]"
                    aria-hidden
                  />
                  <span>Read & noted</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
              </div>
              <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                {book.image ? (
                  <Image
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                ) : (
                  <div className="absolute inset-1 grid place-content-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 dark:text-slate-500">
                    Cover
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 text-base text-slate-700 dark:text-slate-200">{book.takeaway}</p>
            <div className="pt-4 text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              <span>Saved for future prototypes</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
