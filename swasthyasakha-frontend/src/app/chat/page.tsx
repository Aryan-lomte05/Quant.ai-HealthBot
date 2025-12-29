"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  Mic,
  PauseCircle,
  Send,
  Video,
  Volume2,
  Sparkles,
  AlertCircle,
  Phone,
  ChevronDown,
  Clock,
  MessageSquare,
  Stethoscope,
  Activity,
  BookOpen,
  Play,
  Pause,
  X,
  ExternalLink,
  Lightbulb,
  Bookmark,
  User,
  Bot,
  MapPin,
} from "lucide-react";

type Lang = "hi" | "en" | "hinglish";

type ChatMessage = {
  id: string;
  from: "user" | "sakha";
  text: string;
  lang: Lang;
  tone?: "calm" | "alert";
  clusterId?: string;
  citations?: Citation[];
  tipId?: string;
};

type Citation = {
  id: string;
  title: string;
  source: string;
  url: string;
};

type SymptomCluster = {
  id: string;
  symptoms: string[];
  severity: "low" | "medium" | "high";
  relatedConditions: string[];
};

type ProactiveTip = {
  id: string;
  category: "diet" | "exercise" | "prevention" | "mental_health";
  title: string;
  description: string;
  bookmarked: boolean;
};

type UploadPreview = {
  id: string;
  type: "image" | "video" | "pdf";
  name: string;
  url?: string;
  durationSec?: number;
  status: "ready" | "uploading" | "done" | "error";
};

type SessionData = {
  startTime: Date;
  messageCount: number;
  topics: string[];
};

const mockResponses: ChatMessage[] = [
  {
    id: "intro-1",
    from: "sakha",
    lang: "hinglish",
    text: "Namaste 👋, main Sakha hoon. Aap apni problem simple shabdon mein bata sakte hain.",
    tone: "calm",
  },
  {
    id: "intro-2",
    from: "sakha",
    lang: "hinglish",
    text: "Yaad rakhiye, main doctor nahi hoon. Emergency mein turant 108 par call karein.",
    tone: "alert",
  },
];

const mockCitations: Citation[] = [
  {
    id: "cite-1",
    title: "WHO Guidelines on Fever Management",
    source: "World Health Organization",
    url: "https://www.who.int",
  },
  {
    id: "cite-2",
    title: "CDC Symptom Assessment Guide",
    source: "Centers for Disease Control",
    url: "https://www.cdc.gov",
  },
];

const mockTips: ProactiveTip[] = [
  {
    id: "tip-1",
    category: "prevention",
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily to maintain good health.",
    bookmarked: false,
  },
  {
    id: "tip-2",
    category: "diet",
    title: "Balanced Diet",
    description: "Include fruits, vegetables, and whole grains in your daily meals.",
    bookmarked: false,
  },
  {
    id: "tip-3",
    category: "exercise",
    title: "Daily Movement",
    description: "Aim for at least 30 minutes of moderate exercise each day.",
    bookmarked: false,
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockResponses);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<Lang>("hinglish");
  const [recording, setRecording] = useState(false);
  const [listeningText, setListeningText] = useState("");
  const [uploads, setUploads] = useState<UploadPreview[]>([]);
  const [emotionMode, setEmotionMode] = useState<"calm" | "alert" | "distress">("calm");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [sessionExpanded, setSessionExpanded] = useState(false);
  const [symptomClusters, setSymptomClusters] = useState<SymptomCluster[]>([]);
  const [proactiveTips, setProactiveTips] = useState<ProactiveTip[]>(mockTips);
  const [sessionData, setSessionData] = useState<SessionData>({
    startTime: new Date(),
    messageCount: 0,
    topics: [],
  });
  const [expandedCitations, setExpandedCitations] = useState<Set<string>>(new Set());
  const [typingIndicator, setTypingIndicator] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Emotion detection
  useEffect(() => {
    const hasDistress = messages.some(
      (m) =>
        m.from === "user" &&
        /severe|extreme|unbearable|emergency|help|dying|panic|can't breathe/i.test(m.text)
    );
    const hasAlert = messages.some(
      (m) =>
        m.from === "user" &&
        /bahut|zyada|dard|saans|chakkar|worried|concerned/i.test(m.text)
    );

    if (hasDistress) {
      setEmotionMode("distress");
    } else if (hasAlert) {
      setEmotionMode("alert");
    } else {
      setEmotionMode("calm");
    }
  }, [messages]);

  // Session tracking
  useEffect(() => {
    setSessionData(prev => ({
      ...prev,
      messageCount: messages.filter(m => m.from === "user").length,
    }));
  }, [messages]);

  // Symptom clustering
  useEffect(() => {
    const userMessages = messages.filter(m => m.from === "user");
    const allText = userMessages.map(m => m.text.toLowerCase()).join(" ");

    const symptoms: string[] = [];
    const symptomKeywords = [
      "fever", "bukhar", "headache", "dard", "pain", "cough",
      "cold", "saans", "breathing", "chakkar", "dizziness", "nausea"
    ];

    symptomKeywords.forEach(keyword => {
      if (allText.includes(keyword)) {
        symptoms.push(keyword);
      }
    });

    if (symptoms.length >= 2) {
      const cluster: SymptomCluster = {
        id: "cluster-1",
        symptoms,
        severity: symptoms.length >= 4 ? "high" : symptoms.length >= 3 ? "medium" : "low",
        relatedConditions: ["Common Cold", "Flu", "Viral Infection"],
      };
      setSymptomClusters([cluster]);
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      from: "user",
      text,
      lang,
    };

    setMessages((prev) => [...prev, userMsg]);
    setTypingIndicator(true);

    setTimeout(() => {
      const hasCitations = /fever|diabetes|medicine|treatment/i.test(text);
      const followUp: ChatMessage = {
        id: `s-${Date.now()}`,
        from: "sakha",
        lang,
        text: "Samajh gaya. Main aapki baat dhyaan se sun raha hoon. Thodi aur jaankari dijiye—kab se, kitna, aur koi purani beemari?",
        tone: "calm",
        citations: hasCitations ? mockCitations : undefined,
      };
      setMessages((prev) => [...prev, followUp]);
      setTypingIndicator(false);
    }, 1500);

    setInput("");
  };

  const handleVoiceToggle = async () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (recording) {
      setRecording(false);
      setListeningText("");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "en" ? "en-IN" : "hi-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setListeningText(transcript);
    };

    recognition.onerror = () => {
      setRecording(false);
      setListeningText("");
    };

    recognition.onend = () => {
      setRecording(false);
      if (listeningText.trim()) {
        sendMessage(listeningText.trim());
        setListeningText("");
      }
    };

    setRecording(true);
    recognition.start();
  };

  const handleTextToSpeech = (text: string, messageId: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === "en" ? "en-IN" : "hi-IN";
    utter.onend = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };
    setIsSpeaking(true);
    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utter);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: UploadPreview["type"]) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const id = `${type}-${Date.now()}`;
    const preview: UploadPreview = {
      id,
      type,
      name: file.name,
      status: "ready",
      url: type === "pdf" ? undefined : URL.createObjectURL(file),
    };
    setUploads((prev) => [...prev, preview]);
  };

  const removeUpload = (id: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  const startVideoRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Video recording not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const preview: UploadPreview = {
          id: `video-${Date.now()}`,
          type: "video",
          name: "Recorded symptom video",
          url,
          durationSec: 15,
          status: "ready",
        };
        setUploads((prev) => [...prev, preview]);
        stream.getTracks().forEach((t) => t.stop());
        setCountdown(null);
      };
      recorder.start();
      setCountdown(15);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null) {
            clearInterval(interval);
            return prev;
          }
          if (prev <= 1) {
            recorder.stop();
            clearInterval(interval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      alert("Unable to access camera.");
    }
  };

  const toggleCitation = (messageId: string) => {
    setExpandedCitations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const toggleTipBookmark = (tipId: string) => {
    setProactiveTips(prev =>
      prev.map(tip =>
        tip.id === tipId ? { ...tip, bookmarked: !tip.bookmarked } : tip
      )
    );
  };

  const getBackgroundClass = () => {
    switch (emotionMode) {
      case "distress":
        return "bg-premium-warm";
      case "alert":
        return "bg-premium-warm";
      default:
        return "bg-premium-mixed";
    }
  };

  const getSessionDuration = () => {
    const diff = Date.now() - sessionData.startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes < 1 ? "Just started" : `${minutes} min`;
  };

  const quickActions = [
    { icon: Stethoscope, text: "Should I see a doctor?", type: "assessment" },
    { icon: Phone, text: "Emergency Call 108", type: "emergency" },
    { icon: MapPin, text: "Find nearby hospital", type: "location" },
  ];

  const getCategoryIcon = (category: ProactiveTip["category"]) => {
    switch (category) {
      case "diet": return "🥗";
      case "exercise": return "🏃";
      case "prevention": return "🛡️";
      case "mental_health": return "🧘";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background with Blurred Gradients */}
      <div className="fixed inset-0 -z-10">
        <div className={`absolute inset-0 ${getBackgroundClass()}`} />
        <div className="absolute inset-0" style={{ filter: "blur(60px)", opacity: 0.5 }}>
          <motion.div
            className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-300 to-teal-400"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500"
            animate={{
              x: [0, 50, 0],
              y: [0, -80, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Main Chat Container */}
      <motion.div
        className="relative mx-auto max-w-5xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          className="mb-6"
        >
          {/* AI Disclaimer */}
          <AnimatePresence>
            {showDisclaimer && (
              <motion.div
                initial={{ height: 0, opacity: 0, scale: 0.9 }}
                animate={{ height: "auto", opacity: 1, scale: 1 }}
                exit={{ height: 0, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glassmorphic-premium mb-4 overflow-hidden rounded-3xl"
              >
                <div className="flex items-center justify-between gap-3 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertCircle className="h-5 w-5 text-amber-400" />
                    </motion.div>
                    <p className="text-sm font-medium text-white/90 text-shadow-premium">
                      ⚕️ AI Assistant - Not a replacement for medical professionals. Emergency? Call 108
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setShowDisclaimer(false)}
                    className="text-white/70 transition-colors hover:text-white"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header Bar with Avatar */}
          <motion.div
            className="glassmorphic-premium rounded-[32px] px-6 py-5"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* AI Avatar */}
                <motion.div
                  className="relative h-14 w-14"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500/30" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500 shadow-lg shadow-emerald-500/50">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-white text-shadow-premium">
                    AI Sakha</ h1>
                  <p className="text-sm text-white/70">Your Health Companion</p>
                </div>
              </div>

              {/* Language Selector */}
              <motion.select
                className="glassmorphic-light rounded-full border-none px-4 py-2 text-sm font-medium text-white outline-none backdrop-blur-xl"
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <option value="hinglish" className="bg-gray-900">Hinglish</option>
                <option value="hi" className="bg-gray-900">हिन्दी</option>
                <option value="en" className="bg-gray-900">English</option>
              </motion.select>
            </div>
          </motion.div>

          {/* Session Memory Card */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4"
          >
            <motion.div
              className="glassmorphic-light cursor-pointer rounded-[28px] p-4"
              onClick={() => setSessionExpanded(!sessionExpanded)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white/70" />
                    <span className="text-sm font-medium text-white">{getSessionDuration()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-white/70" />
                    <span className="text-sm font-medium text-white">{sessionData.messageCount} messages</span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: sessionExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-white/70" />
                </motion.div>
              </div>
              <AnimatePresence>
                {sessionExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2 overflow-hidden border-t border-white/10 pt-4"
                  >
                    <p className="text-xs font-semibold text-white/90">Session Summary</p>
                    <p className="text-xs text-white/70">
                      Topics discussed: Health concerns, symptom assessment
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Chat Messages Area */}
        <div className="mb-6 flex gap-4">
          {/* Main Chat */}
          <div className="flex-1">
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((m, index) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: index === messages.length - 1 ? 0 : 0,
                    }}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[80%] items-end gap-3 ${m.from === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      <motion.div
                        className={`h-10 w-10 flex-shrink-0 rounded-full shadow-lg ${m.from === "user"
                          ? "bg-gradient-to-br from-blue-400 to-purple-500"
                          : "bg-gradient-to-br from-emerald-400 to-teal-500"
                          }`}
                        whileHover={{ scale: 1.1 }}
                        animate={m.from === "sakha" ? { rotate: [0, -5, 5, 0] } : {}}
                        transition={m.from === "sakha" ? { duration: 4, repeat: Infinity } : {}}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          {m.from === "user" ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                      </motion.div>

                      {/* Message Bubble */}
                      <div>
                        <motion.div
                          className={`glassmorphic-premium rounded-[28px] px-6 py-4 shadow-lg ${m.tone === "alert"
                            ? "border border-amber-400/40 bg-amber-500/10"
                            : ""
                            }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/95 text-shadow-premium">
                            {m.text}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-3">
                            <span className="text-xs text-white/50">
                              {m.lang === "hi" ? "हिन्दी" : m.lang === "en" ? "English" : "Hinglish"}
                            </span>
                            {m.from === "sakha" && (
                              <motion.button
                                onClick={() => handleTextToSpeech(m.text, m.id)}
                                className={`rounded-full p-1.5 transition-all ${speakingMessageId === m.id
                                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                                  : "hover:bg-white/10"
                                  }`}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {speakingMessageId === m.id ? (
                                  <div className="flex items-center gap-1">
                                    {[0, 1, 2].map((i) => (
                                      <motion.div
                                        key={i}
                                        className="h-3 w-0.5 rounded-full bg-white"
                                        animate={{ scaleY: [1, 1.5, 1] }}
                                        transition={{
                                          duration: 0.6,
                                          repeat: Infinity,
                                          delay: i * 0.1,
                                        }}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <Volume2 className="h-3.5 w-3.5 text-white/70" />
                                )}
                              </motion.button>
                            )}
                          </div>
                        </motion.div>

                        {/* Citations */}
                        {m.citations && m.citations.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2"
                          >
                            <motion.button
                              onClick={() => toggleCitation(m.id)}
                              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white/90 transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              <BookOpen className="h-3 w-3" />
                              {expandedCitations.has(m.id) ? "Hide" : "View"} sources ({m.citations.length})
                            </motion.button>
                            <AnimatePresence>
                              {expandedCitations.has(m.id) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="mt-2 space-y-2 overflow-hidden"
                                >
                                  {m.citations.map((cite, idx) => (
                                    <motion.a
                                      key={cite.id}
                                      href={cite.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="glassmorphic-light flex items-start gap-2 rounded-2xl p-3"
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ delay: idx * 0.1 }}
                                      whileHover={{ x: 4, scale: 1.02 }}
                                    >
                                      <ExternalLink className="h-3 w-3 flex-shrink-0 text-emerald-400" />
                                      <div>
                                        <p className="text-xs font-medium text-white">{cite.title}</p>
                                        <p className="text-xs text-white/60">{cite.source}</p>
                                      </div>
                                    </motion.a>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {typingIndicator && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="glassmorphic-premium rounded-[28px] px-6 py-4">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="h-2 w-2 rounded-full bg-emerald-400"
                              animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Symptom Clusters */}
              <AnimatePresence>
                {symptomClusters.map((cluster) => (
                  <motion.div
                    key={cluster.id}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glassmorphic-premium floating-card-premium rounded-[28px] p-6"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-full bg-emerald-500/20 p-2">
                        <Activity className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">Symptom Cluster Detected</h3>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${cluster.severity === "high"
                        ? "bg-red-500/20 text-red-300"
                        : cluster.severity === "medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-green-500/20 text-green-300"
                        }`}>
                        {cluster.severity} severity
                      </span>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {cluster.symptoms.map((symptom, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="glassmorphic-light rounded-full px-4 py-2 text-xs font-medium text-white"
                        >
                          {symptom}
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-xs text-white/70">
                      Possibly related to: {cluster.relatedConditions.join(", ")}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glassmorphic-premium floating-card-premium rounded-[28px] p-5"
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/70">
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-3">
                  {quickActions.map((qa, index) => {
                    const Icon = qa.icon;
                    return (
                      <motion.button
                        key={qa.text}
                        className={`flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium shadow-lg transition-all ${qa.type === "emergency"
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/50"
                          : "glassmorphic-light text-white hover:bg-white/20"
                          }`}
                        onClick={() => sendMessage(qa.text)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="h-4 w-4" />
                        {qa.text}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div ref={chatEndRef} />
          </div>

          {/* Proactive Tips Sidebar - Desktop Only */}
          <motion.aside
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="hidden w-80 flex-col gap-3 lg:flex"
          >
            <div className="glassmorphic-premium rounded-[28px] p-5">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Health Tips</h3>
              </div>
              <div className="space-y-3">
                {proactiveTips.map((tip, index) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="glassmorphic-light floating-card-premium animate-float-ambient rounded-2xl p-4"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(tip.category)}</span>
                        <h4 className="text-xs font-semibold text-white">{tip.title}</h4>
                      </div>
                      <motion.button
                        onClick={() => toggleTipBookmark(tip.id)}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark
                          className={`h-4 w-4 transition-colors ${tip.bookmarked
                            ? "fill-amber-400 text-amber-400"
                            : "text-white/40 hover:text-white/70"
                            }`}
                        />
                      </motion.button>
                    </div>
                    <p className="text-xs leading-relaxed text-white/70">{tip.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Input Section - Fixed at Bottom */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="glassmorphic-premium sticky bottom-4 rounded-[32px] p-4"
        >
          <AnimatePresence>
            {listeningText && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-3 flex items-center gap-3 overflow-hidden rounded-2xl bg-emerald-500/20 px-4 py-3"
              >
                <motion.div
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Mic className="h-4 w-4 text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">Listening…</p>
                  <p className="line-clamp-1 text-xs text-white/70">{listeningText}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-3">
            {/* Main Input */}
            <div className="flex-1">
              <textarea
                rows={2}
                className="w-full resize-none rounded-3xl border-none bg-white/10 px-6 py-4 text-sm text-white placeholder-white/40 outline-none backdrop-blur-xl transition-all focus:bg-white/15 focus:ring-2 focus:ring-emerald-400/50"
                placeholder="Type in Hindi, English or Hinglish…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
              />
              <div className="mt-2 flex items-center justify-between px-2">
                {/* Attachment Buttons */}
                <div className="flex items-center gap-2">
                  <motion.label
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ImageIcon className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "image")}
                    />
                  </motion.label>
                  <motion.button
                    onClick={startVideoRecording}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Video className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Voice and Send Buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleVoiceToggle}
                    className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all ${recording
                      ? "bg-red-500 shadow-red-500/50"
                      : "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/50"
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={
                      recording
                        ? {
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(239, 68, 68, 0.7)",
                            "0 0 0 20px rgba(239, 68, 68, 0)",
                          ],
                        }
                        : {}
                    }
                    transition={{ duration: 1.2, repeat: recording ? Infinity : 0 }}
                  >
                    <Mic className="h-5 w-5 text-white" />
                  </motion.button>
                  <motion.button
                    onClick={() => sendMessage(input)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/50"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      boxShadow: [
                        "0 10px 30px rgba(16, 185, 129, 0.5)",
                        "0 15px 40px rgba(16, 185, 129, 0.7)",
                        "0 10px 30px rgba(16, 185, 129, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Send className="h-5 w-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-2 px-2 text-center text-[10px] text-white/40">
            ⚕️ AI is not a doctor. This demo never sends data to a server.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
