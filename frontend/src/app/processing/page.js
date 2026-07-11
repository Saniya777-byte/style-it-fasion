"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import ProcessingTimeline from "../../components/dashboard/ProcessingTimeline";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ROUTES } from "../../constants";

export default function ProcessingPage() {
  const router = useRouter();
  const [stageIndex, setStageIndex] = useState(0);
  const totalStages = 6;

  useEffect(() => {
    if (stageIndex >= totalStages - 1) return;

    // Simulate stage completion every 2.5 seconds
    const timer = setTimeout(() => {
      setStageIndex(prev => prev + 1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [stageIndex]);

  const isCompleted = stageIndex === totalStages - 1;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="AI Pipeline Monitor" />

        <main className="p-6 max-w-2xl w-full mx-auto space-y-6 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
          <Card className="shadow-2xl">
            <CardHeader className="text-center pb-4 border-b border-zinc-100 dark:border-zinc-900">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center mb-3">
                <Sparkles className={isCompleted ? "" : "animate-pulse"} size={22} />
              </div>
              <CardTitle>
                {isCompleted ? "AI Processing Complete" : "Assembling Meeting Intelligence"}
              </CardTitle>
              <CardDescription>
                {isCompleted 
                  ? "Veritas has audited all conversation records against your policy settings."
                  : "Please wait while our models transcribe speech and audit compliance guidelines."}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="py-6 px-8">
              <ProcessingTimeline currentStageIndex={stageIndex} />
              
              {isCompleted && (
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3.5 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-900/50">
                    <CheckCircle2 size={14} />
                    <span>Compliance certificate generated: 94% score</span>
                  </div>
                  <Button 
                    className="w-full flex items-center justify-center gap-2 cursor-pointer"
                    onClick={() => router.push(ROUTES.DASHBOARD)}
                  >
                    <span>View Dashboard Audit</span>
                    <ArrowRight size={15} />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
