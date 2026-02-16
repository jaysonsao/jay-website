"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  Alignment,
  Fit,
  Layout,
  StateMachineInput,
  StateMachineInputType,
  useRive,
} from "@rive-app/react-canvas";

const STATE_MACHINE_NAME = "State Machine 1";
const FISH_TRIGGER_NAMES = [
  "Idle1",
  "SwimSlow",
  "SwimMed",
  "SwimFast",
  "Nibble",
  "FinFidgets",
  "Pulse",
  "Dart",
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
const DART_CHANCE_PER_DECISION = 0.05;
const VERTICAL_MARGIN_BOOST = 30;
const FOOD_EAT_DISTANCE = 0.45;
const FOOD_CHASE_RANGE = 9999;
const NIBBLE_DURATION = 900;
const BUCKET_HOVER_SPEED = 1.8;

type Mode = "normal" | "circle" | "dart";
type FishTriggerName = (typeof FISH_TRIGGER_NAMES)[number];

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
  nibbleUntil: number;
  circle: {
    cx: number;
    cy: number;
    radius: number;
    angle: number;
    angularSpeed: number;
  };
  idleBehavior: "idle" | "pulse";
  idleUntil: number;
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

const normalizeInputName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

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
    nibbleUntil: 0,
    circle: {
      cx: 0,
      cy: 0,
      radius: 0,
      angle: 0,
      angularSpeed: 0,
    },
    idleBehavior: "idle",
    idleUntil: 0,
  });

  const { rive, RiveComponent } = useRive({
    src: "/koi/fish3.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
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
  const warnedInputRef = useRef(false);
  const fishTriggerInputsRef = useRef<Record<FishTriggerName, StateMachineInput | null>>({
    Idle1: null,
    SwimSlow: null,
    SwimMed: null,
    SwimFast: null,
    Nibble: null,
    FinFidgets: null,
    Pulse: null,
    Dart: null,
  });
  const lastFishTriggerRef = useRef<{ name: FishTriggerName | null; at: number }>({
    name: null,
    at: 0,
  });

  useEffect(() => {
    if (!bucketRive) {
      return;
    }
    bucketRive.resizeDrawingSurfaceToCanvas();
    bucketRive.pause("highlight");
    bucketRive.scrub("highlight", 0);
    bucketRive.drawFrame();
  }, [bucketRive]);

  const updateFoods = useCallback((
    updater: (prev: FoodPellet[]) => FoodPellet[],
  ) => {
    setFoods((prev) => {
      const next = updater(prev);
      foodsRef.current = next;
      return next;
    });
  }, []);

  const addFood = useCallback((x: number, y: number) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    updateFoods((prev) => [...prev, { id, x, y }]);
  }, [updateFoods]);

  const fireFishTrigger = useCallback((
    trigger: FishTriggerName,
    now: number,
    options?: { force?: boolean },
  ) => {
    const input = fishTriggerInputsRef.current[trigger];
    if (!input || input.type !== StateMachineInputType.Trigger) {
      return;
    }

    const force = options?.force ?? false;
    const last = lastFishTriggerRef.current;
    if (!force && last.name === trigger && now - last.at < 280) {
      return;
    }

    input.fire();
    lastFishTriggerRef.current = { name: trigger, at: now };
  }, []);

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
  }, [addFood]);

  useEffect(() => {
    if (!rive) {
      return;
    }

    rive.resizeDrawingSurfaceToCanvas();
    rive.play(STATE_MACHINE_NAME);

    const stateMachineInputs = rive.stateMachineInputs(STATE_MACHINE_NAME);
    const triggerCandidates = stateMachineInputs.filter(
      (input) => input.type === StateMachineInputType.Trigger,
    );
    const triggerByName = new Map(
      triggerCandidates.map((input) => [normalizeInputName(input.name), input]),
    );

    fishTriggerInputsRef.current = {
      Idle1:
        triggerByName.get("idle1") ??
        triggerByName.get("idleloop") ??
        null,
      SwimSlow: triggerByName.get("swimslow") ?? null,
      SwimMed:
        triggerByName.get("swimmed") ??
        triggerByName.get("swimmedium") ??
        null,
      SwimFast: triggerByName.get("swimfast") ?? null,
      Nibble: triggerByName.get("nibble") ?? null,
      FinFidgets:
        triggerByName.get("finfidgets") ??
        triggerByName.get("fidgets") ??
        null,
      Pulse: triggerByName.get("pulse") ?? null,
      Dart:
        triggerByName.get("dart") ??
        triggerByName.get("dartstartle") ??
        triggerByName.get("startle") ??
        null,
    };

    const missingTriggers = FISH_TRIGGER_NAMES.filter(
      (name) => !fishTriggerInputsRef.current[name],
    );

    if (
      !warnedInputRef.current &&
      missingTriggers.length === FISH_TRIGGER_NAMES.length
    ) {
      warnedInputRef.current = true;
      console.warn(
        `[KoiPond] No trigger inputs detected on "${STATE_MACHINE_NAME}". Available inputs: ${stateMachineInputs
          .map((input) => input.name)
          .join(", ") || "(none)"}`,
      );
    } else if (!warnedInputRef.current && missingTriggers.length > 0) {
      warnedInputRef.current = true;
      console.warn(
        `[KoiPond] Missing trigger inputs on "${STATE_MACHINE_NAME}": ${missingTriggers.join(
          ", ",
        )}`,
      );
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      fireFishTrigger("Idle1", performance.now(), { force: true });
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
        // Keep post-dart recovery in medium swim band.
        const boostSpeed = 38;
        state.mode = "normal";
        state.boostUntil = now + 500;
        state.boostSpeed = boostSpeed;
        state.targetHeading = state.heading;
        state.targetSpeed = boostSpeed;
        state.changeUntil = state.boostUntil;
        state.speed = Math.max(state.speed, boostSpeed);
      }

      const hasFood = foodsRef.current.length > 0;
      if (
        state.mode === "normal" &&
        now >= state.changeUntil &&
        now >= state.nibbleUntil &&
        now >= state.boostUntil &&
        !hasFood &&
        Math.random() < DART_CHANCE_PER_DECISION
      ) {
        state.heading = Math.random() * Math.PI * 2;
        state.targetHeading = state.heading;
        state.speed = DART_SPEED;
        state.targetSpeed = DART_SPEED;
        state.mode = "dart";
        state.modeUntil = now + DART_DURATION * 1000;
        state.changeUntil = state.modeUntil + 500 + Math.random() * 900;
        fireFishTrigger("Dart", now, { force: true });
      }

      let chasingFood = false;
      const foods = foodsRef.current;
      let targetFood: FoodPellet | null = null;
      if (state.mode === "normal" && foods.length > 0) {
        let minDistance = Number.POSITIVE_INFINITY;
        for (const food of foods) {
          const dx = food.x - state.x;
          const dy = food.y - state.y;
          const dist = Math.hypot(dx, dy);
          if (dist < minDistance) {
            minDistance = dist;
            targetFood = food;
          }
        }
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
            state.targetSpeed = dist > 150 ? 52 : dist > 90 ? 40 : 26;
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
          if (roll < 0.42) {
            state.targetSpeed = Math.random() * 5;
          } else if (roll < 0.82) {
            state.targetSpeed = 8 + Math.random() * 16;
          } else if (roll < 0.97) {
            state.targetSpeed = 26 + Math.random() * 22;
          } else {
            state.targetSpeed = 60 + Math.random() * 22;
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

      const speed = state.speed;
      let desiredTrigger: FishTriggerName = "SwimMed";
      if (state.mode === "circle") {
        desiredTrigger = "SwimMed";
      } else if (state.mode === "dart") {
        // Dart trigger is fired on state entry; resolve recovery as medium swim.
        desiredTrigger = "SwimMed";
      } else if (now < state.nibbleUntil) {
        desiredTrigger = "Nibble";
      } else if (now < state.boostUntil) {
        desiredTrigger =
          state.boostSpeed <= SPEED_THRESHOLDS.medium ? "SwimMed" : "SwimFast";
      } else if (speed <= SPEED_THRESHOLDS.idle) {
        if (now >= state.idleUntil) {
          state.idleBehavior = Math.random() < 0.2 ? "pulse" : "idle";
          state.idleUntil = now + (2.5 + Math.random() * 3) * 1000;
        }
        desiredTrigger = state.idleBehavior === "pulse" ? "Pulse" : "Idle1";
      } else if (speed <= SPEED_THRESHOLDS.fidget) {
        desiredTrigger = "FinFidgets";
      } else if (speed <= SPEED_THRESHOLDS.slow) {
        desiredTrigger = "SwimSlow";
      } else if (speed <= SPEED_THRESHOLDS.medium) {
        desiredTrigger = "SwimMed";
      } else {
        desiredTrigger = "SwimFast";
      }

      fireFishTrigger(desiredTrigger, now);

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
  }, [rive, fireFishTrigger]);

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
        <div ref={fishRef} className="koi-fish">
          <RiveComponent className="koi-rive" />
        </div>
      </div>
    </div>
  );
}
