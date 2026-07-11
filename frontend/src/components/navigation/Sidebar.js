"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Upload, 
  ShieldCheck, 
  Users, 
  Settings, 
  LogOut,
  FolderOpen,
  Volume2
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";
import { cn } from "../../utils/cn";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: "Upload Meeting", href: ROUTES.UPLOAD, icon: Upload },
    { name: "Compliance Hub", href: ROUTES.COMPLIANCE, icon: ShieldCheck },
    { name: "Speaker Analysis", href: ROUTES.SPEAKER_ANALYSIS, icon: Users },
    { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-zinc-150/80 bg-zinc-50/50 dark:border-zinc-850/80 dark:bg-zinc-950/20 backdrop-blur-md flex flex-col h-full">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-900">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
          V
        </div>
        <span className="font-bold text-zinc-900 dark:text-zinc-100 tracking-tight text-lg">
          Veritas AI
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5">
        <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
          Platform Navigation
        </span>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-indigo-50/80 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-l-2 border-indigo-600"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              <Icon size={18} className={cn("transition-transform group-hover:scale-105", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-650")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Session Footer */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-3">
        {user && (
          <div className="flex items-center gap-3 px-2 py-1">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                {user.name}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                {user.role}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 transition-all cursor-pointer"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
