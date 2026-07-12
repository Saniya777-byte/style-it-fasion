"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from "recharts";
import { mockAnalytics } from "../../data/mockAnalytics";

export function SpeakerContributionPie({ data: propData }) {
  const data = propData && propData.length > 0 ? propData : mockAnalytics.speakerContribution;
  const COLORS = ["#0d9488", "#10b981", "#f59e0b", "#dc2626"];

  return (
    <div className="w-full h-80 flex flex-col md:flex-row items-center justify-around gap-6">
      <div className="w-44 h-44 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="speakingPercentage"
              nameKey="speaker"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2.5 flex-1 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs border-b border-stone-100 dark:border-stone-850 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="font-semibold text-stone-650 dark:text-stone-300">{item.speaker}</span>
            </div>
            <div className="flex gap-4 font-bold text-stone-850 dark:text-stone-150">
              <span>{item.speakingPercentage}% time</span>
              <span className="text-emerald-500">{item.positiveSentiment}% pos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TopicDistributionBar({ data: propData }) {
  const baseData = propData && propData.length > 0 ? propData : mockAnalytics.topicDistribution;
  const data = baseData.map(item => {
    // Map colors to premium theme
    let color = item.color;
    if (item.name === "Financial Audit") color = "#0d9488"; // teal
    if (item.name === "Data Protection") color = "#10b981"; // emerald
    if (item.name === "System Architecture") color = "#f59e0b"; // amber
    if (item.name === "Others") color = "#827a73"; // stone
    return { ...item, color };
  });

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e7e5e4" className="dark:stroke-stone-800" />
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#a8a29e", fontSize: 11 }} />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#a8a29e", fontSize: 11 }} width={110} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" name="Keywords Match %" fill="#0d9488" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpeakerTimelineChart() {
  const data = mockAnalytics.speakerTimeline;

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" className="dark:stroke-stone-800" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#a8a29e", fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a8a29e", fontSize: 11 }} />
          <Tooltip />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Line
            type="monotone"
            dataKey="energy"
            name="Speaking Amplitude"
            stroke="#0d9488"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
