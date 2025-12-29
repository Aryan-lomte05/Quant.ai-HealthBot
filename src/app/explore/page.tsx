"use client";

import { motion } from "framer-motion";

export default function ExplorePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-emerald-300/80 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-50 p-4 text-xs text-emerald-950 shadow-[0_22px_70px_rgba(16,185,129,0.35)]">
      <header className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-600/90">
          Disease awareness hub
        </p>
        <h1 className="text-lg font-semibold text-emerald-950">
          Learn about symptoms, diseases & medicines
        </h1>
        <p className="text-[11px] text-emerald-800/80">
          All content is mocked for demo. Always follow advice from a real
          doctor or health worker.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <motion.div
          whileHover={{ y: -3 }}
          className="col-span-2 space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-950">Interactive symptom checker</p>
              <p className="text-[11px] text-emerald-800/80">
                One simple question at a time.
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] text-emerald-800">
              Demo only
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 p-3 border border-emerald-200/80">
            <div className="flex items-center justify-between text-[11px] text-emerald-900">
              <span>Q1 · Where is the main problem?</span>
              <span className="rounded-full bg-emerald-200 px-2 py-1 text-[10px] text-emerald-900">
                Step 1 of 5
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {["Head", "Chest / breathing", "Stomach", "Whole body"].map(
                (opt) => (
                  <button
                    key={opt}
                    className="rounded-xl border border-emerald-200/90 bg-white px-2.5 py-2 text-left text-emerald-900 hover:bg-emerald-50"
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-emerald-800/80">
              <span>Severity today</span>
              <div className="flex gap-1">
                <span className="h-1.5 w-6 rounded-full bg-emerald-400" />
                <span className="h-1.5 w-6 rounded-full bg-amber-400/40" />
                <span className="h-1.5 w-6 rounded-full bg-red-400/30" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <p className="text-sm font-semibold text-emerald-950">Severity indicator</p>
          <div className="space-y-1.5 text-[11px] text-emerald-900">
            <p>Mild</p>
            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400">
              <div className="h-1.5 w-1/4 rounded-full bg-emerald-100" />
            </div>
            <p className="text-emerald-800/80">
              Based on answers so far. Not a diagnosis.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <motion.div
          whileHover={{ y: -3 }}
          className="space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <p className="text-sm font-semibold text-emerald-950">Disease encyclopedia</p>
          <input
            placeholder="Search disease or symptom… (e.g. “dengue”, “malaria”, “खांसी”)"
            className="mt-1 w-full rounded-xl border border-emerald-200/90 bg-emerald-50 px-3 py-2 text-[11px] text-emerald-900 outline-none placeholder:text-emerald-500/70"
          />
          <div className="space-y-1.5 text-[11px]">
            <p className="text-emerald-800/90">Popular today</p>
            <div className="flex flex-wrap gap-1.5">
              {["Dengue", "Typhoid", "Anemia", "Diabetes"].map((d) => (
                <button
                  key={d}
                  className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] text-emerald-900 hover:bg-emerald-200"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <p className="text-sm font-semibold text-emerald-950">Medicine & price comparison</p>
          <div className="space-y-1.5 text-[11px] text-emerald-900">
            <div className="flex justify-between rounded-xl bg-emerald-100 px-2.5 py-2 border border-emerald-200/80">
              <span>Brand tablet</span>
              <span>₹22 / strip</span>
            </div>
            <div className="flex justify-between rounded-xl bg-emerald-200 px-2.5 py-2 border border-emerald-300/80">
              <span>Generic tablet</span>
              <span>₹9 / strip</span>
            </div>
            <p className="text-emerald-800/80">
              Prices are just sample numbers. Your local chemist will guide you.
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <p className="text-sm font-semibold text-emerald-950">Risk calculator (demo)</p>
          <div className="space-y-1.5 text-[11px] text-emerald-900">
            <label className="flex items-center justify-between">
              <span>Age</span>
              <span>45 years</span>
            </label>
            <div className="h-1.5 rounded-full bg-emerald-200">
              <div className="h-1.5 w-1/2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-emerald-800/85">
              This is only an educational visual. It does not replace medical
              advice.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}


