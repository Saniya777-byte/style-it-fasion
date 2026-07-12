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
          className="text-[13px] font-medium text-stone-600 dark:text-stone-400"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg border bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 dark:focus:ring-teal-400/20 dark:focus:border-teal-400 transition-colors duration-150",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500/15 dark:border-red-500"
            : "border-stone-200 dark:border-stone-700",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-[13px] text-red-500 dark:text-red-400 font-medium">
          {error.message || error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-[13px] text-stone-400 dark:text-stone-500">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
