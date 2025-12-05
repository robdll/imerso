// FILE: @/components/layout/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Serviços", href: "#features" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,15,0.8)] backdrop-blur-md border-b border-white/10 py-3">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#764ba2]">
            IMERSO
          </span>
          <span className="text-xs text-slate-400 block tracking-[0.2em] uppercase">
            Tours 360
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-slate-300 hover:text-primary transition-colors text-sm font-medium relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-[#764ba2] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="primary" className="px-5 py-2 text-sm">
            Agendar Demo
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[rgba(10,10,15,0.95)] backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top-5 duration-300">
          <ul className="flex flex-col items-center gap-6 text-xl">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-200 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            variant="primary"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-64"
          >
            Agendar Demo
          </Button>
        </div>
      )}
    </nav>
  );
};
