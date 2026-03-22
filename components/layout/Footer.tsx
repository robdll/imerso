// FILE: @/components/layout/Footer.tsx
import Link from "next/link";
import { Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-900/50 backdrop-blur-sm pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link href="/" className="text-2xl font-bold tracking-wider block mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#764ba2]">
                IMERSO
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              Transformando a experiência imobiliária com tecnologia de ponta e design imersivo.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/360.imerso/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} imerso. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
