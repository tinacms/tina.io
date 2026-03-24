import sgMail from '@sendgrid/mail';
import { type NextRequest, NextResponse } from 'next/server';

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

    const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, CONTACT_FORM_TO } =
      process.env;

    if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL || !CONTACT_FORM_TO) {
      console.error('Missing required SendGrid environment variables');
      return NextResponse.json(
        { error: true, message: 'Server configuration error.' },
        { status: 500 },
      );
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'N/A';

    await sgMail.send({
      from: SENDGRID_FROM_EMAIL,
      to: CONTACT_FORM_TO,
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
