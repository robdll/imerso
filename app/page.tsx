// FILE: @/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { NumbersSection } from "@/components/sections/NumbersSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricesSection } from "@/components/sections/PricesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <HeroSection />
      
      <NumbersSection />
      
      <HowItWorksSection />


      <FeaturesSection />
      
      <ServicesSection />
      
      <PricesSection />
      
      <ContactSection />
      
      <CTASection />
      
      <Footer />
      
      <WhatsAppButton />
    </main>
  );
}
