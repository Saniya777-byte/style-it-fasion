"use client";

import React from "react";
import { cn } from "../../utils/cn";

export const Input = React.forwardRef(({
  className,
  type = "text",
  label,
  error,
  helperText,
  id,
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-zinc-200 dark:border-zinc-800",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">
          {error.message || error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
