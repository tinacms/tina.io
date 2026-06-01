// utils/blog/getBlogPost.ts
import type { BlogPost } from 'components/blog/BlogType';
import client from 'tina/__generated__/client';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import type { Locale } from 'utils/i18n/localeRouteConfig';

function buildPost(fetchedPost: {
  _sys: BlogPost['_sys'];
  id: string;
  title: string;
  date?: string | null;
  last_edited?: string | null;
  author?: string | null;
  seo?: { title?: string | null; description?: string | null } | null;
  prev?: { id: string; title: string } | null;
  next?: { id: string; title: string } | null;
  body?: unknown;
}): BlogPost {
  return {
    _sys: fetchedPost._sys,
    id: fetchedPost.id,
    title: fetchedPost.title,
    date: fetchedPost.date || '',
    last_edited: fetchedPost.last_edited ?? null,
    author: fetchedPost.author || '',
    seo: fetchedPost.seo
      ? {
          title: fetchedPost.seo.title || 'Default SEO Title',
          description: fetchedPost.seo.description || 'Default SEO Description',
        }
      : null,
    prev: fetchedPost.prev ?? null,
    next: fetchedPost.next ?? null,
    body: fetchedPost.body as TinaMarkdownContent,
    giscusProps: {
      giscusRepo: `${process.env.GISCUS_ORG}/${process.env.GISCUS_REPO_NAME}`,
      giscusRepoId: process.env.GISCUS_REPO_ID,
      giscusCategory: process.env.GISCUS_CATEGORY,
      giscusCategoryId: process.env.GISCUS_CATEGORY_ID,
      giscusThemeUrl: process.env.GISCUS_THEME_URL,
    },
  };
}

export async function getBlogPost(locale: Locale, slugPath: string) {
  const vars = { relativePath: `${slugPath}.mdx` };

  if (locale === 'zh') {
    const res = await client.queries.getExpandedPostZhDocument(vars);
    const fetchedPost = res.data.postZh;
    if (!fetchedPost) {
      return {
        post: null,
        query: res.query,
        variables: res.variables,
        data: res.data,
      };
    }
    const post = buildPost(fetchedPost);
    return { post, query: res.query, variables: res.variables, data: res.data };
  }

  const res = await client.queries.getExpandedPostDocument(vars);
  const fetchedPost = res.data.post;
  if (!fetchedPost) {
    return {
      post: null,
      query: res.query,
      variables: res.variables,
      data: res.data,
    };
  }
  const post = buildPost(fetchedPost);
  return { post, query: res.query, variables: res.variables, data: res.data };
}
