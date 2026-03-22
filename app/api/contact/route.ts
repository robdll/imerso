import { Resend } from "resend";
import { NextResponse } from "next/server";

function sanitizeSubject(value: string): string {
  return value.trim().slice(0, 200).replace(/[\r\n]/g, " ");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.RESEND_TO_EMAIL;

    if (!apiKey || !from || !to) {
      return NextResponse.json(
        { error: "Email não configurado no servidor." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Imerso] ${sanitizeSubject(subject)}`,
      text: [
        `Nome: ${name}`,
        `Email do remetente: ${email}`,
        "",
        `Assunto: ${subject}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend:", error);
      return NextResponse.json(
        { error: "Não foi possível enviar. Tente novamente." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar. Tente novamente." },
      { status: 500 }
    );
  }
}
