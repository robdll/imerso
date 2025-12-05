// FILE: @/components/sections/FeaturesSection.tsx
import React from "react";
import { Card } from "@/components/ui/Card";
import { Scan, Smartphone, Clock, TrendingUp, Share2, Globe } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Imersão Total",
    description: "Permita que seus clientes explorem cada detalhe do imóvel como se estivessem lá.",
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Funciona perfeitamente em computadores, tablets e smartphones.",
  },
  {
    icon: Clock,
    title: "Visitas 24/7",
    description: "Seu imóvel disponível para visitação a qualquer hora do dia ou da noite.",
  },
  {
    icon: TrendingUp,
    title: "Mais Conversão",
    description: "Imóveis com tour virtual recebem mais propostas qualificadas.",
  },
  {
    icon: Share2,
    title: "Fácil Compartilhamento",
    description: "Envie links por WhatsApp ou incorpore diretamente em seu site.",
  },
  {
    icon: Globe,
    title: "Alcance Global",
    description: "Atraia compradores de qualquer lugar do mundo sem barreiras geográficas.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Por que escolher a imerso?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tecnologia de ponta para destacar seus imóveis no mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 group hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-[#764ba2]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                <feature.icon className="text-primary w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
