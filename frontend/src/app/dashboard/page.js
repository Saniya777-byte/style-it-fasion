"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  ShieldAlert, 
  Clock, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Search,
  Filter
} from "lucide-react";
import { reportService } from "../../services/report.service";
import { formatDate } from "../../utils/formatDate";
import { truncate } from "../../utils/truncate";
import { ROUTES } from "../../constants";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

export default function Dashboard() {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFramework, setFilterFramework] = useState("all");

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
    averageCompliance: Math.round(
      reports.filter(r => r.complianceScore !== null).reduce((acc, curr) => acc + curr.complianceScore, 0) /
      reports.filter(r => r.complianceScore !== null).length
    ) || 0,
    activeRisks: reports.reduce((acc, curr) => acc + (curr.complianceDetails?.risks?.length || 0), 0),
    transcribedMinutes: 153
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Platform Workspace" />

        <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* Header & Quick Action banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Corporate Workspace Overview
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Real-time compliance monitoring and automated speech audits
              </p>
            </div>
            <Link href={ROUTES.UPLOAD}>
              <Button size="sm" className="flex items-center gap-1.5 cursor-pointer">
                <Plus size={15} />
                <span>Upload Recording</span>
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <Card>
              <CardContent className="p-5 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Transcribed Meetings
                  </span>
                  <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats.totalReports}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center">
                  <FileText size={18} />
                </div>
              </CardContent>
            </Card>

            {/* Stat Card 2 */}
            <Card>
              <CardContent className="p-5 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Compliance Index
                  </span>
                  <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{stats.averageCompliance}%</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <TrendingUp size={18} />
                </div>
              </CardContent>
            </Card>

            {/* Stat Card 3 */}
            <Card>
              <CardContent className="p-5 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Active Audited Risks
                  </span>
                  <p className="text-2xl font-black text-red-500">{stats.activeRisks} Issues</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <ShieldAlert size={18} />
                </div>
              </CardContent>
            </Card>

            {/* Stat Card 4 */}
            <Card>
              <CardContent className="p-5 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Transcribed Time
                  </span>
                  <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats.transcribedMinutes} mins</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-450 flex items-center justify-center">
                  <Clock size={18} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Filter Section */}
          <div className="flex flex-wrap gap-3 items-center justify-between p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input
                type="text"
                placeholder="Quick-search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9.5 pr-4 py-2 w-full text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={13} className="text-zinc-400" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Jurisdiction: All</span>
            </div>
          </div>

          {/* Reports Table / Card List */}
          <Card>
            <CardHeader className="flex justify-between items-start pb-4">
              <div>
                <CardTitle>Recent Meetings & Regulatory Audits</CardTitle>
                <CardDescription>Click a meeting row to inspect the full transcript, AI summary, and compliance alerts.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 space-y-3">
                  <div className="h-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse" />
                  <div className="h-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse" />
                  <div className="h-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse" />
                </div>
              ) : filteredReports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-150 dark:border-zinc-850 text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">
                        <th className="p-4">Meeting details</th>
                        <th className="p-4">Compliance framework</th>
                        <th className="p-4">Average score</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                      {filteredReports.map((report) => {
                        const isProcessing = report.status === "Processing";
                        return (
                          <tr 
                            key={report.id} 
                            onClick={() => router.push(isProcessing ? ROUTES.PROCESSING : `/report/${report.id}`)}
                            className="hover:bg-zinc-550/5 dark:hover:bg-zinc-900/10 cursor-pointer transition-colors"
                          >
                            <td className="p-4">
                              <div className="font-bold text-zinc-900 dark:text-zinc-200">
                                {report.title}
                              </div>
                              <div className="text-zinc-400 dark:text-zinc-500 text-[10px] mt-0.5">
                                {formatDate(report.date)} • {report.duration}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-medium text-zinc-700 dark:text-zinc-350">
                                {report.company}
                              </div>
                              <div className="text-[10px] text-zinc-400 dark:text-zinc-500">
                                {report.language} • {report.country}
                              </div>
                            </td>
                            <td className="p-4">
                              {report.complianceScore !== null ? (
                                <Badge 
                                  variant={
                                    report.complianceScore >= 90 
                                      ? "success" 
                                      : report.complianceScore >= 75 
                                      ? "warning" 
                                      : "danger"
                                  }
                                >
                                  {report.complianceScore}%
                                </Badge>
                              ) : (
                                <span className="text-zinc-400 dark:text-zinc-500 italic">Calculating</span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1.5">
                                {isProcessing ? (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    <span className="font-semibold text-amber-600 dark:text-amber-400">Processing</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 size={13} className="text-emerald-500" />
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Audit Ready</span>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <Link 
                                href={isProcessing ? ROUTES.PROCESSING : `/report/${report.id}`} 
                                className="inline-flex items-center gap-1 text-indigo-650 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold"
                              >
                                <span>Inspect</span>
                                <ArrowUpRight size={13} />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center gap-3">
                  <AlertCircle size={28} className="text-zinc-300 dark:text-zinc-700" />
                  <p className="text-sm font-semibold text-zinc-650 dark:text-zinc-400">No matching reports found</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Try adjusting your filters or uploading a new file.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
