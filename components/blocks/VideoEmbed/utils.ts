export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) return embedMatch[1];

  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];

  const generalMatch = url.match(/youtube\.com\/.*[?&]v=([^&]+)/);
  if (generalMatch) return generalMatch[1];

  return null;
}
