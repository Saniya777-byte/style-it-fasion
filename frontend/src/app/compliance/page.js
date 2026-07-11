"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  BookOpen, 
  ArrowRight,
  ListFilter
} from "lucide-react";
import { reportService } from "../../services/report.service";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Progress } from "../../components/ui/Progress";
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

  // Consolidate risks across all reports
  const allRisks = reports.flatMap(r => 
    (r.complianceDetails?.risks || []).map(risk => ({
      ...risk,
      meetingTitle: r.title,
      meetingId: r.id
    }))
  );

  // Consolidate missing clauses
  const allMissingClauses = reports.flatMap(r => 
    (r.complianceDetails?.missingClauses || []).map(clause => ({
      ...clause,
      meetingTitle: r.title,
      meetingId: r.id
    }))
  );

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Compliance Control Hub" />

        <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Regulatory Audit Center
            </h2>
            <p className="text-xs text-zinc-455 dark:text-zinc-500 mt-1">
              Consolidated security risks, missing clauses, and historical compliance indices
            </p>
          </div>

          {/* Top Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Average Audit Score
                  </span>
                  <p className="text-xl font-black text-zinc-900 dark:text-zinc-150">90.7%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Unresolved Hazards
                  </span>
                  <p className="text-xl font-black text-amber-600 dark:text-amber-500">{allRisks.length} Issues</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={20} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Checked Frameworks
                  </span>
                  <p className="text-xl font-black text-zinc-900 dark:text-zinc-100">4 Audited</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score trend over time (AreaChart) */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Compliance Index Trend</CardTitle>
                <CardDescription>Historical monthly average of meeting audits.</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceScoreTrend />
              </CardContent>
            </Card>

            {/* Risk distribution (PieChart) */}
            <Card>
              <CardHeader>
                <CardTitle>Threat Categories</CardTitle>
                <CardDescription>Distribution of active compliance risks.</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskDistributionPie />
              </CardContent>
            </Card>
          </div>

          {/* Category Scores (BarChart) */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Score by Audit Category</CardTitle>
              <CardDescription>Average performance ratings based on checked meeting records.</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryComplianceBar />
            </CardContent>
          </Card>

          {/* Missing Clauses and Risks tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Missing Clauses Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-indigo-600 dark:text-indigo-400" size={18} />
                  <span>Omitted Regulatory Clauses</span>
                </CardTitle>
                <CardDescription>Policies referenced in meetings that are missing explicit legal consent clauses.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-4 space-y-2">
                    <div className="h-6 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
                    <div className="h-6 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
                  </div>
                ) : allMissingClauses.length > 0 ? (
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {allMissingClauses.map((clause, index) => (
                      <div key={index} className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-250">
                            {clause.clause}
                          </span>
                          <Link href={`/report/${clause.meetingId}`}>
                            <Badge variant="neutral" className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                              {truncate(clause.meetingTitle, 25)}
                            </Badge>
                          </Link>
                        </div>
                        <p className="text-xs text-zinc-450 dark:text-zinc-500 leading-relaxed">
                          {clause.description}
                        </p>
                        <div className="text-[10px] text-emerald-650 dark:text-emerald-400 font-semibold bg-emerald-50/50 dark:bg-emerald-950/15 p-2 rounded-lg border border-emerald-100/50 dark:border-emerald-900/30">
                          Mitigation: {clause.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-zinc-400 dark:text-zinc-500 italic text-xs">
                    No missing clauses flagged across meetings.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations Checklists */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={18} />
                  <span>Mitigation Action Checklist</span>
                </CardTitle>
                <CardDescription>Recommended policy and technology updates gathered from recent sessions.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  <div className="p-4 flex items-start gap-3">
                    <input type="checkbox" className="mt-1 rounded border-zinc-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer" />
                    <div>
                      <p className="text-xs font-bold text-zinc-850 dark:text-zinc-250">Enforce DNS Binding for Telemetry</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Enforces EU customer telemetry data boundaries (Flags: rep-1)</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-3">
                    <input type="checkbox" className="mt-1 rounded border-zinc-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer" />
                    <div>
                      <p className="text-xs font-bold text-zinc-850 dark:text-zinc-250">Implement Audit Trails middleware</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Records user ID and IPs for SOC 2 Type II conformance (Flags: rep-2)</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-3">
                    <input type="checkbox" className="mt-1 rounded border-zinc-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer" />
                    <div>
                      <p className="text-xs font-bold text-zinc-850 dark:text-zinc-250">Decommission testing endpoints</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Eliminates unencrypted public routes in old configurations (Flags: rep-2)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
