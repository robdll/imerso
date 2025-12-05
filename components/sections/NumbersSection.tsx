// FILE: @/components/sections/NumbersSection.tsx
import React from "react";

export const NumbersSection = () => {
  const stats = [
    {
      number: "31%",
      description: "Vendas mais rápidas com tour 360°",
    },
    {
      number: "85%",
      description: "Dos compradores preferem tours virtuais",
    },
    {
      number: "24/7",
      description: "Seu imóvel acessível a qualquer momento",
    },
  ];

  return (
    <section className="w-full flex justify-center px-6">
      <div 
        className="py-10 w-full xl:max-w-[1200px] xl:rounded-[20px]"
        style={{
          background: 'rgba(20, 20, 40, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="mx-auto px-6 max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center content-center text-center space-y-3"
            >
              <div
                className="text-[2.75rem] font-bold leading-none"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {stat.number}
              </div>
              <p className="text-[1.1rem] text-[#b0b0d0] max-w-xs">
                {stat.description}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};
