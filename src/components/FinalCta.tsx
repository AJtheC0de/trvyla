"use client";

import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

export default function FinalCta() {
  return (
    <section
      id="waitlist"
      className="bg-ivory px-6 pb-24 pt-20 sm:pb-32 sm:pt-28 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-ink"
      >
        <div className="px-8 pb-2 pt-14 text-center sm:px-14 sm:pt-16">
          <span className="eyebrow text-xs text-coral">Coming Soon</span>
          <h2 className="text-balance mx-auto mt-4 max-w-lg text-3xl font-bold tracking-[-0.02em] text-ivory sm:text-4xl">
            Travyl isn&apos;t live yet, be the first to know when it is.
          </h2>
          <p className="text-balance mx-auto mt-3 max-w-md text-sm leading-relaxed text-ivory/60">
            Join the waitlist and get early access before we launch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-white/10 px-8 py-10 sm:grid-cols-2 sm:gap-10 sm:px-14 sm:py-14">
          <div>
            <span className="eyebrow text-xs text-coral">For Travellers</span>
            <h3 className="text-balance mt-3 text-lg font-bold tracking-[-0.01em] text-ivory">
              Ready for your next trip?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ivory/60">
              Get notified the moment you can start booking experiences with locals.
            </p>
          </div>
          <div>
            <span className="eyebrow text-xs text-sage">For Hosts</span>
            <h3 className="text-balance mt-3 text-lg font-bold tracking-[-0.01em] text-ivory">
              Ready to grow your community?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ivory/60">
              Get notified the moment you can start hosting on Travyl.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-white/10 px-8 pb-14 pt-10 sm:px-14 sm:pb-16">
          <WaitlistForm variant="dark" className="max-w-md" />
        </div>
      </motion.div>
    </section>
  );
}
