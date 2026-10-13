"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type FaqEntry = { id: string; q: string; a: string };

const TRAVELLER_FAQS: FaqEntry[] = [
  {
    id: "cost",
    q: "Does using Travyl cost anything?",
    a: "Using Travyl is free. Some experiences are free, others charge a participation fee. The price is always clearly shown before you book.",
  },
  {
    id: "find",
    q: "How do I find experiences that fit me?",
    a: "You choose your city, your travel dates, and your interests, from sports and food to hidden gems. Travyl shows you matching experiences right on the map.",
  },
  {
    id: "cities",
    q: "Which cities is Travyl active in?",
    a: "Travyl is launching in Switzerland, with active communities in Lucerne and Zürich. More cities to follow.",
  },
];

const LOCAL_FAQS: FaqEntry[] = [
  {
    id: "guide",
    q: "Do I need to be a professional tour guide to offer an experience?",
    a: "No. Locals on Travyl simply share what they already love doing, from a running meetup to a cooking class to a photo-spot tour.",
  },
  {
    id: "free",
    q: "Can I offer my experience for free?",
    a: "Yes. You decide whether your experience is free or has a price, and you set your own dates and availability.",
  },
  {
    id: "booking",
    q: "How do I know when someone books?",
    a: "You get notified as soon as someone signs up, and you can see all your bookings in one overview.",
  },
];

function FaqItem({
  entry,
  isOpen,
  onToggle,
}: {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ink/10 py-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="text-lg font-semibold tracking-[-0.01em] text-ink">
          {entry.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={cn(
            "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
            isOpen ? "border-coral/40 text-coral" : "border-ink/15 text-ink/50"
          )}
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-xl pr-10 pt-4 text-base leading-relaxed text-ink/60">
              {entry.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqGroup({ label, items, openId, onToggle }: {
  label: string;
  items: FaqEntry[];
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <span className="eyebrow text-xs text-ink/40">{label}</span>
      <div className="mt-2 border-t border-ink/10">
        {items.map((entry) => (
          <FaqItem
            key={entry.id}
            entry={entry}
            isOpen={openId === entry.id}
            onToggle={() => onToggle(entry.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id));

  return (
    <section
      id="faq"
      className="relative bg-gradient-to-b from-sand via-sand to-ivory py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
        >
          <span className="eyebrow text-xs text-coral">Frequently Asked Questions</span>
          <h2 className="text-balance mt-4 text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            Still have questions?
          </h2>
          <p className="text-balance mt-4 text-base leading-relaxed text-ink/60">
            The essentials about Travyl, for travellers and for locals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-16 flex flex-col gap-14"
        >
          <FaqGroup
            label="For Travellers"
            items={TRAVELLER_FAQS}
            openId={openId}
            onToggle={toggle}
          />
          <FaqGroup
            label="For Locals"
            items={LOCAL_FAQS}
            openId={openId}
            onToggle={toggle}
          />
        </motion.div>
      </div>
    </section>
  );
}
