"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  type UseInViewOptions,
} from "framer-motion";
import { cn } from "@/lib/utils";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { JOURNEYS, type Journey, type JourneyStep } from "./journeys";

const EASE = [0.16, 1, 0.3, 1] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Marks a step "active" once its center crosses the viewport's middle band. */
function useStepInView(
  index: number,
  onActivate: (i: number) => void,
  margin: UseInViewOptions["margin"]
) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return ref;
}

/* ---------- Desktop: sticky scrollytelling ---------- */

function DesktopStep({
  step,
  index,
  isActive,
  accent,
  onActivate,
}: {
  step: JourneyStep;
  index: number;
  isActive: boolean;
  accent: Journey["accent"];
  onActivate: (i: number) => void;
}) {
  const ref = useStepInView(index, onActivate, "-45% 0px -45% 0px");

  return (
    <div ref={ref} className="relative flex min-h-[62vh] flex-col justify-center pl-10">
      <span
        className={cn(
          "absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-sand transition-colors duration-300",
          isActive ? accent.bg : "bg-ink/15"
        )}
      />
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="max-w-md"
      >
        <span
          className={cn(
            "font-mono text-xs font-semibold tracking-wider transition-colors duration-300",
            isActive ? accent.text : "text-ink/35"
          )}
        >
          {pad(index + 1)}
        </span>
        <h3 className="text-balance mt-3 text-2xl font-bold tracking-[-0.01em] text-ink sm:text-[1.7rem]">
          {step.title}
        </h3>
        <p className="mt-2.5 text-base leading-relaxed text-ink/55">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

function DesktopJourney({ journey }: { journey: Journey }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = journey.steps[activeIndex];

  const handleActivate = useCallback((i: number) => setActiveIndex(i), []);

  const progressPct =
    journey.steps.length > 1 ? (activeIndex / (journey.steps.length - 1)) * 100 : 100;

  return (
    <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:gap-20 xl:gap-28">
      {/* Sticky visual */}
      <div className="sticky top-28 h-fit self-start">
        <div className="relative mx-auto w-[280px]">
          <div className="relative aspect-[9/16] w-full">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeStep.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <PhoneMockup src={activeStep.image} alt={activeStep.title} size="lg" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5">
            {journey.steps.map((step, i) => (
              <span
                key={step.title}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === activeIndex ? cn("w-6", journey.accent.bg) : "w-1 bg-ink/15"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step list with progress line */}
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-px bg-ink/10" />
        <motion.div
          className={cn("absolute left-0 top-0 w-px", journey.accent.bg)}
          animate={{ height: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
        {journey.steps.map((step, i) => (
          <DesktopStep
            key={step.title}
            step={step}
            index={i}
            isActive={i === activeIndex}
            accent={journey.accent}
            onActivate={handleActivate}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Mobile: sticky scrollytelling ---------- */

function MobileStep({
  step,
  index,
  isActive,
  accent,
  onActivate,
}: {
  step: JourneyStep;
  index: number;
  isActive: boolean;
  accent: Journey["accent"];
  onActivate: (i: number) => void;
}) {
  const ref = useStepInView(index, onActivate, "-38% 0px -38% 0px");

  return (
    <div
      ref={ref}
      className="flex min-h-[46vh] flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <span
          className={cn(
            "font-mono text-xs font-semibold tracking-wider transition-colors duration-300",
            isActive ? accent.text : "text-ink/35"
          )}
        >
          {pad(index + 1)}
        </span>
        <h3 className="text-balance mt-2 text-xl font-bold tracking-[-0.01em] text-ink">
          {step.title}
        </h3>
        <p className="text-balance mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink/55">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

function MobileJourney({ journey }: { journey: Journey }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = journey.steps[activeIndex];

  const handleActivate = useCallback((i: number) => setActiveIndex(i), []);

  return (
    <div className="lg:hidden">
      {/* Sticky visual */}
      <div className="sticky top-20 z-10 -mx-6 bg-sand px-6 pb-6">
        <div className="relative mx-auto w-[300px] sm:w-[340px]">
          <div className="relative aspect-[9/16] w-full">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeStep.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <PhoneMockup src={activeStep.image} alt={activeStep.title} size="lg" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            {journey.steps.map((step, i) => (
              <span
                key={step.title}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === activeIndex ? cn("w-6", journey.accent.bg) : "w-1 bg-ink/15"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step text */}
      <div className="relative">
        {journey.steps.map((step, i) => (
          <MobileStep
            key={step.title}
            step={step}
            index={i}
            isActive={i === activeIndex}
            accent={journey.accent}
            onActivate={handleActivate}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Toggle ---------- */

function JourneyToggle({
  activeKey,
  onChange,
}: {
  activeKey: Journey["key"];
  onChange: (key: Journey["key"]) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Traveller or Local view"
      className="relative flex gap-1 rounded-full border border-ink/10 bg-white/70 p-1.5 shadow-[0_2px_20px_rgba(15,23,42,0.05)] backdrop-blur-sm"
    >
      {JOURNEYS.map((journey) => {
        const isActive = journey.key === activeKey;
        return (
          <button
            key={journey.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(journey.key)}
            className="relative z-10 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="journey-toggle-pill"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className={cn("absolute inset-0 rounded-full", journey.accent.bg)}
              />
            )}
            <journey.icon
              className={cn("relative h-4 w-4", isActive ? "text-ivory" : "text-ink/50")}
            />
            <span className={cn("relative", isActive ? "text-ivory" : "text-ink/60")}>
              {journey.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Section ---------- */

export default function AppFlowShowcase() {
  const [activeKey, setActiveKey] = useState<Journey["key"]>("traveller");
  const journey = JOURNEYS.find((j) => j.key === activeKey)!;

  return (
    <MotionConfig reducedMotion="user">
      <section id="app-flow" className="relative bg-sand py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="max-w-2xl"
            >
              <span className="eyebrow text-xs text-ink/50">How Travyl works</span>
              <h2 className="text-balance mt-4 text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[2.75rem]">
                One platform. Two ways to experience a city.
              </h2>
              <p className="text-balance mt-4 text-base leading-relaxed text-ink/60">
                Discover a city through the people who live there, or become
                the local who shows what makes it special.
              </p>
            </motion.div>

            <div className="mt-9">
              <JourneyToggle activeKey={activeKey} onChange={setActiveKey} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={journey.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-7 max-w-lg"
              >
                <p className="text-lg font-semibold tracking-[-0.01em] text-ink">
                  {journey.headline}
                </p>
                {journey.note && (
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">
                    {journey.note}
                  </p>
                )}
                {journey.examples && (
                  <p className="mt-3 text-xs font-medium text-ink/40">
                    {journey.examples.join(" · ")}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={journey.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-16 lg:mt-20"
            >
              <DesktopJourney journey={journey} />
              <MobileJourney journey={journey} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  );
}
