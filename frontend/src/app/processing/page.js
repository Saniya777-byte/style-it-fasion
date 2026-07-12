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
    const timer = setTimeout(() => setStageIndex(prev => prev + 1), 2500);
    return () => clearTimeout(timer);
  }, [stageIndex]);

  const isCompleted = stageIndex === totalStages - 1;

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-950 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar title="Processing" />
        <main className="flex-1 p-4 sm:p-6 max-w-2xl w-full mx-auto flex items-center justify-center">
          <Card className="shadow-lg w-full">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
                <Sparkles className={isCompleted ? "" : "animate-pulse"} size={20} />
              </div>
              <CardTitle>{isCompleted ? "Processing Complete" : "Analyzing Meeting"}</CardTitle>
              <CardDescription>
                {isCompleted ? "Veritas has audited all records against your policy settings." : "Please wait while we transcribe and audit compliance."}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-5 px-4 sm:px-7">
              <div className="max-h-[50vh] overflow-y-auto">
                <ProcessingTimeline currentStageIndex={stageIndex} />
              </div>
              {isCompleted && (
                <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/40">
                    <CheckCircle2 size={13} />Compliance certificate generated: 94% score
                  </div>
                  <Button className="w-full flex items-center justify-center gap-1.5" onClick={() => router.push(ROUTES.DASHBOARD)}>
                    View Dashboard<ArrowRight size={14} />
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
