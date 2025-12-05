// FILE: @/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { NumbersSection } from "@/components/sections/NumbersSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <HeroSection />
      
      <NumbersSection />
      
      

      <FeaturesSection />
      
      <ContactSection />
      
      <Footer />
      
      <WhatsAppButton />
    </main>
  );
}
