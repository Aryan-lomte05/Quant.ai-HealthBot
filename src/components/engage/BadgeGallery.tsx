"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Zap, Shield, Heart, Trophy, Share2, Check, Copy, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useUser } from "@/context/UserContext";

const ALL_BADGES = [
  { id: 1, name: "Early Adopter", icon: Star, color: "text-yellow-500", bg: "bg-yellow-100", desc: "Joined during beta", date: "Dec 12, 2024" },
  { id: 2, name: "Health Hero", icon: Heart, color: "text-pink-500", bg: "bg-pink-100", desc: "Completed 7 day streak", date: "Jan 15, 2025" },
  { id: 3, name: "Fast Learner", icon: Zap, color: "text-blue-500", bg: "bg-blue-100", desc: "Completed 5 quizzes", date: "Jan 20, 2025" },
  { id: 4, name: "Guardian", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-100", desc: "Verified family profile", date: "Feb 01, 2025" },
  { id: 5, name: "Champion", icon: Trophy, color: "text-purple-500", bg: "bg-purple-100", desc: "Won a monthly challenge", date: "Feb 10, 2025" },
  { id: 6, name: "Elite", icon: Award, color: "text-orange-500", bg: "bg-orange-100", desc: "1000+ points accumulated", date: "Feb 28, 2025" },
];

export function BadgeGallery() {
  const { user, loading } = useUser();
  const [selectedBadge, setSelectedBadge] = useState<typeof ALL_BADGES[0] | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter badges based on user's unlocked badges
  const unlockedBadges = ALL_BADGES.filter(badge =>
    user?.badges?.includes(badge.name)
  );

  // If no badges, maybe show the first one as "claimed" for early adopters? 
  // No, let's keep it real.

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = "https://swasthyasakha.ai/achievements";
  const shareText = (badgeName: string) => `I just unlocked the ${badgeName} badge on SwasthyaSakha! Join me on my health journey.`;

  const handleClose = () => {
    setSelectedBadge(null);
    setShowShareOptions(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-500" />
            Badge Gallery
          </h3>
          <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
            {loading ? '...' : unlockedBadges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {loading ? (
            <div className="col-span-full py-8 flex justify-center">
              <span className="text-sm font-medium text-gray-400">Loading achievements...</span>
            </div>
          ) : unlockedBadges.length > 0 ? (
            unlockedBadges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.1 }}
                onClick={() => setSelectedBadge(badge)}
                className="flex flex-col items-center gap-2 group cursor-pointer relative"
              >
                <div className={`h-16 w-16 rounded-2xl ${badge.bg} ${badge.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                  <badge.icon className="h-8 w-8" />
                </div>
                <span className="text-[10px] font-bold text-gray-600 text-center leading-tight group-hover:text-emerald-600 transition-colors">
                  {badge.name}
                </span>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-sm text-gray-500">Your achievements will appear here. Start healthy habits to earn your first badge!</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={!!selectedBadge}
        onClose={handleClose}
        title={selectedBadge?.name}
      >
        {selectedBadge && (
          <div className="flex flex-col items-center text-center">
            <AnimatePresence mode="wait">
              {!showShareOptions ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <motion.div
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className={`h-32 w-32 rounded-full ${selectedBadge.bg} ${selectedBadge.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <selectedBadge.icon className="h-16 w-16" />
                  </motion.div>

                  <p className="text-gray-600 text-lg mb-2">{selectedBadge.desc}</p>
                  <p className="text-sm text-gray-400 font-medium mb-8">Unlocked on {selectedBadge.date}</p>

                  <button
                    onClick={() => setShowShareOptions(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors w-full justify-center shadow-lg shadow-emerald-200"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Achievement
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Share to</h4>

                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(shareText(selectedBadge.name))} ${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="h-14 w-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                        <MessageCircle className="h-7 w-7" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">WhatsApp</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="h-14 w-14 rounded-2xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                        <Facebook className="h-7 w-7" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Facebook</span>
                    </a>

                    {/* Twitter/X */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText(selectedBadge.name))}&url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="h-14 w-14 rounded-2xl bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                        <Twitter className="h-7 w-7" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Twitter</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="h-14 w-14 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-all">
                        <Linkedin className="h-7 w-7" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">LinkedIn</span>
                    </a>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl flex items-center justify-between border border-gray-100">
                    <span className="text-xs text-gray-500 truncate max-w-[200px]">{shareUrl}</span>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Modal>
    </>
  );
}
