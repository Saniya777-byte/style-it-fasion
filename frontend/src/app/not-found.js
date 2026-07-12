"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";
import { ROUTES } from "../constants";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 font-sans select-none">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-6">
        {/* Visual 404 logo */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900 shadow-md">
            <HelpCircle size={40} className="animate-bounce" />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-indigo-600 text-white font-black text-xs px-2 py-0.5 rounded-full shadow">
            404
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Record Out of Range
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 max-w-sm mx-auto leading-relaxed">
            The page you are trying to view does not exist or has been shifted. Check the URL or return to safety.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link href={ROUTES.DASHBOARD} className="w-full sm:w-auto">
            <Button variant="primary" className="w-full flex items-center justify-center gap-2 cursor-pointer">
              <Home size={15} />
              <span>Back to Workspace</span>
            </Button>
          </Link>
          <Link href={ROUTES.LANDING} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 cursor-pointer">
              <ArrowLeft size={15} />
              <span>Home Page</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
