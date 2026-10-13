"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrpgzqza";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({
  role,
  variant = "light",
  placeholder = "Your email address",
  buttonLabel = "Notify me",
  className,
}: {
  role?: string;
  variant?: "light" | "dark";
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, ...(role ? { role } : {}) }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold",
          isDark ? "bg-white/10 text-ivory" : "bg-ink/5 text-ink",
          className
        )}
      >
        <CheckCircle2 className={cn("h-4 w-4 flex-shrink-0", isDark ? "text-sage" : "text-coral")} />
        You&apos;re on the list, we&apos;ll be in touch.
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex w-full items-center gap-1.5 rounded-full border p-1.5 transition-colors",
          isDark
            ? "border-white/15 bg-white/5 focus-within:border-white/30"
            : "border-ink/10 bg-white focus-within:border-coral/40"
        )}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          className={cn(
            "min-w-0 flex-1 bg-transparent px-3.5 py-2 text-sm outline-none",
            isDark
              ? "text-ivory placeholder:text-ivory/40"
              : "text-ink placeholder:text-ink/40"
          )}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === "loading"}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-ivory shadow-[0_10px_30px_rgba(255,90,79,0.35)] transition-shadow hover:shadow-[0_14px_36px_rgba(255,90,79,0.45)] disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {buttonLabel}
              <ArrowUpRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </div>
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "mt-2 px-1 text-xs",
              isDark ? "text-red-300" : "text-red-500"
            )}
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
