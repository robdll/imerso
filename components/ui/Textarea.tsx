// FILE: @/components/ui/Textarea.tsx
import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = ({ className = "", ...props }: TextareaProps) => {
  return (
    <textarea
      className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none ${className}`}
      {...props}
    />
  );
};
