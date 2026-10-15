"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronRight,
  Compass,
  Users,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_LINKS = [
  { label: "Experiences", href: "/#experiences", icon: Compass },
  { label: "For Hosts", href: "/#hosts", icon: Users },
  { label: "How it works", href: "/#platform", icon: Sparkles },
];

const menuContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
};

const menuItem = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "px-4 pt-4 sm:pt-6" : "px-0 pt-0"
      )}
    >
      <motion.div
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "max-w-5xl rounded-full border border-white/40 bg-white/90 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_-5px_rgba(15,23,42,0.15)] sm:px-4 lg:bg-white/55 lg:backdrop-blur-2xl lg:backdrop-saturate-150"
            : "max-w-7xl rounded-none border border-transparent bg-transparent px-6 py-4 shadow-none backdrop-blur-none lg:px-8"
        )}
      >
        <Link href="/#top" className="flex items-center gap-2 pl-2">
          <Image
            src="/images/logo-travyl.png"
            alt="Travyl"
            width={1961}
            height={1080}
            className="h-6 w-auto sm:h-7"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/#hosts"
            className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
          >
            Start as a Host
          </Link>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/#waitlist"
            className="flex items-center gap-1.5 rounded-full bg-coral px-4 py-2.5 text-sm font-semibold text-ivory shadow-[0_6px_20px_rgba(255,90,79,0.35)] transition-shadow hover:shadow-[0_8px_26px_rgba(255,90,79,0.45)]"
          >
            Join Waitlist
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "relative flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors md:hidden",
            open && "bg-ink/5"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="flex items-center justify-center"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-[28px] border border-white/60 bg-ivory/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_30px_60px_-15px_rgba(15,23,42,0.3)] backdrop-blur-2xl backdrop-saturate-150 md:hidden"
            >
              <motion.nav
                variants={menuContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-0.5 p-2.5"
              >
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.href}
                    variants={menuItem}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-semibold text-ink/85 transition-colors active:bg-ink/[0.06]"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-ink/[0.04] text-ink/50 transition-colors group-hover:bg-coral/10 group-hover:text-coral">
                      <link.icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-ink/40" />
                  </motion.a>
                ))}

                <motion.div
                  variants={menuItem}
                  className="my-2 h-px bg-ink/[0.07]"
                />

                <motion.div variants={menuItem} className="flex flex-col gap-2 px-0.5 pb-0.5">
                  <Link
                    href="/#hosts"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-ink/10 bg-white/60 px-4 py-3.5 text-center text-sm font-semibold text-ink transition-colors active:bg-ink/5"
                  >
                    Start as a Host
                  </Link>
                  <Link
                    href="/#waitlist"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-2xl bg-coral px-4 py-3.5 text-center text-sm font-semibold text-ivory shadow-[0_10px_30px_rgba(255,90,79,0.35)] transition-shadow active:shadow-[0_6px_18px_rgba(255,90,79,0.3)]"
                  >
                    Join Waitlist
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
