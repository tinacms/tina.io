import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  cookies().delete('__prerender_bypass');
  cookies().delete('__next_preview_data');
  
  return new NextResponse(null, { status: 200 });
}
