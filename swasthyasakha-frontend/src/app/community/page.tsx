"use client";

import { motion } from "framer-motion";

export default function CommunityPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-emerald-300/80 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-50 p-4 text-xs text-emerald-950 shadow-[0_22px_70px_rgba(16,185,129,0.35)]">
      <header className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-600/90">
          Community & anonymous support
        </p>
        <h1 className="text-lg font-semibold text-emerald-950">
          Ask questions safely, learn from others
        </h1>
        <p className="text-[11px] text-emerald-800/80">
          Usernames, posts and answers are all mocked. In a real app, your name
          can stay private.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-[1.7fr,1.1fr]">
        <motion.div
          whileHover={{ y: -3 }}
          className="space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-emerald-950">Anonymous forum (demo)</p>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] text-emerald-800">
              You appear as &quot;NeemTree-47&quot;
            </span>
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="rounded-xl border border-emerald-200/90 bg-emerald-50 px-2.5 py-2">
              <p className="font-semibold text-emerald-950">
                &quot;Can I take my BP tablet if I have light fever?&quot;
              </p>
              <p className="mt-0.5 text-emerald-800/80">
                Asked by NeemTree-47 · 12 upvotes · 3 answers
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200/90 bg-emerald-50 px-2.5 py-2">
              <p className="font-semibold text-emerald-950">
                &quot;My father&apos;s sugar is 210 after dinner. Is it very
                dangerous?&quot;
              </p>
              <p className="mt-0.5 text-emerald-800/80">
                Top answer from Dr. Meera · Verified doctor
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <p className="text-sm font-semibold text-emerald-950">Why we keep you anonymous</p>
          <ul className="list-disc space-y-1.5 pl-4 text-[11px] text-emerald-900/85">
            <li>Your real name is never shown in the forum UI.</li>
            <li>Questions are grouped by topic, not by person.</li>
            <li>
              In an emergency, forums are not used—Sakha will push you to call
              helplines.
            </li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
}


