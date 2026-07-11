"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Search, 
  ArrowUpRight, 
  CheckCircle2, 
  RefreshCw,
  FolderOpen,
  Calendar,
  Layers
} from "lucide-react";
import { reportService } from "../../services/report.service";
import { formatDate } from "../../utils/formatDate";
import { ROUTES } from "../../constants";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export default function ReportsListPage() {
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

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Report Repository" />

        <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                All Audit Reports
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Browse, search, and export compiled intelligence for all audited meetings
              </p>
            </div>
            
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input
                type="text"
                placeholder="Search by title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9.5 pr-4 py-2 w-full text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-2 p-8 space-y-4">
                <div className="h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl animate-pulse" />
                <div className="h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl animate-pulse" />
              </div>
            ) : filteredReports.length > 0 ? (
              filteredReports.map((report) => {
                const isProcessing = report.status === "Processing";
                return (
                  <Card 
                    key={report.id}
                    hoverable
                    onClick={() => router.push(isProcessing ? ROUTES.PROCESSING : `/report/${report.id}`)}
                    className="p-5 flex flex-col justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <Badge variant={isProcessing ? "warning" : "success"}>
                          {isProcessing ? "Processing" : "Audit Complete"}
                        </Badge>
                        <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                          {formatDate(report.date)}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-150 leading-tight">
                        {report.title}
                      </h3>
                      <p className="text-[11px] text-zinc-450 dark:text-zinc-500 mt-1">
                        {report.company} • {report.country}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900/60 pt-3.5 mt-2">
                      <div className="flex items-center gap-1">
                        <Layers size={13} className="text-zinc-400" />
                        <span className="text-[10px] text-zinc-450 dark:text-zinc-500">
                          {report.complianceScore ? `${report.complianceScore}% Score` : "Awaiting AI Check"}
                        </span>
                      </div>
                      <span className="text-xs text-indigo-650 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold flex items-center gap-0.5">
                        <span>Open Report</span>
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-2 p-12 text-center flex flex-col items-center gap-3">
                <FolderOpen size={28} className="text-zinc-300" />
                <p className="text-xs text-zinc-450 dark:text-zinc-500">No reports match your current query.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
