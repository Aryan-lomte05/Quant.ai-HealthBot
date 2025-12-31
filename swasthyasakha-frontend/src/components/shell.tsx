"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  Menu,
  Mic,
  Settings,
  X,
  Home,
  MessageCircle,
  Compass,
  Bell,
  Users,
  Activity,
  Phone,
  Handshake,
  Gamepad2,
  LineChart,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { FloatingSOS } from "./emergency/FloatingSOS";

// Grouped Routes Configuration
const routeGroups = [
  {
    title: "Main",
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/chat", label: "Chat", icon: MessageCircle },
      { href: "/explore", label: "Explore", icon: Compass },
    ],
  },
  {
    title: "Health",
    items: [
      { href: "/tracking", label: "Tracking", icon: Activity },
      { href: "/insights", label: "Insights", icon: LineChart },
      { href: "/alerts", label: "Alerts", icon: Bell },
      { href: "/emergency", label: "Emergency", icon: Phone },
    ],
  },
  {
    title: "Community",
    items: [
      { href: "/community", label: "Community", icon: Users },
      { href: "/family", label: "Family", icon: Heart },
      { href: "/engage", label: "Engage", icon: Gamepad2 },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/integrations", label: "Partners", icon: Handshake },
    ],
  },
];

const langs = ["English", "हिन्दी", "தமிழ்", "বাংলা"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState("English");

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen relative overflow-hidden text-emerald-950 font-sans selection:bg-emerald-200/50">
      {/* Premium Background with Gradient and Decorative Blobs */}
      <div className="fixed inset-0 -z-10">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/80 to-cyan-50" />

        {/* Decorative Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl" />

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(5 150 105) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Premium Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
            className="fixed inset-y-0 left-0 z-50 w-80 h-full overflow-hidden"
          >
            {/* Glassmorphic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-emerald-50/90 to-teal-50/95 backdrop-blur-2xl" />

            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-teal-500/5" />

            {/* Content Container */}
            <div className="relative h-full flex flex-col shadow-2xl shadow-emerald-900/20 border-r border-emerald-200/50">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-6 border-b border-emerald-100/50 bg-gradient-to-br from-white/50 to-emerald-50/30"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/40"
                  >
                    <Mic className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <span className="font-bold text-xl bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">SwasthyaSakha</span>
                    <p className="text-xs text-emerald-600/70">Your Health Companion</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-emerald-100 text-emerald-600 transition-all"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </motion.div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                {routeGroups.map((group, groupIndex) => (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + groupIndex * 0.1 }}
                  >
                    <h3 className="px-4 mb-3 text-xs font-bold uppercase tracking-wider text-emerald-500/80 flex items-center gap-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-emerald-300/50 to-transparent" />
                      {group.title}
                      <div className="h-px flex-1 bg-gradient-to-l from-emerald-300/50 to-transparent" />
                    </h3>
                    <div className="space-y-1.5">
                      {group.items.map((route, itemIndex) => {
                        const isActive = pathname === route.href;
                        const Icon = route.icon;

                        return (
                          <Link key={route.href} href={route.href}>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + groupIndex * 0.1 + itemIndex * 0.05 }}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/40"
                                  : "text-emerald-700 hover:bg-emerald-50/80"
                                }`}
                            >
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Icon
                                  className={`h-5 w-5 transition-colors ${isActive ? "text-white" : "text-emerald-500 group-hover:text-emerald-600"
                                    }`}
                                />
                              </motion.div>
                              <span className={`font-semibold text-sm ${isActive ? "text-white" : ""}`}>
                                {route.label}
                              </span>
                              {isActive && (
                                <motion.div
                                  layoutId="activeSidebarIndicator"
                                  className="ml-auto w-2 h-2 rounded-full bg-white shadow-lg"
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                              )}
                            </motion.div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </nav>

              {/* Footer Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-gradient-to-t from-white/80 via-white/60 to-transparent backdrop-blur-sm"
              >
                <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/80 border border-emerald-200/50 shadow-sm">
                  <Link href="/profile" className="flex items-center gap-3 flex-1 group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/30"
                    >
                      JD
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-emerald-900 group-hover:text-emerald-700 transition-colors">John Doe</p>
                      <p className="text-xs text-emerald-600/70">Premium Member</p>
                    </div>
                  </Link>
                  <Link href="/settings">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 rounded-xl hover:bg-emerald-100 transition-all"
                    >
                      <Settings className="h-4 w-4 text-emerald-600" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Premium Header */}
        <header className="sticky top-0 z-30 border-b border-emerald-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 -ml-2 rounded-xl hover:bg-emerald-100 text-emerald-700 transition-colors focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                aria-label="Toggle navigation"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
                  <Mic className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent hidden sm:block">SwasthyaSakha</span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Selector */}
              <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-200 bg-white/60 backdrop-blur-sm px-3 py-1.5 text-xs text-emerald-700 shadow-sm">
                <Globe2 className="h-3.5 w-3.5 text-emerald-600" />
                <select
                  aria-label="Select language"
                  className="bg-transparent font-medium outline-none cursor-pointer text-emerald-700"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  {langs.map((l) => (
                    <option key={l} value={l} className="bg-white">
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ask Sakha CTA */}
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Ask Sakha</span>
                </motion.button>
              </Link>

              {/* Settings - Mobile Only */}
              <Link href="/settings">
                <button className="md:hidden p-2 rounded-xl hover:bg-emerald-100 text-emerald-700 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 relative">
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-50/80 to-transparent" />
            <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-teal-100/30 blur-3xl opacity-60" />
            <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-emerald-100/30 blur-3xl opacity-60" />
          </div>

          <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
      <FloatingSOS />
    </div>
  );
}
