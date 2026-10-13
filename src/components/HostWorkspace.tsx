"use client";

import { useRef } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PhoneMockup from "@/components/ui/PhoneMockup";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function HostWorkspace() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lightY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="hosts"
        ref={sectionRef}
        className="relative isolate overflow-hidden bg-ivory py-28 sm:py-36"
      >
        {/* signature background: soft vertical light entering the section */}
        <motion.div
          style={{ y: lightY }}
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-[8%] top-0 h-full w-64 bg-gradient-to-b from-transparent via-coral/10 to-transparent blur-[100px]" />
          <div className="absolute right-[14%] top-0 h-[75%] w-48 bg-gradient-to-b from-coral/[0.14] via-coral/[0.05] to-transparent blur-[110px]" />
          <div className="absolute left-[42%] top-[8%] h-3/5 w-32 bg-gradient-to-b from-transparent via-coral/[0.08] to-transparent blur-[90px]" />
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={item} className="eyebrow text-xs text-coral">
              For Locals
            </motion.span>
            <motion.h2
              variants={item}
              className="text-balance mt-4 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl"
            >
              Share what you love.
            </motion.h2>
            <motion.p
              variants={item}
              className="text-balance mt-5 max-w-md text-lg leading-relaxed text-ink/60"
            >
              Whether it&apos;s a morning run, a cooking class, or your favorite
              hidden spots: create an experience and share it with people who
              want to discover your city.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-8 text-sm font-medium tracking-wide text-ink/40"
            >
              Create experience{" "}
              <span className="text-ink/25">→</span> Welcome guests{" "}
              <span className="text-ink/25">→</span> Build community
            </motion.p>

            <motion.a
              variants={item}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-ivory shadow-[0_10px_30px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(255,90,79,0.3)]"
            >
              Start as a Local
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ y: phoneY }}
            className="relative flex justify-center lg:justify-end"
          >
            <div
              aria-hidden
              className="absolute inset-x-12 bottom-4 h-16 rounded-[50%] bg-ink/10 blur-2xl"
            />
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] lg:w-[380px]">
              <PhoneMockup
                src="/images/local-bookings.png"
                alt="Your bookings and guests on Travyl"
                size="lg"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
