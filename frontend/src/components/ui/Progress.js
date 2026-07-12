"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function Progress({
  value = 0,
  max = 100,
  className,
  color = "bg-teal-600 dark:bg-teal-400",
  showValue = false,
  ...props
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      <div className={cn("relative w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden", className)} {...props}>
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {showValue && (
        <div className="flex justify-end mt-1.5">
          <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 tabular-nums">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default Progress;
