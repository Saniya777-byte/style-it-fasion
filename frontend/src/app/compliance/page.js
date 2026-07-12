"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  TrendingUp
} from "lucide-react";
import { reportService } from "../../services/report.service";
import { truncate } from "../../utils/truncate";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  ComplianceScoreTrend,
  RiskDistributionPie,
  CategoryComplianceBar
} from "../../components/charts/ComplianceCharts";

export default function CompliancePage() {
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

  const allRisks = reports.flatMap(r =>
    (r.complianceDetails?.risks || []).map(risk => ({
      ...risk,
      meetingTitle: r.title,
      meetingId: r.id
    }))
  );

  const allMissingClauses = reports.flatMap(r =>
    (r.complianceDetails?.missingClauses || []).map(clause => ({
      ...clause,
      meetingTitle: r.title,
      meetingId: r.id
    }))
  );

  // Calculate average compliance score
  const averageCompliance = reports.length > 0
    ? Math.round(reports.reduce((acc, r) => acc + (r.complianceScore || 0), 0) / reports.length)
    : 0;

  // Get unique frameworks
  const uniqueFrameworks = [...new Set(reports.map(r => r.complianceFramework))];

  // Aggregate risk distribution
  const riskDistribution = allRisks.reduce((acc, risk) => {
    const severity = risk.severity?.toLowerCase() || 'low';
    if (!acc[severity]) acc[severity] = 0;
    acc[severity]++;
    return acc;
  }, {});

  const riskData = [
    { name: "High Severity", value: riskDistribution.high || 0, color: "#ef4444" },
    { name: "Medium Severity", value: riskDistribution.medium || 0, color: "#f59e0b" },
    { name: "Low Severity", value: riskDistribution.low || 0, color: "#3b82f6" }
  ].filter(d => d.value > 0);

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Compliance Control Hub" />

        <main className="p-4 sm:p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50 tracking-tight">
              Regulatory Audit Center
            </h2>
            <p className="text-[13px] text-stone-400 dark:text-stone-500 mt-0.5">
              Consolidated security risks, missing clauses, and historical compliance indices
            </p>
          </div>

          {/* Top Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Average Audit Score
                  </span>
                  <p className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {loading ? "Loading..." : `${averageCompliance}%`}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={18} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Unresolved Hazards
                  </span>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    {loading ? "Loading..." : `${allRisks.length} Issues`}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Checked Frameworks
                  </span>
                  <p className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {loading ? "Loading..." : `${uniqueFrameworks.length} Audited`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Compliance Index Trend</CardTitle>
                <CardDescription>Historical monthly average of meeting audits.</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceScoreTrend reports={reports} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Categories</CardTitle>
                <CardDescription>Distribution of active compliance risks.</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskDistributionPie data={riskData} />
              </CardContent>
            </Card>
          </div>

          {/* Category Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Score by Audit Category</CardTitle>
              <CardDescription>Average performance ratings based on checked meeting records.</CardDescription>
            </CardHeader>
              <CardContent>
                <CategoryComplianceBar reports={reports} />
              </CardContent>
          </Card>

          {/* Missing Clauses and Risks tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Missing Clauses Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[14px]">
                  <AlertTriangle className="text-amber-500 flex-shrink-0" size={16} />
                  <span className="truncate">Omitted Regulatory Clauses</span>
                </CardTitle>
                <CardDescription>Policies referenced in meetings that are missing explicit legal consent clauses.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-4 space-y-2">
                    <div className="h-6 bg-stone-100 dark:bg-stone-850 rounded animate-pulse" />
                    <div className="h-6 bg-stone-100 dark:bg-stone-850 rounded animate-pulse" />
                  </div>
                ) : allMissingClauses.length > 0 ? (
                  <div className="divide-y divide-stone-100 dark:divide-stone-850 max-h-[400px] overflow-y-auto">
                    {allMissingClauses.map((clause, index) => (
                      <div key={index} className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-semibold text-stone-800 dark:text-stone-250 flex-1 min-w-0">
                            {clause.clause}
                          </span>
                          <Link href={`/report/${clause.meetingId}`}>
                            <Badge variant="neutral" className="hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0">
                              {truncate(clause.meetingTitle, 25)}
                            </Badge>
                          </Link>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-450 leading-relaxed">
                          {clause.description}
                        </p>
                        <div className="text-[10px] text-teal-650 dark:text-teal-400 font-semibold bg-teal-50/30 dark:bg-teal-950/20 p-2 rounded-lg border border-teal-100/50 dark:border-teal-900/30">
                          Mitigation: {clause.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-stone-400 dark:text-stone-500 italic text-xs">
                    No missing clauses flagged across meetings.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations Checklists */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[14px]">
                  <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={16} />
                  <span className="truncate">Mitigation Action Checklist</span>
                </CardTitle>
                <CardDescription>Recommended policy and technology updates gathered from recent sessions.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-stone-100 dark:divide-stone-850 max-h-[400px] overflow-y-auto">
                  {allRisks.slice(0, 5).map((risk, index) => (
                    <div key={index} className="p-4 flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded border-stone-300 dark:border-stone-700 text-teal-600 focus:ring-teal-500 cursor-pointer flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate">{risk.description}</p>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">
                          {risk.category} • {truncate(risk.meetingTitle, 30)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {allRisks.length === 0 && (
                    <div className="p-6 text-center text-stone-400 dark:text-stone-500 italic text-xs">
                      No risks identified across meetings.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
