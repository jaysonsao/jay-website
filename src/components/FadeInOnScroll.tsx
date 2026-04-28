"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type FadeInOnScrollProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  offsetY?: number;
  threshold?: number;
  once?: boolean;
};

export default function FadeInOnScroll({
  children,
  className = "",
  delayMs = 0,
  durationMs = 550,
  offsetY = 16,
  threshold = 0.2,
  once = true,
}: FadeInOnScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
          return;
        }

        if (!once) setIsVisible(false);
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateY(0px) scale(1)"
      : `translateY(${offsetY}px) scale(0.96)`,
    filter: isVisible ? "blur(0px)" : "blur(4px)",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delayMs}ms`,
    transitionDuration: `${durationMs + 200}ms`,
  };

  return (
    <div
      ref={containerRef}
      style={style}
      className={`will-change-[opacity,transform,filter] transition-all motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none motion-reduce:filter-none ${className}`}
    >
      {children}
    </div>
  );
}
