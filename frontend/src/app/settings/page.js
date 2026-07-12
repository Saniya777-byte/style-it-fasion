"use client";

import React, { useState } from "react";
import { Shield, User, BellRing } from "lucide-react";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [gdprChecked, setGdprChecked] = useState(true);
  const [hipaaChecked, setHipaaChecked] = useState(true);
  const [socChecked, setSocChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToastMsg("Workspace configurations successfully synchronized.");
      setTimeout(() => setToastMsg(""), 3000);
    }, 800);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-950 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Workspace Settings" />

        <main className="p-6 max-w-4xl w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50 tracking-tight">
              Settings & Configurations
            </h2>
            <p className="text-[13px] text-stone-400 dark:text-stone-500 mt-0.5">
              Configure compliance guidelines, user details, and notification thresholds
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Navigation options in Settings */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4.5 py-2.5 rounded-lg text-left font-medium text-[13px] transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-300"
                    : "text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-850 hover:text-stone-950 dark:hover:text-stone-200"
                }`}
              >
                <User size={15} />
                <span>Account Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("compliance")}
                className={`flex items-center gap-3 px-4.5 py-2.5 rounded-lg text-left font-medium text-[13px] transition-all cursor-pointer ${
                  activeTab === "compliance"
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-300"
                    : "text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-850 hover:text-stone-950 dark:hover:text-stone-200"
                }`}
              >
                <Shield size={15} />
                <span>Compliance Rules</span>
              </button>
              <button
                onClick={() => setActiveTab("alerts")}
                className={`flex items-center gap-3 px-4.5 py-2.5 rounded-lg text-left font-medium text-[13px] transition-all cursor-pointer ${
                  activeTab === "alerts"
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-300"
                    : "text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-850 hover:text-stone-950 dark:hover:text-stone-200"
                }`}
              >
                <BellRing size={15} />
                <span>Alerts & Logs</span>
              </button>
            </div>

            {/* Core Settings content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Enterprise Profile</CardTitle>
                    <CardDescription>Update your personal details and company metadata.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input id="userName" label="Full Name" defaultValue="Alex Rivera" />
                      <Input id="userRole" label="Corporate Role" defaultValue="Compliance Officer" />
                    </div>
                    <Input id="userMail" type="email" label="Corporate Email" defaultValue="alex@enterprise.ai" disabled />
                    <Input id="userCompany" label="Company" defaultValue="Aether Technologies" />
                    <div className="pt-2">
                      <Button onClick={handleSave} loading={saving} className="w-full">
                        Save profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "compliance" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Audits Frameworks</CardTitle>
                    <CardDescription>Select which regulatory systems are cross-examined during transcription.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                      <div>
                        <p className="text-xs font-semibold text-stone-850 dark:text-stone-200">GDPR Protocol (v2)</p>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">Enforces data boundaries and customer cross-border transmission rules.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={gdprChecked}
                        onChange={() => setGdprChecked(!gdprChecked)}
                        className="rounded border-stone-300 dark:border-stone-700 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                      <div>
                        <p className="text-xs font-semibold text-stone-855 dark:text-stone-200">HIPAA Security Addendum</p>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">Enforces patient confidentiality and PII transmission logs.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={hipaaChecked}
                        onChange={() => setHipaaChecked(!hipaaChecked)}
                        className="rounded border-stone-300 dark:border-stone-700 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                      <div>
                        <p className="text-xs font-semibold text-stone-855 dark:text-stone-200">SOC 2 Type II System Controls</p>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">Enforces transaction tracking, database logs, and identity audits.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={socChecked}
                        onChange={() => setSocChecked(!socChecked)}
                        className="rounded border-stone-300 dark:border-stone-700 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                    </div>

                    <div className="pt-2">
                      <Button onClick={handleSave} loading={saving} className="w-full">
                        Save configurations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "alerts" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Alerts & Logs</CardTitle>
                    <CardDescription>Setup threshold metrics for critical audit triggers.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 rounded-lg text-xs text-stone-500 dark:text-stone-400">
                      Notifications and Webhook logs will be rendered in a future enterprise update.
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-xl bg-teal-600 text-white shadow-lg border border-teal-500/30 animate-pulse text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          {toastMsg}
        </div>
      )}
    </div>
  );
}
