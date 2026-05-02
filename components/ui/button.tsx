"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c6fff] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#7c6fff] text-white hover:-translate-y-0.5 hover:bg-[#8d81ff] shadow-[0_8px_24px_rgba(124,111,255,0.35)]",
        outline:
          "border border-[#7c6fff]/50 bg-white/0 text-[#d9d5ff] hover:-translate-y-0.5 hover:border-[#7c6fff] hover:text-white",
        glow: "border border-[#00d4ff]/60 bg-[#050508] text-[#c9f6ff] shadow-[0_0_0_1px_rgba(0,212,255,0.25),0_0_24px_rgba(0,212,255,0.25)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,212,255,0.4),0_0_34px_rgba(0,212,255,0.32)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3",
        lg: "h-12 px-6",
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
