"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
    Users,
    TrendingUp,
    Calendar,
    Bell,
    Shield,
    Heart,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Plus,
    X,
} from "lucide-react";

// Types
interface FamilyMember {
    id: number;
    name: string;
    age: number;
    role: string;
    avatar: string;
    color: string;
    dob: string;
    healthStatus: "excellent" | "good" | "needs-attention";
}

interface GrowthDataPoint {
    month: string;
    height: number;
    weight: number;
    bmi: number;
}

interface Vaccine {
    id: number;
    name: string;
    childId: number;
    dueDate: string;
    status: "completed" | "upcoming" | "overdue";
    ageRequirement: string;
}

interface ElderCareTask {
    id: number;
    elderId: number;
    task: string;
    time: string;
    completed: boolean;
    priority: "high" | "medium" | "low";
    type: "medication" | "checkup" | "activity";
}

interface CalendarEvent {
    id: number;
    title: string;
    date: string;
    memberId: number;
    type: "appointment" | "vaccine" | "medication" | "activity";
}

interface Alert {
    id: number;
    message: string;
    priority: "urgent" | "important" | "info";
    memberId: number;
    timestamp: string;
}

// Scroll Reveal Component
// 3D Tilt Card Component with Mouse Tracking
function TiltCard({ member, i, selectedMember, setSelectedMember, getStatusColor }: any) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animations
    const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
    const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseXPos = e.clientX - centerX;
        const mouseYPos = e.clientY - centerY;

        // Convert to rotation angles (-25 to 25 degrees)
        const rotateYDeg = (mouseXPos / (rect.width / 2)) * 25;
        const rotateXDeg = (mouseYPos / (rect.height / 2)) * -25;

        mouseX.set(rotateYDeg);
        mouseY.set(rotateXDeg);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: i * 0.12,
                duration: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 20
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedMember(member)}
            style={{
                perspective: "1500px",
            }}
            className={`relative bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer border-2 group overflow-visible ${selectedMember?.id === member.id
                    ? `border-${member.color}-400`
                    : 'border-gray-200'
                }`}
        >
            {/* Inner rotating content */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
            >
                {/* Floating Avatar */}
                <div className="text-center">
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 2.8 + (i * 0.4),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3
                        }}
                    >
                        <motion.div
                            className="text-8xl mb-5 inline-block filter drop-shadow-2xl"
                            style={{
                                transform: "translateZ(40px)"
                            }}
                        >
                            {member.avatar}
                        </motion.div>
                    </motion.div>

                    <motion.h3
                        className="font-bold text-gray-900 mb-1 text-lg"
                        style={{
                            transform: "translateZ(30px)"
                        }}
                    >
                        {member.name}
                    </motion.h3>
                    <p
                        className="text-sm text-gray-600 mb-3 font-medium"
                        style={{
                            transform: "translateZ(25px)"
                        }}
                    >
                        {member.role} • {member.age}y
                    </p>
                    <motion.span
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border-2 ${getStatusColor(member.healthStatus)}`}
                        style={{
                            transform: "translateZ(35px)"
                        }}
                    >
                        {member.healthStatus.replace('-', ' ')}
                    </motion.span>
                </div>
            </motion.div>

            {/* Selection Indicator */}
            {selectedMember?.id === member.id && (
                <motion.div
                    layoutId="selected-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25
                    }}
                    className={`absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-${member.color}-400 to-${member.color}-600 rounded-full flex items-center justify-center shadow-2xl z-20 border-4 border-white`}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <CheckCircle className="w-7 h-7 text-white" />
                    </motion.div>
                </motion.div>
            )}

            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                animate={{
                    x: ['-200%', '200%'],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
            />
        </motion.div>
    );
}

function ScrollRevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function FamilyPage() {
    const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
    const [selectedChild, setSelectedChild] = useState(3); // Aarav
    const [selectedElder, setSelectedElder] = useState(5); // Grandmother
    const [growthMetric, setGrowthMetric] = useState<"height" | "weight" | "bmi">("height");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showAlerts, setShowAlerts] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

    // Dummy Data
    const familyMembers: FamilyMember[] = [
        { id: 1, name: "Rajesh Kumar", age: 42, role: "Father", avatar: "👨", color: "emerald", dob: "15/06/1982", healthStatus: "good" },
        { id: 2, name: "Priya Kumar", age: 38, role: "Mother", avatar: "👩", color: "teal", dob: "22/09/1986", healthStatus: "excellent" },
        { id: 3, name: "Aarav", age: 8, role: "Son", avatar: "👦", color: "blue", dob: "10/03/2016", healthStatus: "excellent" },
        { id: 4, name: "Diya", age: 5, role: "Daughter", avatar: "👧", color: "pink", dob: "18/11/2019", healthStatus: "good" },
        { id: 5, name: "Grandmother", age: 72, role: "Elder", avatar: "👵", color: "purple", dob: "05/02/1952", healthStatus: "needs-attention" },
    ];

    const growthData: { [key: number]: GrowthDataPoint[] } = {
        3: [ // Aarav
            { month: "Jan", height: 110, weight: 20, bmi: 16.5 },
            { month: "Mar", height: 115, weight: 22, bmi: 16.6 },
            { month: "May", height: 118, weight: 24, bmi: 17.2 },
            { month: "Jul", height: 122, weight: 26, bmi: 17.5 },
            { month: "Sep", height: 125, weight: 28, bmi: 17.9 },
        ],
        4: [ // Diya
            { month: "Jan", height: 102, weight: 16, bmi: 15.4 },
            { month: "Mar", height: 104, weight: 17, bmi: 15.7 },
            { month: "May", height: 106, weight: 17.5, bmi: 15.6 },
            { month: "Jul", height: 108, weight: 18, bmi: 15.4 },
            { month: "Sep", height: 110, weight: 19, bmi: 15.7 },
        ],
    };

    const vaccines: Vaccine[] = [
        { id: 1, name: "DTP Booster", childId: 4, dueDate: "2024-10-15", status: "completed", ageRequirement: "5 years" },
        { id: 2, name: "MMR 2nd Dose", childId: 4, dueDate: "2025-01-15", status: "upcoming", ageRequirement: "5 years" },
        { id: 3, name: "Varicella", childId: 4, dueDate: "2024-11-20", status: "completed", ageRequirement: "5 years" },
        { id: 4, name: "Polio Booster", childId: 4, dueDate: "2025-06-18", status: "upcoming", ageRequirement: "6 years" },
        { id: 5, name: "Hepatitis A", childId: 3, dueDate: "2024-08-10", status: "completed", ageRequirement: "8 years" },
        { id: 6, name: "Typhoid", childId: 3, dueDate: "2025-03-10", status: "upcoming", ageRequirement: "9 years" },
    ];

    const elderCareTasks: ElderCareTask[] = [
        { id: 1, elderId: 5, task: "Blood Pressure Check", time: "08:00 AM", completed: true, priority: "high", type: "checkup" },
        { id: 2, elderId: 5, task: "Diabetes Medication", time: "09:00 AM", completed: true, priority: "high", type: "medication" },
        { id: 3, elderId: 5, task: "Lunch Medication", time: "01:00 PM", completed: false, priority: "high", type: "medication" },
        { id: 4, elderId: 5, task: "Evening Walk", time: "05:00 PM", completed: false, priority: "medium", type: "activity" },
        { id: 5, elderId: 5, task: "Dinner Medication", time: "08:00 PM", completed: false, priority: "high", type: "medication" },
        { id: 6, elderId: 5, task: "Blood Sugar Check", time: "09:00 PM", completed: false, priority: "high", type: "checkup" },
    ];

    const calendarEvents: CalendarEvent[] = [
        { id: 1, title: "Aarav Dental Checkup", date: "2025-01-06", memberId: 3, type: "appointment" },
        { id: 2, title: "Diya MMR Vaccine", date: "2025-01-15", memberId: 4, type: "vaccine" },
        { id: 3, title: "Grandmother Cardiology", date: "2025-01-03", memberId: 5, type: "appointment" },
        { id: 4, title: "Family Health Checkup", date: "2025-01-31", memberId: 0, type: "appointment" },
        { id: 5, title: "Priya Yoga Class", date: "2025-01-02", memberId: 2, type: "activity" },
    ];

    const alerts: Alert[] = [
        { id: 1, message: "Diya's MMR vaccine due in 2 weeks", priority: "important", memberId: 4, timestamp: "2 hours ago" },
        { id: 2, message: "Grandmother missed evening BP medication", priority: "urgent", memberId: 5, timestamp: "30 mins ago" },
        { id: 3, message: "Aarav reached growth milestone!", priority: "info", memberId: 3, timestamp: "1 day ago" },
        { id: 4, message: "Family health insurance renewal due", priority: "important", memberId: 0, timestamp: "3 days ago" },
    ];

    const children = familyMembers.filter(m => m.role === "Son" || m.role === "Daughter");
    const elders = familyMembers.filter(m => m.role === "Elder");
    const selectedChildData = growthData[selectedChild] || [];
    const selectedChildVaccines = vaccines.filter(v => v.childId === selectedChild);
    const selectedElderTasks = elderCareTasks.filter(t => t.elderId === selectedElder);

    const getMemberById = (id: number) => familyMembers.find(m => m.id === id);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "excellent": return "bg-green-100 text-green-700 border-green-200";
            case "good": return "bg-blue-100 text-blue-700 border-blue-200";
            case "needs-attention": return "bg-orange-100 text-orange-700 border-orange-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getVaccineStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-500";
            case "upcoming": return "bg-blue-500";
            case "overdue": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "urgent": return "bg-red-100 border-red-300 text-red-700";
            case "important": return "bg-orange-100 border-orange-300 text-orange-700";
            case "info": return "bg-blue-100 border-blue-300 text-blue-700";
            default: return "bg-gray-100 border-gray-300 text-gray-700";
        }
    };

    return (
        <div ref={containerRef} className="relative bg-gray-50 min-h-screen">

            {/* HERO SECTION */}
            <section className="relative h-[60vh] w-full overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-400">
                <motion.div
                    className="absolute inset-0"
                    style={{ scale: heroScale, opacity: heroOpacity }}
                >
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                        }} />
                    </div>
                </motion.div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/80 text-sm font-medium mb-4 flex items-center gap-2"
                    >
                        <Users className="w-5 h-5" />
                        Multi-User Household Care
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
                    >
                        Family Hub
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
                    >
                        Manage your entire family's health in one place. Track growth, schedules, and care coordination.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex gap-4"
                    >
                        <button className="px-6 py-3 bg-white text-emerald-600 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-xl">
                            Add Family Member
                        </button>
                        <button
                            onClick={() => setShowAlerts(true)}
                            className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full font-bold hover:bg-white/30 transition-all relative shadow-lg"
                        >
                            <Bell className="w-5 h-5 inline mr-2" />
                            Alerts
                            {alerts.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                    {alerts.length}
                                </span>
                            )}
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* FAMILY PROFILE SWITCHER */}
            <ScrollRevealSection className="py-16 px-8 md:px-20 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Family Members</h2>
                    <p className="text-gray-600">Select a member to view their health information</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {familyMembers.map((member, i) => (
                        <TiltCard
                            key={member.id}
                            member={member}
                            i={i}
                            selectedMember={selectedMember}
                            setSelectedMember={setSelectedMember}
                            getStatusColor={getStatusColor}
                        />
                    ))}
                </div>
            </ScrollRevealSection>

            {/* CHILD GROWTH CHARTS */}
            <ScrollRevealSection className="py-16 px-8 md:px-20 max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                <TrendingUp className="w-10 h-10 text-blue-500" />
                                Growth Tracking
                            </h2>
                            <p className="text-gray-600">Monitor your children's height, weight, and BMI</p>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                            {children.map(child => (
                                <button
                                    key={child.id}
                                    onClick={() => setSelectedChild(child.id)}
                                    className={`px-4 py-2 rounded-full font-medium transition-all ${selectedChild === child.id
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {child.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Metric Selector */}
                    <div className="flex gap-3 mb-8">
                        {(['height', 'weight', 'bmi'] as const).map(metric => (
                            <button
                                key={metric}
                                onClick={() => setGrowthMetric(metric)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${growthMetric === metric
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {metric.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Simple Chart Display */}
                    <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-8 border border-teal-100">
                        <div className="flex items-end justify-between h-64 gap-4">
                            {selectedChildData.map((point, i) => {
                                const value = growthMetric === 'height' ? point.height : growthMetric === 'weight' ? point.weight : point.bmi;
                                const maxValue = Math.max(...selectedChildData.map(p =>
                                    growthMetric === 'height' ? p.height : growthMetric === 'weight' ? p.weight : p.bmi
                                ));
                                const height = (value / maxValue) * 100;

                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="text-sm font-bold text-teal-600">{value}{growthMetric === 'height' ? 'cm' : growthMetric === 'weight' ? 'kg' : ''}</div>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ duration: 0.8, delay: i * 0.1 }}
                                            className="w-full bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t-lg min-h-[20px] shadow-lg shadow-teal-200"
                                        />
                                        <div className="text-xs text-gray-600 font-medium">{point.month}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-teal-200 transition-all flex items-center gap-2 mx-auto">
                        <Plus className="w-5 h-5" />
                        Add New Measurement
                    </button>
                </div>
            </ScrollRevealSection>

            {/* VACCINE SCHEDULES */}
            <ScrollRevealSection className="py-16 px-8 md:px-20 max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                            <Shield className="w-10 h-10" />
                            Vaccine Schedules
                        </h2>
                        <p className="text-white/80">Keep track of immunization schedules for your children</p>
                    </div>

                    <div className="flex gap-3 mb-8">
                        {children.map(child => (
                            <button
                                key={child.id}
                                onClick={() => setSelectedChild(child.id)}
                                className={`px-4 py-2 rounded-full font-medium transition-all ${selectedChild === child.id
                                    ? 'bg-white text-purple-600 shadow-lg'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                            >
                                {child.name}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedChildVaccines.map((vaccine, i) => (
                            <motion.div
                                key={vaccine.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all shadow-lg"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{vaccine.name}</h3>
                                        <p className="text-sm text-white/70">{vaccine.ageRequirement}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVaccineStatusColor(vaccine.status)} text-white`}>
                                        {vaccine.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white/80">
                                    <Clock className="w-4 h-4" />
                                    {new Date(vaccine.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ScrollRevealSection>

            {/* ELDER CARE REMINDERS */}
            <ScrollRevealSection className="py-16 px-8 md:px-20 max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                <Heart className="w-10 h-10 text-purple-500" />
                                Elder Care
                            </h2>
                            <p className="text-gray-600">Daily care tasks and medication reminders</p>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                            {elders.map(elder => (
                                <button
                                    key={elder.id}
                                    onClick={() => setSelectedElder(elder.id)}
                                    className={`px-4 py-2 rounded-full font-medium transition-all ${selectedElder === elder.id
                                        ? 'bg-purple-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {elder.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {selectedElderTasks.map((task, i) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${task.completed
                                    ? 'bg-green-50 border-green-200'
                                    : task.priority === 'high'
                                        ? 'bg-red-50 border-red-200'
                                        : 'bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-purple-500'
                                    }`}>
                                    {task.completed && <CheckCircle className="w-5 h-5 text-white" />}
                                </button>

                                <div className="flex-1">
                                    <h4 className={`font-semibold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                        {task.task}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {task.time}
                                        </p>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${task.type === 'medication' ? 'bg-red-100 text-red-700' :
                                            task.type === 'checkup' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {task.type}
                                        </span>
                                    </div>
                                </div>

                                {!task.completed && task.priority === 'high' && (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ScrollRevealSection>

            {/* SHARED CALENDAR */}
            <ScrollRevealSection className="py-16 px-8 md:px-20 max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                                <Calendar className="w-10 h-10" />
                                Family Calendar
                            </h2>
                            <p className="text-white/80">Upcoming appointments and activities</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-white/10 rounded-full transition-all">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <span className="font-bold text-lg">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-all">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {calendarEvents.map((event, i) => {
                            const member = getMemberById(event.memberId);
                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/30 hover:bg-white/20 transition-all flex items-center gap-4 shadow-lg"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-${member?.color || 'gray'}-500 flex items-center justify-center text-2xl`}>
                                        {member?.avatar || '📅'}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg">{event.title}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-sm flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </p>
                                            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                                                {event.type}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <button className="mt-6 px-6 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-2 mx-auto shadow-xl">
                        <Plus className="w-5 h-5" />
                        Add Event
                    </button>
                </div>
            </ScrollRevealSection>

            {/* ALERTS MODAL */}
            <AnimatePresence>
                {showAlerts && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAlerts(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-3xl">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Bell className="w-6 h-6 text-purple-500" />
                                    Care Coordination Alerts
                                </h3>
                                <button
                                    onClick={() => setShowAlerts(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-3">
                                {alerts.map((alert, i) => {
                                    const member = getMemberById(alert.memberId);
                                    return (
                                        <motion.div
                                            key={alert.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`p-5 rounded-2xl border-2 ${getPriorityColor(alert.priority)}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                {member && (
                                                    <div className="text-3xl">{member.avatar}</div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-semibold mb-1">{alert.message}</p>
                                                    <p className="text-sm opacity-70">{alert.timestamp}</p>
                                                </div>
                                                {alert.priority === 'urgent' && (
                                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FOOTER CTA */}
            <ScrollRevealSection className="py-20 px-8 md:px-20 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Caring for your family, together
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Coordinate care, track health, and stay connected with everyone's wellness
                    </p>
                    <button className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/30 transition-all">
                        Invite Family Members
                    </button>
                </div>
            </ScrollRevealSection>
        </div>
    );
}
