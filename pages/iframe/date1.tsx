import { ContentTypeIframe } from 'components/content-type-iframe'

const code = `const field = {
  type: 'datetime',
  name: 'createdAt',
  label: 'Created At',
}
`

export default function Page() {
  return <ContentTypeIframe code={code} />
}
