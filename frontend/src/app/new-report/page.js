"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, FileText, ClipboardList } from "lucide-react";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ROUTES } from "../../constants";

export default function NewReportOptions() {
  const router = useRouter();

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Initiate Meeting Audit" />

        <main className="p-6 max-w-4xl w-full mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link 
              href={ROUTES.DASHBOARD}
              className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Create New Audit Report
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Select your preferred input format to trigger the Veritas AI engine
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Option 1: File Uploader */}
            <Card 
              hoverable
              onClick={() => router.push(ROUTES.UPLOAD)}
              className="p-6 flex flex-col items-center text-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center transition-all group-hover:scale-105">
                <Upload size={24} />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Upload Meeting Recording</CardTitle>
                <CardDescription className="text-xs max-w-xs mx-auto mt-2 leading-relaxed">
                  Support for MP4 videos, MP3 logs, or WAV calls. Automatically extracts speakers, transcripts, and checks compliance.
                </CardDescription>
              </div>
              <Button size="sm" variant="outline" className="mt-2">
                Browse Files
              </Button>
            </Card>

            {/* Option 2: Document / Manual text */}
            <Card 
              hoverable
              onClick={() => router.push(ROUTES.UPLOAD)} // Falls back to same upload layout
              className="p-6 flex flex-col items-center text-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-650 dark:text-emerald-400 flex items-center justify-center transition-all group-hover:scale-105">
                <FileText size={24} />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Import Meeting Document</CardTitle>
                <CardDescription className="text-xs max-w-xs mx-auto mt-2 leading-relaxed">
                  Upload PDF transcripts, Zoom chat exports, or DOCX minutes. Extracts insights without needing audio parsing.
                </CardDescription>
              </div>
              <Button size="sm" variant="outline" className="mt-2">
                Upload Document
              </Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
