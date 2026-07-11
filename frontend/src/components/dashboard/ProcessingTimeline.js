"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, MessageSquareText, ShieldAlert, Cpu, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "../../utils/cn";

export function ProcessingTimeline({ currentStageIndex = 0 }) {
  const stages = [
    { name: "Uploading Video", description: "Ingesting raw meeting recording into cloud storage.", icon: Upload },
    { name: "Speech-to-Text Transcription", description: "Running deep learning audio transcription model.", icon: MessageSquareText },
    { name: "Semantic Analysis", description: "Extracting key topics, summaries, and action owners.", icon: Cpu },
    { name: "Compliance Check", description: "Auditing meeting text against security and data privacy clauses.", icon: ShieldAlert },
    { name: "Report Compilation", description: "Assembling structural tables, charts, and downloadable files.", icon: Sparkles },
    { name: "Completed", description: "Interactive report and full analytics dashboard are ready.", icon: CheckCircle2 },
  ];

  return (
    <div className="w-full max-w-xl mx-auto py-4">
      <div className="relative">
        {/* Continuous Line background */}
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-zinc-200 dark:bg-zinc-800" />
        
        {/* Animated Active Line */}
        <motion.div 
          className="absolute left-[27px] top-6 w-0.5 bg-indigo-600 dark:bg-indigo-400"
          initial={{ height: 0 }}
          animate={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <div className="space-y-8 relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx < currentStageIndex;
            const isActive = idx === currentStageIndex;
            const isPending = idx > currentStageIndex;

            return (
              <motion.div
                key={idx}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
              >
                {/* Stage Indicator Node */}
                <div className="relative">
                  <motion.div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all relative z-10",
                      isCompleted && "bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-500/80 dark:text-emerald-400",
                      isActive && "bg-indigo-50 border-indigo-600 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-400 dark:text-indigo-300 ring-4 ring-indigo-500/10",
                      isPending && "bg-zinc-50 border-zinc-250 text-zinc-400 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-650"
                    )}
                    animate={isActive ? { scale: [1, 1.03, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {isActive && idx !== stages.length - 1 ? (
                      <RefreshCw className="animate-spin" size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <h4 className={cn(
                    "text-sm font-bold tracking-tight transition-colors",
                    isCompleted && "text-zinc-800 dark:text-zinc-300",
                    isActive && "text-indigo-600 dark:text-indigo-400",
                    isPending && "text-zinc-400 dark:text-zinc-550"
                  )}>
                    {stage.name}
                  </h4>
                  <p className={cn(
                    "text-xs mt-1 transition-colors",
                    isCompleted && "text-zinc-500 dark:text-zinc-400",
                    isActive && "text-zinc-600 dark:text-zinc-350",
                    isPending && "text-zinc-400 dark:text-zinc-600"
                  )}>
                    {stage.description}
                  </p>
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
