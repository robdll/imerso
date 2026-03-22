// FILE: @/components/sections/CTASection.tsx
"use client";

import { Button } from "@/components/ui/Button";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Pronto para Imerso?
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#b0b0d0] leading-relaxed">
            Transforme a forma como você apresenta imóveis. Fale conosco hoje e receba uma proposta personalizada.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-4">
            <Button
              variant="primary"
              className="text-lg px-8 py-4"
              onClick={() => {
                window.open("https://wa.me/5571982839384", "_blank");
              }}
            >
              Whatsapp
            </Button>
          </div>

          {/* Secondary CTA */}
          <p className="text-base text-[#b0b0d0]">
            ou envie um email para:{" "}
            <a
              href="mailto:360imerso@gmail.com"
              className="text-primary hover:text-[#764ba2] transition-colors underline"
            >
              360imerso@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
