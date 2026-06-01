import { defineConfig } from 'tinacms';
import { schema } from './schema';

const tinaConfig = defineConfig({
  schema,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
    },
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: '',
    },
  },

  build: { outputFolder: 'admin', publicFolder: 'public' },

  repoProvider: {
    defaultBranchName: 'main',
    historyUrl: ({ relativePath, branch }) => ({
      url: `https://github.com/tinacms/tina.io/commits/${branch}/${relativePath}`,
    }),
  },
});

export default tinaConfig;
