// FILE: @/components/sections/PricesSection.tsx
"use client";

import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Plan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  priceAsterisk?: boolean;
  startingFromLabel?: string;
};

const plans: Plan[] = [
  {
    name: "Essencial",
    price: "450",
    period: "por imóvel",
    features: [
      "Tour 360° interativo",
      "Até 80m²",
      "5-8 ambientes",
      "Link + QR Code profissional",
      "Cards para redes sociais",
      "Tutorial de uso em vídeo",
      "Entrega em 48h",
    ],
    popular: false,
  },
  {
    name: "Profissional",
    price: "1.000",
    period: "por imóvel",
    priceAsterisk: true,
    startingFromLabel: "A partir de",
    features: [
      "Tour 360° premium",
      "Até 250m²",
      "Ambientes ilimitados",
      "Fotos HDR incluídas",
      "Planta baixa interativa",
      "Incorporação no seu site",
      "Landing page dedicada",
      "Suporte técnico prioritário",
      "Entrega em 24h",
    ],
    popular: true,
  },
  {
    name: "Empresarial",
    price: "1.450",
    period: "por projeto",
    priceAsterisk: true,
    startingFromLabel: "A partir de",
    features: [
      "Tour 360° ultra premium",
      "Metragem ilimitada",
      "Edição avançada",
      "Vídeo promocional",
      "Drone (área externa)",
      "Presença digital completa",
      "Material gráfico profissional",
      "Configuração de anúncios",
      "Gerente de conta dedicado",
    ],
    popular: false,
  },
];

export const PricesSection = () => {
  return (
    <section id="precos" className="py-24 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#764ba2]/20 rounded-full blur-[100px] -z-10 animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a0a0f0 100%)',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Planos & Preços
          </h2>
          <p className="text-lg text-[#b0b0d0] max-w-2xl mx-auto">
            Escolha o pacote ideal para o seu projeto
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="prices-card relative rounded-xl p-8 transition-all duration-300"
              style={{
                background: 'rgba(20, 20, 40, 0.4)',
                backdropFilter: 'blur(10px)',
                border: plan.popular 
                  ? '2px solid rgba(102, 126, 234, 0.5)' 
                  : '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  MAIS POPULAR
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="text-center mb-2">
                {plan.startingFromLabel && (
                  <p className="text-xs font-medium text-[#9090c0] uppercase tracking-wider mb-1">
                    {plan.startingFromLabel}
                  </p>
                )}
                <span
                  className="text-5xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  R$ {plan.price}
                  {plan.priceAsterisk && (
                    <sup
                      className="text-2xl ml-0.5 align-super"
                      aria-label="Preço inicial; valores podem variar"
                    >
                      *
                    </sup>
                  )}
                </span>
                <p className="text-sm text-[#b0b0d0] mt-2">{plan.period}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 my-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[#b0b0d0] text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant="primary"
                className="w-full mt-8"
                onClick={() =>
                  window.open("https://wa.me/5571982839384", "_blank")
                }
              >
                Contratar
              </Button>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-[#764ba2]/0 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
