"use client";

import { motion, useTime, useTransform, useScroll, useSpring, useMotionValue, useInView } from "framer-motion";
import {
  MessageCircleHeart,
  Sparkles,
  Phone,
  Activity,
  Shield,
  Stethoscope,
  Microscope,
  Syringe,
  Pill,
  HeartPulse,
  Brain,
  Baby,
  Users,
  Lock,
  Globe2,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import Lenis from "lenis";

// --- Smooth Scroll Provider ---
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

// --- Premium Components ---

// Animated Counter Component
function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// Magnetic Button Component
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={className}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

// Floating Particles Component
function FloatingParticles() {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            x: [null, (Math.random() - 0.5) * 100],
            opacity: [0.3, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}


// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.4 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Components ---

function OrbitalCards() {
  const time = useTime();
  const rotate = useTransform(time, [0, 80000], [0, 360], { clamp: false });
  const float = useTransform(time, [0, 4000], [0, -10], { clamp: false });

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center pointer-events-none overflow-hidden text-left">
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-50 animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 w-3 sm:w-4 h-40 sm:h-60 md:h-80 bg-gradient-to-b from-emerald-800/80 to-teal-600/20 rounded-full backdrop-blur-sm"
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        transition={{ duration: 1.5, ease: "circOut" }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-white border-2 sm:border-3 md:border-4 border-emerald-100 shadow-lg"
            style={{ top: `${i * 18}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 + 0.5 }}
          />
        ))}
      </motion.div>

      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ rotate }}>
        {/* Card 1 - Vitals */}
        <motion.div
          className="absolute top-8 sm:top-12 md:top-16 left-8 sm:left-12 md:left-16 bg-white p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-xl md:rounded-2xl shadow-xl shadow-emerald-900/10 border border-white/50 backdrop-blur-md"
          style={{ rotate: useTransform(rotate, (r) => -r) }}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Activity className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            </div>
            <div>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vitals</p>
              <p className="text-[10px] sm:text-[11px] md:text-xs font-bold text-gray-800">Normal</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 - Chat */}
        <motion.div
          className="absolute bottom-16 sm:bottom-20 md:bottom-24 right-8 sm:right-12 md:right-16 bg-white p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-xl md:rounded-2xl shadow-xl shadow-emerald-900/10 border border-white/50 backdrop-blur-md"
          style={{ rotate: useTransform(rotate, (r) => -r) }}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <MessageCircleHeart className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            </div>
            <div>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ai Chat</p>
              <p className="text-[10px] sm:text-[11px] md:text-xs font-bold text-gray-800">Active</p>
            </div>
          </div>
        </motion.div>

        {/* Card 3 - Wellness (Brought closer) - Hidden on very small screens */}
        <motion.div
          className="hidden sm:block absolute top-1/2 right-2 sm:right-3 md:right-4 bg-white py-1.5 px-2 sm:py-2 sm:px-2.5 md:py-2 md:px-3 rounded-full shadow-lg border border-emerald-50"
          style={{ rotate: useTransform(rotate, (r) => -r) }}
        >
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-emerald-700 flex items-center gap-1">
            <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3" /> Wellness
          </span>
        </motion.div>

        {/* Card 4 - Expertise (Brought closer) - Hidden on very small screens */}
        <motion.div
          className="hidden sm:block absolute top-1/3 left-2 sm:left-3 md:left-4 bg-white py-1.5 px-2 sm:py-2 sm:px-2.5 md:py-2 md:px-3 rounded-full shadow-lg border border-emerald-50"
          style={{ rotate: useTransform(rotate, (r) => -r) }}
        >
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-teal-700 flex items-center gap-1">
            <Shield className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3" /> Expertise
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 right-4 sm:right-8 md:right-12 w-40 sm:w-48 md:w-56 bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-3.5 md:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05, y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      >
        <div className="flex justify-between items-start mb-3 sm:mb-3.5 md:mb-4">
          <div>
            <p className="text-[10px] sm:text-[11px] md:text-xs font-bold text-gray-400">Heart Rate</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900">83</span>
              <span className="text-[10px] sm:text-[11px] md:text-xs text-gray-500 font-medium">bpm</span>
            </div>
          </div>
          <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-red-50 flex items-center justify-center animate-pulse">
            <HeartPulse className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-red-500" />
          </div>
        </div>
        {/* Mock Chart */}
        <div className="h-12 sm:h-14 md:h-16 w-full flex items-end gap-0.5 sm:gap-1">
          {[40, 60, 45, 70, 50, 80, 65, 55].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t-sm opacity-80"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: 1 + i * 0.1 }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-2.5 md:mt-3">
          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-yellow-400" />
          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-500 font-medium">Resting: 72bpm</p>
        </div>
      </motion.div>
    </div>
  );
}

// --- Main Page Component ---

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SmoothScroll>
      <div ref={containerRef} className="flex flex-col gap-2 relative bg-orange-50 selection:bg-orange-200">

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 origin-[0%] z-50"
          style={{ scaleX }}
        />

        <motion.section
          className="sticky top-0 z-10 w-full h-screen flex flex-col p-2 sm:p-4 md:p-6"
        >
          {/* Floating Particles */}
          <FloatingParticles />

          <motion.div
            className="flex-1 w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] shadow-[0_8px_30px_rgba(16,185,129,0.08)] overflow-hidden relative border border-emerald-100/50 flex flex-col lg:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              scale: useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0.85]), {
                stiffness: 60,
                damping: 40,
                restDelta: 0.001
              }),
              y: useTransform(scrollYProgress, [0, 0.8], [0, 150])
            }}
          >
            {/* Top Branding */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 z-20">
              <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1">
                MEDI<span className="text-yellow-400 text-lg sm:text-xl md:text-2xl leading-none">.</span>
              </h2>
            </div>

            {/* Social Actions - Hidden on mobile */}
            <div className="hidden md:flex absolute top-8 right-8 z-20 flex-col gap-3">
              {['IG', 'FB', 'X'].map((social) => (
                <button key={social} className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  {social === 'IG' ? '📷' : social === 'FB' ? 'f' : '𝕏'}
                </button>
              ))}
            </div>

            {/* Left Section - Typography */}
            <div className="p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center relative z-10 flex-1">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 sm:space-y-6 md:space-y-8">
                <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-medium tracking-tighter leading-[0.9] text-gray-900">
                  Expert care for <br />
                  <span className="italic font-serif font-light text-emerald-800">your health</span> <br />
                  and wellness<span className="text-yellow-400">.</span>
                </motion.h1>
                <motion.p variants={itemVariants} className="max-w-md text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed ml-1 sm:ml-2 font-medium">
                  AI medical experts providing compassionate, professional support to keep you safe.
                </motion.p>
                <motion.div variants={itemVariants} className="pt-2 sm:pt-4 ml-1 sm:ml-2">
                  <Link href="/chat">
                    <MagneticButton>
                      <motion.button
                        whileHover={{
                          scale: 1.08,
                          y: -4,
                          boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.5)",
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gray-950 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full text-sm sm:text-base font-medium hover:bg-emerald-950 transition-colors w-full sm:w-auto overflow-hidden group"
                      >
                        {/* Pulsing glow effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                        <span className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:animate-ping rounded-full" style={{ animationDuration: '1.5s' }} />
                        <span className="relative z-10">Book an appointment</span>
                      </motion.button>
                    </MagneticButton>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="pt-6 sm:pt-8 md:pt-12 flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { label: "Vaccinations", icon: Syringe },
                    { label: "High-quality", icon: Sparkles },
                    { label: "Laboratory", icon: Microscope },
                    { label: "Check-ups", icon: Stethoscope },
                    { label: "Emergency", icon: Phone },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        y: -4,
                        scale: 1.05,
                        backgroundColor: "#ECFDF5",
                        borderColor: "#A7F3D0",
                        transition: { type: "spring", stiffness: 400, damping: 20 }
                      }}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 bg-white text-[10px] sm:text-xs font-bold text-gray-600 cursor-default transition-colors"
                    >
                      <feature.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {feature.label}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Section - Visuals */}
            <motion.div
              className="relative bg-gradient-to-b from-emerald-50 to-white overflow-hidden flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-0 rounded-b-[2rem] sm:rounded-b-[2.5rem] md:rounded-b-[3rem] lg:rounded-none lg:rounded-bl-[5rem]"
              style={{
                y: useTransform(scrollYProgress, [0, 0.4], [0, -30]),
              }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 opacity-50"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <OrbitalCards />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* SECTION 2: BENTO GRID - Vibrant Glassmorphism (Replaced "Dull" Dark Mode) */}

        <motion.section
          className="w-full relative z-30 bg-orange-50/30 rounded-t-[2.5rem] sm:rounded-t-[3rem] md:rounded-t-[4rem] mt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 shadow-[0_-20px_50px_rgba(251,146,60,0.08)] overflow-hidden"
        >
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-0 right-0 w-[600px] sm:w-[700px] md:w-[800px] h-[600px] sm:h-[700px] md:h-[800px] bg-gradient-to-br from-emerald-200 to-teal-100 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-gradient-to-tr from-orange-100 to-yellow-100 rounded-full blur-[80px] mix-blend-multiply opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto pt-16 sm:pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 space-y-3 sm:space-y-4"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                Holistic Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-emerald-950 tracking-tight px-4">
                Healthcare <span className="font-serif italic text-emerald-600">reimagined</span> <br />for everyone.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 h-auto md:h-[600px]">
              {/* Card 1: Large Left - Glassmorphic */}
              <motion.div
                className="md:col-span-2 md:row-span-2 bg-white/60 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] border border-white/60 shadow-xl shadow-emerald-900/5 p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group"
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.15)",
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
              >
                <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110" />

                <div className="relative z-10">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-6 sm:mb-7 md:mb-8 shadow-lg shadow-emerald-500/30">
                    <Brain className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-emerald-950 mb-3 sm:mb-4">AI Diagnostics</h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
                    Advanced symptom analysis in 12+ Indian languages. It listens, understands, and guides you instantly.
                  </p>
                </div>

                <div className="relative z-10 mt-8 sm:mt-10 md:mt-12">
                  <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-4.5 md:p-5 border border-emerald-100 shadow-sm flex items-center gap-3 sm:gap-3.5 md:gap-4">
                    <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-sm sm:text-base">⚡</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] sm:text-xs font-bold text-gray-500 mb-1">
                        <span>Analysis Confidence</span>
                        <span><AnimatedCounter target={98.5} duration={2} />%</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "98.5%" }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Top Right - Blue Glass */}
              <motion.div
                className="bg-blue-50/60 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] border border-blue-100/60 shadow-lg shadow-blue-900/5 p-6 sm:p-7 md:p-8 relative overflow-hidden group"
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 350, damping: 22 }
                }}
              >
                <div className="absolute -right-4 -top-4 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-blue-200/50 rounded-full blur-2xl group-hover:bg-blue-300/50 transition-colors" />
                <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl sm:rounded-2xl bg-blue-500 text-white flex items-center justify-center mb-4 sm:mb-5 md:mb-6 shadow-lg shadow-blue-500/30">
                  <Globe2 className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-blue-950 mb-2">Multilingual</h3>
                <p className="text-blue-900/60 font-medium text-sm sm:text-base">Hindi, Tamil, Bengali & more.</p>
              </motion.div>

              {/* Card 3: Bottom Right - Indigo Glass */}
              <motion.div
                className="bg-indigo-50/60 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] border border-indigo-100/60 shadow-lg shadow-indigo-900/5 p-6 sm:p-7 md:p-8 relative overflow-hidden group"
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 350, damping: 22 }
                }}
              >
                <div className="absolute -right-4 -bottom-4 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-indigo-200/50 rounded-full blur-2xl group-hover:bg-indigo-300/50 transition-colors" />
                <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl sm:rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-4 sm:mb-5 md:mb-6 shadow-lg shadow-indigo-500/30">
                  <Lock className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-indigo-950 mb-2">Secure Data</h3>
                <p className="text-indigo-900/60 font-medium text-sm sm:text-base">Encrypted & private records.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>


        {/* SECTION 3: HOW IT WORKS - Dynamic Timeline */}
        <section className="w-full bg-emerald-950 py-12 sm:py-16 md:py-20 lg:py-32 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] -mt-8 z-30 relative text-white overflow-hidden">

          {/* Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute top-1/4 -left-32 sm:-left-48 md:-left-64 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-emerald-500 rounded-full blur-[120px] sm:blur-[150px]" />
            <div className="absolute bottom-1/4 -right-32 sm:-right-48 md:-right-64 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-teal-500 rounded-full blur-[120px] sm:blur-[150px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 sm:mb-12 md:mb-16 lg:mb-20 gap-4 sm:gap-6 md:gap-8">
              <div>
                <span className="text-emerald-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 sm:mb-3 block">The Process</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
                  Simple steps to<br className="hidden sm:inline" /><span className="sm:hidden"> </span>better health.
                </h2>
              </div>
              <Link href="/chat">
                <button className="group flex items-center gap-2 sm:gap-3 text-white border border-white/20 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full hover:bg-white hover:text-emerald-950 transition-all font-medium text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start">
                  Start your journey
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 relative">
              {/* Connecting Line (Dashed) - Hidden on mobile */}
              <div className="hidden md:block absolute top-[88px] left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-emerald-800/50 z-0" />

              {[
                { step: "01", title: "Tell us", desc: "Speak or type in your local language.", icon: MessageCircleHeart },
                { step: "02", title: "Analysis", desc: "Our engine checks your symptoms instantly.", icon: Brain },
                { step: "03", title: "Guidance", desc: "Get remedies or doctor connection.", icon: Stethoscope }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 group"
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full bg-emerald-900/50 border border-emerald-800 backdrop-blur-sm flex items-center justify-center mx-auto mb-5 sm:mb-6 md:mb-8 group-hover:bg-emerald-800/80 group-hover:scale-110 transition-all duration-500">
                    <div className="w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
                      <item.icon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                    </div>
                    <div className="absolute -top-1 sm:-top-1.5 md:-top-2 -right-1 sm:-right-1.5 md:-right-2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-emerald-950 font-bold text-xs sm:text-sm shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="text-center px-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-50 mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-emerald-400/80 leading-relaxed max-w-xs mx-auto text-sm sm:text-base">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 4: COMMUNITY - Minimal & Clean */}
        <section className="w-full bg-orange-50/30 py-12 sm:py-16 md:py-20 lg:py-24 z-20 -mt-8 sm:-mt-10 md:-mt-12 rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3rem] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14 lg:mb-16"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
                <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Community
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 tracking-tight">
                Trusted by <AnimatedCounter target={10000} duration={2.5} />+ families.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="bg-gray-50 p-6 sm:p-7 md:p-8 rounded-[1.75rem] sm:rounded-[2rem] hover:shadow-xl hover:shadow-gray-200/50 transition-all border border-gray-100"
                >
                  <div className="flex gap-0.5 sm:gap-1 text-orange-400 mb-4 sm:mb-5 md:mb-6">
                    {"★★★★★".split("").map((s, idx) => <span key={idx} className="text-base sm:text-lg">{s}</span>)}
                  </div>
                  <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                    "This app helped me understand my grandmother's diabetes report instantly. The Hindi translation was perfect."
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-sm sm:text-base">
                      {i === 1 ? 'RV' : i === 2 ? 'PS' : 'AP'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{i === 1 ? 'Rahul Verma' : i === 2 ? 'Priya Singh' : 'Amit Patel'}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase">Patient Son</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </SmoothScroll>
  );
}
