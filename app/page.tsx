// FILE: @/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <HeroSection />
      
      {/* Portfolio Section Placeholder - Could be a separate component or part of Features for now */}
      <section id="portfolio" className="py-12 bg-black/20">
         {/* This is a placeholder for the portfolio section mentioned in nav but not explicitly detailed in component breakdown 
             beyond the nav link. I'll add a simple placeholder or just let it be. 
             The prompt asked for specific sections, I'll stick to those but ensure the ID exists for scrolling. */}
      </section>

      <FeaturesSection />
      
      <ContactSection />
      
      <Footer />
      
      <WhatsAppButton />
    </main>
  );
}
