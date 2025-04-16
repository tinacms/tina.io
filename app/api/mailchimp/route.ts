import mailchimp from '@mailchimp/mailchimp_marketing';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email_address, status, merge_fields } = body;

    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });

    try {
      const response = await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_AUDIENCE_ID!,
        { email_address, status, merge_fields }
      );

      return NextResponse.json({ success: true, response }, { status: 200 });
    } catch (err: any) {
      const errorStatus = err.response ? err.response.status : 500;
      const errorMessage = err.response ? err.response.text : err.message;
      console.error('Mailchimp error:', errorMessage);

      return NextResponse.json(
        { error: true, message: errorMessage },
        { status: errorStatus }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: true, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
