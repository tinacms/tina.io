import { Template } from 'tinacms'
import { cloudinaryMediaComponent } from './CloudinaryMedia.template'
import { youtubeMediaTemplate } from './YoutubeMediaTemplate'

export const mediaComponentTemplate: Template = {
  label: 'Media Component',
  name: 'mediaComponent',
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'mediaItem',
      label: 'Media Item',
      type: 'object',
      list: true,
      templates: [
        cloudinaryMediaComponent as Template,
        youtubeMediaTemplate as Template,
      ]
    },
  ],
}
