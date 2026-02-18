"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEventHandler, ReactNode } from "react";

type NavHashLinkProps = {
  href: string;
  targetId: string;
  className?: string;
  children: ReactNode;
};

export default function NavHashLink({
  href,
  targetId,
  className,
  children,
}: NavHashLinkProps) {
  const pathname = usePathname();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${targetId}`);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
