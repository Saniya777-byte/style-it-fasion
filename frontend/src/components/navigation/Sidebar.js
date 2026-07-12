"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  ShieldCheck,
  Users,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";
import { cn } from "../../utils/cn";

const navItems = [
  { name: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: "Upload", href: ROUTES.UPLOAD, icon: Upload },
  { name: "Compliance", href: ROUTES.COMPLIANCE, icon: ShieldCheck },
  { name: "Speakers", href: ROUTES.SPEAKER_ANALYSIS, icon: Users },
  { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-full border-r border-stone-200/80 bg-stone-50 dark:border-stone-800/80 dark:bg-stone-925 transition-all duration-200 ease-out flex-shrink-0",
        collapsed ? "w-[68px]" : "w-60"
      )}
    >
      {/* Brand */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-stone-100 dark:border-stone-800 flex-shrink-0">
        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-teal-650 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            V
          </div>
          {!collapsed && (
            <span className="font-semibold text-stone-900 dark:text-stone-100 tracking-tight text-[15px] whitespace-nowrap">
              Veritas
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer hidden lg:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft size={15} /> : <PanelLeftClose size={15} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {!collapsed && (
          <span className="px-2.5 text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
            Navigation
          </span>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== ROUTES.DASHBOARD && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 group relative",
                collapsed ? "px-2.5 py-2.5 justify-center" : "px-2.5 py-2",
                isActive
                  ? "bg-stone-200/60 text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                  : "text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-stone-700 dark:hover:text-stone-200"
              )}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-3 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2 flex-shrink-0">
        {user && !collapsed && (
          <div className="flex items-center gap-2.5 px-2.5 py-1.5">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-teal-650 text-white flex items-center justify-center font-semibold text-xs ring-1 ring-stone-200 dark:ring-stone-700">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <p className="text-[13px] font-medium text-stone-700 dark:text-stone-200 truncate">
                {user.name}
              </p>
              <p className="text-[11px] text-stone-400 dark:text-stone-500 truncate">
                {user.email || user.role}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          title={collapsed ? "Sign out" : undefined}
          className={cn(
            "flex items-center gap-2.5 w-full rounded-lg text-[13px] font-medium text-stone-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer",
            collapsed ? "px-2.5 py-2.5 justify-center" : "px-2.5 py-2"
          )}
        >
          <LogOut size={15} />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
