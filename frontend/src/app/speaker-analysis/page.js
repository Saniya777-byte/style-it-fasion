"use client";

import React from "react";
import { Users, Volume2, Calendar, Smile, TrendingUp } from "lucide-react";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { 
  SpeakerContributionPie, 
  TopicDistributionBar, 
  SpeakerTimelineChart 
} from "../../components/charts/SpeakerCharts";

export default function SpeakerAnalysisPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Speaker & Discussion Analytics" />

        <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Speaker Alignment Analysis
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              Analyze audio dynamics, speaking contribution limits, sentiment peaks, and keywords weights
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Dominant Speaker
                  </span>
                  <p className="text-base font-black text-zinc-900 dark:text-zinc-200">Alex Rivera (40%)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Smile size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Highest Sentiment Index
                  </span>
                  <p className="text-base font-black text-zinc-900 dark:text-zinc-200">Elena Rostova (92%)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-450 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Average Speech Speed
                  </span>
                  <p className="text-base font-black text-zinc-900 dark:text-zinc-200">132 words / min</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Speaking Contribution */}
            <Card>
              <CardHeader>
                <CardTitle>Speaking Airtime Share</CardTitle>
                <CardDescription>Percentage distribution of talk-time across speakers.</CardDescription>
              </CardHeader>
              <CardContent>
                <SpeakerContributionPie />
              </CardContent>
            </Card>

            {/* Keyword Topics distribution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Discussion Keywords Distribution</CardTitle>
                <CardDescription>Frequency of major corporate themes tracked during the sync.</CardDescription>
              </CardHeader>
              <CardContent>
                <TopicDistributionBar />
              </CardContent>
            </Card>
          </div>

          {/* Speaking Timeline chart */}
          <Card>
            <CardHeader>
              <CardTitle>Speaking Amplitude Wave</CardTitle>
              <CardDescription>Speaking intensity and energy trends over the course of the meeting timeline.</CardDescription>
            </CardHeader>
            <CardContent>
              <SpeakerTimelineChart />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
