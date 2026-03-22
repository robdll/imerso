// FILE: @/components/sections/ContactSection.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Erro ao enviar.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Erro de rede. Tente novamente.");
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Vamos transformar seus imóveis?
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Entre em contato conosco para agendar uma demonstração ou solicitar um orçamento personalizado. Nossa equipe está pronta para atender você.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <a
                    href="mailto:360imerso@gmail.com"
                    className="text-white font-medium hover:text-primary transition-colors"
                  >
                    360imerso@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">WhatsApp</p>
                  <a
                    href="https://wa.me/5571982839384"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-primary transition-colors"
                  >
                    +55 71 9 82839384
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 md:p-10 bg-white/5 backdrop-blur-xl border-white/10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">Nome</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-300">Assunto</label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Como podemos ajudar?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">Mensagem</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {status === "success" && (
                <p className="text-sm text-emerald-400" role="status">
                  Mensagem enviada. Entraremos em contato em breve.
                </p>
              )}
              {status === "error" && errorMessage && (
                <p className="text-sm text-red-400" role="alert">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                className="w-full py-4 text-base"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando…" : "Enviar Mensagem"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
