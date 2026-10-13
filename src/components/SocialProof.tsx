"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="bg-ivory px-6 py-24 sm:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-[32px] sm:aspect-[21/9]"
      >
        <motion.div style={{ y }} className="absolute inset-0 -m-10">
          <Image
            src="/images/brunching.jpg"
            alt="Brunching together with the Travyl community"
            fill
            sizes="1200px"
            className="object-cover object-bottom"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
          <span className="eyebrow text-xs text-ivory/70">
            Community &amp; Experiences
          </span>
          <p className="text-balance mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.02em] text-ivory sm:text-3xl lg:text-4xl">
            The best encounters start with something people love doing
            together.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
