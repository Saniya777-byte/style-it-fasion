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

export function SpeakerContributionPie() {
  const data = mockAnalytics.speakerContribution;
  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="w-full h-80 flex flex-col md:flex-row items-center justify-around gap-6">
      <div className="w-48 h-48 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
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

      <div className="flex flex-col gap-3 flex-1 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.speaker}</span>
            </div>
            <div className="flex gap-4 font-bold text-zinc-900 dark:text-zinc-100">
              <span>{item.speakingPercentage}% time</span>
              <span className="text-emerald-500">{item.positiveSentiment}% pos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TopicDistributionBar() {
  const data = mockAnalytics.topicDistribution;

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E4E4E7" className="dark:stroke-zinc-800" />
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#A1A1AA", fontSize: 11 }} />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#A1A1AA", fontSize: 11 }} width={100} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" name="Keywords Match %" fill="#6366F1" radius={[0, 4, 4, 0]}>
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
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" className="dark:stroke-zinc-800" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#A1A1AA", fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A1A1AA", fontSize: 11 }} />
          <Tooltip />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Line 
            type="monotone" 
            dataKey="energy" 
            name="Speaking Amplitude" 
            stroke="#10B981" 
            strokeWidth={2.5} 
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
