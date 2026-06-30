import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"JHON PIPELINE Site Web" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL ?? 'infos@jhonpipeline.com',
    replyTo: email,
    subject: `[Devis Site Web] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #0891b2; margin-bottom: 24px;">Nouvelle demande de devis depuis le site web</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151; width: 140px;">Nom :</td><td style="padding: 8px 0; color: #111827;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email :</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0891b2;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Sujet :</td><td style="padding: 8px 0; color: #111827;">${subject}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <h3 style="color: #374151; margin-bottom: 12px;">Détails du projet :</h3>
        <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #9ca3af; font-size: 12px;">Message envoyé depuis jhonpipeline.com</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
