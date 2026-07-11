"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function Progress({
  value = 0,
  max = 100,
  className,
  color = "bg-indigo-600",
  showValue = false,
  ...props
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      <div className={cn("relative w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden", className)} {...props}>
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {showValue && (
        <div className="flex justify-end mt-1">
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default Progress;
