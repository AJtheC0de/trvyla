"use client";

import { useRef } from "react";
import Link from "next/link";
import PhoneMockup from "@/components/ui/PhoneMockup";
import WaitlistForm from "@/components/WaitlistForm";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, CheckCircle2, MapPin, Users } from "lucide-react";

const springTransition = { type: "spring" as const, stiffness: 100, damping: 20 };

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: springTransition },
};

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden bg-ivory pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      {/* decorative background */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-coral/15 blur-[100px] soft-glow" />
        <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-sage/60 blur-[110px] soft-glow" />
        <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-sand/70 blur-[90px] soft-glow" />
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.div
            variants={item}
            className="eyebrow flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-xs text-ink/70 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Coming soon &middot; join the waitlist
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance mt-6 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
          >
            Experience the city.
            <br />
            Or show it to others.
          </motion.h1>

          <motion.p
            variants={item}
            className="text-balance mt-6 max-w-md text-lg leading-relaxed text-ink/65"
          >
            Travyl brings travellers together with locals and communities
            through real experiences, matched to interests, place, and time.
          </motion.p>

          <motion.div variants={item} className="mt-9 w-full max-w-md">
            <WaitlistForm buttonLabel="Join Waitlist" />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-medium text-ink/50"
          >
            <Link href="/#experiences" className="transition-colors hover:text-ink">
              Discover Experiences
            </Link>
            <span className="text-ink/20">&middot;</span>
            <Link href="/#hosts" className="transition-colors hover:text-ink">
              Start as a Host
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-6 text-ink/60"
          >
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-coral text-coral" />
              <span className="text-sm font-medium">4.9 / 5 rating</span>
            </div>
            <div className="h-4 w-px bg-ink/15" />
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Active communities in CH</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative mx-auto w-[260px] sm:w-[290px]">
            <motion.div style={{ y: phoneY }} className="relative">
              <PhoneMockup
                src="/images/discovery-feed.png"
                alt="Travyl discovery feed"
                size="lg"
                priority
              />
            </motion.div>

            <motion.div
              style={{ y: panelY }}
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="absolute -right-16 top-16 w-52 rounded-2xl border border-white/15 bg-ink/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(255,255,255,0.05),0_20px_45px_-10px_rgba(15,23,42,0.35)] lg:bg-ink/30 lg:backdrop-blur-2xl lg:backdrop-saturate-75 sm:-right-20"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                <CheckCircle2 className="h-3.5 w-3.5" />
                New Booking
              </div>
              <p className="mt-1.5 text-sm font-bold leading-snug text-white">
                Morning Run Club
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
                <MapPin className="h-3.5 w-3.5" />
                Zürich · today, 07:00
              </div>
              <div className="mt-3 flex -space-x-2">
                {["A", "M", "L"].map((initial) => (
                  <div
                    key={initial}
                    className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-coral/90 text-[10px] font-semibold text-ivory"
                  >
                    {initial}
                  </div>
                ))}
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-ink text-[9px] font-semibold text-ivory">
                  +6
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="absolute -left-14 bottom-20 rounded-2xl border border-white/15 bg-ink/75 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(255,255,255,0.05),0_20px_45px_-10px_rgba(15,23,42,0.35)] lg:bg-ink/30 lg:backdrop-blur-2xl lg:backdrop-saturate-75 sm:-left-16"
            >
              <p className="text-xs font-semibold text-white">Free · CHF 0</p>
              <p className="text-[11px] text-white/60">Play Tennis 🏓</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
