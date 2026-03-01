"use client";

import { useRouter } from "next/navigation";

type ProjectBackButtonProps = {
  className?: string;
  fallbackHref?: string;
};

export default function ProjectBackButton({
  className,
  fallbackHref = "/projects",
}: ProjectBackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }
        router.push(fallbackHref);
      }}
      className={className}
    >
      ← Back
    </button>
  );
}
