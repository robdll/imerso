// FILE: @/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all ${className}`}
      {...props}
    />
  );
};
