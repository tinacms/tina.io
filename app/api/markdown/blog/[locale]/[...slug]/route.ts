import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { locale: string; slug: string[] } },
) {
  const { locale, slug } = params;
  if (locale !== 'en' && locale !== 'zh') {
    return NextResponse.json({ error: 'Unknown locale' }, { status: 404 });
  }

  const contentRoot = path.join(
    process.cwd(),
    'content',
    locale === 'zh' ? 'blog-zh' : 'blog',
  );
  const filePath = path.join(contentRoot, `${slug.join('/')}.mdx`);

  if (!filePath.startsWith(`${contentRoot}${path.sep}`)) {
    return NextResponse.json({ error: 'Invalid blog path' }, { status: 400 });
  }

  try {
    const source = await readFile(filePath, 'utf8');
    return new NextResponse(source, {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 },
      );
    }
    throw error;
  }
}
