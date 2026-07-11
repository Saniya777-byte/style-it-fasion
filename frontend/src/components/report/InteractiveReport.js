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
  Check, 
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
  const [zoomLevel, setZoomLevel] = useState(100); // percentage 80% to 150%

  const sections = [
    { id: "summary", label: "Executive Summary", icon: FileText },
    { id: "decisions", label: "Key Decisions", icon: HelpCircle },
    { id: "actions", label: "Action Items", icon: ListTodo },
    { id: "transcript", label: "Full Transcript", icon: MessageSquare }
  ];

  // Filtered transcript lines based on search query
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
      {/* Table of Contents / Sidebar (Sticky) */}
      <aside className="w-full lg:w-64 flex-shrink-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sticky top-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 px-2">
          Report Directory
        </h4>
        <nav className="flex flex-col gap-1">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  // Scroll to anchor on mobile/smaller screens
                  const element = document.getElementById(sec.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} />
                  <span>{sec.label}</span>
                </div>
                {isActive && <ChevronRight size={13} />}
              </button>
            );
          })}
        </nav>

        {/* Action controls inside Sidebar */}
        <div className="border-t border-zinc-100 dark:border-zinc-900 mt-4 pt-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 px-2 mb-1">
            Display Settings
          </span>
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">Zoom: {zoomLevel}%</span>
            <div className="flex gap-1">
              <button 
                onClick={() => handleZoom("out")} 
                disabled={zoomLevel <= 90}
                className="p-1 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 cursor-pointer"
              >
                <ZoomOut size={13} />
              </button>
              <button 
                onClick={() => handleZoom("in")} 
                disabled={zoomLevel >= 140}
                className="p-1 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 cursor-pointer"
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
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <Badge variant={report.complianceScore >= 90 ? "success" : report.complianceScore >= 75 ? "warning" : "danger"}>
              {report.complianceScore ? `Compliance: ${report.complianceScore}%` : "Pending Compliance"}
            </Badge>
            <span className="text-xs text-zinc-400 dark:text-zinc-550">
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
          className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-sm print:shadow-none print:border-none space-y-8"
          style={{ fontSize: `${zoomLevel}%` }}
        >
          {/* Executive Summary */}
          <section id="summary" className="scroll-mt-6 border-b border-zinc-100 dark:border-zinc-900 pb-8">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <FileText size={18} className="text-indigo-600 dark:text-indigo-400" />
              Executive Summary
            </h3>
            <p className="text-zinc-655 dark:text-zinc-350 leading-relaxed text-sm">
              {report.summary}
            </p>
          </section>

          {/* Key Decisions */}
          <section id="decisions" className="scroll-mt-6 border-b border-zinc-100 dark:border-zinc-900 pb-8">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <HelpCircle size={18} className="text-indigo-600 dark:text-indigo-400" />
              Key Decisions
            </h3>
            {report.keyDecisions && report.keyDecisions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.keyDecisions.map((dec) => (
                  <div key={dec.id} className="p-4 border border-zinc-100 dark:border-zinc-900 rounded-xl bg-zinc-50/40 dark:bg-zinc-950/20">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
                      Decision
                    </p>
                    <p className="text-zinc-800 dark:text-zinc-300 text-sm leading-relaxed mb-3">
                      {dec.text}
                    </p>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">
                      Agreed by: {dec.agreedBy}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 dark:text-zinc-500 text-xs italic">No major decisions recorded in this session.</p>
            )}
          </section>

          {/* Action Items */}
          <section id="actions" className="scroll-mt-6 border-b border-zinc-100 dark:border-zinc-900 pb-8">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <ListTodo size={18} className="text-indigo-600 dark:text-indigo-400" />
              Action Items
            </h3>
            {report.actionItems && report.actionItems.length > 0 ? (
              <div className="border border-zinc-150 dark:border-zinc-850 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-150 dark:border-zinc-850 text-zinc-500 dark:text-zinc-400 font-semibold">
                      <th className="p-3">Task Description</th>
                      <th className="p-3">Assignee</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {report.actionItems.map((act) => (
                      <tr key={act.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                        <td className="p-3 font-semibold text-zinc-850 dark:text-zinc-200">{act.task}</td>
                        <td className="p-3 text-zinc-500 dark:text-zinc-400">{act.owner}</td>
                        <td className="p-3 text-zinc-500 dark:text-zinc-400">{act.dueDate}</td>
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
              <p className="text-zinc-400 dark:text-zinc-500 text-xs italic">No active action items extracted.</p>
            )}
          </section>

          {/* Transcript Section */}
          <section id="transcript" className="scroll-mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-600 dark:text-indigo-400" />
                Full Transcript
              </h3>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={13} />
                <input
                  type="text"
                  placeholder="Search transcript..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8.5 pr-4 py-1.5 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {filteredTranscript && filteredTranscript.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 border border-zinc-100 dark:border-zinc-900/60 p-4 rounded-2xl bg-zinc-50/10 dark:bg-zinc-950/10">
                {filteredTranscript.map((line) => (
                  <div key={line.id} className="flex gap-4 items-start text-sm border-b border-zinc-50 dark:border-zinc-900/30 pb-3 last:border-b-0">
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                      {line.time}
                    </span>
                    <div className="flex-1">
                      <span className="font-bold text-zinc-900 dark:text-zinc-200 block text-xs">
                        {line.speaker}
                      </span>
                      <p className="text-zinc-650 dark:text-zinc-350 mt-1 leading-relaxed text-xs">
                        {line.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                <p className="text-xs text-zinc-450 dark:text-zinc-550">
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
