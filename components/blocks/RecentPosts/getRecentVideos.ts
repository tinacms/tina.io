import {
  type ChannelVideo,
  getChannelVideos,
} from '@/utils/youtube/getChannelVideos';
import { extractYouTubeId } from '../VideoEmbed/utils';

// Server-side data for the Recent Posts block, co-located with the block.
//
// This can't run inside the block itself: the block renders in the client
// `useTina` tree (so it can't be an async server component), and the YouTube
// RSS feed sends no CORS headers, so a browser fetch would be blocked. So the
// route server-fetches here and passes the result down as a prop — which also
// keeps the videos in the initial HTML.
//
// Returns [] when the page has no Recent Posts block, so the extra fetch only
// happens on pages that actually use it.
export async function getRecentVideos(page: any): Promise<ChannelVideo[]> {
  const block = page?.blocks?.find(
    (b) => b.__typename === 'PageBlocksRecentPosts',
  );
  if (!block) {
    return [];
  }

  // Exclude the editorially chosen featured video so it never appears twice.
  const featuredId = extractYouTubeId(block.featuredPost?.url);
  return getChannelVideos(2, undefined, featuredId ? [featuredId] : []);
}
