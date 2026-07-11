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
    "rounded-2xl border border-zinc-150/80 bg-white/70 dark:border-zinc-850/80 dark:bg-zinc-950/70 backdrop-blur-md shadow-sm overflow-hidden",
    hoverable && "hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-hover",
    onClick && "cursor-pointer",
    className
  );

  const animationProps = onClick ? {
    whileHover: { y: -2, scale: 1.005 },
    whileTap: { scale: 0.995 },
    transition: { type: "spring", stiffness: 400, damping: 20 }
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
  <div className={cn("p-5 border-b border-zinc-100 dark:border-zinc-900", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn("text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-zinc-500 dark:text-zinc-400 mt-1.5", className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-5", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn("p-5 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20", className)} {...props}>
    {children}
  </div>
);

export default Card;
