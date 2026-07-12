"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { meetingService } from "../../services/meeting.service";
import { ROUTES } from "../../constants";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import DragDropUpload from "../../components/upload/DragDropUpload";
import MeetingDetailsForm from "../../components/forms/MeetingDetailsForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileSelect = (file) => { setSelectedFile(file); setErrorMsg(""); };
  const handleClearFile = () => { setSelectedFile(null); };

  const onSubmit = async (formData) => {
    if (!selectedFile) { setErrorMsg("Please upload a recording first."); return; }
    setLoading(true);
    setErrorMsg("");
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("title", formData.title);
      data.append("company", formData.company);
      data.append("country", formData.country);
      data.append("complianceFramework", formData.complianceFramework);
      data.append("language", formData.language);
      data.append("date", formData.date);
      await meetingService.uploadMeeting(data);
      router.push(ROUTES.PROCESSING);
    } catch (err) {
      setErrorMsg(err.message || "Upload failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-950 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Upload Meeting" />
        <main className="p-4 sm:p-6 max-w-4xl w-full mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link href={ROUTES.DASHBOARD} className="p-2 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0">
              <ArrowLeft size={15} />
            </Link>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50 tracking-tight">Upload New Meeting</h2>
              <p className="text-[13px] text-stone-400 dark:text-stone-500 mt-0.5">Upload recordings to extract compliance analytics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-1">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {errorMsg && (
                <div className="p-3 border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-950/20 rounded-lg text-[13px] text-red-600 dark:text-red-400 font-medium">{errorMsg}</div>
              )}
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Recording</CardTitle>
                  <CardDescription>Select the audio or video recording file.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DragDropUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} onClear={handleClearFile} />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles size={14} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />Audit Config
                  </CardTitle>
                  <CardDescription>Provide metadata and choose compliance checks.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <MeetingDetailsForm onSubmit={onSubmit} loading={loading} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
