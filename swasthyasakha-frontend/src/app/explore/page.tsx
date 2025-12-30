"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  Stethoscope,
  BookOpen,
  Pill,
  TrendingUp,
  AlertTriangle,
  Activity,
  Heart,
  Brain,
  Shield,
  Zap,
  ChevronRight,
  Play,
  MapPin,
  ArrowRight,
  ExternalLink,
  X,
  Clock,
  Users,
  Info,
} from "lucide-react";

// Scroll Reveal Component
function ScrollRevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Modal Component
function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ExplorePage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [medicineSearch, setMedicineSearch] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<any>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Comprehensive Dummy Data
  const symptoms = [
    "Fever", "Headache", "Cough", "Fatigue", "Nausea",
    "Sore Throat", "Body Ache", "Dizziness", "Runny Nose",
    "Chest Pain", "Shortness of Breath", "Loss of Appetite"
  ];

  const conditionResults = [
    { condition: "Common Cold", probability: 75, color: "bg-emerald-500", description: "Viral infection of the upper respiratory tract" },
    { condition: "Flu (Influenza)", probability: 60, color: "bg-blue-500", description: "Contagious respiratory illness" },
    { condition: "Migraine", probability: 45, color: "bg-purple-500", description: "Severe recurring headache" },
    { condition: "Allergies", probability: 30, color: "bg-orange-500", description: "Immune system reaction" },
  ];

  const diseases = [
    {
      id: 1,
      name: "Diabetes Type 2",
      icon: "🩺",
      category: "Metabolic",
      prevalence: "8.5%",
      description: "A chronic condition affecting how your body processes blood sugar (glucose).",
      symptoms: ["Increased thirst", "Frequent urination", "Hunger", "Fatigue", "Blurred vision"],
      treatments: ["Metformin", "Insulin therapy", "Lifestyle changes", "Diet management"],
      specialists: ["Endocrinologist", "Diabetologist"],
      riskFactors: ["Obesity", "Sedentary lifestyle", "Family history", "Age over 45"]
    },
    {
      id: 2,
      name: "Hypertension",
      icon: "❤️",
      category: "Cardiovascular",
      prevalence: "31%",
      description: "High blood pressure is a common condition affecting the body's arteries.",
      symptoms: ["Headaches", "Shortness of breath", "Nosebleeds", "Dizziness"],
      treatments: ["ACE inhibitors", "Beta blockers", "Diuretics", "Lifestyle modifications"],
      specialists: ["Cardiologist", "General Physician"],
      riskFactors: ["High salt intake", "Stress", "Obesity", "Lack of exercise"]
    },
    {
      id: 3,
      name: "Asthma",
      icon: "🫁",
      category: "Respiratory",
      prevalence: "6.5%",
      description: "A condition in which airways narrow and swell, producing extra mucus.",
      symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Coughing"],
      treatments: ["Inhalers", "Bronchodilators", "Corticosteroids", "Allergy medications"],
      specialists: ["Pulmonologist", "Allergist"],
      riskFactors: ["Allergies", "Family history", "Smoking exposure", "Air pollution"]
    },
    {
      id: 4,
      name: "Migraine",
      icon: "🧠",
      category: "Neurological",
      prevalence: "15%",
      description: "A neurological disorder characterized by recurrent headaches.",
      symptoms: ["Severe headache", "Nausea", "Light sensitivity", "Aura"],
      treatments: ["Triptans", "Pain relievers", "Anti-nausea drugs", "Preventive medications"],
      specialists: ["Neurologist", "Headache specialist"],
      riskFactors: ["Stress", "Hormonal changes", "Certain foods", "Sleep changes"]
    },
    {
      id: 5,
      name: "Arthritis",
      icon: "🦴",
      category: "Musculoskeletal",
      prevalence: "22%",
      description: "Inflammation of one or more joints causing pain and stiffness.",
      symptoms: ["Joint pain", "Stiffness", "Swelling", "Reduced mobility"],
      treatments: ["NSAIDs", "Physical therapy", "Corticosteroids", "DMARDs"],
      specialists: ["Rheumatologist", "Orthopedist"],
      riskFactors: ["Age", "Family history", "Obesity", "Joint injuries"]
    },
    {
      id: 6,
      name: "Depression",
      icon: "😔",
      category: "Mental Health",
      prevalence: "7%",
      description: "A mental health disorder causing persistent sadness and loss of interest.",
      symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep changes"],
      treatments: ["Antidepressants", "Psychotherapy", "CBT", "Lifestyle changes"],
      specialists: ["Psychiatrist", "Psychologist"],
      riskFactors: ["Trauma", "Chronic stress", "Family history", "Substance abuse"]
    }
  ];

  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      genericName: "Acetaminophen",
      type: "Pain Reliever & Fever Reducer",
      category: "Analgesic",
      dosage: "500-1000mg every 4-6 hours",
      maxDaily: "4000mg/day",
      icon: "💊",
      price: "₹20-50",
      manufacturer: "Multiple",
      description: "Common over-the-counter medication for pain and fever relief.",
      uses: ["Headache", "Fever", "Muscle pain", "Toothache", "Cold symptoms"],
      sideEffects: ["Nausea", "Allergic reactions", "Liver damage (overdose)", "Stomach upset (rare)"],
      interactions: ["Alcohol (liver damage risk)", "Warfarin (bleeding risk)", "Isoniazid"],
      warnings: ["Do not exceed maximum dose", "Avoid with liver disease", "Check other medications for paracetamol"],
      storage: "Store at room temperature, away from moisture"
    },
    {
      id: 2,
      name: "Ibuprofen",
      genericName: "Ibuprofen",
      type: "NSAID - Anti-inflammatory",
      category: "NSAID",
      dosage: "200-400mg every 4-6 hours",
      maxDaily: "1200mg/day (OTC)",
      icon: "💉",
      price: "₹30-80",
      manufacturer: "Multiple",
      description: "Nonsteroidal anti-inflammatory drug for pain, fever, and inflammation.",
      uses: ["Arthritis", "Menstrual pain", "Headache", "Dental pain", "Fever"],
      sideEffects: ["Stomach upset", "Heartburn", "Nausea", "Ulcers", "Increased bleeding risk"],
      interactions: ["Aspirin", "Blood thinners", "ACE inhibitors", "Lithium", "Methotrexate"],
      warnings: ["Take with food", "Avoid with stomach ulcers", "Risk of heart attack/stroke"],
      storage: "Keep in original container, room temperature"
    },
    {
      id: 3,
      name: "Metformin",
      genericName: "Metformin HCl",
      type: "Type 2 Diabetes Medication",
      category: "Antidiabetic",
      dosage: "500-2000mg daily with meals",
      maxDaily: "2550mg/day",
      icon: "🧪",
      price: "₹50-150",
      manufacturer: "Various",
      description: "First-line medication for managing type 2 diabetes.",
      uses: ["Type 2 diabetes", "Prediabetes", "PCOS"],
      sideEffects: ["Diarrhea", "Nausea", "Stomach upset", "Vitamin B12 deficiency", "Lactic acidosis (rare)"],
      interactions: ["Alcohol", "Iodinated contrast dyes", "Carbonic anhydrase inhibitors"],
      warnings: ["Monitor kidney function", "Stop before surgery", "Risk of lactic acidosis"],
      storage: "Store at room temperature, protect from light"
    },
    {
      id: 4,
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      type: "Antibiotic",
      category: "Penicillin",
      dosage: "250-500mg every 8 hours",
      maxDaily: "1500mg/day (varies)",
      icon: "💊",
      price: "₹40-120",
      manufacturer: "Multiple",
      description: "Common antibiotic for bacterial infections.",
      uses: ["Respiratory infections", "Ear infections", "Urinary tract infections", "Dental infections"],
      sideEffects: ["Diarrhea", "Nausea", "Rash", "Yeast infection", "Allergic reaction"],
      interactions: ["Oral contraceptives", "Probenecid", "Methotrexate"],
      warnings: ["Complete full course", "Allergic to penicillin", "May reduce contraceptive effectiveness"],
      storage: "Refrigerate liquid form, protect from light"
    },
    {
      id: 5,
      name: "Omeprazole",
      genericName: "Omeprazole",
      type: "Proton Pump Inhibitor",
      category: "Gastric",
      dosage: "20-40mg once daily",
      maxDaily: "40mg/day",
      icon: "💊",
      price: "₹60-200",
      manufacturer: "Various",
      description: "Reduces stomach acid production for treating acid reflux and ulcers.",
      uses: ["GERD", "Peptic ulcers", "Heartburn", "Zollinger-Ellison syndrome"],
      sideEffects: ["Headache", "Nausea", "Diarrhea", "Stomach pain", "Vitamin B12 deficiency"],
      interactions: ["Clopidogrel", "Warfarin", "Diazepam", "Antifungals"],
      warnings: ["Take before meals", "Long-term use risks", "May mask stomach cancer"],
      storage: "Store in dry place, away from moisture"
    },
    {
      id: 6,
      name: "Losartan",
      genericName: "Losartan Potassium",
      type: "Blood Pressure Medication",
      category: "ARB",
      dosage: "25-100mg once daily",
      maxDaily: "100mg/day",
      icon: "💉",
      price: "₹80-250",
      manufacturer: "Multiple",
      description: "Angiotensin receptor blocker for treating high blood pressure.",
      uses: ["Hypertension", "Diabetic nephropathy", "Heart failure"],
      sideEffects: ["Dizziness", "Fatigue", "Low blood pressure", "Hyperkalemia"],
      interactions: ["Potassium supplements", "NSAIDs", "Lithium", "Diuretics"],
      warnings: ["Not for pregnancy", "Monitor kidney function", "Check potassium levels"],
      storage: "Store at room temperature, protect from moisture"
    }
  ];

  const healthCategories = [
    {
      title: "Symptom Analysis",
      description: "AI-powered symptom checker with instant results",
      icon: Stethoscope,
      gradient: "from-emerald-500 to-teal-500",
      image: "🩺",
      action: () => document.getElementById('symptom-checker')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: "Disease Encyclopedia",
      description: "Comprehensive medical knowledge base",
      icon: BookOpen,
      gradient: "from-blue-500 to-indigo-500",
      image: "📚",
      action: () => document.getElementById('disease-encyclopedia')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: "Medicine Database",
      description: "Detailed medication information and interactions",
      icon: Pill,
      gradient: "from-purple-500 to-pink-500",
      image: "💊",
      action: () => document.getElementById('medicine-database')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(diseaseSearch.toLowerCase()) ||
    disease.category.toLowerCase().includes(diseaseSearch.toLowerCase())
  );

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(medicineSearch.toLowerCase()) ||
    medicine.genericName.toLowerCase().includes(medicineSearch.toLowerCase()) ||
    medicine.category.toLowerCase().includes(medicineSearch.toLowerCase())
  );

  const handleAnalyzeSymptoms = () => {
    if (selectedSymptoms.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div ref={containerRef} className="relative bg-white">

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500"
          style={{ scale: heroScale }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }} />
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-20 max-w-7xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-sm font-medium mb-6"
          >
            Health Explorer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight"
          >
            Explore.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed"
          >
            Your comprehensive health companion. Analyze symptoms, explore diseases, and discover medications.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-emerald-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 right-12 hidden md:flex gap-6 text-white/70"
          >
            {['Instagram', 'Facebook', 'Twitter'].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.1, color: 'rgb(255,255,255)' }}
                className="text-sm hover:text-white transition-colors"
              >
                {social}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white"
        >
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full p-1"
          >
            <motion.div className="w-1.5 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORIES SECTION */}
      <ScrollRevealSection id="categories" className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Browse Health Tools
          </motion.h2>
          <p className="text-xl text-gray-600">
            Explore our range of health assessment and information tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {healthCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              onClick={category.action}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-100"
            >
              <div className={`h-64 bg-gradient-to-br ${category.gradient} flex items-center justify-center text-8xl`}>
                {category.image}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <motion.div
                  className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all"
                >
                  Explore <ChevronRight className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollRevealSection>

      {/* SYMPTOM CHECKER SECTION */}
      <section id="symptom-checker" className="relative bg-gray-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
          }} />
        </div>

        <ScrollRevealSection className="relative max-w-7xl mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                Symptom Analysis
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                Select your symptoms and get AI-powered health insights. Our system analyzes patterns to suggest possible conditions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {symptoms.map((symptom, i) => (
                  <motion.button
                    key={symptom}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSymptoms(prev =>
                        prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
                      );
                      setShowResults(false);
                    }}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${selectedSymptoms.includes(symptom)
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                      }`}
                  >
                    {symptom}
                  </motion.button>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAnalyzeSymptoms}
                disabled={selectedSymptoms.length === 0}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze {selectedSymptoms.length > 0 && `(${selectedSymptoms.length} symptoms)`}
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {!showResults ? (
                <div className="relative bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
                  <div className="text-9xl text-center mb-4">🩺</div>
                  <p className="text-center text-white/80">Select symptoms to begin analysis</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold mb-6">Possible Conditions:</h3>
                  {conditionResults.map((result, i) => (
                    <motion.div
                      key={result.condition}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-lg">{result.condition}</h4>
                          <p className="text-sm text-gray-300">{result.description}</p>
                        </div>
                        <div className="text-emerald-400 font-bold text-3xl">{result.probability}%</div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.probability}%` }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                          className={`h-full ${result.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                  <p className="text-sm text-gray-400 mt-6">
                    ⚠️ This is for informational purposes only. Consult a healthcare professional for proper diagnosis.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </ScrollRevealSection>
      </section>

      {/* DISEASE ENCYCLOPEDIA */}
      <ScrollRevealSection id="disease-encyclopedia" className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Disease Encyclopedia
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive information about common health conditions
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search diseases by name or category..."
              value={diseaseSearch}
              onChange={(e) => setDiseaseSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-emerald-400 transition-colors text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease, i) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedDisease(disease)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-6xl">{disease.icon}</div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {disease.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{disease.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{disease.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Prevalence</span>
                <span className="text-2xl font-bold text-emerald-600">{disease.prevalence}</span>
              </div>
              <motion.div
                className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all"
              >
                Learn More <ChevronRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No diseases found matching "{diseaseSearch}"</p>
          </div>
        )}
      </ScrollRevealSection>

      {/* MEDICINE DATABASE */}
      <section id="medicine-database" className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <ScrollRevealSection className="relative max-w-7xl mx-auto px-8 md:px-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Medicine Database
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Detailed medication information, interactions, and guidelines
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search medicines by name, category, or use..."
                value={medicineSearch}
                onChange={(e) => setMedicineSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full focus:outline-none focus:border-white/40 transition-colors text-lg text-white placeholder-white/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine, i) => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedMedicine(medicine)}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 cursor-pointer hover:bg-white/15 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{medicine.icon}</div>
                  <span className="px-3 py-1 bg-purple-500/30 rounded-full text-xs font-medium">
                    {medicine.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{medicine.name}</h3>
                <p className="text-sm text-purple-200 mb-2">{medicine.genericName}</p>
                <p className="text-sm text-purple-100 mb-4">{medicine.type}</p>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-purple-200">Price Range</span>
                  <span className="font-semibold">{medicine.price}</span>
                </div>
                <motion.div
                  className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-4 transition-all"
                >
                  View Details <ExternalLink className="w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-20">
              <p className="text-purple-200 text-lg">No medicines found matching "{medicineSearch}"</p>
            </div>
          )}
        </ScrollRevealSection>
      </section>

      {/* FOOTER CTA */}
      <ScrollRevealSection className="py-32 px-8 md:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Ready to explore?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-12"
          >
            Start your health journey today with our comprehensive tools and resources
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all"
          >
            Get Started Now
          </motion.button>
        </div>
      </ScrollRevealSection>

      {/* MODALS */}
      <Modal isOpen={!!selectedDisease} onClose={() => setSelectedDisease(null)}>
        {selectedDisease && (
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="text-6xl">{selectedDisease.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedDisease.name}</h2>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {selectedDisease.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{selectedDisease.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    Prevalence: <span className="font-bold text-emerald-600">{selectedDisease.prevalence}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" /> Symptoms
                </h3>
                <ul className="space-y-2">
                  {selectedDisease.symptoms.map((symptom: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-green-600" /> Treatments
                </h3>
                <ul className="space-y-2">
                  {selectedDisease.treatments.map((treatment: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-purple-600" /> Specialists
                </h3>
                <ul className="space-y-2">
                  {selectedDisease.specialists.map((specialist: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      {specialist}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" /> Risk Factors
                </h3>
                <ul className="space-y-2">
                  {selectedDisease.riskFactors.map((factor: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!selectedMedicine} onClose={() => setSelectedMedicine(null)}>
        {selectedMedicine && (
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="text-6xl">{selectedMedicine.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedMedicine.name}</h2>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {selectedMedicine.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{selectedMedicine.genericName}</p>
                <p className="text-gray-700 mb-4">{selectedMedicine.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-semibold">Price:</span> {selectedMedicine.price}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-semibold">By:</span> {selectedMedicine.manufacturer}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" /> Dosage Information
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Typical Dose:</span> {selectedMedicine.dosage}</p>
                  <p><span className="font-semibold">Maximum Daily:</span> {selectedMedicine.maxDaily}</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" /> Uses
                </h3>
                <ul className="space-y-2">
                  {selectedMedicine.uses.map((use: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" /> Drug Interactions
                </h3>
                <ul className="space-y-2">
                  {selectedMedicine.interactions.map((interaction: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      {interaction}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-red-600" /> Side Effects
                </h3>
                <ul className="space-y-2">
                  {selectedMedicine.sideEffects.map((effect: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-600" /> Warnings & Precautions
                </h3>
                <ul className="space-y-2">
                  {selectedMedicine.warnings.map((warning: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Storage Instructions</h3>
                <p className="text-gray-700">{selectedMedicine.storage}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
