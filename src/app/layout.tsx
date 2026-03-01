import Image from "next/image";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavHashLink from "@/components/NavHashLink";
import ThemeToggle from "@/components/ThemeToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jayson Sao",
  description:
    "Portfolio and personal site for Jayson Sao, focused on interactive learning products and systems software.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
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
  "inline-flex items-center px-2 py-1 text-sm font-medium text-slate-600 no-underline transition hover:text-slate-900 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_75%_48%)] dark:text-zinc-300 dark:hover:text-zinc-100";

const sideNavLinkClass =
  "inline-flex items-center justify-start border border-stone-300 bg-[hsl(42_32%_93%)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 no-underline transition hover:border-stone-400 hover:text-slate-900 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_80%_68%)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-zinc-100";

function BrandLockup() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-black bg-white dark:border-zinc-300 dark:bg-zinc-100"
      >
        <Image
          src="/icon.png"
          alt=""
          width={32}
          height={32}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-zinc-100">
          Jayson Sao
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-400">
          Software Engineer
        </span>
      </span>
    </div>
  );
}

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
      <body className={`${spaceGrotesk.className} bg-background text-slate-900 antialiased dark:bg-zinc-900 dark:text-zinc-100`}>
        <div id="top" className="relative flex min-h-screen flex-col">
          <ThemeToggle />
          <header className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
            <div className="flex items-start justify-between">
              <NavHashLink
                href="/#top"
                targetId="top"
                className="no-underline hover:no-underline sm:hidden"
              >
                <BrandLockup />
              </NavHashLink>
              <nav className="flex items-center gap-3 sm:hidden">
                <NavHashLink
                  href="/#home-about"
                  targetId="home-about"
                  className={navLinkClass}
                >
                  About
                </NavHashLink>
                <NavHashLink
                  href="/#home-experience"
                  targetId="home-experience"
                  className={navLinkClass}
                >
                  Experience
                </NavHashLink>
                <NavHashLink
                  href="/#home-projects"
                  targetId="home-projects"
                  className={navLinkClass}
                >
                  Projects
                </NavHashLink>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={navLinkClass}
                >
                  Resume
                </a>
                <a
                  href="https://curius.app/jayson-sao"
                  target="_blank"
                  rel="noreferrer"
                  className={navLinkClass}
                >
                  Curious
                </a>
                <a href="mailto:jaysonsao@gmail.com" className={navLinkClass}>
                  Contact
                </a>
                <a
                  href="https://github.com/jaysonsao"
                  target="_blank"
                  rel="noreferrer"
                  className={navLinkClass}
                >
                  GitHub
                </a>
              </nav>
            </div>
          </header>
          <NavHashLink
            href="/#top"
            targetId="top"
            className="fixed left-4 top-4 z-40 hidden no-underline hover:no-underline sm:flex"
          >
            <BrandLockup />
          </NavHashLink>
          <nav className="fixed left-4 top-20 z-40 hidden flex-col items-start gap-2 sm:flex">
            <NavHashLink
              href="/#home-about"
              targetId="home-about"
              className={sideNavLinkClass}
            >
              About
            </NavHashLink>
            <NavHashLink
              href="/#home-experience"
              targetId="home-experience"
              className={sideNavLinkClass}
            >
              Experience
            </NavHashLink>
            <NavHashLink
              href="/#home-projects"
              targetId="home-projects"
              className={sideNavLinkClass}
            >
              Projects
            </NavHashLink>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={sideNavLinkClass}
            >
              Resume
            </a>
            <a
              href="https://curius.app/jayson-sao"
              target="_blank"
              rel="noreferrer"
              className={sideNavLinkClass}
            >
              Curious
            </a>
            <a href="mailto:jaysonsao@gmail.com" className={sideNavLinkClass}>
              Contact
            </a>
            <a
              href="https://github.com/jaysonsao"
              target="_blank"
              rel="noreferrer"
              className={sideNavLinkClass}
            >
              GitHub
            </a>
          </nav>
          <main className="mx-auto w-full flex-1 px-6 py-10">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-[hsl(42_32%_93%)] dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-7 text-sm text-slate-500 dark:text-zinc-400 sm:grid-cols-3 sm:items-center sm:px-6">
              <p className="text-center sm:text-left">© {new Date().getFullYear()} Jayson Sao. All rights reserved.</p>
              <div id="contact" className="flex flex-col items-center justify-center gap-2 text-xs font-medium">
                <p className="uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">Contact</p>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <a
                  href="mailto:jaysonsao@gmail.com"
                  className="no-underline transition hover:no-underline text-slate-600 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                >
                  jaysonsao@gmail.com
                </a>
                <span className="text-slate-400 dark:text-zinc-600">•</span>
                <a
                  href="https://github.com/jaysonsao"
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline transition hover:no-underline text-slate-600 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                >
                  GitHub
                </a>
                <span className="text-slate-400 dark:text-zinc-600">•</span>
                <a
                  href="https://www.linkedin.com/in/jaysonsao"
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline transition hover:no-underline text-slate-600 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                >
                  LinkedIn
                </a>
                </div>
              </div>
              <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400 sm:text-right">
                Crafted with Next.js & Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
