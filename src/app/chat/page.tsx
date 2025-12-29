"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  Mic,
  PauseCircle,
  Send,
  SmilePlus,
  Video,
  Volume2,
  Sparkles,
} from "lucide-react";

type Lang = "hi" | "en" | "hinglish";

type ChatMessage = {
  id: string;
  from: "user" | "sakha";
  text: string;
  lang: Lang;
  tone?: "calm" | "alert";
  clusterId?: string;
};

type UploadPreview = {
  id: string;
  type: "image" | "video" | "pdf";
  name: string;
  url?: string;
  durationSec?: number;
  status: "ready" | "uploading" | "done" | "error";
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

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockResponses);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<Lang>("hinglish");
  const [recording, setRecording] = useState(false);
  const [listeningText, setListeningText] = useState("");
  const [uploads, setUploads] = useState<UploadPreview[]>([]);
  const [calmMode, setCalmMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    const hasDistress = messages.some(
      (m) =>
        m.from === "user" &&
        /bahut|zyada|dard|saans|chakkar|panic/i.test(m.text)
    );
    setCalmMode(hasDistress);
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      from: "user",
      text,
      lang,
    };
    const followUp: ChatMessage = {
      id: `s-${Date.now()}`,
      from: "sakha",
      lang,
      text: "Samajh gaya. Main aapki baat dhyaan se sun raha hoon. Thodi aur jaankari dijiye—kab se, kitna, aur koi purani beemari?",
      tone: "calm",
    };
    setMessages((prev) => [...prev, userMsg, followUp]);
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

  const handleTextToSpeech = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === "en" ? "en-IN" : "hi-IN";
    utter.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
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

  const quickActions = [
    "Bukhar kitne din se hai?",
    "Saans lene mein dikkat hai?",
    "Kya aapko diabetes ya BP hai?",
  ];

  return (
    <motion.div
      className={`flex flex-1 flex-col overflow-hidden rounded-3xl border ${
        calmMode
          ? "border-emerald-300/80 bg-gradient-to-b from-emerald-50 via-white to-emerald-50"
          : "border-emerald-200/80 bg-gradient-to-b from-white via-emerald-50/30 to-white"
      } shadow-2xl`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="flex items-center justify-between gap-4 border-b border-emerald-200/60 bg-white/80 px-6 py-4 backdrop-blur-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <motion.p
            className="text-xs font-semibold uppercase tracking-wider text-emerald-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Chat with Sakha
          </motion.p>
          <p className="text-base font-bold text-emerald-950">
            Calm, simple health support
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.select
            className="rounded-full border border-emerald-300/60 bg-emerald-50/80 px-3 py-2 text-xs font-medium text-emerald-900 outline-none transition-all hover:bg-emerald-100"
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <option value="hinglish">Hinglish</option>
            <option value="hi">हिन्दी</option>
            <option value="en">English</option>
          </motion.select>
          <motion.span
            className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-800"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.4)",
                "0 0 0 4px rgba(16, 185, 129, 0)",
                "0 0 0 0 rgba(16, 185, 129, 0.4)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Auto-detect ON
          </motion.span>
        </div>
      </motion.header>

      {/* Messages Area */}
      <section className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        <motion.p
          className="mx-auto w-fit rounded-full bg-emerald-100 px-4 py-2 text-xs font-medium text-emerald-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ⚠️ This is a demo. In emergency call 108 / 102.
        </motion.p>

        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20, x: m.from === "user" ? 20 : -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index === messages.length - 1 ? 0.1 : 0,
                }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <motion.div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                    m.from === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                      : m.tone === "alert"
                      ? "bg-amber-50 text-amber-900 border-2 border-amber-300"
                      : "bg-white text-emerald-950 border border-emerald-200/60"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {m.text}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs opacity-70">
                    <span className="font-medium">{m.from === "user" ? "You" : "Sakha"}</span>
                    <span>{m.lang === "hi" ? "हिन्दी" : m.lang === "en" ? "English" : "Hinglish"}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="mb-3 text-xs font-semibold text-emerald-800">Quick follow-ups</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((qa, index) => (
              <motion.button
                key={qa}
                className="rounded-full bg-white px-4 py-2 text-xs font-medium text-emerald-800 shadow-sm transition-all hover:bg-emerald-100 hover:shadow-md"
                onClick={() => sendMessage(qa)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {qa}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Uploads */}
        <AnimatePresence>
          {uploads.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-2xl border border-emerald-200/60 bg-white/80 p-4 backdrop-blur-sm"
            >
              <p className="mb-3 text-xs font-semibold text-emerald-800">Attachments</p>
              <div className="flex gap-3 overflow-x-auto">
                {uploads.map((u) => (
                  <motion.div
                    key={u.id}
                    className="relative min-w-[160px] rounded-xl border border-emerald-200/60 bg-white p-3 shadow-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="mb-2 flex items-center gap-2 text-emerald-800">
                      {u.type === "image" && <ImageIcon className="h-4 w-4 text-emerald-500" />}
                      {u.type === "video" && <Video className="h-4 w-4 text-emerald-500" />}
                      {u.type === "pdf" && <FileText className="h-4 w-4 text-emerald-500" />}
                      <span className="truncate text-xs font-medium">{u.name}</span>
                    </div>
                    {u.url && u.type === "image" && (
                      <img
                        src={u.url}
                        alt=""
                        className="mb-2 h-24 w-full rounded-lg object-cover"
                      />
                    )}
                    {u.type === "video" && (
                      <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-emerald-100 text-xs text-emerald-700">
                        Video preview
                      </div>
                    )}
                    <button
                      onClick={() => removeUpload(u.id)}
                      className="w-full rounded-lg bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 transition-colors hover:bg-emerald-200"
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={chatEndRef} />
      </section>

      {/* Input Area */}
      <motion.footer
        className="space-y-3 border-t border-emerald-200/60 bg-white/80 px-6 py-4 backdrop-blur-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between rounded-xl bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-900"
            >
              <span>🎥 Recording video… {countdown}s</span>
              <PauseCircle className="h-5 w-5" />
            </motion.div>
          )}

          {listeningText && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 rounded-xl border border-emerald-300/60 bg-emerald-50 px-4 py-3"
            >
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Mic className="h-4 w-4" />
              </motion.div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-emerald-900">Listening…</p>
                <p className="line-clamp-1 text-xs text-emerald-700">{listeningText}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-3">
          <motion.div
            className="flex flex-1 flex-col gap-2 rounded-2xl border border-emerald-200/60 bg-white px-4 py-3 shadow-sm"
            whileFocus={{ borderColor: "rgba(16, 185, 129, 0.5)" }}
          >
            <textarea
              rows={2}
              className="w-full resize-none bg-transparent text-sm text-emerald-950 outline-none placeholder:text-emerald-400"
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.label
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors hover:bg-emerald-200"
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors hover:bg-emerald-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Video className="h-4 w-4" />
                </motion.button>
                <motion.label
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors hover:bg-emerald-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FileText className="h-4 w-4" />
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "pdf")}
                  />
                </motion.label>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleVoiceToggle}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${
                    recording
                      ? "bg-red-500 shadow-lg shadow-red-500/50"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-400/50"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    recording
                      ? {
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(239, 68, 68, 0.4)",
                            "0 0 0 10px rgba(239, 68, 68, 0)",
                            "0 0 0 0 rgba(239, 68, 68, 0.4)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Mic className="h-5 w-5" />
                </motion.button>
                <motion.button
                  onClick={() =>
                    handleTextToSpeech(
                      "Yeh demo version hai. Main aapko sirf general jaankari de sakta hoon."
                    )
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-all ${
                    isSpeaking ? "ring-2 ring-emerald-400 ring-offset-2" : ""
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isSpeaking ? (
                    <PauseCircle className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </motion.button>
                <motion.button
                  onClick={() => sendMessage(input)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-400/50"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(16, 185, 129, 0.4)",
                      "0 15px 40px rgba(16, 185, 129, 0.6)",
                      "0 10px 30px rgba(16, 185, 129, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
          <motion.button
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200/60 bg-white text-emerald-700 shadow-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <SmilePlus className="h-5 w-5" />
          </motion.button>
        </div>

        <p className="text-[10px] text-emerald-600/70">
          ⚕️ AI is not a doctor. This demo never sends data to a server.
        </p>
      </motion.footer>
    </motion.div>
  );
}
