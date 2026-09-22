import { type NextRequest, NextResponse } from 'next/server';
import { htmlToMarkdown } from '../../../utils/markdownContent';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  if (!path?.startsWith('/') || path.startsWith('//')) {
    return NextResponse.json({ error: 'Invalid page path' }, { status: 400 });
  }

  const pageUrl = new URL(path, request.nextUrl.origin);
  if (pageUrl.origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Invalid page path' }, { status: 400 });
  }

  const headers = new Headers({ accept: 'text/html' });
  for (const name of ['authorization', 'cookie']) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  const page = await fetch(pageUrl, { headers });
  const html = await page.text();

  return new NextResponse(htmlToMarkdown(html), {
    status: page.status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
