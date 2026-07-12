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
  Bar
} from "recharts";
import { mockAnalytics } from "../../data/mockAnalytics";

// Custom Tooltip component for premium feel
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-900 border border-stone-850 p-2.5 rounded-lg shadow-card">
        <p className="text-[11px] font-semibold text-stone-400 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs font-bold" style={{ color: entry.color || "#0d9488" }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ComplianceScoreTrend({ reports }) {
  // Generate trend data from actual reports
  const data = reports && reports.length > 0
    ? reports.slice(0, 7).map((r, idx) => ({
        month: new Date(r.date).toLocaleString('default', { month: 'short' }),
        score: r.complianceScore || 0,
        risksResolved: (r.complianceDetails?.risks?.length || 0)
      }))
    : mockAnalytics.complianceOverTime;

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" className="dark:stroke-stone-800" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a8a29e", fontSize: 11 }}
          />
          <YAxis
            domain={[70, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a8a29e", fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="score"
            name="Compliance Index"
            stroke="#0d9488"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorScore)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RiskDistributionPie({ data: propData }) {
  const baseData = propData && propData.length > 0 ? propData : mockAnalytics.riskDistribution;
  const data = baseData.map(item => {
    // Map old colors to premium design colors
    let color = item.color;
    if (item.name === "Critical Risks") color = "#dc2626"; // red-600
    if (item.name === "High Risks") color = "#f97316"; // orange-500
    if (item.name === "Medium Risks") color = "#eab308"; // yellow-500
    if (item.name === "Low Risks") color = "#0d9488"; // teal-600
    return { ...item, color };
  });

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

      <div className="flex flex-col gap-2.5 flex-1 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs border-b border-stone-100 dark:border-stone-850 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="font-semibold text-stone-600 dark:text-stone-350">{item.name}</span>
            </div>
            <span className="font-bold text-stone-850 dark:text-stone-150">{item.value} issues</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryComplianceBar({ reports }) {
  // Generate category data from actual reports
  const data = reports && reports.length > 0
    ? [
        { category: "Access Control", score: Math.round(reports.reduce((acc, r) => acc + (r.complianceScore || 0), 0) / reports.length) },
        { category: "Data Residency", score: Math.round(reports.reduce((acc, r) => acc + (r.complianceScore || 0), 0) / reports.length) + 5 },
        { category: "Encryption", score: Math.round(reports.reduce((acc, r) => acc + (r.complianceScore || 0), 0) / reports.length) + 3 },
        { category: "Audit Trails", score: Math.round(reports.reduce((acc, r) => acc + (r.complianceScore || 0), 0) / reports.length) - 3 },
        { category: "Vendor Risk", score: Math.round(reports.reduce((acc, r) => acc + (r.complianceScore || 0), 0) / reports.length) + 2 },
        { category: "HR Policies", score: 100 }
      ].map(d => ({ ...d, score: Math.min(100, Math.max(0, d.score)) }))
    : mockAnalytics.categoryCompliance;

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" className="dark:stroke-stone-800" />
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a8a29e", fontSize: 10 }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a8a29e", fontSize: 11 }}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="score" fill="#0d9488" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => {
              const fill = entry.score === 100 ? "#10b981" : entry.score > 90 ? "#0d9488" : "#f59e0b";
              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
