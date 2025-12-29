"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, AlertCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function FloatingSOS() {
  const pathname = usePathname();

  // Don't show on the emergency page itself to avoid clutter/redundancy
  if (pathname === "/emergency") return null;

  return (
    <Link href="/emergency">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-600/30 ring-4 ring-red-600/20 transition-all hover:bg-red-700 hover:shadow-red-600/50 focus:outline-none focus:ring-red-500"
        aria-label="Emergency SOS"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-white">SOS</span>
          <Phone className="h-6 w-6 text-white animate-pulse" fill="currentColor" />
        </div>
      </motion.button>
    </Link>
  );
}
