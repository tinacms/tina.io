export type TinaPackage = {
  name: string;
  description: string;
};

export const TINA_PACKAGES: TinaPackage[] = [
  { name: 'tinacms', description: 'Core TinaCMS runtime' },
  {
    name: '@tinacms/cli',
    description: 'CLI for dev, build, and admin generation',
  },
  { name: '@tinacms/app', description: 'Admin UI bundle' },
  { name: '@tinacms/auth', description: 'Self-hosted auth utilities' },
  { name: '@tinacms/datalayer', description: 'Self-hosted datalayer' },
  { name: '@tinacms/graphql', description: 'GraphQL engine' },
  { name: '@tinacms/mdx', description: 'MDX parser' },
  { name: '@tinacms/metrics', description: 'Metrics collector' },
  { name: '@tinacms/schema-tools', description: 'Schema utilities' },
  { name: '@tinacms/scripts', description: 'Build scripts' },
  { name: '@tinacms/search', description: 'Search feature' },
  {
    name: '@tinacms/vercel-previews',
    description: 'Vercel Previews integration',
  },
  { name: '@tinacms/webpack-helpers', description: 'Webpack helpers' },
  { name: 'tinacms-authjs', description: 'Auth.js integration' },
  { name: 'tinacms-clerk', description: 'Clerk integration' },
  { name: 'tinacms-gitprovider-github', description: 'GitHub git provider' },
  { name: 'next-tinacms-azure', description: 'Azure media adapter' },
  { name: 'next-tinacms-cloudinary', description: 'Cloudinary media adapter' },
  {
    name: 'next-tinacms-dos',
    description: 'DigitalOcean Spaces media adapter',
  },
  { name: 'next-tinacms-s3', description: 'S3 media adapter' },
  { name: 'create-tina-app', description: 'Project bootstrap tool' },
];
