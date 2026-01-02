"use client";

import { motion } from "framer-motion";
import { Camera, Edit2, MapPin, Share2 } from "lucide-react";

export function ProfileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white shadow-xl"
    >
      {/* Background Decor */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
        {/* Avatar */}
        <div className="group relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-3xl font-bold backdrop-blur-sm shadow-inner md:h-32 md:w-32 md:text-4xl">
            JD
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-0 right-0 rounded-full bg-white p-2 text-emerald-600 shadow-lg"
          >
            <Camera className="h-4 w-4 md:h-5 md:w-5" />
          </motion.button>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-white">John Doe</h1>
          <div className="mt-1 flex items-center justify-center gap-2 text-emerald-100/80 md:justify-start">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Mumbai, India</span>
          </div>
          
          <p className="mt-4 max-w-lg text-emerald-50/90 text-sm leading-relaxed">
            Passionate about holistic health and community wellness. Tracking my journey towards better heart health with SwasthyaSakha.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow-lg transition-colors hover:bg-emerald-50"
            >
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <Share2 className="h-4 w-4" />
              Share
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
