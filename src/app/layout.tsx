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
  title: "Jayson Sao · Full-Stack Developer",
  description:
    "Portfolio and personal site for Jayson Sao, focused on interactive learning products and systems software.",
};

const themeInitScript = `
(() => {
  try {
    const stored = window.localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "light" || stored === "dark" ? stored : systemDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (_) {}
})();
`;

const navLinkClass =
  "inline-flex items-center px-2 py-1 text-sm font-medium text-slate-600 no-underline transition hover:text-slate-900 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_75%_48%)] dark:text-slate-300 dark:hover:text-slate-100";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${spaceGrotesk.className} bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}>
        <div className="flex min-h-screen flex-col">
          <ThemeToggle />
          <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <Link href="/" className="flex flex-col leading-tight no-underline hover:no-underline">
                <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Jayson Sao
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Software Engineer
                </span>
              </Link>
              <nav className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                <div className="hidden items-center gap-3 sm:flex">
                  <Link href="/" className={navLinkClass}>
                    Home
                  </Link>
                  <Link href="/#projects" className={navLinkClass}>
                    Projects
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
                  <Link href="/book-reviews" className={navLinkClass}>
                    Book Reviews
                  </Link>
                </div>
                <Link
                  href="/#contact"
                  className="inline-flex items-center border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 no-underline transition hover:border-slate-400 hover:text-slate-900 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_80%_68%)] dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-100"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full flex-1 px-6 py-10">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p>© {new Date().getFullYear()} Jayson Sao. All rights reserved.</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Crafted with Next.js & Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
