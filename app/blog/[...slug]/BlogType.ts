import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';

interface Sys {
  filename: string;
  basename: string;
  breadcrumbs: string[];
  path: string;
  relativePath: string;
  extension: string;
}

interface Seo {
  title: string;
  description: string;
}

interface PostSummary {
  id: string;
  title: string;
}

interface GiscusProps {
  giscusRepo: `${string}/${string}`;
  giscusRepoId: string;
  giscusCategory: string;
  giscusCategoryId: string;
  giscusThemeUrl: string;
}

export interface BlogPost {
  _sys: Sys;
  id: string;
  title: string;
  date: string;
  last_edited: string | null;
  author: string;
  seo: Seo | null;
  prev: PostSummary | null;
  next: PostSummary | null;
  body: TinaMarkdownContent;
  giscusProps: GiscusProps;
}

export interface BlogPageClientProps {
  data: {
    post: BlogPost;
  };
  variables: any;
  query: string;
}
