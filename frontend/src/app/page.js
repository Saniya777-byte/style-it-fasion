"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Users,
  ChevronDown,
  FileCheck,
  Zap,
  Check,
  Download,
  Play,
  ListTodo,
  FileText,
  AlertTriangle,
  Lock,
  Sparkles,
  Search,
  Eye,
  ArrowUpRight,
  Sun,
  Moon,
  UploadCloud,
  FileWarning,
  Activity,
  Layers,
  Settings,
  ArrowRightLeft
} from "lucide-react";
import { ROUTES } from "../constants";
import { cn } from "../utils/cn";

// Framer motion variants for smooth page entrance
const pageReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

// Animated count-up hook/component for metrics
function AnimatedCountUp({ value, duration = 1.2, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    const totalMiliseconds = duration * 1000;
    const incrementTime = 16; 
    const totalSteps = totalMiliseconds / incrementTime;
    const stepValue = end / totalSteps;

    let timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span className="tabular-nums">{count}{suffix}</span>;
}

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState("overview");

  // Sync theme status
  useEffect(() => {
    if (typeof document !== "undefined") {
      setDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (typeof document !== "undefined") {
      if (newDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const workflowSteps = [
    {
      id: "upload",
      title: "Meeting Recording",
      desc: "Secure voice and video channel ingestion",
      icon: UploadCloud,
      color: "text-amber-500 bg-amber-500/5 border-amber-500/20"
    },
    {
      id: "processing",
      title: "AI Processing",
      desc: "99% diarized transcription & word cleanup",
      icon: Cpu,
      color: "text-indigo-500 bg-indigo-500/5 border-indigo-500/20"
    },
    {
      id: "compliance",
      title: "Compliance Analysis",
      desc: "Real-time GDPR, HIPAA & SOC 2 audit scans",
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-500/5 border-emerald-500/20"
    },
    {
      id: "report",
      title: "Executive Report",
      desc: "Automated executive summary & action lists",
      icon: FileText,
      color: "text-sky-500 bg-sky-500/5 border-sky-500/20"
    },
    {
      id: "insights",
      title: "Speaker Insights",
      desc: "Pacing metrics & communication distribution",
      icon: Users,
      color: "text-purple-500 bg-purple-500/5 border-purple-500/20"
    },
    {
      id: "download",
      title: "Certified Download",
      desc: "Export verified PDF or structured JSON files",
      icon: Download,
      color: "text-teal-500 bg-teal-500/5 border-teal-500/20"
    }
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Regulatory Guardrails",
      description: "Perform real-time scanning of dialogue structures against global compliance criteria including GDPR, HIPAA, SOC 2, and ISO 27001 to flag vulnerabilities immediately."
    },
    {
      icon: Cpu,
      title: "Enterprise Transcription",
      description: "Harness localized Whisper models to resolve multi-speaker overlap, isolate acoustic noise, and generate high-fidelity, speaker-separated texts."
    },
    {
      icon: ListTodo,
      title: "Action-Item Harvesting",
      description: "Extract context-aware deadlines, task owners, and core deliverables directly from conversations using context-informed deep learning models."
    },
    {
      icon: Users,
      title: "Dynamics & Sentiment",
      description: "Access detailed insights on speaker distribution, vocal volume variance, and conversational pacing to drive internal alignment and engagement."
    }
  ];

  const faqs = [
    {
      q: "How does Veritas AI identify compliance violations?",
      a: "Our compliance engine compares speech structures and keywords against standard templates (like GDPR Chapter 5, SOC 2 Common Criteria, and custom HR guidelines). The natural language processing models isolate risky statements—such as sharing unencrypted database details or granting access rights—and label them with precise clauses and recommendations."
    },
    {
      q: "Can we configure custom compliance frameworks?",
      a: "Yes. Enterprise teams can upload proprietary internal protocols, corporate values, or local labor contracts. Veritas translates these documents into custom audit guidelines that run automatically alongside our global legal templates."
    },
    {
      q: "What data security measures are in place?",
      a: "All conversation files are encrypted in transit using TLS 1.3 and at rest with AES-256. Veritas offers local region hosting (EU and US boundaries) to satisfy local data residency rules. We run a strict zero-retention policy—your data is processed, audited, and returned to you without being stored on our models."
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageReveal}
      className="flex-1 bg-stone-125 dark:bg-stone-950 font-sans min-h-screen text-stone-900 dark:text-stone-100 flex flex-col selection:bg-teal-500/10 selection:text-teal-900 dark:selection:bg-teal-400/20 dark:selection:text-teal-300 transition-colors duration-300"
    >
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern mask-linear-fade pointer-events-none z-0 h-[1000px]" />
      
      {/* Ambient decorative glowing blobs */}
      <div className="absolute top-[8%] left-[8%] w-[500px] h-[500px] rounded-full bg-teal-500/5 dark:bg-teal-500/[0.015] blur-[120px] pointer-events-none animate-slow-pulse" />
      <div className="absolute top-[25%] right-[10%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/[0.015] blur-[100px] pointer-events-none animate-slow-pulse" style={{ animationDelay: "2s" }} />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 h-20 bg-stone-125/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200/40 dark:border-stone-875/40 z-50 px-8 lg:px-16 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-lg bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 font-black text-[17px] shadow-sm tracking-tighter cursor-pointer"
          >
            V
          </motion.div>
          <span className="font-extrabold text-stone-900 dark:text-stone-100 tracking-tight text-[18px]">
            Veritas <span className="text-teal-650 dark:text-teal-400 font-semibold">AI</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 text-[14px] font-semibold text-stone-500 dark:text-stone-400">
          <a href="#pipeline" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">AI Pipeline</a>
          <a href="#preview" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Dashboard Preview</a>
          <a href="#features" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Enterprise Benefits</a>
          <a href="#faq" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-825/60 hover:bg-stone-225/50 dark:hover:bg-stone-900 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          
          <Link 
            href={ROUTES.LOGIN} 
            className="text-[14px] font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors px-4 py-2 hidden sm:block"
          >
            Sign In
          </Link>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href={ROUTES.REGISTER} 
              className="text-[14px] font-bold bg-stone-900 hover:bg-stone-825 text-white dark:bg-stone-100 dark:hover:bg-stone-225 dark:text-stone-900 px-5.5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap block"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-28 px-8 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Top Announcement Badge */}
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible" 
          custom={0}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-stone-200/80 bg-white/70 dark:border-stone-825/80 dark:bg-stone-900/60 text-stone-600 dark:text-stone-300 text-[12px] font-semibold tracking-tight mb-10 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span><span className="font-bold text-teal-650 dark:text-teal-400">Veritas v2.0:</span> Custom Auditing Frameworks Live</span>
        </motion.div>

        {/* Main Title - Increased Font Size */}
        <motion.h1 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible" 
          custom={1}
          className="text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] lg:leading-[1.04] font-extrabold tracking-tight text-stone-900 dark:text-stone-50 max-w-5xl"
        >
          Automate regulatory compliance for <span className="text-teal-650 dark:text-teal-400">every corporate meeting</span>.
        </motion.h1>

        {/* 1-2 Sentence Subtitle - Increased size and readability */}
        <motion.p 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible" 
          custom={2}
          className="text-stone-550 dark:text-stone-400 text-lg sm:text-xl lg:text-[1.32rem] max-w-4xl mt-8 leading-relaxed font-normal"
        >
          Transcribe conversations with enterprise-grade accuracy, instantly audit content for GDPR & SOC 2 exposure, and generate certified executive reports automatically.
        </motion.p>

        {/* Hero CTAs - Spacing and Interaction */}
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible" 
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full sm:w-auto"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link 
              href={ROUTES.REGISTER} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-stone-900 hover:bg-stone-825 text-white dark:bg-stone-100 dark:hover:bg-stone-225 dark:text-stone-900 font-bold text-[15px] shadow-lg hover:shadow-xl transition-all"
            >
              Start Auditing Free <ArrowRight size={16} />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <a 
              href="#preview" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/30 text-stone-600 dark:text-stone-300 hover:bg-stone-175 dark:hover:bg-stone-900 hover:text-stone-900 dark:hover:text-stone-100 font-bold text-[15px] transition-all"
            >
              Explore Interactive Demo
            </a>
          </motion.div>
        </motion.div>

        {/* Pipeline / Story Flow Visualization */}
        <motion.div 
          id="pipeline"
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible" 
          custom={4}
          className="w-full mt-28 border-t border-stone-200/50 dark:border-stone-875/50 pt-14 scroll-mt-24"
        >
          <div className="text-[12px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-8">
            The Veritas Compliance Pipeline
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5 max-w-7xl mx-auto text-left">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl border border-stone-200/70 dark:border-stone-875/70 bg-white/50 dark:bg-stone-925/50 flex flex-col justify-between min-h-[160px] group hover:border-teal-500/40 dark:hover:border-teal-400/40 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border", step.color)}>
                    <Icon size={18} />
                  </div>
                  <div className="mt-4">
                    <div className="text-[11px] font-bold text-stone-400 dark:text-stone-550 tabular-nums">STEP 0{idx + 1}</div>
                    <div className="text-[14px] font-extrabold text-stone-850 dark:text-stone-150 mt-1 leading-snug">{step.title}</div>
                    <div className="text-[12px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">{step.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </section>

      {/* Interactive Product Preview (Replacing Pricing) */}
      <section id="preview" className="py-32 lg:py-40 bg-stone-175/40 dark:bg-stone-925/20 border-y border-stone-200/40 dark:border-stone-875/40 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              Interactive Dashboard Showcase
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
              Explore how our platform processes audio, labels compliance risks, and visualizes talk metrics. Click the tabs below to inspect each view.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 w-full items-stretch">
            {/* Sidebar Tabs */}
            <aside className="w-full lg:w-72 flex-shrink-0 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 border-stone-200/60 dark:border-stone-875/60">
              {[
                { id: "overview", label: "Executive Dashboard", icon: Layers, desc: "Global compliance telemetry" },
                { id: "compliance", label: "Compliance Log", icon: ShieldCheck, desc: "Detailed risk detection & alerts" },
                { id: "summary", label: "Report Summaries", icon: FileText, desc: "AI actions and key decisions" },
                { id: "speakers", label: "Speaker Dynamics", icon: Users, desc: "Talk time and sentiment" }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activePreviewTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActivePreviewTab(tab.id)}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    className={cn(
                      "flex-1 lg:flex-initial flex flex-col items-start px-5 py-4 rounded-xl border text-left transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal min-w-[180px] lg:min-w-0",
                      isActive
                        ? "bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 shadow-md ring-1 ring-stone-900/5 dark:ring-white/5"
                        : "border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className={isActive ? "text-teal-650 dark:text-teal-400" : "text-stone-400"} />
                      <span className="text-[14.5px] font-extrabold tracking-tight">{tab.label}</span>
                    </div>
                    <span className="hidden lg:block text-[12px] text-stone-400 dark:text-stone-550 mt-1.5 leading-relaxed">
                      {tab.desc}
                    </span>
                  </motion.button>
                );
              })}
            </aside>

            {/* Application Mockup Window */}
            <motion.div 
              layout
              className="flex-1 rounded-2xl border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xl overflow-hidden flex flex-col min-h-[520px] transition-colors duration-300"
            >
              
              {/* Window Header / Chrome */}
              <div className="bg-stone-125 dark:bg-stone-925/80 px-5 py-4 border-b border-stone-200/60 dark:border-stone-875/60 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="text-[12px] font-mono text-stone-450 dark:text-stone-500 flex items-center gap-1.5">
                  <Lock size={12} className="text-stone-400" /> veritas-preview-sandbox
                </div>
                <div className="w-16 h-2" />
              </div>

              {/* Window Body (Content changes based on active tab) */}
              <div className="flex-1 p-8 sm:p-10 flex flex-col overflow-y-auto">
                <AnimatePresence mode="wait">
                  
                  {activePreviewTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-8 flex-1 flex flex-col justify-between"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100 dark:border-stone-800/60">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-650 dark:text-teal-400">Enterprise Sandbox</span>
                          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">Q3 Strategy & Data Audits</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450 border border-emerald-200/50 dark:border-emerald-900/30 flex items-center gap-1.5">
                            <Check size={12} /> Certified Audit
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="p-5 rounded-xl border border-stone-200/50 dark:border-stone-800 bg-stone-125/40 dark:bg-stone-950/20 flex flex-col gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-550">Compliance Score</span>
                          <span className="text-3xl font-black text-teal-650 dark:text-teal-400 tabular-nums">
                            <AnimatedCountUp value="94.2" suffix="%" />
                          </span>
                          <span className="text-[12px] text-stone-455 dark:text-stone-500 leading-normal">Within target safety boundaries</span>
                        </div>
                        <div className="p-5 rounded-xl border border-stone-200/50 dark:border-stone-800 bg-stone-125/40 dark:bg-stone-950/20 flex flex-col gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-550">Risk Telemetry</span>
                          <span className="text-3xl font-black text-red-500 dark:text-red-400 tabular-nums">
                            <AnimatedCountUp value="2" suffix=" Flagged" />
                          </span>
                          <span className="text-[12px] text-stone-455 dark:text-stone-500 leading-normal">GDPR Section 4 & SOC 2 Access</span>
                        </div>
                        <div className="p-5 rounded-xl border border-stone-200/50 dark:border-stone-800 bg-stone-125/40 dark:bg-stone-950/20 flex flex-col gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-550">Transcribed Time</span>
                          <span className="text-3xl font-black text-stone-800 dark:text-stone-200 tabular-nums">42m 18s</span>
                          <span className="text-[12px] text-stone-455 dark:text-stone-500 leading-normal">Whisper High-Fidelity audio</span>
                        </div>
                      </div>

                      <div className="border border-stone-200/60 dark:border-stone-800/80 rounded-xl overflow-hidden mt-4 bg-stone-125/20 dark:bg-stone-950/10">
                        <div className="bg-stone-125 dark:bg-stone-925/60 px-5 py-3 border-b border-stone-200/60 dark:border-stone-800/80 text-[12px] font-bold text-stone-400 dark:text-stone-500">
                          Active Auditing Sessions
                        </div>
                        <div className="p-5 divide-y divide-stone-100 dark:divide-stone-800 text-[13px]">
                          <div className="py-3 flex items-center justify-between first:pt-0">
                            <span className="font-bold text-stone-850 dark:text-stone-250">Engineering Architecture Review</span>
                            <div className="flex items-center gap-4">
                              <span className="text-[12px] text-stone-400">July 12 • 14:02</span>
                              <span className="px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/20 text-[11px] font-bold">SOC 2 Checked</span>
                            </div>
                          </div>
                          <div className="py-3 flex items-center justify-between">
                            <span className="font-bold text-stone-850 dark:text-stone-250">Vendor Onboarding & Data Access</span>
                            <div className="flex items-center gap-4">
                              <span className="text-[12px] text-stone-400">July 11 • 11:45</span>
                              <span className="px-2.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-450 border border-amber-100 dark:border-amber-900/20 text-[11px] font-bold">GDPR Warning</span>
                            </div>
                          </div>
                          <div className="py-3 flex items-center justify-between last:pb-0">
                            <span className="font-bold text-stone-850 dark:text-stone-250">Product Roadmapping Session</span>
                            <div className="flex items-center gap-4">
                              <span className="text-[12px] text-stone-400">July 10 • 16:30</span>
                              <span className="px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/20 text-[11px] font-bold">Certified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activePreviewTab === "compliance" && (
                    <motion.div
                      key="compliance"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/60">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-red-500">Risk Log</span>
                          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">Automated Compliance Findings</h3>
                        </div>
                        <span className="text-xs text-stone-450 dark:text-stone-500">Active template: GDPR + SOC 2 Type II</span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-5 rounded-xl border border-red-200/50 dark:border-red-950/40 bg-red-50/10 dark:bg-red-950/10 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="text-red-500 dark:text-red-400" size={16} />
                              <span className="text-sm font-bold text-stone-805 dark:text-stone-200">Critical GDPR Risk (Clause 4.2)</span>
                            </div>
                            <span className="text-[11px] font-bold bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 px-3 py-1 rounded">High Severity</span>
                          </div>
                          <p className="text-[12.5px] text-stone-500 dark:text-stone-400 leading-relaxed font-mono italic bg-white dark:bg-stone-925 p-3 rounded border border-stone-200/30 dark:border-stone-800/30">
                            "...So we decided to just send customer database backups to our external support vendor via standard Slack channels..."
                          </p>
                          <p className="text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed">
                            <strong className="text-[11px] font-bold uppercase text-red-600 dark:text-red-400">Recommendation:</strong> Transmission of customer PII via unencrypted channels violates cross-border protocols. Migrate payload transmission to AWS S3 private presigned links with TLS 1.3 enforced.
                          </p>
                        </div>

                        <div className="p-5 rounded-xl border border-amber-200/50 dark:border-amber-950/40 bg-amber-50/10 dark:bg-amber-950/10 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="text-amber-600 dark:text-amber-400" size={16} />
                              <span className="text-sm font-bold text-stone-805 dark:text-stone-200">Medium SOC 2 Risk (CC6.3)</span>
                            </div>
                            <span className="text-[11px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-3 py-1 rounded">Medium Severity</span>
                          </div>
                          <p className="text-[12.5px] text-stone-500 dark:text-stone-400 leading-relaxed font-mono italic bg-white dark:bg-stone-925 p-3 rounded border border-stone-200/30 dark:border-stone-800/30">
                            "...We'll just give Dave root credentials temporarily until the sprint ends..."
                          </p>
                          <p className="text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed">
                            <strong className="text-[11px] font-bold uppercase text-amber-600 dark:text-amber-400">Recommendation:</strong> Sharing administrative root accounts compromises non-repudiation. Generate a dedicated IAM role with standard session limits and automatic token expiration.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activePreviewTab === "summary" && (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/60">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-650 dark:text-teal-400">Executive Report</span>
                          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">Audit Summary & Action Items</h3>
                        </div>
                        <span className="text-[12px] text-stone-400">Verified by Veritas AI</span>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <h4 className="text-[13.5px] font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-2">
                            <FileText size={15} className="text-teal-650 dark:text-teal-400" /> Executive Summary
                          </h4>
                          <p className="text-[14px] text-stone-550 dark:text-stone-350 leading-relaxed">
                            The committee established the timeline for the database replication. Discussion covered secure storage limits and access credentials for remote contractors. Highlighted GDPR violations S3 backups, and approved immediate implementation of AWS KMS keys.
                          </p>
                        </div>

                        <div className="border border-stone-200/60 dark:border-stone-800 rounded-xl overflow-hidden mt-4 shadow-sm">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-stone-125 dark:bg-stone-825/55 border-b border-stone-200/60 dark:border-stone-800 text-stone-400 dark:text-stone-550 font-bold text-[11px] uppercase tracking-wider">
                                <th className="p-4 pl-5">Task Action</th>
                                <th className="p-4">Assignee</th>
                                <th className="p-4">Due Date</th>
                                <th className="p-4 pr-5">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 text-[13px] text-stone-600 dark:text-stone-300">
                              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-950/20">
                                <td className="p-4 pl-5 font-semibold text-stone-855 dark:text-stone-200">KMS key encryption audit</td>
                                <td className="p-4">Sarah K. (CTO)</td>
                                <td className="p-4">Aug 1, 2026</td>
                                <td className="p-4 pr-5"><span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 font-bold text-[10px] uppercase">Completed</span></td>
                              </tr>
                              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-950/20">
                                <td className="p-4 pl-5 font-semibold text-stone-855 dark:text-stone-200">Reconfigure contractor IAM policies</td>
                                <td className="p-4">John D. (VP Infra)</td>
                                <td className="p-4">Aug 5, 2026</td>
                                <td className="p-4 pr-5"><span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-450 font-bold text-[10px] uppercase">Pending</span></td>
                              </tr>
                              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-950/20">
                                <td className="p-4 pl-5 font-semibold text-stone-855 dark:text-stone-200">Setup secure SFTP gateway</td>
                                <td className="p-4">Dave M. (Partner)</td>
                                <td className="p-4">Aug 12, 2026</td>
                                <td className="p-4 pr-5"><span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-450 font-bold text-[10px] uppercase">Pending</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activePreviewTab === "speakers" && (
                    <motion.div
                      key="speakers"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/60">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Speaker Dynamics</span>
                          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">Talk Distribution & Tone Metrics</h3>
                        </div>
                        <span className="text-xs text-stone-450 dark:text-stone-500">4 Speakers Recognized</span>
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-4.5">
                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                              <span className="font-bold text-stone-800 dark:text-stone-200">Sarah K. (CTO)</span>
                              <span className="text-stone-450 font-semibold">45% • 135 WPM • Positive Tone</span>
                            </div>
                            <div className="h-2.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "45%" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full bg-teal-650 dark:bg-teal-400 rounded-full" 
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                              <span className="font-bold text-stone-800 dark:text-stone-200">John D. (VP Infrastructure)</span>
                              <span className="text-stone-450 font-semibold">30% • 120 WPM • Neutral Tone</span>
                            </div>
                            <div className="h-2.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "30%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                                className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full" 
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                              <span className="font-bold text-stone-800 dark:text-stone-200">Dave M. (Contractor)</span>
                              <span className="text-stone-450 font-semibold">15% • 145 WPM • Hesitant Tone</span>
                            </div>
                            <div className="h-2.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "15%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                                className="h-full bg-amber-500 dark:bg-amber-450 rounded-full" 
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                              <span className="font-bold text-stone-800 dark:text-stone-200">External Vendor Representative</span>
                              <span className="text-stone-450 font-semibold">10% • 110 WPM • Positive Tone</span>
                            </div>
                            <div className="h-2.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "10%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
                                className="h-full bg-purple-500 dark:bg-purple-400 rounded-full" 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-stone-200/55 dark:border-stone-800 bg-stone-125/40 dark:bg-stone-950/20 text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed mt-4">
                          <strong className="text-stone-850 dark:text-stone-200 font-bold block mb-1">Conversational Insights:</strong>
                          Talk balance shows collaborative distribution, but key decisions were driven predominantly by Sarah and John. Dave displayed communication pacing spikes during credential queries, which aligns with flagged security risks.
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section id="pipeline" className="py-32 lg:py-40 bg-white dark:bg-stone-900 border-b border-stone-200/40 dark:border-stone-875/40 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              The Connected Audit Workflow
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
              How Veritas ingests raw meetings and constructs certified regulatory assets.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-stone-200/60 dark:bg-stone-800/80 -translate-y-1/2 z-0" />
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10"
            >
              {[
                {
                  step: "01",
                  title: "Secure Ingestion",
                  desc: "Drag & drop audio or video files directly into our encrypted pipeline.",
                  icon: UploadCloud,
                  badge: "S3 Secure"
                },
                {
                  step: "02",
                  title: "AI Diarization",
                  desc: "Generate speaker-separated texts with Whisper high-fidelity processing.",
                  icon: Cpu,
                  badge: "Diarization"
                },
                {
                  step: "03",
                  title: "Compliance Audit",
                  desc: "Scan conversation paths against SOC 2, GDPR, and HIPAA rules.",
                  icon: ShieldCheck,
                  badge: "Audit Scanning"
                },
                {
                  step: "04",
                  title: "Report Assembly",
                  desc: "Assemble context summaries, core decisions, and task deadlines.",
                  icon: FileText,
                  badge: "Executive Summaries"
                },
                {
                  step: "05",
                  title: "Speaker Insights",
                  desc: "Inspect vocal dynamics, distribution logs, and dialogue sentiment.",
                  icon: Users,
                  badge: "Speaker Dynamics"
                }
              ].map((w, idx) => {
                const Icon = w.icon;
                return (
                  <motion.div 
                    key={w.step}
                    variants={fadeInUp}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="p-6.5 rounded-2xl border border-stone-200 dark:border-stone-800/85 bg-stone-125/40 dark:bg-stone-950/20 flex flex-col items-start gap-5 hover:border-teal-500/30 dark:hover:border-teal-400/30 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-bold text-teal-650 dark:text-teal-400 font-mono tracking-wider bg-teal-50 dark:bg-teal-950/40 px-2.5 py-0.5 rounded border border-teal-200/25 dark:border-teal-900/30">
                        STEP {w.step}
                      </span>
                      <span className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">{w.badge}</span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-850 dark:text-stone-150 shadow-xs">
                      <Icon size={20} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[15.5px] font-bold text-stone-850 dark:text-stone-100">{w.title}</h4>
                      <p className="text-stone-500 dark:text-stone-400 text-[13.5px] leading-relaxed">{w.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-16 flex justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link 
                href={ROUTES.REGISTER}
                className="inline-flex items-center gap-2 px-6 py-3 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-xl text-[14px] font-extrabold text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:border-stone-300 dark:hover:border-stone-700 transition-colors shadow-sm group"
              >
                Analyze Your First Recording Now <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 lg:py-40 bg-stone-125/20 dark:bg-stone-950/20 border-b border-stone-200/40 dark:border-stone-875/40 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              Built for Corporate Governance
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
              Ditch the spreadsheets and manual transcription audits. Let AI process your voice channels securely.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="p-8 rounded-2xl border border-stone-200/60 dark:border-stone-875/60 bg-white/50 dark:bg-stone-925/40 flex gap-5 hover:border-teal-500/25 dark:hover:border-teal-400/30 transition-all duration-300 shadow-xs cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-stone-125 dark:bg-stone-900 border border-stone-200 dark:border-stone-825 text-teal-650 dark:text-teal-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Icon size={22} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[16px] font-bold text-stone-850 dark:text-stone-100">{feat.title}</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-[14px] leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* Before vs After Section */}
      <section className="py-32 lg:py-40 bg-white dark:bg-stone-900 border-b border-stone-200/40 dark:border-stone-875/40 relative z-10">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              Modernize Post-Meeting Security
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
              Transitioning raw spoken data into compliant, indexed, and audited intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Legacy Approach */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-125/25 dark:bg-stone-950/25 flex flex-col gap-6"
            >
              <span className="text-[11px] font-bold text-stone-450 dark:text-stone-500 uppercase tracking-widest bg-stone-200 dark:bg-stone-900 px-3 py-1 rounded self-start border border-stone-300/40 dark:border-stone-800/40">
                Legacy Approach
              </span>
              <h4 className="text-[17px] font-extrabold text-stone-850 dark:text-stone-100">Manual Checklists & Delayed Auditing</h4>
              
              <div className="space-y-4">
                <div className="p-4 border border-stone-200/60 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed font-mono italic">
                  "...So we decided to just send customer database backups to our external support vendor via standard Slack channels..."
                </div>
                <ul className="space-y-3.5 text-[13.5px] text-red-650 dark:text-red-400 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-red-500 font-bold">•</span>
                    <span>No real-time compliance checks; vulnerabilities are discovered weeks later during manual audits.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-red-500 font-bold">•</span>
                    <span>Sensitive data leaks (PII, credentials) go completely unflagged within text notes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-red-500 font-bold">•</span>
                    <span>Action items are forgotten or manually copied into tasks with missing context.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Veritas AI */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-8 rounded-2xl border border-teal-500/25 dark:border-teal-400/25 bg-teal-50/5 dark:bg-teal-950/5 flex flex-col gap-6"
            >
              <span className="text-[11px] font-bold text-teal-650 dark:text-teal-405 uppercase tracking-widest bg-teal-50 dark:bg-teal-950/40 px-3 py-1 rounded self-start border border-teal-200/30 dark:border-teal-900/40">
                Veritas AI
              </span>
              <h4 className="text-[17px] font-extrabold text-stone-850 dark:text-stone-100">Automated Audit Trails & Verified Assets</h4>
              
              <div className="space-y-4">
                <div className="p-4 border border-teal-200/30 dark:border-teal-800/40 rounded-xl bg-white dark:bg-stone-900 text-[13px] text-stone-550 dark:text-stone-350 leading-relaxed font-mono">
                  "...customer database backups... <span className="bg-red-100/60 dark:bg-red-950/60 text-red-700 dark:text-red-400 px-2 py-0.5 rounded text-[11px] font-bold">GDPR Risk: Clause 4.2</span>"
                </div>
                <ul className="space-y-3.5 text-[13.5px] text-teal-650 dark:text-teal-400 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-teal-500 font-bold">✓</span>
                    <span>Instant transcription scan flags policy violations (GDPR/SOC 2) with immediate recommendations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-teal-500 font-bold">✓</span>
                    <span>Zero data retention APIs ensure strict data containment limits are fully met.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-teal-500 font-bold">✓</span>
                    <span>Automated action-item harvesting extracts tasks and deadlines directly to active directories.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 lg:py-40 bg-stone-125/20 dark:bg-stone-950/20 border-b border-stone-200/40 dark:border-stone-875/40 relative z-10 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-8 lg:px-16">
          
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-center text-stone-900 dark:text-stone-100 mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div 
                  key={i} 
                  className="border border-stone-200/50 dark:border-stone-850 bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-xs hover:border-stone-350 dark:hover:border-stone-800 transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left text-[15px] font-extrabold text-stone-850 dark:text-stone-200 hover:bg-stone-125/20 dark:hover:bg-stone-925/40 transition-colors cursor-pointer"
                  >
                    <span className="pr-6">{faq.q}</span>
                    <ChevronDown size={18} className={cn("transition-transform text-stone-400 flex-shrink-0 duration-200", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-[14.5px] text-stone-500 dark:text-stone-450 leading-relaxed border-t border-stone-100 dark:border-stone-855 pt-4 bg-stone-125/10 dark:bg-stone-925/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 lg:py-40 px-8 lg:px-16 text-center max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-55 tracking-tight">
          Ready to automate meeting governance?
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-base sm:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
          Get started today and integrate certified compliance auditing into your voice pipelines. Create a free account or contact our enterprise team.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link 
              href={ROUTES.REGISTER} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-stone-900 hover:bg-stone-825 text-white dark:bg-stone-100 dark:hover:bg-stone-225 dark:text-stone-900 font-bold text-[15px] shadow-lg hover:shadow-xl transition-all"
            >
              Create Free Account <ArrowRight size={16} />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link 
              href={ROUTES.LOGIN} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-125 dark:hover:bg-stone-925 font-bold text-[15px] transition-all"
            >
              Explore Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200/50 dark:border-stone-875/50 bg-stone-125 dark:bg-stone-955 py-12 px-8 lg:px-16 relative z-10 transition-colors duration-300 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 font-black text-[14px] flex-shrink-0">
              V
            </div>
            <span className="font-extrabold text-stone-800 dark:text-stone-200 tracking-tight text-[15px]">Veritas AI</span>
          </div>
          <p className="text-[13px] text-stone-450 dark:text-stone-500 sm:order-first">
            © 2026 Veritas Technologies, Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-[13px] text-stone-450 dark:text-stone-500 font-semibold">
            <a href="#" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>

    </motion.div>
  );
}
