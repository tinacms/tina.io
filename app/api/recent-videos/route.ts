import { NextResponse } from 'next/server';
import { getChannelVideos } from '@/utils/youtube/getChannelVideos';

// Proxies the TinaCMS YouTube RSS feed so the homepage "Recent Videos" block
// can fetch it client-side (the feed sends no CORS headers, so the browser
// can't call YouTube directly). Returns the latest few uploads; the client
// drops the featured video and keeps two.
const CACHE_TTL = 86400; // 1 day in seconds
export const revalidate = CACHE_TTL;

export async function GET() {
  const videos = await getChannelVideos(3);

  return NextResponse.json(videos, {
    headers: {
      'Cache-Control': `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL}`,
    },
  });
}
