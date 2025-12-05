// FILE: @/components/ui/Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:border-white/40 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
