// FILE: @/components/sections/HeroSection.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "@/components/sections/HeroVideo";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#764ba2]/20 rounded-full blur-[100px] -z-10 animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Tours 360°{" "}
            </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Interativos
            </span>
          </h1>
          
          <p className="text-xl text-[#b0b0d0] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Transforme Seus Espaços em Experiências Virtuais Imersivas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="#contact">
              <Button variant="primary" className="text-lg px-8 py-4">
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#764ba2] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
            <HeroVideo />
          </div>
        </div>
      </div>
    </section>
  );
};
