"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText, ShieldAlert, Clock, Plus, ArrowUpRight, CheckCircle2, AlertCircle, TrendingUp, Search
} from "lucide-react";
import { reportService } from "../../services/report.service";
import { formatDate } from "../../utils/formatDate";
import { ROUTES } from "../../constants";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const fadeIn = { hidden: { opacity: 0, y: 8 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3 } }) };

export default function Dashboard() {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await reportService.getReports();
        setReports(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const stats = {
    totalReports: reports.length,
    averageCompliance: reports.filter(r => r.complianceScore !== null).length > 0
      ? Math.round(
          reports.filter(r => r.complianceScore !== null).reduce((acc, curr) => acc + curr.complianceScore, 0) /
          reports.filter(r => r.complianceScore !== null).length
        )
      : 0,
    activeRisks: reports.reduce((acc, curr) => acc + (curr.complianceDetails?.risks?.length || 0), 0),
    transcribedMinutes: reports.reduce((acc, curr) => {
      const duration = curr.duration || "0m";
      const minutes = parseInt(duration) || 0;
      return acc + minutes;
    }, 0)
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const statCards = [
    { label: "Transcribed Meetings", value: stats.totalReports, icon: FileText, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-950/30" },
    { label: "Compliance Index", value: `${stats.averageCompliance}%`, icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    { label: "Active Risks", value: `${stats.activeRisks}`, icon: ShieldAlert, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/30" },
    { label: "Transcribed Time", value: `${stats.transcribedMinutes}m`, icon: Clock, color: "text-stone-500 dark:text-stone-400", bg: "bg-stone-100 dark:bg-stone-800" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-950 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Dashboard" />

        <main className="p-4 sm:p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50 tracking-tight">Overview</h2>
              <p className="text-[13px] text-stone-400 dark:text-stone-500 mt-0.5">Real-time compliance monitoring and meeting audits</p>
            </div>
            <Link href={ROUTES.UPLOAD}>
              <Button size="sm" className="flex items-center gap-1.5 whitespace-nowrap">
                <Plus size={14} />Upload Recording
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={i} variants={fadeIn} initial="hidden" animate="visible" custom={i}>
                  <Card>
                    <CardContent className="px-5 py-4 flex justify-between items-center">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <span className="text-[11px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider">{stat.label}</span>
                        <p className="text-xl font-bold text-stone-900 dark:text-stone-100 tabular-nums truncate">{stat.value}</p>
                      </div>
                      <div className={`w-9 h-9 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={16} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8.5 pr-4 py-1.5 w-full text-[13px] rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 dark:focus:ring-teal-400 dark:focus:border-teal-400 transition-colors"
              />
            </div>
          </div>

          {/* Reports Table */}
          <Card>
            <CardHeader className="flex justify-between items-start pb-4">
              <div className="min-w-0">
                <CardTitle>Recent Meetings</CardTitle>
                <CardDescription>Click a meeting to inspect the transcript and compliance alerts.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-2.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-5 bg-stone-100 dark:bg-stone-800 rounded animate-pulse" />
                  ))}
                </div>
              ) : filteredReports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px] border-collapse">
                    <thead>
                      <tr className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-100 dark:border-stone-800 text-stone-400 dark:text-stone-500 font-medium text-[11px] uppercase tracking-wider">
                        <th className="px-4 sm:px-6 py-3">Meeting</th>
                        <th className="px-4 sm:px-6 py-3">Framework</th>
                        <th className="px-4 sm:px-6 py-3">Score</th>
                        <th className="px-4 sm:px-6 py-3">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {filteredReports.map((report) => {
                        const isProcessing = report.status === "Processing";
                        return (
                          <tr
                            key={report.id}
                            onClick={() => router.push(isProcessing ? ROUTES.PROCESSING : `/report/${report.id}`)}
                            className="hover:bg-stone-50 dark:hover:bg-stone-800/30 cursor-pointer transition-colors"
                          >
                            <td className="px-4 sm:px-6 py-3.5">
                              <div className="font-medium text-stone-800 dark:text-stone-200 truncate">{report.title}</div>
                              <div className="text-stone-400 dark:text-stone-500 text-[11px] mt-0.5">
                                {formatDate(report.date)} • {report.duration}
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-3.5">
                              <div className="text-stone-600 dark:text-stone-300 truncate">{report.company}</div>
                              <div className="text-[11px] text-stone-400 dark:text-stone-500 truncate">{report.language} • {report.country}</div>
                            </td>
                            <td className="px-4 sm:px-6 py-3.5">
                              {report.complianceScore !== null ? (
                                <Badge variant={report.complianceScore >= 90 ? "success" : report.complianceScore >= 75 ? "warning" : "danger"}>
                                  {report.complianceScore}%
                                </Badge>
                              ) : (
                                <span className="text-stone-400 dark:text-stone-500 italic text-[12px]">Pending</span>
                              )}
                            </td>
                            <td className="px-4 sm:px-6 py-3.5">
                              <div className="flex items-center gap-1.5">
                                {isProcessing ? (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    <span className="font-medium text-amber-600 dark:text-amber-400 text-[12px]">Processing</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 size={13} className="text-emerald-500" />
                                    <span className="font-medium text-emerald-600 dark:text-emerald-400 text-[12px]">Ready</span>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                              <Link
                                href={isProcessing ? ROUTES.PROCESSING : `/report/${report.id}`}
                                className="inline-flex items-center gap-1 text-teal-650 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 font-medium text-[12px]"
                              >
                                Inspect<ArrowUpRight size={12} />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center gap-2.5">
                  <AlertCircle size={24} className="text-stone-300 dark:text-stone-600" />
                  <p className="text-sm font-medium text-stone-500 dark:text-stone-400">No reports found</p>
                  <p className="text-[13px] text-stone-400 dark:text-stone-500">Upload a recording to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
