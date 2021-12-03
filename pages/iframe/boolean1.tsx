import { ContentTypeIframe } from 'components/content-type-iframe'

const code = `const field = {
  type: 'boolean',
  name: 'published',
  label: 'Published',
}
`

export default function Page() {
  return <ContentTypeIframe code={code} />
}
