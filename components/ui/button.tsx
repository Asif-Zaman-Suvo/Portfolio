"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30",
        outline:
          "border border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md",
        glow:
          "border border-indigo-200/80 bg-white text-indigo-700 shadow-sm hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-7 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
