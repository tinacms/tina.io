import { authorImagePath, pickLlama } from 'utils/og/authorImages';

export interface BlogAvatar {
  src: string;
  // Some mapped authors have no photo file yet.
  fallbackSrc: string;
}

export function blogAvatar(
  author: string | null | undefined,
  slugPath: string,
): BlogAvatar {
  const llama = pickLlama(slugPath);
  return { src: authorImagePath(author) ?? llama, fallbackSrc: llama };
}
