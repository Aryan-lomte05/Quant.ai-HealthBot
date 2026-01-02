"use client";

import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Activity } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, PresentationControls, Stage } from "@react-three/drei";
import { Suspense, useEffect } from "react";

function DataScientistModel() {
    const { scene } = useGLTF("/models/dataScientist.glb");

    return (
        <primitive
            object={scene}
            scale={3.8}
            position={[0, -1.6, 0]}
            rotation={[0, 0, 0]}
        />
    );
}

function LoadingFallback() {
    return (
        <group>
            {/* Animated skeleton */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 3, 1]} />
                <meshStandardMaterial
                    color="#10b981"
                    emissive="#10b981"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                />
            </mesh>
            {/* Pulsing light effect */}
            <pointLight position={[0, 0, 2]} intensity={2} color="#10b981" distance={5} />
        </group>
    );
}

// Preload model immediately
useGLTF.preload("/models/dataScientist.glb");

export function TrendCharts() {
    // Aggressively preload on mount
    useEffect(() => {
        useGLTF.preload("/models/dataScientist.glb");
    }, []);

    const chartData = [
        { week: "Week 1", actual: 40, projected: false },
        { week: "", actual: 55, projected: false },
        { week: "Week 2", actual: 45, projected: false },
        { week: "", actual: 60, projected: false },
        { week: "Week 3", actual: 75, projected: false },
        { week: "", actual: 65, projected: false },
        { week: "", actual: 80, projected: false },
        { week: "Week 4", actual: 70, projected: true },
        { week: "", actual: 85, projected: true },
        { week: "(Proj)", actual: 90, projected: true },
    ];

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            {/* Square Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 rounded-3xl border border-emerald-200/40 p-6 shadow-xl overflow-hidden aspect-square flex flex-col"
            >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl -z-10" />

                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-200/50 text-emerald-700 text-xs font-semibold mb-2">
                            <Activity className="h-3.5 w-3.5" />
                            Forecasting Model
                        </div>
                        <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                            AI Prediction
                        </h3>
                        <p className="text-xs text-emerald-700/70 mt-1 font-medium">
                            30-day forecast
                        </p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-1.5"
                    >
                        <Sparkles className="h-3 w-3" />
                        v2.4
                    </motion.div>
                </div>

                {/* Chart Container */}
                <div className="flex-1 relative min-h-0">
                    <div className="relative h-full w-full flex items-end justify-between gap-2 px-2 pb-6">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 inset-x-2 flex flex-col justify-between pointer-events-none mb-6">
                            {[100, 75, 50, 25, 0].map((value, i) => (
                                <div key={i} className="relative">
                                    <div className="w-full h-px bg-emerald-200/30" />
                                    <span className="absolute -left-6 -top-2 text-[10px] font-mono text-emerald-600/60">
                                        {value * 10}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Bars */}
                        {chartData.map((data, i) => (
                            <div key={i} className="relative w-full h-full flex items-end group">
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    whileInView={{ height: `${data.actual}%`, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.1 + (i * 0.06),
                                        duration: 1.4,
                                        ease: [0.34, 1.56, 0.64, 1]
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                    className={`w-full rounded-t-lg relative ${data.projected
                                        ? "bg-gradient-to-t from-emerald-300 to-teal-200 border-2 border-dashed border-emerald-400"
                                        : "bg-gradient-to-t from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-500/30"
                                        } transition-all duration-300`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40 rounded-t-lg" />

                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                                        <div className="bg-emerald-900 text-white text-[10px] py-1 px-2 rounded shadow-xl whitespace-nowrap">
                                            <div className="font-bold">{data.projected ? 'Proj' : 'Actual'}</div>
                                            <div className="font-mono">{data.actual * 10}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between px-2 mt-1">
                        {chartData.map((data, i) => (
                            data.week && (
                                <div key={i} className="text-[10px] text-emerald-600/70 font-semibold text-center">
                                    {data.week}
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-emerald-200/40">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-1.5 group"
                    >
                        <div className="w-3 h-3 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded shadow-sm group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-semibold text-emerald-700">Confirmed</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-1.5 group"
                    >
                        <div className="w-3 h-3 bg-gradient-to-br from-emerald-300 to-teal-200 border-2 border-dashed border-emerald-400 rounded group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            AI Prediction
                            <TrendingUp className="h-2.5 w-2.5" />
                        </span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced 3D Data Scientist Model */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative backdrop-blur-xl bg-gradient-to-br from-white/95 to-emerald-50/80 rounded-3xl border border-emerald-200/40 overflow-hidden shadow-2xl"
                style={{ height: "450px" }}
            >
                {/* Premium gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-teal-500/10" />

                {/* 3D Canvas with Optimized Settings */}
                <Canvas
                    dpr={[1, 1.5]} // Reduced max DPR
                    camera={{ position: [0, 0, 8], fov: 40 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "default" // Changed from high-performance
                    }}
                >
                    <Suspense fallback={<LoadingFallback />}>
                        {/* Simplified Lighting Setup - No Shadows */}
                        <ambientLight intensity={0.9} />
                        <spotLight
                            position={[10, 10, 10]}
                            angle={0.3}
                            penumbra={1}
                            intensity={1.5}
                        // Removed shadow casting
                        />
                        <spotLight
                            position={[-10, 5, -10]}
                            angle={0.3}
                            penumbra={1}
                            intensity={0.8}
                            color="#10b981"
                        />
                        <pointLight position={[0, 5, 5]} intensity={0.8} color="#06b6d4" />

                        {/* Model with simplified controls */}
                        <DataScientistModel />

                        {/* Premium Environment - Low cost */}
                        <Environment preset="city" />

                        {/* Auto-rotate controls */}
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={1.5}
                            minPolarAngle={Math.PI / 2.5}
                            maxPolarAngle={Math.PI / 1.8}
                        />
                    </Suspense>
                </Canvas>

                {/* Elegant Label with Shimmer - Properly Centered */}
                <div className="absolute bottom-6 inset-x-0 flex items-center justify-center pointer-events-none z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="relative px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-emerald-200/50 shadow-2xl mx-auto"
                    >
                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"
                            animate={{
                                x: ["-200%", "200%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 2
                            }}
                        />
                        <p className="relative z-10 text-sm font-black bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent whitespace-nowrap">
                            Data Scientist • AI Powered
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

// Preload the model
useGLTF.preload("/models/dataScientist.glb");
