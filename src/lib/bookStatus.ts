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
    textClassName: "text-emerald-600 dark:text-emerald-400",
    dotClassName: "bg-emerald-600 dark:bg-emerald-400",
  },
  "read-noted": {
    label: "Read & noted",
    textClassName: "text-violet-600 dark:text-violet-400",
    dotClassName: "bg-violet-600 dark:bg-violet-400",
  },
  "in-progress": {
    label: "In progress",
    textClassName: "text-amber-600 dark:text-amber-400",
    dotClassName: "bg-amber-600 dark:bg-amber-400",
  },
  "not-started": {
    label: "Not started yet",
    textClassName: "text-muted-foreground",
    dotClassName: "bg-muted-foreground",
  },
};

export function getBookStatusMeta(status: BookStatus): BookStatusMeta {
  return BOOK_STATUS_META[status];
}
