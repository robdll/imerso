// FILE: @/components/ui/Button.tsx
import React from "react";
// import { cn } from "@/lib/utils";
// Since I haven't created lib/utils.ts, I'll use template literals or create the utility.
// The prompt didn't explicitly ask for cn/clsx but it's standard. I'll stick to template literals for simplicity or create a simple helper if needed.
// Actually, I'll just use template literals to avoid extra file creation unless I need it.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-[#764ba2] text-white shadow-lg hover:shadow-primary/40",
    ghost:
      "bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
