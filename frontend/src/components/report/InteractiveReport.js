"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  HelpCircle,
  ListTodo,
  MessageSquare,
  Search,
  ZoomIn,
  ZoomOut,
  Download,
  Printer,
  ChevronRight
} from "lucide-react";
import { exportReportAsJSON, exportReportAsText } from "../../utils/downloadFile";
import { formatDate } from "../../utils/formatDate";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function InteractiveReport({ report }) {
  const [activeSection, setActiveSection] = useState("summary");
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(100);

  const sections = [
    { id: "summary", label: "Executive Summary", icon: FileText },
    { id: "decisions", label: "Key Decisions", icon: HelpCircle },
    { id: "actions", label: "Action Items", icon: ListTodo },
    { id: "transcript", label: "Full Transcript", icon: MessageSquare }
  ];

  const filteredTranscript = useMemo(() => {
    if (!searchQuery) return report.transcript;
    return report.transcript.filter(line =>
      line.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      line.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [report.transcript, searchQuery]);

  const handleZoom = (direction) => {
    if (direction === "in") {
      setZoomLevel(prev => Math.min(prev + 10, 140));
    } else {
      setZoomLevel(prev => Math.max(prev - 10, 90));
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
      {/* Table of Contents */}
      <aside className="w-full lg:w-64 flex-shrink-0 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-xl p-4 sticky top-6">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3 px-2">
          Report Directory
        </h4>
        <nav className="flex flex-col gap-0.5">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  const element = document.getElementById(sec.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-all text-left cursor-pointer",
                  isActive
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-300"
                    : "text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800/40 hover:text-stone-800 dark:hover:text-stone-200"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon size={14} className={isActive ? "text-teal-600 dark:text-teal-400 flex-shrink-0" : "text-stone-400 flex-shrink-0"} />
                  <span className="truncate">{sec.label}</span>
                </div>
                {isActive && <ChevronRight size={13} className="flex-shrink-0" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4 flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-2 mb-1">
            Display Settings
          </span>
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="text-stone-500 dark:text-stone-400">Zoom: {zoomLevel}%</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleZoom("out")}
                disabled={zoomLevel <= 90}
                className="p-1 border border-stone-250 dark:border-stone-800 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 cursor-pointer"
              >
                <ZoomOut size={13} />
              </button>
              <button
                onClick={() => handleZoom("in")}
                disabled={zoomLevel >= 140}
                className="p-1 border border-stone-250 dark:border-stone-800 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 cursor-pointer"
              >
                <ZoomIn size={13} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col gap-6">
        {/* Controls Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-xl shadow-card">
          <div className="flex items-center gap-3">
            <Badge variant={report.complianceScore >= 90 ? "success" : report.complianceScore >= 75 ? "warning" : "danger"}>
              {report.complianceScore ? `Compliance: ${report.complianceScore}%` : "Pending Compliance"}
            </Badge>
            <span className="text-xs text-stone-400 dark:text-stone-500">
              {formatDate(report.date, true)} • {report.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer" onClick={() => exportReportAsText(report)}>
              <Download size={13} />
              <span>Export TXT</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer" onClick={() => exportReportAsJSON(report)}>
              <Download size={13} />
              <span>Export JSON</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer" onClick={handlePrint}>
              <Printer size={13} />
              <span>Print</span>
            </Button>
          </div>
        </div>

        {/* Content Sheets */}
        <div
          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-xl p-6 lg:p-8 shadow-card print:shadow-none print:border-none space-y-8"
          style={{ fontSize: `${zoomLevel}%` }}
        >
          {/* Executive Summary */}
          <section id="summary" className="scroll-mt-6 border-b border-stone-100 dark:border-stone-800/60 pb-8">
            <h3 className="text-[15px] font-semibold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-teal-650 dark:text-teal-400" />
              Executive Summary
            </h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm">
              {report.summary}
            </p>
          </section>

          {/* Key Decisions */}
          <section id="decisions" className="scroll-mt-6 border-b border-stone-100 dark:border-stone-800/60 pb-8">
            <h3 className="text-[15px] font-semibold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <HelpCircle size={16} className="text-teal-650 dark:text-teal-400" />
              Key Decisions
            </h3>
            {report.keyDecisions && report.keyDecisions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.keyDecisions.map((dec) => (
                  <div key={dec.id} className="p-4 border border-stone-150 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 rounded-lg">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-teal-650 dark:text-teal-400 mb-1.5">
                      Decision
                    </p>
                    <p className="text-stone-700 dark:text-stone-300 text-xs leading-relaxed mb-3 font-medium">
                      {dec.text}
                    </p>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold">
                      Agreed by: {dec.agreedBy}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-400 dark:text-stone-500 text-xs italic">No major decisions recorded in this session.</p>
            )}
          </section>

          {/* Action Items */}
          <section id="actions" className="scroll-mt-6 border-b border-stone-100 dark:border-stone-800/60 pb-8">
            <h3 className="text-[15px] font-semibold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <ListTodo size={16} className="text-teal-650 dark:text-teal-400" />
              Action Items
            </h3>
            {report.actionItems && report.actionItems.length > 0 ? (
              <div className="border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-500 font-medium text-[11px] uppercase tracking-wider">
                      <th className="p-3 px-4">Task Description</th>
                      <th className="p-3">Assignee</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {report.actionItems.map((act) => (
                      <tr key={act.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/10">
                        <td className="p-3 px-4 font-medium text-stone-850 dark:text-stone-200">{act.task}</td>
                        <td className="p-3 text-stone-500 dark:text-stone-400">{act.owner}</td>
                        <td className="p-3 text-stone-500 dark:text-stone-400">{act.dueDate}</td>
                        <td className="p-3">
                          <Badge variant={act.status === "Completed" ? "success" : "warning"}>
                            {act.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-stone-400 dark:text-stone-500 text-xs italic">No active action items extracted.</p>
            )}
          </section>

          {/* Transcript Section */}
          <section id="transcript" className="scroll-mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-[15px] font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <MessageSquare size={16} className="text-teal-650 dark:text-teal-400" />
                Full Transcript
              </h3>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-450 dark:text-stone-500" size={13} />
                <input
                  type="text"
                  placeholder="Search transcript..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8.5 pr-4 py-1.5 w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-xs text-stone-700 dark:text-stone-200 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 dark:focus:ring-teal-400 dark:focus:border-teal-400"
                />
              </div>
            </div>

            {filteredTranscript && filteredTranscript.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 border border-stone-100 dark:border-stone-850 p-4 rounded-xl bg-stone-50/20 dark:bg-stone-950/20">
                {filteredTranscript.map((line) => (
                  <div key={line.id} className="flex gap-4 items-start text-sm border-b border-stone-50 dark:border-stone-800/40 pb-3 last:border-b-0">
                    <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                      {line.time}
                    </span>
                    <div className="flex-1">
                      <span className="font-bold text-stone-800 dark:text-stone-200 block text-xs">
                        {line.speaker}
                      </span>
                      <p className="text-stone-600 dark:text-stone-350 mt-1 leading-relaxed text-xs">
                        {line.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
                <p className="text-xs text-stone-400 dark:text-stone-500">
                  {searchQuery ? "No matches found for search query." : "Transcript is currently empty or processing."}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default InteractiveReport;
