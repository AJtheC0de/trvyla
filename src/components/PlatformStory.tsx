"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { JOURNEYS } from "@/components/app-flow/journeys";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRAVELLER_TAGS = ["Running", "Food", "Cycling", "Hidden Gems", "Communities"];
const localJourney = JOURNEYS.find((j) => j.key === "local")!;

function StoryBlock({
  eyebrow,
  eyebrowColor,
  headline,
  copy,
  tags,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  glow,
  reverse,
}: {
  eyebrow: string;
  eyebrowColor: string;
  headline: string;
  copy: string;
  tags: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  glow: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn("order-1", reverse && "lg:order-2")}
      >
        <span className={cn("eyebrow text-xs", eyebrowColor)}>{eyebrow}</span>
        <h3 className="text-balance mt-4 text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
          {headline}
        </h3>
        <p className="text-balance mt-5 max-w-md text-lg leading-relaxed text-ink/60">
          {copy}
        </p>
        <p className="mt-6 text-sm font-medium text-ink/40">{tags.join(" · ")}</p>
        <a
          href={ctaHref}
          className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-coral"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className={cn("relative order-2 flex justify-center", reverse && "lg:order-1")}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] sm:h-[26rem] sm:w-[26rem]",
            glow
          )}
        />
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="relative w-[300px] sm:w-[340px]"
        >
          <PhoneMockup src={image} alt={imageAlt} size="lg" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PlatformStory() {
  return (
    <section id="platform" className="relative overflow-hidden bg-ivory py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow text-xs text-coral">How Travyl works</span>
          <h2 className="text-balance mt-4 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl">
            One platform, two perspectives
          </h2>
          <p className="text-balance mt-4 text-base leading-relaxed text-ink/60">
            Whether you want to discover the city or share your passion,
            Travyl makes both possible with the same care.
          </p>
        </motion.div>

        <div className="mt-24 flex flex-col gap-28 sm:mt-28 sm:gap-36">
          <StoryBlock
            eyebrow="For Travellers"
            eyebrowColor="text-coral"
            headline="Discover experiences that truly fit you."
            copy="Find experiences, communities, and locals matched to what you actually love, not the usual tourist spots."
            tags={TRAVELLER_TAGS}
            ctaLabel="Discover Experiences"
            ctaHref="#experiences"
            image="/images/map-view.png"
            imageAlt="Travyl map view with experiences and communities in Lucerne"
            glow="bg-coral/20"
          />

          <StoryBlock
            eyebrow="For Locals"
            eyebrowColor="text-ink/50"
            headline="Turn what you love into an experience."
            copy="You don't need to be a tour guide. Just share what you already love doing, from a running meetup to a chocolate workshop."
            tags={localJourney.examples ?? []}
            ctaLabel="Become a Local"
            ctaHref="#hosts"
            image="/images/local-create-package.png"
            imageAlt="Travyl app: creating an experience as a Local"
            glow="bg-sand"
            reverse
          />
        </div>
      </div>
    </section>
  );
}
