"use client";

import React, { useState } from "react";
import { Bell, Search, Sun, Moon, Calendar, Command } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { formatTimeAgo } from "../../utils/formatDate";

export function Navbar({ title }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const mockNotifications = [
    { id: 1, text: "Report 'Q3 Financial Review' is ready", time: new Date(Date.now() - 1000 * 60 * 15).toISOString(), read: false },
    { id: 2, text: "Compliance risk detected in 'Aether Sec'", time: new Date(Date.now() - 1000 * 60 * 120).toISOString(), read: false },
    { id: 3, text: "Verification audit logs uploaded", time: new Date(Date.now() - 1000 * 60 * 600).toISOString(), read: true }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header className="h-16 border-b border-zinc-150 bg-white/80 dark:border-zinc-850 dark:bg-zinc-950/80 backdrop-blur-md px-6 flex items-center justify-between z-10 select-none">
      {/* Title / Breadcrumb */}
      <div>
        <h1 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
          {title || "Dashboard"}
        </h1>
      </div>

      {/* Action Items */}
      <div className="flex items-center gap-4">
        {/* Search Input Simulation */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={15} />
          <input
            type="text"
            placeholder="Search reports or transcripts..."
            className="pl-9.5 pr-4 py-1.5 w-64 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-[9px] font-mono text-zinc-400 bg-white dark:bg-zinc-950 flex items-center gap-0.5 pointer-events-none">
            <Command size={8} />K
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors relative cursor-pointer"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-zinc-950" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden z-20">
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
                <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  Recent Alerts
                </span>
                <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer">
                  Mark all read
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-zinc-50 dark:border-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors flex flex-col gap-1 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-xs ${notif.read ? "text-zinc-650" : "font-semibold text-zinc-900 dark:text-zinc-100"}`}>
                        {notif.text}
                      </span>
                      {!notif.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      {formatTimeAgo(notif.time)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
