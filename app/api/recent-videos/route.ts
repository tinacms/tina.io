import { NextResponse } from 'next/server';
import { getChannelVideos } from '@/utils/youtube/getChannelVideos';

const CACHE_TTL = 86400;

export const dynamic = 'force-dynamic';

export async function GET() {
  const videos = await getChannelVideos(3);

  const cacheControl = videos.length
    ? `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL}`
    : 'public, max-age=0, s-maxage=0, must-revalidate';

  return NextResponse.json(videos, {
    headers: { 'Cache-Control': cacheControl },
  });
}
