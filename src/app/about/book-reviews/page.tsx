import Link from "next/link";

const aboutNav = [
  { href: "/about", label: "Profile" },
  { href: "/about/book-reviews", label: "Book reviews" },
];

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
    <div className="mx-auto max-w-5xl space-y-14 px-4 pb-16 pt-12 sm:pt-16">
      <div className="flex flex-wrap gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-2 shadow-sm shadow-slate-200/80">
        {aboutNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
              item.href === "/about/book-reviews"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <section className="space-y-4">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Book reviews
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Quality reads from my shelf
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Light notes from books that stuck—quick to scan, easy to reuse in product work.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {bookReviews.map((book) => (
            <article
              key={book.title}
              className="group flex h-full flex-col justify-between rounded-3xl border border-[hsl(186_55%_84%)] bg-white px-6 py-5 shadow-[0_20px_50px_-46px_rgba(48,196,204,0.55)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_70px_-46px_rgba(48,196,204,0.6)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[hsl(186_60%_32%)]">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[hsl(186_70%_50%)]" aria-hidden />
                    <span>Read & noted</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500">{book.author}</p>
                </div>
                <div className="relative w-20 aspect-[3/4] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      className="h-full w-full rounded-lg object-contain"
                    />
                  ) : (
                    <div className="absolute inset-1 grid place-content-center rounded-lg bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Cover
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-4 text-base text-slate-700">
                {book.takeaway}
              </p>
              <div className="pt-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>Saved for future prototypes</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
