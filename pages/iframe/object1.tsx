import { ContentTypeIframe } from 'components/content-type-iframe'

const code = `const field = {
  type: 'object',
  name: 'seo',
  label: 'SEO',
  fields: [{
    type: 'string',
    name: 'title',
    label: 'Title',
  }, {
    type: 'string',
    name: 'description',
    label: 'Description',
  }]
}
`

export default function Page() {
  return <ContentTypeIframe code={code} />
}
