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
    <div className="flex min-h-screen bg-emerald-50/30 text-emerald-950 font-sans selection:bg-emerald-200/50">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-72 h-full overflow-y-auto border-r border-emerald-100 bg-white/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-emerald-50">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md">
                  <Mic className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg text-emerald-900 tracking-tight">SwasthyaSakha</span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-emerald-50 text-emerald-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-4 space-y-6">
              {routeGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((route) => {
                      const isActive = pathname === route.href;
                      const Icon = route.icon;

                      return (
                        <Link key={route.href} href={route.href}>
                          <div
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                              ? "bg-emerald-50 text-emerald-900 font-medium shadow-sm"
                              : "text-emerald-600 hover:bg-emerald-50/50 hover:text-emerald-900"
                              }`}
                          >
                            <Icon
                              className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-600" : "text-emerald-400 group-hover:text-emerald-600"
                                }`}
                            />
                            <span>{route.label}</span>
                            {isActive && (
                              <motion.div
                                layoutId="activeSidebarIndicator"
                                className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"
                              />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
              <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs">
                    JD
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-emerald-900">John Doe</p>
                    <p className="text-emerald-500">Premium Plan</p>
                  </div>
                </div>
                <Settings className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors focus:ring-2 focus:ring-white/20 focus:outline-none"
                aria-label="Toggle navigation"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-3 md:hidden">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-sm">
                  <Mic className="h-4 w-4" />
                </div>
                <span className="font-semibold text-white">SwasthyaSakha</span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Selector */}
              <div className="hidden md:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white">
                <Globe2 className="h-3.5 w-3.5 text-white/80" />
                <select
                  aria-label="Select language"
                  className="bg-transparent font-medium outline-none cursor-pointer text-white"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  {langs.map((l) => (
                    <option key={l} value={l} className="bg-gray-900">
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ask Sakha CTA */}
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-shadow"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Ask Sakha</span>
                </motion.button>
              </Link>

              {/* Settings - Mobile Only */}
              <button className="md:hidden p-2 rounded-full hover:bg-white/10 text-white">
                <Settings className="h-5 w-5" />
              </button>
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
