"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Users, 
  ChevronDown, 
  HelpCircle,
  FileCheck,
  Zap,
  TrendingUp,
  FileText,
  Lock,
  Volume2
} from "lucide-react";
import { ROUTES } from "../constants";
import { cn } from "../utils/cn";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const features = [
    {
      icon: Cpu,
      title: "Real-time AI Transcription",
      description: "Convert meetings to rich text with speaker separation, custom vocabulary support, and 99% accuracy."
    },
    {
      icon: ShieldCheck,
      title: "Automated Compliance Auditing",
      description: "Instantly scan discussions against GDPR, HIPAA, and SOC 2 guidelines to detect violations before reports are finalized."
    },
    {
      icon: Users,
      title: "Speaker & Tone Dynamics",
      description: "Monitor talk distribution, speaking volume variations, and sentiment metrics per speaker to improve meeting inclusion."
    },
    {
      icon: FileCheck,
      title: "Action-Item Harvesting",
      description: "AI-driven action item tracking assigns tasks to specific members with context-aware deadlines extracted from context."
    }
  ];

  const workflowSteps = [
    { step: "01", name: "Upload Recording", desc: "Drag and drop your audio or video file. Set compliance frameworks." },
    { step: "02", name: "AI Ingestion", desc: "Transcripts, summaries, and speakers are mapped and cross-checked automatically." },
    { step: "03", name: "Audit & Export", desc: "Audit risk highlights, review interactive timelines, and download certified PDFs or JSON." }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      desc: "Perfect for exploring AI transcription and basic summary tools.",
      features: ["5 meeting uploads / mo", "Basic summaries", "Text exports", "Single user"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "per user / mo",
      desc: "Ideal for teams requiring regulatory audits and detailed analytics.",
      features: ["Unlimited uploads", "SOC 2 & GDPR auditing", "Interactive report viewer", "Speaker tone analytics", "API access"],
      cta: "Try Free for 14 Days",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored billing",
      desc: "For organizations requiring custom LLMs, SSO, and dedicated support.",
      features: ["On-premise deployment option", "Custom compliance guidelines", "SAML SSO / IAM integration", "Dedicated solutions engineer", "SLA guarantees"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      q: "How does Veritas AI audit for compliance?",
      a: "Veritas AI compares meeting transcripts and action item deadlines against pre-configured regulatory templates (GDPR, HIPAA, SOC 2, etc.) using natural language processing to identify risky phrasing, data sharing, or missing clauses."
    },
    {
      q: "Can I upload proprietary video formats?",
      a: "Yes! We support standard formats such as MP4, WebM, MOV, and MP3 audio files. Max file upload size is 500MB on standard plans."
    },
    {
      q: "Is my corporate data secure?",
      a: "Absolutely. All files are encrypted at rest using AES-256 and in transit using TLS 1.3. We offer local data residency bounds (EU/US) so your recordings never leave your jurisdiction."
    }
  ];

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black font-sans selection:bg-indigo-500 selection:text-white">
      {/* Premium Header */}
      <header className="fixed top-0 inset-x-0 h-16 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-zinc-150/80 dark:border-zinc-850/80 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
            V
          </div>
          <span className="font-bold text-zinc-900 dark:text-zinc-150 tracking-tight text-lg">
            Veritas AI
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href={ROUTES.LOGIN} className="text-sm font-medium text-zinc-650 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors px-3 py-1.5">
            Sign In
          </Link>
          <Link href={ROUTES.REGISTER} className="text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 px-4 py-2 rounded-xl shadow-sm transition-all">
            Start Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/40 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-6"
        >
          <Zap size={12} />
          Compliance & Meeting Intelligence Platform
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl leading-[1.1]"
        >
          Audit your meeting content for <span className="text-indigo-600 dark:text-indigo-400">compliance risk</span> automatically.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed"
        >
          Ingest board syncs, engineering reviews, and client calls. Veritas transcribes conversation, flags privacy violations, and harvests action items in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
        >
          <Link href={ROUTES.REGISTER} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-650 hover:bg-indigo-500 text-white font-semibold shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer">
            <span>Register Free Account</span>
            <ArrowRight size={16} />
          </Link>
          <Link href={ROUTES.DASHBOARD} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold transition-all cursor-pointer">
            <span>Explore Dashboard Demo</span>
          </Link>
        </motion.div>

        {/* Dashboard Preview graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full mt-16 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden p-3"
        >
          <div className="rounded-xl border border-zinc-150 dark:border-zinc-900 overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/60 p-4 flex flex-col gap-4 text-left">
            <div className="flex justify-between items-center border-b border-zinc-150 dark:border-zinc-900 pb-3">
              <div className="flex gap-2 items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-red-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">veritas-dashboard_v2.1</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-bold text-zinc-450 dark:text-zinc-500">Average Compliance Score</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">94.2%</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-bold text-zinc-450 dark:text-zinc-500">Active Audited Reports</span>
                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">42</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-bold text-zinc-450 dark:text-zinc-500">GDPR Telemetry Risks</span>
                <span className="text-2xl font-black text-red-500">2 Critical</span>
              </div>
            </div>
            <div className="h-40 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 p-4 flex flex-col justify-center items-center text-center">
              <ShieldCheck className="text-indigo-500 mb-2" size={32} />
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Compliance Audit Active</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Telemetry binding and GDPR v2 protocols are validated across all recordings.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white dark:bg-zinc-950 border-y border-zinc-150 dark:border-zinc-900/60 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              An enterprise toolkit for compliance teams
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3.5">
              Eliminate manually parsing recordings and spreadsheets. Let AI execute real-time audits against industry protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div key={index} className="p-6 rounded-2xl border border-zinc-150 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{feat.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before vs After Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Reinventing the post-meeting workflow
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2.5">
            See how Veritas transitions raw unstructured recordings into compliant structured intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before Column */}
          <div className="p-6 rounded-2xl border border-red-100 bg-red-50/10 dark:border-red-950/10 flex flex-col gap-4">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full self-start">
              Legacy Approach
            </span>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Messy Transcript & Manual Checklists</h4>
            <div className="space-y-3.5 text-xs text-zinc-500 dark:text-zinc-400">
              <p className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 leading-relaxed">
                "...So we decided to just send customer analytics database backups to our external support vendor via standard Slack channels because they needed it quickly..."
              </p>
              <div className="flex items-center gap-2 text-red-500 font-semibold">
                <span>• Missing GDPR cross-border log flags</span>
              </div>
              <div className="flex items-center gap-2 text-red-500 font-semibold">
                <span>• No clear owner or deadline for security patches</span>
              </div>
              <div className="flex items-center gap-2 text-red-500 font-semibold">
                <span>• Compliance check occurs weeks later in bulk audits</span>
              </div>
            </div>
          </div>

          {/* After Column */}
          <div className="p-6 rounded-2xl border border-emerald-100 bg-emerald-50/10 dark:border-emerald-950/10 flex flex-col gap-4">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full self-start">
              Veritas AI Advantage
            </span>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Certified Compliant Assets</h4>
            <div className="space-y-3.5 text-xs text-zinc-550 dark:text-zinc-400">
              <p className="p-3 border border-emerald-250 dark:border-emerald-900/60 rounded-xl bg-white dark:bg-zinc-950 leading-relaxed">
                "...So we decided to just send customer analytics database backups... <span className="bg-red-100 text-red-750 px-1 rounded font-bold">GDPR Access Risk: Clause 4.2</span>"
              </p>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>✓ Automatic warning flags with mitigation checklists</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>✓ Direct action extraction and owner assignment</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>✓ Interactive dashboard and instant audit certificate exports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="py-20 bg-zinc-100/50 dark:bg-zinc-900/10 border-y border-zinc-150 dark:border-zinc-900/50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center text-zinc-900 dark:text-zinc-100 mb-16">
            The Three-Step Pipeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-3 relative">
                <span className="text-4xl font-black text-indigo-650/20 dark:text-indigo-400/20">{step.step}</span>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{step.name}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Simple, predictable pricing plans
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3">
            Get started for free or unlock the full audit suite for your entire compliance team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div 
              key={idx} 
              className={cn(
                "p-6 rounded-2xl border flex flex-col gap-6 relative bg-white dark:bg-zinc-950",
                plan.popular 
                  ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/10" 
                  : "border-zinc-200 dark:border-zinc-900"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[9px] uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{plan.name}</h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{plan.desc}</p>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{plan.price}</span>
                <span className="text-xs text-zinc-450 dark:text-zinc-500">{plan.period}</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400 flex-1">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link href={ROUTES.REGISTER} className={cn(
                "w-full py-2.5 rounded-xl font-semibold text-xs text-center transition-all",
                plan.popular
                  ? "bg-indigo-650 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-500/10"
                  : "border border-zinc-250 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              )}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-zinc-100/50 dark:bg-zinc-900/10 border-t border-zinc-150 dark:border-zinc-900/50 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center text-zinc-900 dark:text-zinc-100 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-semibold text-zinc-850 dark:text-zinc-250 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={cn("transition-transform text-zinc-400", isOpen && "rotate-180")} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-900/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Ready to automate meeting auditing?
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
          Unlock standard SOC 2, HIPAA, and GDPR report compliance. Secure your corporate discussions with Veritas AI today.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href={ROUTES.REGISTER} className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-650 hover:bg-indigo-500 text-white font-semibold shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer">
            <span>Get Started for Free</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-150 dark:border-zinc-850 bg-white dark:bg-zinc-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              V
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-150 tracking-tight text-sm">
              Veritas AI
            </span>
          </div>
          
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © 2026 Veritas Technologies, Inc. All rights reserved.
          </p>

          <div className="flex gap-4 text-xs text-zinc-450 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-350">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
