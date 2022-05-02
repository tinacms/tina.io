import { defineConfig } from 'tinacms'
import schema from './schema'
export const tinaConfig = defineConfig({
  schema,
  apiURL: process.env.NEXT_PUBLIC_TINA_ENDPOINT,
  // @ts-ignore
  cmsCallback: cms => {
    import('react-tinacms-editor').then(({ MarkdownFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin)
    })
    cms.flags.set('tina-admin', true)
    cms.flags.set('rich-text-alt', true)
    cms.flags.set('branch-switcher', true)

    import('tinacms').then(({ RouteMappingPlugin }) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (['page'].includes(collection.name)) {
          if (document._sys.filename === 'home') {
            return `/`
          }
          return `/${document._sys.filename}`
        }

        if (['post'].includes(collection.name)) {
          return `/blog/${document._sys.filename}`
        }

        return undefined
      })

      cms.plugins.add(RouteMapping)
    })
    return cms
  },
  mediaStore: async () => {
    // Load media store dynamically so it only loads in edit mode
    const pack = await import('next-tinacms-cloudinary')
    return pack.TinaCloudCloudinaryMediaStore
  },
})
