"use client";

import { motion } from "framer-motion";
import { Award, Star, Zap, Shield, Heart, Trophy } from "lucide-react";

const badges = [
  { id: 1, name: "Early Adopter", icon: Star, color: "text-yellow-500", bg: "bg-yellow-100", desc: "Joined during beta" },
  { id: 2, name: "Health Hero", icon: Heart, color: "text-pink-500", bg: "bg-pink-100", desc: "Completed 7 day streak" },
  { id: 3, name: "Fast Learner", icon: Zap, color: "text-blue-500", bg: "bg-blue-100", desc: "Completed 5 quizzes" },
  { id: 4, name: "Guardian", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-100", desc: "Verified family profile" },
  { id: 5, name: "Champion", icon: Trophy, color: "text-purple-500", bg: "bg-purple-100", desc: "Won a monthly challenge" },
  { id: 6, name: "Elite", icon: Award, color: "text-orange-500", bg: "bg-orange-100", desc: "1000+ points accumulated" },
];

export function BadgeGallery() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
          <Award className="h-5 w-5 text-emerald-500" />
          Badge Gallery
        </h3>
        <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
          {badges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.1 }}
            className="flex flex-col items-center gap-2 group cursor-pointer relative"
          >
            <div className={`h-16 w-16 rounded-2xl ${badge.bg} ${badge.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
              <badge.icon className="h-8 w-8" />
            </div>
            <span className="text-[10px] font-bold text-gray-600 text-center leading-tight group-hover:text-emerald-600 transition-colors">
              {badge.name}
            </span>
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              {badge.desc}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
