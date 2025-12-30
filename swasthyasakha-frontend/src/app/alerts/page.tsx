"use client";

import { motion } from "framer-motion";
import { LocationAlerts } from "@/components/alerts/LocationAlerts";
import { OutbreakHeatMap } from "@/components/alerts/OutbreakHeatMap";
import { TrendGraphs } from "@/components/alerts/TrendGraphs";
import { VaccinationDashboard } from "@/components/alerts/VaccinationDashboard";
import { VaccineCalendar } from "@/components/alerts/VaccineCalendar";
import { CoverageStats } from "@/components/alerts/CoverageStats";
import { AQIDashboard } from "@/components/alerts/AQIDashboard";
import { HealthAdvisories } from "@/components/alerts/HealthAdvisories";
import { GreenSpacesMap } from "@/components/alerts/GreenSpacesMap";

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Alerts & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Tracking</span>
            <span className="text-sm font-bold ml-3 px-2 py-1 bg-slate-200 text-slate-600 rounded-lg align-middle">PURA v2.0</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2 max-w-2xl">
            Real-time public health surveillance, outbreak predictions, and personalized wellness tracking.
          </p>
        </motion.div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <OutbreakHeatMap />
          </div>
          <div className="flex flex-col gap-6">
            <LocationAlerts />
            <AQIDashboard />
          </div>
        </div>

        {/* Second Row: Trends & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 h-[350px]">
            <TrendGraphs />
          </div>
          <div className="h-[350px]">
            <HealthAdvisories />
          </div>
        </div>

        {/* Third Row: Vaccination & Wellness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <VaccinationDashboard />
          </div>
          <div>
            <VaccineCalendar />
          </div>
          <div className="grid grid-rows-2 gap-6 h-full">
            <CoverageStats />
            <GreenSpacesMap />
          </div>
        </div>

      </div>
    </div>
  );
}
