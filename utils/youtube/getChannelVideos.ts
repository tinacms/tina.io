// Fetches the latest uploads from the TinaCMS YouTube channel via its public
// RSS feed (https://www.youtube.com/feeds/videos.xml). The feed needs no API
// key and has no quota, so the homepage "Recent Videos" section can stay
// current without anyone hand-editing content. Server-only.

// TinaCMS channel: https://www.youtube.com/@TinaCMS
export const TINACMS_YOUTUBE_CHANNEL_ID = 'UCUvqCjr8Xq_IRMDcuJrqIXA';
const TINACMS_YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@TinaCMS';

// Re-fetch the feed at most once an hour (ISR). Uploads are infrequent, so a
// longer window keeps build/runtime fetches cheap without going stale.
const REVALIDATE_SECONDS = 3600;

export interface ChannelVideo {
  embedUrl: string;
  title: string;
  dateReleased: string;
  authorName: string;
  authorUrl: string;
}

const decodeEntities = (text: string): string =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

// SSW video titles follow a "Video Title | Presenter Name" convention. Split
// the presenter off for the "By …" line and fall back to the channel name.
const splitTitleAndAuthor = (title: string): [string, string] => {
  const parts = title.split('|');
  if (parts.length > 1) {
    const author = parts.pop().trim();
    if (author) {
      return [parts.join('|').trim(), author];
    }
  }
  return [title, 'TinaCMS'];
};

const matchTag = (entry: string, tag: string): string | null => {
  const match = entry.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return match ? match[1] : null;
};

export async function getChannelVideos(
  count = 2,
  channelId: string = TINACMS_YOUTUBE_CHANNEL_ID,
  excludeVideoIds: string[] = [],
): Promise<ChannelVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) {
      return [];
    }

    const xml = await res.text();
    // Drop everything before the first <entry> (channel-level metadata).
    const entries = xml.split('<entry>').slice(1);
    const videos: ChannelVideo[] = [];

    for (const entry of entries) {
      const videoId = matchTag(entry, 'yt:videoId');
      const rawTitle = matchTag(entry, 'title');
      const published = matchTag(entry, 'published');

      if (!videoId || !rawTitle || !published) {
        continue;
      }
      if (excludeVideoIds.includes(videoId)) {
        continue;
      }

      const [videoTitle, authorName] = splitTitleAndAuthor(
        decodeEntities(rawTitle),
      );
      videos.push({
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        title: videoTitle,
        dateReleased: published,
        authorName,
        authorUrl: TINACMS_YOUTUBE_CHANNEL_URL,
      });

      if (videos.length >= count) {
        break;
      }
    }

    return videos;
  } catch {
    // Network flake / feed unavailable — caller falls back to curated content.
    return [];
  }
}
