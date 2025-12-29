"use client";

import { motion } from "framer-motion";

export default function AlertsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-emerald-300/80 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-50 p-4 text-xs text-emerald-950 shadow-[0_22px_70px_rgba(16,185,129,0.35)]">
      <header className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-600/90">
          Alerts & health tracking
        </p>
        <h1 className="text-lg font-semibold text-emerald-950">
          See what&apos;s happening in your area
        </h1>
        <p className="text-[11px] text-emerald-800/80">
          All maps and charts are mocked. They show how a real public health
          dashboard could look.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <motion.div
          whileHover={{ y: -3 }}
          className="col-span-2 space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <div className="flex items-center justify-between text-[11px]">
            <p className="text-sm font-semibold text-emerald-950">India outbreak heat map</p>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] text-emerald-800">
              Demo data
            </span>
          </div>
          <div className="h-40 rounded-xl bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.4),transparent_60%),radial-gradient(circle_at_center,_rgba(250,204,21,0.3),transparent_60%),radial-gradient(circle_at_bottom,_rgba(248,113,113,0.3),transparent_60%)] border border-emerald-200/80" />
          <p className="text-[10px] text-emerald-800/80">
            Colours show sample risk levels. Real data will come from trusted
            public health partners only.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="space-y-2 rounded-2xl border border-emerald-200/90 bg-white/80 p-3 shadow-sm"
        >
          <p className="text-sm font-semibold text-emerald-950">Outbreak alert for your city</p>
          <div className="space-y-1.5 text-[11px]">
            <p className="rounded-xl bg-emerald-100 px-2.5 py-2 text-emerald-900 border border-emerald-300/80">
              Sample alert: Dengue cases are rising in your district. Use
              mosquito nets and remove standing water.
            </p>
            <p className="text-[10px] text-emerald-800/80">
              This is not live data. It only shows the planned experience.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}


