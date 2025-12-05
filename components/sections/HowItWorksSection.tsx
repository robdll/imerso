// FILE: @/components/sections/HowItWorksSection.tsx
const steps = [
  {
    number: "1",
    title: "Agendamento",
    description: "Entre em contato conosco e agende a captura do seu imóvel. Processo rápido, sem complicação.",
  },
  {
    number: "2",
    title: "Captura Profissional",
    description: "Nossa equipe realiza a captura em 360° com equipamento de última geração. Duração média: 1-2 horas.",
  },
  {
    number: "3",
    title: "Entrega Digital",
    description: "Em até 48h, você recebe o tour completo, pronto para compartilhar e incorporar em seu site ou redes sociais.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a0a0f0 100%)',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Como Funciona
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a0a0f0 100%)',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Do agendamento à entrega, um processo simples e profissional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="how-it-works-card group relative rounded-xl p-8 transition-all duration-300"
              style={{
                background: 'rgba(20, 20, 40, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Numbered Icon */}
              <div className="mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {step.number}
                </div>
              </div>

              {/* Card Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>

              {/* Card Description */}
              <p className="text-[#b0b0d0] leading-relaxed text-base">
                {step.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-[#764ba2]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
