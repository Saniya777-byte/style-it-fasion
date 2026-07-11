"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { mockAnalytics } from "../../data/mockAnalytics";

// Custom Tooltip component for premium feel
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl shadow-xl">
        <p className="text-xs font-semibold text-zinc-400 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs font-bold" style={{ color: entry.color || "#6366F1" }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ComplianceScoreTrend() {
  const data = mockAnalytics.complianceOverTime;
  
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" className="dark:stroke-zinc-800" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#A1A1AA", fontSize: 11 }}
          />
          <YAxis 
            domain={[70, 100]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#A1A1AA", fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="score" 
            name="Compliance Index" 
            stroke="#6366F1" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorScore)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RiskDistributionPie() {
  const data = mockAnalytics.riskDistribution;
  
  return (
    <div className="w-full h-80 flex flex-col md:flex-row items-center justify-around gap-6">
      <div className="w-48 h-48 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-3.5 flex-1 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.name}</span>
            </div>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{item.value} issues</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryComplianceBar() {
  const data = mockAnalytics.categoryCompliance;

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" className="dark:stroke-zinc-800" />
          <XAxis 
            dataKey="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#A1A1AA", fontSize: 10 }}
          />
          <YAxis 
            domain={[0, 100]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#A1A1AA", fontSize: 11 }}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="score" fill="#4F46E5" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.score === 100 ? "#10B981" : entry.score > 90 ? "#6366F1" : "#F59E0B"} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
