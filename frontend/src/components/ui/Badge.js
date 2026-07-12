import React from "react";
import { cn } from "../../utils/cn";

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}) {
  const base = "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border whitespace-nowrap";

  const variants = {
    primary: "bg-teal-50 border-teal-200/60 text-teal-700 dark:bg-teal-950/30 dark:border-teal-800/50 dark:text-teal-300",
    secondary: "bg-stone-100 border-stone-200 text-stone-600 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-300",
    success: "bg-emerald-50 border-emerald-200/60 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800/50 dark:text-emerald-300",
    warning: "bg-amber-50 border-amber-200/60 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800/50 dark:text-amber-300",
    danger: "bg-red-50 border-red-200/60 text-red-700 dark:bg-red-950/30 dark:border-red-800/50 dark:text-red-300",
    info: "bg-sky-50 border-sky-200/60 text-sky-700 dark:bg-sky-950/30 dark:border-sky-800/50 dark:text-sky-300",
    neutral: "bg-stone-50 border-stone-200 text-stone-500 dark:bg-stone-800/40 dark:border-stone-700/40 dark:text-stone-400",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

export default Badge;
