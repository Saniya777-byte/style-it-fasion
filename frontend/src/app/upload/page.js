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

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setErrorMsg("");
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (formData) => {
    if (!selectedFile) {
      setErrorMsg("Please upload a meeting recording or document first.");
      return;
    }

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
      // Redirect to the processing timeline simulation
      router.push(ROUTES.PROCESSING);
    } catch (err) {
      setErrorMsg(err.message || "Failed to upload file.");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Upload Meeting Assets" />

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
                Upload New Meeting
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Upload raw video, calls, or chat scripts to extract compliance analytics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* File Drag Drop area */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {errorMsg && (
                <div className="p-3 border border-red-200 bg-red-50/50 rounded-xl text-xs text-red-650 font-semibold dark:bg-red-950/20 dark:border-red-900/40">
                  {errorMsg}
                </div>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Recording / Resource</CardTitle>
                  <CardDescription>Select the audio or video recording file of your conference call.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DragDropUpload 
                    onFileSelect={handleFileSelect} 
                    selectedFile={selectedFile} 
                    onClear={handleClearFile} 
                  />
                </CardContent>
              </Card>
            </div>

            {/* Details Form Card */}
            <div>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
                    <span>Audit Config</span>
                  </CardTitle>
                  <CardDescription>Provide meeting metadata and choose standard compliance checks.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <MeetingDetailsForm 
                    onSubmit={onSubmit} 
                    loading={loading} 
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
