"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, FileWarning } from "lucide-react";
import { reportService } from "../../../services/report.service";
import Sidebar from "../../../components/navigation/Sidebar";
import Navbar from "../../../components/navigation/Navbar";
import InteractiveReport from "../../../components/report/InteractiveReport";
import { Card, CardContent } from "../../../components/ui/Card";
import { ROUTES } from "../../../constants";

export default function ReportDetailPage({ params: paramsPromise }) {
  const router = useRouter();

  // Resolve the params promise (Next.js 15/16 standard)
  const params = use(paramsPromise);
  const { id } = params;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadReport() {
      try {
        const data = await reportService.getReportById(id);
        setReport(data);
      } catch (err) {
        setErrorMsg("The requested meeting report could not be found or has been deleted.");
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [id]);

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title={report ? report.title : "Detailed Report"} />

        <main className="p-4 sm:p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* Header row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 border border-stone-205 dark:border-stone-800 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer text-stone-700 dark:text-stone-300 flex-shrink-0"
            >
              <ArrowLeft size={15} />
            </button>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50 tracking-tight truncate">
                {report ? report.title : "Meeting Intelligence"}
              </h2>
              <p className="text-[13px] text-stone-400 dark:text-stone-500 mt-0.5">
                {report ? `${report.company} • ${report.country}` : "Loading audit report..."}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-card">
              <RefreshCw className="animate-spin text-teal-650 dark:text-teal-400" size={22} />
              <p className="text-xs text-stone-400 dark:text-stone-500">Reconstructing structural data...</p>
            </div>
          ) : errorMsg ? (
            <Card className="border-red-200 bg-red-50/10 dark:border-red-950/20 max-w-xl mx-auto mt-10">
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <FileWarning className="text-red-500" size={32} />
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">Audit Not Found</h3>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">{errorMsg}</p>
                </div>
                <Link href={ROUTES.DASHBOARD} className="text-xs text-teal-650 dark:text-teal-400 font-semibold hover:underline">
                  Return to Dashboard
                </Link>
              </CardContent>
            </Card>
          ) : (
            <InteractiveReport report={report} />
          )}
        </main>
      </div>
    </div>
  );
}
