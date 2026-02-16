export const BOOK_STATUS = [
  "read",
  "read-noted",
  "in-progress",
  "not-started",
] as const;

export type BookStatus = (typeof BOOK_STATUS)[number];

type BookStatusMeta = {
  label: string;
  textClassName: string;
  dotClassName: string;
};

const BOOK_STATUS_META: Record<BookStatus, BookStatusMeta> = {
  read: {
    label: "Read",
    textClassName: "text-slate-600 dark:text-slate-300",
    dotClassName: "bg-slate-500 dark:bg-slate-400",
  },
  "read-noted": {
    label: "Read & noted",
    textClassName: "text-slate-600 dark:text-slate-300",
    dotClassName: "bg-slate-500 dark:bg-slate-400",
  },
  "in-progress": {
    label: "In progress",
    textClassName: "text-slate-600 dark:text-slate-300",
    dotClassName: "bg-slate-500 dark:bg-slate-400",
  },
  "not-started": {
    label: "Not started yet",
    textClassName: "text-slate-600 dark:text-slate-300",
    dotClassName: "bg-slate-500 dark:bg-slate-400",
  },
};

export function getBookStatusMeta(status: BookStatus): BookStatusMeta {
  return BOOK_STATUS_META[status];
}
