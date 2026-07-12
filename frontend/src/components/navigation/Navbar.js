"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bell, Search, Sun, Moon, Command } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { formatTimeAgo } from "../../utils/formatDate";

export function Navbar({ title }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  // Close notification dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const notifications = [
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
    <header className="h-14 border-b border-stone-200/80 bg-white/90 dark:border-stone-800/80 dark:bg-stone-925/90 backdrop-blur-lg px-6 flex items-center justify-between z-10 select-none flex-shrink-0">
      <h1 className="text-[15px] font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
        {title || "Dashboard"}
      </h1>

      <div className="flex items-center gap-1.5">
        {/* Search */}
        <div className="relative hidden md:block mr-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" size={14} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8.5 pr-4 py-1.5 w-48 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-[13px] text-stone-700 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 dark:focus:ring-teal-400 dark:focus:border-teal-400 transition-colors"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-stone-200 dark:border-stone-700 text-[9px] font-mono text-stone-400 dark:text-stone-500 bg-white dark:bg-stone-900 flex items-center gap-0.5 pointer-events-none">
            <Command size={8} />K
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-600 dark:hover:text-stone-200 transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-600 dark:hover:text-stone-200 transition-colors relative cursor-pointer"
            aria-label="View notifications"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-lg overflow-hidden z-20">
              <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
                <span className="text-[13px] font-semibold text-stone-900 dark:text-stone-100">
                  Notifications
                </span>
                <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-3 border-b border-stone-50 dark:border-stone-800/40 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors flex flex-col gap-1 cursor-pointer last:border-b-0"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className={`text-[13px] leading-snug ${notif.read ? "text-stone-500 dark:text-stone-400" : "font-medium text-stone-800 dark:text-stone-100"}`}>
                        {notif.text}
                      </span>
                      {!notif.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400 mt-1 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-stone-400 dark:text-stone-500">
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
