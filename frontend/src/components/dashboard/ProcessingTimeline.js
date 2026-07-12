"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, MessageSquareText, ShieldAlert, Cpu, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "../../utils/cn";

const stages = [
  { name: "Uploading", description: "Ingesting recording into cloud storage.", icon: Upload },
  { name: "Transcription", description: "Running deep learning audio transcription.", icon: MessageSquareText },
  { name: "Semantic Analysis", description: "Extracting topics, summaries, and owners.", icon: Cpu },
  { name: "Compliance Check", description: "Auditing against privacy and data clauses.", icon: ShieldAlert },
  { name: "Report Compilation", description: "Assembling charts and downloadable assets.", icon: Sparkles },
  { name: "Completed", description: "Report and analytics are ready.", icon: CheckCircle2 },
];

export function ProcessingTimeline({ currentStageIndex = 0 }) {
  return (
    <div className="w-full max-w-lg mx-auto py-2">
      <div className="relative">
        <div className="absolute left-[22px] top-5 bottom-5 w-px bg-stone-200 dark:bg-stone-700" />
        <motion.div
          className="absolute left-[22px] top-5 w-px bg-teal-600 dark:bg-teal-400"
          initial={{ height: 0 }}
          animate={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        <div className="space-y-5 relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx < currentStageIndex;
            const isActive = idx === currentStageIndex;
            const isPending = idx > currentStageIndex;

            return (
              <motion.div
                key={idx}
                className="flex gap-4 items-start"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center border transition-all relative z-10 flex-shrink-0",
                    isCompleted && "bg-emerald-50 border-emerald-400 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-500/60 dark:text-emerald-400",
                    isActive && "bg-teal-50 border-teal-600 text-teal-600 dark:bg-teal-950/30 dark:border-teal-400 dark:text-teal-300 ring-3 ring-teal-600/10 dark:ring-teal-400/10",
                    isPending && "bg-stone-50 border-stone-200 text-stone-400 dark:bg-stone-900 dark:border-stone-700 dark:text-stone-500"
                  )}
                  animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {isActive && idx !== stages.length - 1 ? <RefreshCw className="animate-spin" size={16} /> : <Icon size={16} />}
                </motion.div>

                <div className="flex-1 pt-0.5 min-w-0">
                  <h4 className={cn(
                    "text-[13px] font-medium tracking-tight",
                    isCompleted && "text-stone-700 dark:text-stone-300",
                    isActive && "text-teal-700 dark:text-teal-300",
                    isPending && "text-stone-400 dark:text-stone-500"
                  )}>{stage.name}</h4>
                  <p className={cn(
                    "text-[12px] mt-0.5 leading-relaxed",
                    isCompleted && "text-stone-400 dark:text-stone-500",
                    isActive && "text-stone-500 dark:text-stone-400",
                    isPending && "text-stone-300 dark:text-stone-600"
                  )}>{stage.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProcessingTimeline;
