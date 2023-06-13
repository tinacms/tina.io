import { defineConfig } from 'tinacms'
import { schema } from './schema'

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
    //@ts-ignore
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-cloudinary')
      return pack.TinaCloudCloudinaryMediaStore
    },
  },

  build: { outputFolder: 'admin', publicFolder: 'public' },
  cmsCallback: (cms) => {
    import('react-tinacms-editor').then(({ MarkdownFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin)
    })
    cms.flags.set('branch-switcher', true)

    // import('tinacms').then(({ RouteMappingPlugin }) => {
    //   const RouteMapping = new RouteMappingPlugin((collection, document) => {
    //     if (['page'].includes(collection.name)) {
    //       if (document._sys.filename === 'home') {
    //         return `/`
    //       }
    //       return `/${document._sys.filename}`
    //     }

    //     if (['post'].includes(collection.name)) {
    //       return `/blog/${document._sys.filename}`
    //     }

    //     return undefined
    //   })

    //   cms.plugins.add(RouteMapping)
    // })
    return cms
  },
})

export default tinaConfig
