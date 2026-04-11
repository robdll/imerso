// FILE: @/components/layout/Navbar.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const Navbar = () => {
  const navLinks = [
    { name: "Como Funciona", href: "#como-funciona" },
    { name: "Preços", href: "#precos" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,15,0.8)] backdrop-blur-md border-b border-white/10 py-3"
      aria-label="Principal"
    >
      <div className="container mx-auto px-6 flex md:grid md:grid-cols-3 justify-between md:justify-normal items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider transition-transform duration-300 hover:scale-105">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#764ba2]">
            IMERSO
          </span>
          <span className="text-xs text-slate-400 block tracking-[0.2em] uppercase">
            Tours 360
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center justify-center">
          <ul className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-[#e0e0f0] hover:text-primary transition-colors text-[1.2rem] font-medium relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-[#764ba2] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: demo right; Mobile: demo only (no hamburger) */}
        <div className="flex items-center justify-end md:justify-end">
          <Link href="/demo">
            <Button variant="primary" className="px-4 py-2 text-sm md:px-5">
              Ver Demonstração
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
