import Link from "next/link";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jayson Sao · Product Designer & Engineer",
  description:
    "Portfolio and personal site for Jayson Sao, a product-minded engineer crafting thoughtful web experiences.",
};



const navLinkClass =
  "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_75%_48%)]";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} bg-white text-slate-900 antialiased`}>
        <div className="flex min-h-screen flex-col">
          <ThemeToggle />
          <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur shadow-[0_8px_30px_-18px_rgba(15,23,42,0.2)]">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
              <Link
                href="/"
                className="group flex items-center gap-3 text-lg font-semibold tracking-tight"
              >
                <span className="grid h-11 w-11 place-content-center rounded-full border border-slate-200 bg-slate-50 text-base text-slate-900 transition group-hover:border-slate-300 group-hover:text-slate-700">
                  JS
                </span>
                <span className="flex flex-col">
                  <span className="text-slate-900 transition group-hover:text-slate-700">
                    Jayson Sao
                  </span>
                  <span className="text-xs font-normal uppercase tracking-[0.35em] text-slate-500">
                    Software Engineer
                  </span>
                </span>
              </Link>
              <nav className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-1 shadow-md shadow-slate-200/60 backdrop-blur sm:flex">
                  <Link href="/" className={navLinkClass}>
                    Home
                  </Link>
                  <Link href="/#about" className={navLinkClass}>
                    About
                  </Link>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className={navLinkClass}
                  >
                    Resume
                  </a>
                  <Link href="/about/book-reviews" className={navLinkClass}>
                    Book Reviews
                  </Link>
                </div>
                <a
                  href="jaysonsao@gmail.com"
                  className="inline-flex items-center rounded-full bg-[hsl(186_75%_48%)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[hsl(186_68%_42%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_80%_68%)]"
                >
                  Contact me!
                </a>
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full flex-1 px-6 py-16">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p>© {new Date().getFullYear()} Jayson Sao. All rights reserved.</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Crafted with Next.js & Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
