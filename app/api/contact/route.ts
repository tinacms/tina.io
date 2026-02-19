import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, referralSource, message } =
      body;

    if (!email || !message) {
      return NextResponse.json(
        { error: true, message: 'Email and message are required.' },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'N/A';

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_FORM_TO,
      replyTo: email,
      subject: `TinaCMS Contact Form: ${fullName}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Company: ${company || 'N/A'}`,
        `How did you hear about us: ${referralSource || 'N/A'}`,
        '',
        `Message:`,
        message,
      ].join('\n'),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: true, message: 'Failed to send message.' },
      { status: 500 },
    );
  }
}
