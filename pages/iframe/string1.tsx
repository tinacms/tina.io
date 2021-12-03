import { ContentTypeIframe } from 'components/content-type-iframe'

const code = `defineSchema({
  collections: [{
    label: 'Some Collection',
    name: 'someCollection',
    format: 'json',
    path: 'some-path',
    fields: [
      {
        type: 'string',
        name: 'title',
        label: 'Title',
      }
    ],
  }]
})`

const code2 = `---
title: Hello, World!
---`

const query = `{
  getDocumentFields
}`

export default function Page() {
  return <ContentTypeIframe code={code} code2={code2} code3={query} />
}
