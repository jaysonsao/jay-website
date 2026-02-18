import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-14 pb-20 pt-6 sm:pt-10">
      <section className="max-w-4xl space-y-6 border-b border-slate-200 pb-10 dark:border-slate-800">
        <h1 className="max-w-3xl text-lg font-medium leading-8 text-slate-800 dark:text-slate-200 sm:text-xl sm:leading-9">
          Hi, I&apos;m Jay. I&apos;m a software engineer aspiring to work with AI
          systems and cryptography. I love skiing, reading all things science
          fiction, and playing rugby. I also dabble in graphic design and
          writing, and I&apos;ll be posting some of that here. Welcome to my home
          on the internet.
        </h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center border border-slate-900 bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
          >
            View Projects
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
          >
            View Resume
          </a>
        </div>
      </section>
    </div>
  );
}
