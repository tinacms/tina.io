import { TinaField } from "tinacms";

export const WhatsNewFields: TinaField[] = [
    { name: 'versionNumber', label: 'Version Number', type: 'string' },
    { name: 'dateReleased', label: 'Date Released', type: 'datetime' },
    {
      name: 'body',
      label: 'Body',
      type: 'rich-text',
      isBody: true,
      description:
        'The content of the release notes. Note that h1-h5 are the same size (i.e text-lg in tailwind).',
    },
  ]