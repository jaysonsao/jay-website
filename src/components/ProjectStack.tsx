"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import type { Project } from "@/data/projects";

type ProjectStackProps = {
  projects: Project[];
};

type RippleState = {
  width: number;
  height: number;
  curr: Float32Array;
  next: Float32Array;
  imageData: ImageData | null;
  ctx: CanvasRenderingContext2D | null;
};

const DAMPING = 0.982;
const BASE_COLOR = { r: 20, g: 70, b: 120 };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function WaterProjectCard({ project }: { project: Project }) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const rippleRef = useRef<RippleState>({
    width: 0,
    height: 0,
    curr: new Float32Array(0),
    next: new Float32Array(0),
    imageData: null,
    ctx: null,
  });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const link = linkRef.current;
    const canvas = canvasRef.current;
    if (!link || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    rippleRef.current.ctx = ctx;
    ctx.imageSmoothingEnabled = true;
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateSize = () => {
      const rect = link.getBoundingClientRect();
      const width = Math.max(120, Math.round(rect.width / 4.5));
      const height = Math.max(
        80,
        Math.round(width * (rect.height / rect.width)),
      );

      if (width === rippleRef.current.width && height === rippleRef.current.height) {
        return;
      }

      canvas.width = width;
      canvas.height = height;
      rippleRef.current.width = width;
      rippleRef.current.height = height;
      rippleRef.current.curr = new Float32Array(width * height);
      rippleRef.current.next = new Float32Array(width * height);
      rippleRef.current.imageData = ctx.createImageData(width, height);
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(link);

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (stopTimerRef.current) {
        window.clearTimeout(stopTimerRef.current);
      }
    };
  }, []);

  const step = () => {
    const { ctx, imageData, curr, next, width, height } = rippleRef.current;
    if (!ctx || !imageData || width === 0 || height === 0) {
      return;
    }

    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const index = x + y * width;
        next[index] =
          ((curr[index - 1] +
            curr[index + 1] +
            curr[index - width] +
            curr[index + width]) *
            0.5 -
            next[index]) *
          DAMPING;
      }
    }

    rippleRef.current.curr = next;
    rippleRef.current.next = curr;

    const data = imageData.data;
    data.fill(0);

    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const index = x + y * width;
        const heightValue = rippleRef.current.curr[index];
        const dx =
          rippleRef.current.curr[index - 1] -
          rippleRef.current.curr[index + 1];
        const dy =
          rippleRef.current.curr[index - width] -
          rippleRef.current.curr[index + width];
        const shade = (dx + dy) * 0.8;

        const r = clamp(BASE_COLOR.r + shade * 140 + heightValue * 10, 0, 255);
        const g = clamp(BASE_COLOR.g + shade * 170 + heightValue * 12, 0, 255);
        const b = clamp(BASE_COLOR.b + shade * 220 + heightValue * 14, 0, 255);
        const alpha = clamp(40 + Math.abs(heightValue) * 60, 0, 190);

        const offset = index * 4;
        data[offset] = r;
        data[offset + 1] = g;
        data[offset + 2] = b;
        data[offset + 3] = alpha;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const animate = () => {
    if (!activeRef.current) {
      return;
    }
    step();
    rafRef.current = requestAnimationFrame(animate);
  };

  const disturb = (nx: number, ny: number, force: number) => {
    const { curr, width, height } = rippleRef.current;
    if (width === 0 || height === 0) {
      return;
    }

    const x = Math.floor(nx * (width - 1));
    const y = Math.floor(ny * (height - 1));
    const radius = 3;

    for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
      for (let offsetX = -radius; offsetX <= radius; offsetX += 1) {
        const targetX = x + offsetX;
        const targetY = y + offsetY;
        if (
          targetX < 1 ||
          targetX >= width - 1 ||
          targetY < 1 ||
          targetY >= height - 1
        ) {
          continue;
        }
        const distance = Math.hypot(offsetX, offsetY) || 1;
        const impact = force * (1 - distance / (radius + 0.8));
        curr[targetX + targetY * width] += impact;
      }
    }
  };

  const wake = () => {
    if (reducedMotionRef.current) {
      return;
    }

    activeRef.current = true;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(animate);
    }
    if (stopTimerRef.current) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  };

  const scheduleStop = () => {
    if (reducedMotionRef.current) {
      return;
    }

    if (stopTimerRef.current) {
      window.clearTimeout(stopTimerRef.current);
    }
    stopTimerRef.current = window.setTimeout(() => {
      activeRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }, 900);
  };

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const link = linkRef.current;
    if (!link) {
      return;
    }

    const rect = link.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const now = performance.now();

    const last = lastPosRef.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(16, now - last.time);
      const speed = dist / dt;
      const force = Math.min(8.5, 2.5 + speed * 14);
      const steps = Math.min(7, Math.max(1, Math.round(dist / 10)));

      for (let i = 0; i <= steps; i += 1) {
        const t = steps === 0 ? 1 : i / steps;
        disturb(
          (last.x + dx * t) / rect.width,
          (last.y + dy * t) / rect.height,
          force * (1 - t * 0.35),
        );
      }
    } else {
      disturb(x / rect.width, y / rect.height, 4.5);
    }

    lastPosRef.current = { x, y, time: now };
    wake();
  };

  const handlePointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    const link = linkRef.current;
    if (!link) {
      return;
    }
    const rect = link.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    disturb(x / rect.width, y / rect.height, 4.2);
    lastPosRef.current = { x, y, time: performance.now() };
    wake();
  };

  const handlePointerLeave = () => {
    lastPosRef.current = null;
    scheduleStop();
  };

  return (
    <Link
      ref={linkRef}
      href={`/projects/${project.slug}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(186_70%_60%)]"
    >
      <article className="water-card relative flex flex-col border border-[hsl(186_45%_70%)] bg-[hsl(210_28%_18%)] text-slate-100 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(186_55%_62%)] hover:bg-[hsl(210_30%_16%)] hover:shadow-[0_26px_70px_-46px_rgba(48,196,204,0.55)] md:flex-row">
        <canvas ref={canvasRef} className="water-canvas" aria-hidden />
        <div className="relative h-48 w-full shrink-0 border-b border-[hsl(186_40%_45%)] bg-[hsl(210_30%_22%)] transition-colors duration-300 group-hover:bg-[hsl(210_32%_20%)] md:h-44 md:w-60 md:border-b-0 md:border-r">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(min-width: 768px) 240px, 100vw"
              className="object-contain p-6 transition duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.3em] text-slate-400">
              {project.title}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center px-6 py-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.24em] text-slate-300">
              {project.year}
            </span>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[hsl(186_80%_70%)] sm:text-4xl">
              {project.title}
            </h3>
          </div>
          <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-64 group-hover:opacity-100">
            <div className="space-y-3 text-center">
              <p className="text-sm text-slate-200">{project.summary}</p>
              <p className="text-sm text-slate-300">{project.focus}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[hsl(186_70%_70%)]">
              {project.stack.slice(0, 4).map((tool) => (
                <span
                  key={`${project.slug}-${tool}`}
                  className="border border-[hsl(186_55%_55%)] bg-[hsl(210_30%_24%)] px-3 py-1"
                >
                  {tool}
                </span>
              ))}
              <span className="text-[hsl(186_70%_70%)] transition-transform duration-300 group-hover:translate-x-1">
                View project →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProjectStack({ projects }: ProjectStackProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <WaterProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
