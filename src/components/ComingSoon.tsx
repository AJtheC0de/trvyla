"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden bg-ivory px-6 py-32 sm:py-40 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-coral/15 blur-[100px] soft-glow" />
        <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-sage/60 blur-[110px] soft-glow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-xl text-center"
      >
        <span className="eyebrow text-xs text-coral">{eyebrow}</span>
        <h1 className="text-balance mt-4 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="text-balance mt-5 text-lg leading-relaxed text-ink/60">
          {description}
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-ivory shadow-[0_10px_30px_rgba(15,23,42,0.2)] transition-shadow hover:shadow-[0_14px_36px_rgba(15,23,42,0.3)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to home
        </Link>
      </motion.div>
    </section>
  );
}
