import { NextResponse } from 'next/server';
import { getChannelVideos } from '@/utils/youtube/getChannelVideos';

// Proxies the YouTube Data API so the homepage "Recent Videos" block can fetch
// the latest uploads client-side without exposing the API key. Returns the
// latest few uploads; the client drops the featured video and keeps two.
const CACHE_TTL = 86400; // 1 day in seconds

// Let our Cache-Control headers govern edge caching (see below) rather than
// static route caching.
export const dynamic = 'force-dynamic';

export async function GET() {
  const videos = await getChannelVideos(3);

  // Cache a good response at the edge for a day, but never cache an empty one —
  // otherwise a single transient failure would be frozen in the CDN for hours.
  const cacheControl = videos.length
    ? `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL}`
    : 'public, max-age=0, s-maxage=0, must-revalidate';

  return NextResponse.json(videos, {
    headers: { 'Cache-Control': cacheControl },
  });
}
