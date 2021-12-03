import Sandpack from '../../components/sandpack3'

const content = `---
tags: music, movies
---`

const page = `import { useGraphqlForms } from 'tinacms'
export default function({query}) {
  const [response, isLoading]= useGraphqlForms({query: gql => gql(query), variables: {}})

  if(isLoading) {
    return <div>Loading...</div>
  }

  return <ul>{response.getPostDocument.data.tags.map(tag => <li>{tag}</li>)}</ul>
}
`

const query = `query GetPost {
  getPostDocument(relativePath: "hello-world.md") {
    data {
      tags
    }
  }
}`

const schema = `const stringField = {
  type: 'string',
  list: true,
  name: 'tags',
  label: 'Tags',
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
      id="schema2"
      schema={schema}
      content={content}
      query={query}
      Page={page}
    />
  )
}
