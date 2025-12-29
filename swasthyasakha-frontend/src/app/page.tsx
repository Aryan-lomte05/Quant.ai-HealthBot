"use client";

import { motion, useTime, useTransform, useScroll, useSpring } from "framer-motion";
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
import { useRef, useEffect } from "react";
import Lenis from "lenis";

// --- Smooth Scroll Provider ---
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slower, smoother scroll
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

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Components ---

function OrbitalCards() {
  const time = useTime();
  const rotate = useTransform(time, [0, 40000], [0, 360], { clamp: false }); // Slower rotation
  // Float animation for individual cards to add "breathing" effect
  const float = useTransform(time, [0, 2000], [0, -10], { clamp: false });

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center pointer-events-none overflow-visible">
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[300px] h-[300px] bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-50 animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 w-4 h-80 bg-gradient-to-b from-emerald-800/80 to-teal-600/20 rounded-full backdrop-blur-sm"
        initial={{ height: 0 }}
        animate={{ height: 320 }}
        transition={{ duration: 1.5, ease: "circOut" }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-emerald-100 shadow-lg"
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
          className="absolute top-16 left-16 bg-white p-3 rounded-2xl shadow-xl shadow-emerald-900/10 border border-white/50 backdrop-blur-md"
          style={{ rotate: useTransform(rotate, (r) => -r) }}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vitals</p>
              <p className="text-xs font-bold text-gray-800">Normal</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 - Chat */}
        <motion.div
          className="absolute bottom-24 right-16 bg-white p-3 rounded-2xl shadow-xl shadow-emerald-900/10 border border-white/50 backdrop-blur-md"
          style={{ rotate: useTransform(rotate, (r) => -r) }}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <MessageCircleHeart className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ai Chat</p>
              <p className="text-xs font-bold text-gray-800">Active</p>
            </div>
          </div>
        </motion.div>

        {/* Card 3 - Wellness (Brought closer) */}
        <motion.div
          className="absolute top-1/2 right-4 bg-white py-2 px-3 rounded-full shadow-lg border border-emerald-50"
          style={{ rotate: useTransform(rotate, (r) => -r) }}
        >
          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Wellness
          </span>
        </motion.div>

        {/* Card 4 - Expertise (Brought closer) */}
        <motion.div
          className="absolute top-1/3 left-4 bg-white py-2 px-3 rounded-full shadow-lg border border-emerald-50"
          style={{ rotate: useTransform(rotate, (r) => -r) }}
        >
          <span className="text-[10px] font-bold text-teal-700 flex items-center gap-1">
            <Shield className="h-3 w-3" /> Expertise
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -bottom-12 right-12 w-56 bg-white/90 backdrop-blur-xl rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold text-gray-400">Heart Rate</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">83</span>
              <span className="text-xs text-gray-500 font-medium">bpm</span>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center animate-pulse">
            <HeartPulse className="h-4 w-4 text-red-500" />
          </div>
        </div>
        {/* Mock Chart */}
        <div className="h-16 w-full flex items-end gap-1">
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
        <div className="flex items-center gap-2 mt-3">
          <div className="h-2 w-2 rounded-full bg-yellow-400" />
          <p className="text-[10px] text-gray-500 font-medium">Resting: 72bpm</p>
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
      <div ref={containerRef} className="flex flex-col gap-2 relative bg-gray-50 selection:bg-emerald-200">

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 origin-[0%] z-50"
          style={{ scaleX }}
        />

        {/* SECTION 1: HERO - Sticky Parallax & Scale */}
        <motion.section
          className="sticky top-0 z-0 w-full min-h-screen flex flex-col p-4 md:p-6"
        >
          <motion.div
            className="flex-1 w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-gray-100 flex flex-col lg:flex-row"
            style={{
              scale: useTransform(scrollYProgress, [0, 0.4], [1, 0.9]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.4], [0, 50])
            }}
          >
            {/* Top Branding */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1">
                MEDI<span className="text-yellow-400 text-2xl leading-none">.</span>
              </h2>
            </div>

            {/* Social Actions */}
            <div className="absolute top-8 right-8 z-20 flex flex-col gap-3">
              {['IG', 'FB', 'X'].map((social) => (
                <button key={social} className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  {social === 'IG' ? '📷' : social === 'FB' ? 'f' : '𝕏'}
                </button>
              ))}
            </div>

            {/* Left Section - Typography */}
            <div className="p-8 md:p-20 flex flex-col justify-center relative z-10 flex-1">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-9xl font-medium tracking-tighter leading-[0.9] text-gray-900">
                  Expert care for <br />
                  <span className="italic font-serif font-light text-emerald-800">your health</span> <br />
                  and wellness<span className="text-yellow-400">.</span>
                </motion.h1>
                <motion.p variants={itemVariants} className="max-w-md text-gray-500 text-lg leading-relaxed ml-2 font-medium">
                  AI medical experts providing compassionate, professional support to keep you safe.
                </motion.p>
                <motion.div variants={itemVariants} className="pt-4 ml-2">
                  <Link href="/chat">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-950 text-white px-10 py-5 rounded-full text-base font-medium hover:bg-emerald-950 transition-colors"
                    >
                      Book an appointment
                    </motion.button>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="pt-12 flex flex-wrap gap-3">
                  {[
                    { label: "Vaccinations", icon: Syringe },
                    { label: "High-quality", icon: Sparkles },
                    { label: "Laboratory", icon: Microscope },
                    { label: "Check-ups", icon: Stethoscope },
                    { label: "Emergency", icon: Phone },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2, backgroundColor: "#ECFDF5", borderColor: "#A7F3D0" }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-600 cursor-default transition-colors"
                    >
                      <feature.icon className="h-3 w-3" />
                      {feature.label}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Section - Visuals */}
            <div className="relative bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden flex-1 min-h-[400px] lg:min-h-0 rounded-[3rem] lg:rounded-none lg:rounded-bl-[5rem]">
              <OrbitalCards />
            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 2: BENTO GRID - Vibrant Glassmorphism (Replaced "Dull" Dark Mode) */}
        <div className="relative z-10 min-h-screen bg-transparent pointer-events-none h-[1px]" /> {/* Spacer for sticky hero */}

        <motion.section
          className="w-full relative z-20 bg-white rounded-t-[4rem] -mt-[10vh] pb-24 shadow-[0_-50px_100px_rgba(0,0,0,0.1)] overflow-hidden"
        >
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-200 to-teal-100 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-100 to-yellow-100 rounded-full blur-[80px] mix-blend-multiply opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto pt-32 px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24 space-y-4"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-widest">
                Holistic Ecosystem
              </span>
              <h2 className="text-5xl md:text-7xl font-medium text-emerald-950 tracking-tight">
                Healthcare <span className="font-serif italic text-emerald-600">reimagined</span> <br /> for everyone.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
              {/* Card 1: Large Left - Glassmorphic */}
              <motion.div
                className="md:col-span-2 md:row-span-2 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl shadow-emerald-900/5 p-10 flex flex-col justify-between relative overflow-hidden group"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110" />

                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
                    <Brain className="h-7 w-7" />
                  </div>
                  <h3 className="text-4xl font-medium text-emerald-950 mb-4">AI Diagnostics</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                    Advanced symptom analysis in 12+ Indian languages. It listens, understands, and guides you instantly.
                  </p>
                </div>

                <div className="relative z-10 mt-12">
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold">⚡</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                        <span>Analysis Confidence</span>
                        <span>98.5%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
                className="bg-blue-50/60 backdrop-blur-xl rounded-[2.5rem] border border-blue-100/60 shadow-lg shadow-blue-900/5 p-8 relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-200/50 rounded-full blur-2xl group-hover:bg-blue-300/50 transition-colors" />
                <div className="h-12 w-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  <Globe2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-medium text-blue-950 mb-2">Multilingual</h3>
                <p className="text-blue-900/60 font-medium">Hindi, Tamil, Bengali & more.</p>
              </motion.div>

              {/* Card 3: Bottom Right - Indigo Glass */}
              <motion.div
                className="bg-indigo-50/60 backdrop-blur-xl rounded-[2.5rem] border border-indigo-100/60 shadow-lg shadow-indigo-900/5 p-8 relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-200/50 rounded-full blur-2xl group-hover:bg-indigo-300/50 transition-colors" />
                <div className="h-12 w-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-medium text-indigo-950 mb-2">Secure Data</h3>
                <p className="text-indigo-900/60 font-medium">Encrypted & private records.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>


        {/* SECTION 3: HOW IT WORKS - Dynamic Timeline */}
        <section className="w-full bg-emerald-950 py-32 rounded-[3rem] -mt-12 z-30 relative text-white overflow-hidden">

          {/* Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute top-1/4 -left-64 w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 -right-64 w-[800px] h-[800px] bg-teal-500 rounded-full blur-[150px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
              <div>
                <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-2 block">The Process</span>
                <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Simple steps to <br /> better health.</h2>
              </div>
              <Link href="/chat">
                <button className="group flex items-center gap-3 text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-emerald-950 transition-all font-medium">
                  Start your journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Dashed) */}
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
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 group"
                >
                  <div className="w-44 h-44 rounded-full bg-emerald-900/50 border border-emerald-800 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 group-hover:bg-emerald-800/80 group-hover:scale-110 transition-all duration-500">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
                      <item.icon className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-950 font-bold text-sm shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-emerald-50 mb-3">{item.title}</h3>
                    <p className="text-emerald-400/80 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: COMMUNITY - Minimal & Clean */}
        <section className="w-full bg-white py-24 z-20 -mt-12 rounded-t-[3rem] relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Users className="h-3 w-3" /> Community
              </div>
              <h2 className="text-4xl font-medium text-gray-900 tracking-tight">Trusted by 10,000+ families.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-gray-50 p-8 rounded-[2rem] hover:shadow-xl hover:shadow-gray-200/50 transition-all border border-gray-100"
                >
                  <div className="flex gap-1 text-orange-400 mb-6">
                    {"★★★★★".split("").map((s, idx) => <span key={idx} className="text-lg">{s}</span>)}
                  </div>
                  <p className="text-gray-600 font-medium text-lg mb-8 leading-relaxed">
                    "This app helped me understand my grandmother's diabetes report instantly. The Hindi translation was perfect."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                      {i === 1 ? 'RV' : i === 2 ? 'PS' : 'AP'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{i === 1 ? 'Rahul Verma' : i === 2 ? 'Priya Singh' : 'Amit Patel'}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase">Patient Son</p>
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
