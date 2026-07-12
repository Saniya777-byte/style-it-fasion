"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Card = React.forwardRef(({
  className,
  children,
  hoverable = false,
  onClick,
  ...props
}, ref) => {
  const Component = onClick ? motion.div : "div";

  const cardStyles = cn(
    "rounded-xl border border-stone-200/80 bg-white dark:border-stone-800/80 dark:bg-stone-900 shadow-card overflow-hidden",
    hoverable && "hover:shadow-card-hover hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-200",
    onClick && "cursor-pointer",
    className
  );

  const animationProps = onClick ? {
    whileHover: { y: -1 },
    whileTap: { scale: 0.995 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } : {};

  return (
    <Component
      ref={ref}
      className={cardStyles}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = "Card";

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn("px-6 py-5 border-b border-stone-100 dark:border-stone-800", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn("text-[15px] font-semibold tracking-tight text-stone-900 dark:text-stone-100", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={cn("text-[13px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed", className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn("px-6 py-5", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn("px-6 py-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50", className)} {...props}>
    {children}
  </div>
);

export default Card;
