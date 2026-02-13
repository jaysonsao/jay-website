"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return null;
}

function getSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }
  const stored = readStoredTheme();
  if (stored) {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleThemeChange = () => onStoreChange();
  const handleMediaChange = () => {
    if (readStoredTheme()) {
      return;
    }
    onStoreChange();
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleThemeChange);
  media.addEventListener?.("change", handleMediaChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleThemeChange);
    media.removeEventListener?.("change", handleMediaChange);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  const label = theme === "dark" ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="fixed right-4 top-4 z-50 inline-flex items-center border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
