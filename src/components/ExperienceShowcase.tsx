"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Experience = {
  title: string;
  host: string;
  location: string;
  price: string;
  image: string;
  imagePosition?: string;
};

const EXPERIENCES: Experience[] = [
  {
    title: "Sunrise Run Crew",
    host: "Early Birds Zürich",
    location: "Zürich, Switzerland",
    price: "CHF 15",
    image: "/images/sunrise-run.jpg",
    imagePosition: "object-center",
  },
  {
    title: "City Views by Bike",
    host: "Ridgeline Cycling Club",
    location: "Lucerne, Switzerland",
    price: "Free",
    image: "/images/city-cycling.jpg",
    imagePosition: "object-bottom",
  },
  {
    title: "Court Squad Meetup",
    host: "Match Point Club",
    location: "Lucerne, Switzerland",
    price: "CHF 20",
    image: "/images/court-squad.jpg",
    imagePosition: "object-center",
  },
  {
    title: "Golden Hour Walk & Talk",
    host: "Sundown Social Club",
    location: "Zürich, Switzerland",
    price: "Free",
    image: "/images/golden-hour-walk.jpg",
    imagePosition: "object-bottom",
  },
  {
    title: "Streets Only Locals Know",
    host: "Lucerne Insiders",
    location: "Lucerne, Switzerland",
    price: "CHF 25",
    image: "/images/lucerne-streets.jpg",
    imagePosition: "object-bottom",
  },
];

export default function ExperienceShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="experiences" className="relative bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <span className="eyebrow text-xs text-coral">Popular Experiences</span>
            <h2 className="text-balance mt-4 text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
              An experience for every vibe
            </h2>
          </motion.div>

          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Back"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-12 flex gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] snap-x snap-mandatory lg:px-[calc((100vw-72rem)/2+2rem)] [&::-webkit-scrollbar]:hidden"
      >
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="w-[300px] flex-shrink-0 snap-start overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:w-[340px]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="340px"
                className={cn(
                  "object-cover transition-transform duration-500 hover:scale-105",
                  exp.imagePosition ?? "object-center"
                )}
              />
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                {exp.price}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold tracking-[-0.01em] text-ink">
                {exp.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink/55">
                Hosted by {exp.host} · {exp.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
