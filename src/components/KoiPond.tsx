"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
} from "@rive-app/react-canvas";

const ANIMATIONS = [
  "Idle Loop",
  "Dart Startle",
  "Mouth Nibble Loop",
  "Gill Pulse Loop",
  "Fin Fidgets Loop",
  "Swim Slow",
  "Swim Medium",
  "Swim Fast",
  "Swim Circle Clockwise",
] as const;

const IDLE_VARIANTS = [
  "Idle Loop",
  "Mouth Nibble Loop",
  "Gill Pulse Loop",
  "Fin Fidgets Loop",
] as const;

const SPEED_THRESHOLDS = {
  idle: 6,
  fidget: 16,
  slow: 40,
  medium: 80,
};

const TURN_RATE = 1.8;
const ACCEL = 45;
const DECEL = 70;
const CIRCLE_SPEED = 95;
const DART_SPEED = 190;
const DART_DURATION = 0.6;
const HEADING_OFFSET = Math.PI / 2;
const CLICK_COOLDOWN = 3000;
const VERTICAL_MARGIN_BOOST = 30;
const FOOD_EAT_DISTANCE = 0.45;
const FOOD_CHASE_RANGE = 9999;
const NIBBLE_DURATION = 900;
const BUCKET_HOVER_SPEED = 1.8;

type Mode = "normal" | "circle" | "dart";

type FishState = {
  x: number;
  y: number;
  heading: number;
  targetHeading: number;
  speed: number;
  targetSpeed: number;
  changeUntil: number;
  boostUntil: number;
  boostSpeed: number;
  mode: Mode;
  modeUntil: number;
  clickBlockedUntil: number;
  nibbleUntil: number;
  circle: {
    cx: number;
    cy: number;
    radius: number;
    angle: number;
    angularSpeed: number;
  };
  idleVariant: typeof IDLE_VARIANTS[number];
  idleUntil: number;
  activeAnimation: string;
};

type FoodPellet = {
  id: string;
  x: number;
  y: number;
};

type DragState = {
  active: boolean;
  x: number;
  y: number;
  pointerId: number | null;
};

const normalizeAngle = (angle: number) => {
  let next = angle;
  while (next > Math.PI) {
    next -= Math.PI * 2;
  }
  while (next < -Math.PI) {
    next += Math.PI * 2;
  }
  return next;
};

export default function KoiPond() {
  const pondRef = useRef<HTMLDivElement | null>(null);
  const fishRef = useRef<HTMLDivElement | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, fish: 0 });
  const rafRef = useRef<number | null>(null);
  const [foods, setFoods] = useState<FoodPellet[]>([]);
  const foodsRef = useRef<FoodPellet[]>([]);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<DragState>({
    active: false,
    x: 0,
    y: 0,
    pointerId: null,
  });
  const stateRef = useRef<FishState>({
    x: 0,
    y: 0,
    heading: 0,
    targetHeading: 0,
    speed: 12,
    targetSpeed: 12,
    changeUntil: 0,
    boostUntil: 0,
    boostSpeed: 0,
    mode: "normal",
    modeUntil: 0,
    clickBlockedUntil: 0,
    nibbleUntil: 0,
    circle: {
      cx: 0,
      cy: 0,
      radius: 0,
      angle: 0,
      angularSpeed: 0,
    },
    idleVariant: "Idle Loop",
    idleUntil: 0,
    activeAnimation: "",
  });

  const { rive, RiveComponent } = useRive({
    src: "/koi/fish3.riv",
    autoplay: false,
    animations: ANIMATIONS,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const { rive: bucketRive, RiveComponent: BucketRive } = useRive({
    src: "/koi/bucket.riv",
    autoplay: false,
    animations: "highlight",
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });
  const bucketRafRef = useRef<number | null>(null);
  const bucketTimeRef = useRef(0);
  const bucketHoverRef = useRef(false);

  useEffect(() => {
    if (!bucketRive) {
      return;
    }
    bucketRive.resizeDrawingSurfaceToCanvas();
    bucketRive.pause("highlight");
    bucketRive.scrub("highlight", 0);
    bucketRive.drawFrame();
  }, [bucketRive]);

  const updateFoods = (
    updater: (prev: FoodPellet[]) => FoodPellet[],
  ) => {
    setFoods((prev) => {
      const next = updater(prev);
      foodsRef.current = next;
      return next;
    });
  };

  const addFood = (x: number, y: number) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    updateFoods((prev) => [...prev, { id, x, y }]);
  };

  useEffect(() => {
    const pond = pondRef.current;
    const fish = fishRef.current;
    if (!pond || !fish) {
      return;
    }

    const updateSize = () => {
      const rect = pond.getBoundingClientRect();
      const fishStyle = window.getComputedStyle(fish);
      const fishSize = parseFloat(fishStyle.width) || fish.offsetWidth || 120;
      sizeRef.current = { width: rect.width, height: rect.height, fish: fishSize };

      const state = stateRef.current;
      if (state.x === 0 && state.y === 0) {
        state.x = rect.width / 2;
        state.y = rect.height / 2;
        state.heading = Math.random() * Math.PI * 2;
        state.targetHeading = state.heading;
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(pond);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMove = (event: globalThis.PointerEvent) => {
      if (!dragRef.current.active) {
        return;
      }
      const pond = pondRef.current;
      if (!pond) {
        return;
      }
      const rect = pond.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      dragRef.current.x = x;
      dragRef.current.y = y;
      setDragPos({ x, y });
    };

    const handleUp = (event: globalThis.PointerEvent) => {
      if (!dragRef.current.active) {
        return;
      }
      const pond = pondRef.current;
      dragRef.current.active = false;
      dragRef.current.pointerId = null;
      if (!pond) {
        setDragPos(null);
        return;
      }
      const rect = pond.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside =
        x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside) {
        addFood(x, y);
      }
      setDragPos(null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  useEffect(() => {
    if (!rive) {
      return;
    }

    rive.pause(ANIMATIONS);
    rive.resizeDrawingSurfaceToCanvas();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      rive.scrub("Idle Loop", 0);
      rive.drawFrame();
      return;
    }

    const removeFood = (id: string) => {
      setFoods((prev) => {
        const next = prev.filter((item) => item.id !== id);
        foodsRef.current = next;
        return next;
      });
    };

    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const state = stateRef.current;
      const { width, height, fish } = sizeRef.current;
      const margin = fish * 0.55;
      const marginY = Math.max(6, margin - VERTICAL_MARGIN_BOOST);

      if (state.mode === "circle" && now >= state.modeUntil) {
        state.mode = "normal";
      }
      if (state.mode === "dart" && now >= state.modeUntil) {
        const boostSpeed = Math.random() < 0.5 ? 72 : 110;
        state.mode = "normal";
        state.boostUntil = now + 500;
        state.boostSpeed = boostSpeed;
        state.targetHeading = state.heading;
        state.targetSpeed = boostSpeed;
        state.changeUntil = state.boostUntil;
        state.speed = Math.max(state.speed, boostSpeed);
      }

      let chasingFood = false;
      const foods = foodsRef.current;
      let targetFood: FoodPellet | null = null;
      if (state.mode === "normal" && foods.length > 0) {
        let minDistance = Number.POSITIVE_INFINITY;
        foods.forEach((food) => {
          const dx = food.x - state.x;
          const dy = food.y - state.y;
          const dist = Math.hypot(dx, dy);
          if (dist < minDistance) {
            minDistance = dist;
            targetFood = food;
          }
        });
        if (targetFood) {
          const dx = targetFood.x - state.x;
          const dy = targetFood.y - state.y;
          const dist = Math.hypot(dx, dy);
          const eatRadius = fish * FOOD_EAT_DISTANCE;
          if (dist <= eatRadius) {
            state.heading = Math.atan2(dy, dx);
            state.targetHeading = state.heading;
            state.speed = Math.min(state.speed, 6);
            state.targetSpeed = 0;
            state.nibbleUntil = now + NIBBLE_DURATION;
            removeFood(targetFood.id);
          } else if (dist <= FOOD_CHASE_RANGE) {
            state.targetHeading = Math.atan2(dy, dx);
            state.targetSpeed = dist > 150 ? 90 : dist > 90 ? 60 : 36;
            state.changeUntil = now + 250;
            chasingFood = true;
          }
        }
      }

      if (state.mode === "circle") {
        const circle = state.circle;
        circle.angle = normalizeAngle(circle.angle + circle.angularSpeed * dt);
        state.x = circle.cx + Math.cos(circle.angle) * circle.radius;
        state.y = circle.cy + Math.sin(circle.angle) * circle.radius;
        state.heading = normalizeAngle(circle.angle + Math.PI / 2);
        state.speed = CIRCLE_SPEED;
      } else if (state.mode === "dart") {
        state.speed = Math.max(0, state.speed - DECEL * dt);
        state.x += Math.cos(state.heading) * state.speed * dt;
        state.y += Math.sin(state.heading) * state.speed * dt;
      } else {
        if (now < state.boostUntil) {
          state.targetSpeed = state.boostSpeed;
          state.targetHeading = state.heading;
          state.changeUntil = state.boostUntil;
        } else if (now >= state.changeUntil) {
          const roll = Math.random();
          if (roll < 0.3) {
            state.targetSpeed = Math.random() * 6;
          } else if (roll < 0.65) {
            state.targetSpeed = 14 + Math.random() * 18;
          } else if (roll < 0.88) {
            state.targetSpeed = 34 + Math.random() * 30;
          } else {
            state.targetSpeed = 72 + Math.random() * 45;
          }
          state.targetHeading = Math.random() * Math.PI * 2;
          state.changeUntil = now + (2.5 + Math.random() * 4.5) * 1000;
        }

        const headingDelta = normalizeAngle(state.targetHeading - state.heading);
        const turnRate = chasingFood ? TURN_RATE * 2.1 : TURN_RATE;
        const turn = Math.max(
          -turnRate * dt,
          Math.min(turnRate * dt, headingDelta),
        );
        state.heading = normalizeAngle(state.heading + turn);

        const speedDelta = state.targetSpeed - state.speed;
        const accel = speedDelta > 0 ? ACCEL : DECEL;
        const speedStep = Math.max(-accel * dt, Math.min(accel * dt, speedDelta));
        state.speed = Math.max(0, state.speed + speedStep);

        const nextX = state.x + Math.cos(state.heading) * state.speed * dt;
        const nextY = state.y + Math.sin(state.heading) * state.speed * dt;

        if (width > 0 && height > 0) {
          if (nextX < margin || nextX > width - margin) {
            state.heading = normalizeAngle(Math.PI - state.heading);
            state.targetHeading = state.heading;
          }
        if (nextY < marginY || nextY > height - marginY) {
          state.heading = normalizeAngle(-state.heading);
          state.targetHeading = state.heading;
        }
        }

        state.x += Math.cos(state.heading) * state.speed * dt;
        state.y += Math.sin(state.heading) * state.speed * dt;
      }

      if (width > 0 && height > 0) {
        state.x = Math.max(margin, Math.min(width - margin, state.x));
        state.y = Math.max(marginY, Math.min(height - marginY, state.y));
      }

      let nextAnimation = state.activeAnimation;
      const speed = state.speed;
      if (state.mode === "circle") {
        nextAnimation = "Swim Circle Clockwise";
      } else if (state.mode === "dart") {
        nextAnimation = "Dart Startle";
      } else if (now < state.nibbleUntil) {
        nextAnimation = "Mouth Nibble Loop";
      } else if (now < state.boostUntil) {
        nextAnimation =
          state.boostSpeed <= SPEED_THRESHOLDS.medium
            ? "Swim Medium"
            : "Swim Fast";
      } else if (speed <= SPEED_THRESHOLDS.idle) {
        if (now >= state.idleUntil) {
          const nextIndex = Math.floor(Math.random() * IDLE_VARIANTS.length);
          state.idleVariant = IDLE_VARIANTS[nextIndex];
          state.idleUntil = now + (2.5 + Math.random() * 3) * 1000;
        }
        nextAnimation = state.idleVariant;
      } else if (speed <= SPEED_THRESHOLDS.fidget) {
        nextAnimation = "Fin Fidgets Loop";
      } else if (speed <= SPEED_THRESHOLDS.slow) {
        nextAnimation = "Swim Slow";
      } else if (speed <= SPEED_THRESHOLDS.medium) {
        nextAnimation = "Swim Medium";
      } else {
        nextAnimation = "Swim Fast";
      }

      if (nextAnimation !== state.activeAnimation) {
        state.activeAnimation = nextAnimation;
        rive.pause(ANIMATIONS);
        rive.play(nextAnimation);
      }

      rive.drawFrame();

      const fishEl = fishRef.current;
      if (fishEl) {
        fishEl.style.left = `${state.x - fish / 2}px`;
        fishEl.style.top = `${state.y - fish / 2}px`;
        const headingDeg = ((state.heading + HEADING_OFFSET) * 180) / Math.PI;
        fishEl.style.transform = `rotate(${headingDeg}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [rive]);

  const handleFishClick = () => {
    const { width, height, fish } = sizeRef.current;
    const state = stateRef.current;
    const now = performance.now();
    if (now < state.clickBlockedUntil) {
      return;
    }
    state.clickBlockedUntil = now + CLICK_COOLDOWN;
    if (!width || !height) {
      return;
    }

    const margin = fish * 0.55;
    const marginY = Math.max(6, margin - VERTICAL_MARGIN_BOOST);
    const maxRadius = Math.min(
      state.x - margin,
      width - margin - state.x,
      state.y - marginY,
      height - marginY - state.y,
    );

    const canCircle = maxRadius > fish * 0.6;
    const doCircle = canCircle && Math.random() < 0.1;
    if (doCircle) {
      const radius = Math.min(maxRadius, Math.min(width, height) * 0.35);
      state.mode = "circle";
      state.circle.radius = radius;
      state.circle.cx = Math.min(
        Math.max(state.x, margin + radius),
        width - margin - radius,
      );
      state.circle.cy = Math.min(
        Math.max(state.y, margin + radius),
        height - margin - radius,
      );
      state.circle.angle = Math.atan2(
        state.y - state.circle.cy,
        state.x - state.circle.cx,
      );
      state.circle.angularSpeed = CIRCLE_SPEED / radius;
      state.modeUntil = now + ((Math.PI * 2) / state.circle.angularSpeed) * 1000;
      state.activeAnimation = "";
    } else {
      state.heading = Math.random() * Math.PI * 2;
      state.targetHeading = state.heading;
      state.speed = DART_SPEED;
      state.mode = "dart";
      state.modeUntil = now + DART_DURATION * 1000;
      state.activeAnimation = "";
    }
  };

  const handleBucketPointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (dragRef.current.active) {
      return;
    }
    const pond = pondRef.current;
    if (!pond) {
      return;
    }
    const rect = pond.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    dragRef.current.active = true;
    dragRef.current.pointerId = event.pointerId;
    dragRef.current.x = x;
    dragRef.current.y = y;
    setDragPos({ x, y });
  };

  const handleBucketHover = () => {
    if (!bucketRive) {
      return;
    }
    bucketHoverRef.current = true;
    if (bucketRafRef.current !== null) {
      return;
    }
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      if (!bucketHoverRef.current || !bucketRive) {
        bucketRafRef.current = null;
        return;
      }
      bucketTimeRef.current += dt * BUCKET_HOVER_SPEED;
      bucketRive.scrub("highlight", bucketTimeRef.current);
      bucketRive.drawFrame();
      bucketRafRef.current = requestAnimationFrame(tick);
    };
    bucketRafRef.current = requestAnimationFrame(tick);
  };

  const handleBucketLeave = () => {
    if (!bucketRive) {
      return;
    }
    bucketHoverRef.current = false;
    if (bucketRafRef.current) {
      cancelAnimationFrame(bucketRafRef.current);
      bucketRafRef.current = null;
    }
    bucketTimeRef.current = 0;
    bucketRive.pause("highlight");
    bucketRive.scrub("highlight", 0);
    bucketRive.drawFrame();
  };

  return (
    <div className="koi-pond-wrap">
      <button
        type="button"
        className="fish-food-bucket"
        onPointerDown={handleBucketPointerDown}
        onPointerEnter={handleBucketHover}
        onPointerLeave={handleBucketLeave}
        aria-label="Fish food bucket"
      >
        <BucketRive className="fish-food-rive" />
        <span className="fish-food-label">Fish food</span>
      </button>
      <div
        ref={pondRef}
        className="koi-pond"
        role="img"
        aria-label="Animated koi pond"
      >
        {foods.map((food) => (
          <span
            key={food.id}
            className="fish-food-pellet"
            style={{ left: food.x, top: food.y }}
          />
        ))}
        {dragPos ? (
          <span
            className="fish-food-pellet fish-food-ghost"
            style={{ left: dragPos.x, top: dragPos.y }}
          />
        ) : null}
        <div ref={fishRef} className="koi-fish" onPointerDown={handleFishClick}>
          <RiveComponent className="koi-rive" />
        </div>
      </div>
    </div>
  );
}
