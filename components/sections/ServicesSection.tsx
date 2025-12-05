// FILE: @/components/sections/ServicesSection.tsx
import { Share2, Monitor, Bell } from "lucide-react";

const services = [
  {
    icon: Share2,
    title: "Compartilhamento Instantâneo",
    description: "Receba link direto, QR Code profissional e cards prontos para Instagram e WhatsApp. Compartilhe em segundos.",
  },
  {
    icon: Monitor,
    title: "Instalamos no Seu Site",
    description: "Tem site? Incorporamos o tour para você. Não tem? Criamos uma landing page profissional no nosso domínio.",
  },
  {
    icon: Bell,
    title: "Suporte Sempre que Precisar",
    description: "Não sabe como adicionar no OLX ou Zap Imóveis? Ligamos para você e resolvemos juntos. Sem complicação.",
  },
];

const includedFeatures = [
  "Tutorial personalizado em vídeo",
  "Suporte via WhatsApp",
  "Material gráfico para divulgação",
];

export const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 relative">
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
            Você Não Precisa Saber de Tecnologia
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a0a0f0 100%)',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Cuidamos de tudo: da captura até o tour estar no ar e vendendo para você
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="services-card group relative rounded-xl p-8 transition-all duration-300"
                style={{
                  background: 'rgba(20, 20, 40, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-[#b0b0d0] leading-relaxed text-base">
                  {service.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-[#764ba2]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Container */}
        <div
          className="max-w-6xl mx-auto rounded-xl p-8 transition-all duration-300"
          style={{
            background: 'rgba(15, 15, 30, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
            Todos os planos incluem:
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-[#b0b0d0]">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-white text-lg">✓</span>
                <span className="text-base">{feature}</span>
                {index < includedFeatures.length - 1 && (
                  <span className="hidden md:inline text-[#666] mx-2">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
