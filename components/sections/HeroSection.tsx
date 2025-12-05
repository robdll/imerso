// FILE: @/components/sections/HeroSection.tsx
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#764ba2]/20 rounded-full blur-[100px] -z-10 animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Tours 360° Interativos para
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#764ba2]">
              Imóveis
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Transforme espaços em experiências imersivas. Aumente suas vendas permitindo que clientes visitem imóveis de qualquer lugar do mundo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="primary" className="text-lg px-8 py-4">
              Ver Demonstração
            </Button>
            <Button variant="ghost" className="text-lg px-8 py-4">
              Fale Conosco
            </Button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#764ba2] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
             <Image
              src="https://placehold.co/600x400/png"
              alt="Tour 360 Demo"
              width={600}
              height={400}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/40 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <span className="text-white font-semibold tracking-wider">360° VIEW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
