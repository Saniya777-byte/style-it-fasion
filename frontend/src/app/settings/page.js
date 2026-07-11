"use client";

import React, { useState } from "react";
import { Settings, Shield, User, BellRing, Key } from "lucide-react";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function SettingsPage() {
  const [gdprChecked, setGdprChecked] = useState(true);
  const [hipaaChecked, setHipaaChecked] = useState(true);
  const [socChecked, setSocChecked] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Settings successfully saved to your workspace.");
    }, 800);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Navbar title="Workspace Settings" />

        <main className="p-6 max-w-4xl w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-550 tracking-tight">
              Settings & Configurations
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              Configure compliance guidelines, user details, and notification thresholds
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Navigation options in Settings */}
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 text-left font-semibold text-xs transition-all">
                <User size={16} />
                <span>Account Profile</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 text-left font-semibold text-xs transition-all">
                <Shield size={16} />
                <span>Compliance Rules</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 text-left font-semibold text-xs transition-all">
                <BellRing size={16} />
                <span>Alerts & Logs</span>
              </button>
            </div>

            {/* Core Settings content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account profile */}
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
                </CardContent>
              </Card>

              {/* Compliance toggles */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Audits Frameworks</CardTitle>
                  <CardDescription>Select which regulatory systems are cross-examined during transcription.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-900 rounded-xl">
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">GDPR Protocol (v2)</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Enforces data boundaries and customer cross-border transmission rules.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={gdprChecked} 
                      onChange={() => setGdprChecked(!gdprChecked)}
                      className="rounded border-zinc-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-900 rounded-xl">
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">HIPAA Security Addendum</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Enforces patient confidentiality and PII transmission logs.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={hipaaChecked} 
                      onChange={() => setHipaaChecked(!hipaaChecked)}
                      className="rounded border-zinc-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-900 rounded-xl">
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">SOC 2 Type II System Controls</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Enforces transaction tracking, database logs, and identity audits.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={socChecked} 
                      onChange={() => setSocChecked(!socChecked)}
                      className="rounded border-zinc-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer" 
                    />
                  </div>

                  <div className="pt-2">
                    <Button onClick={handleSave} loading={saving} className="w-full">
                      Save configurations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
