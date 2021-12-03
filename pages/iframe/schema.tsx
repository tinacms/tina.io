import Sandpack from '../../components/sandpack3'

const content = `---
title: Hello, World!
---`

const page = `import { useGraphqlForms } from 'tinacms'
export default function({query}) {
  const [response, isLoading]= useGraphqlForms({query: gql => gql(query), variables: {}})

  if(isLoading) {
    return <div>Loading...</div>
  }

  return <h1>{response.getPostDocument.data.title}</h1>
}
`

const query = `query GetPost {
  getPostDocument(relativePath: "hello-world.md") {
    data {
      title
    }
  }
}`

const schema = `const stringField = {
  type: 'string',
  name: 'title',
  label: 'Title',
}

const schema = {
  collections: [
    {
      label: 'Post',
      name: 'post',
      path: "posts",
      fields: [stringField],
    },
  ],
}`

export default function Page() {
  return (
    <Sandpack
      id="schema1"
      schema={schema}
      content={content}
      query={query}
      Page={page}
    />
  )
}
