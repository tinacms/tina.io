export const TINACMS_YOUTUBE_CHANNEL_ID = 'UCUvqCjr8Xq_IRMDcuJrqIXA';
const TINACMS_YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@TinaCMS';

const DEFAULT_CHANNEL_VIDEO_COUNT = 2;

export interface ChannelVideo {
  embedUrl: string;
  title: string;
  dateReleased: string;
  authorName: string;
  authorUrl: string;
}

const uploadsPlaylistId = (channelId: string): string =>
  `UU${channelId.slice(2)}`;

const decodeEntities = (text: string): string =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

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

export async function getChannelVideos(
  count = DEFAULT_CHANNEL_VIDEO_COUNT,
  channelId: string = TINACMS_YOUTUBE_CHANNEL_ID,
  excludeVideoIds: string[] = [],
): Promise<ChannelVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn(
      '[getChannelVideos] YOUTUBE_API_KEY is not set; falling back to curated videos.',
    );
    return [];
  }

  try {
    const params = new URLSearchParams({
      part: 'snippet',
      playlistId: uploadsPlaylistId(channelId),
      maxResults: String(count + excludeVideoIds.length + 2),
      key: apiKey,
    });
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params}`,
      { cache: 'no-store' },
    );
    if (!res.ok) {
      throw new Error(
        `Data API responded with ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();
    const items: any[] = Array.isArray(data.items) ? data.items : [];
    const videos: ChannelVideo[] = [];

    for (const item of items) {
      const snippet = item?.snippet;
      const videoId = snippet?.resourceId?.videoId;
      const rawTitle = snippet?.title;
      const published = snippet?.publishedAt;

      if (!videoId || !rawTitle || !published) {
        continue;
      }
      if (excludeVideoIds.includes(videoId)) {
        continue;
      }
      if (rawTitle === 'Private video' || rawTitle === 'Deleted video') {
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
  } catch (error) {
    console.warn(
      `[getChannelVideos] Could not load the YouTube Data API, falling back to curated videos: ${
        error instanceof Error ? error.message : error
      }`,
    );
    return [];
  }
}
