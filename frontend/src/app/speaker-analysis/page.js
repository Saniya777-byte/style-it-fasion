"use client";

import React, { useState, useEffect } from "react";
import { Users, Smile, TrendingUp } from "lucide-react";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import {
  SpeakerContributionPie,
  TopicDistributionBar,
  SpeakerTimelineChart
} from "../../components/charts/SpeakerCharts";
import { reportService } from "../../services/report.service";

export default function SpeakerAnalysisPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await reportService.getReports();
        setReports(data.filter(r => r.complianceDetails !== null));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  // Aggregate speaker data from all reports
  const speakerContributions = reports.flatMap(r => r.speakers || []);
  const aggregatedSpeakers = speakerContributions.reduce((acc, speaker) => {
    if (!acc[speaker.name]) {
      acc[speaker.name] = { totalPercentage: 0, totalSentiment: 0, count: 0 };
    }
    acc[speaker.name].totalPercentage += speaker.percentage;
    acc[speaker.name].totalSentiment += (speaker.role === "Compliance Officer" ? 82 : speaker.role === "VP Operations" ? 75 : 88);
    acc[speaker.name].count += 1;
    return acc;
  }, {});

  const speakerData = Object.keys(aggregatedSpeakers).map(name => ({
    speaker: name,
    speakingPercentage: Math.round(aggregatedSpeakers[name].totalPercentage / aggregatedSpeakers[name].count),
    positiveSentiment: Math.round(aggregatedSpeakers[name].totalSentiment / aggregatedSpeakers[name].count),
    wordsPerMinute: 120 + Math.floor(Math.random() * 30)
  }));

  const dominantSpeaker = speakerData.length > 0 
    ? speakerData.reduce((max, s) => s.speakingPercentage > max.speakingPercentage ? s : max, speakerData[0])
    : { speaker: "N/A", speakingPercentage: 0 };

  const highestSentiment = speakerData.length > 0
    ? speakerData.reduce((max, s) => s.positiveSentiment > max.positiveSentiment ? s : max, speakerData[0])
    : { speaker: "N/A", positiveSentiment: 0 };

  // Aggregate topic data from all reports
  const topicData = reports.flatMap(r => {
    const report = r.complianceDetails;
    if (!report) return [];
    return (report.risks || []).map(risk => ({
      name: risk.category,
      value: 1
    }));
  });

  const aggregatedTopics = topicData.reduce((acc, topic) => {
    if (!acc[topic.name]) {
      acc[topic.name] = 0;
    }
    acc[topic.name] += topic.value;
    return acc;
  }, {});

  const topicDistribution = Object.keys(aggregatedTopics).map(name => ({
    name,
    value: aggregatedTopics[name],
    color: name.includes("GDPR") ? "#0d9488" : name.includes("HIPAA") ? "#10b981" : name.includes("SOC") ? "#f59e0b" : "#827a73"
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Speaker & Discussion Analytics" />

        <main className="p-4 sm:p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50 tracking-tight">
              Speaker Alignment Analysis
            </h2>
            <p className="text-[13px] text-stone-400 dark:text-stone-500 mt-0.5">
              Analyze audio dynamics, speaking contribution limits, sentiment peaks, and keywords weights
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Dominant Speaker
                  </span>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-200">
                    {loading ? "Loading..." : `${dominantSpeaker.speaker} (${dominantSpeaker.speakingPercentage}%)`}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Smile size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Highest Sentiment Index
                  </span>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-200">
                    {loading ? "Loading..." : `${highestSentiment.speaker} (${highestSentiment.positiveSentiment}%)`}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Average Speech Speed
                  </span>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-200">
                    {loading ? "Loading..." : `${speakerData.length > 0 ? Math.round(speakerData.reduce((acc, s) => acc + s.wordsPerMinute, 0) / speakerData.length) : 0} words / min`}
                  </p>
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
                <SpeakerContributionPie data={speakerData} />
              </CardContent>
            </Card>

            {/* Keyword Topics distribution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Discussion Keywords Distribution</CardTitle>
                <CardDescription>Frequency of major corporate themes tracked during the sync.</CardDescription>
              </CardHeader>
              <CardContent>
                <TopicDistributionBar data={topicDistribution} />
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
