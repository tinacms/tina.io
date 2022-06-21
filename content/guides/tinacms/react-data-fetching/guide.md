---
title: Querying Tina Content Client-side in React
last_edited: '2022-04-08T10:00:00.000Z'
---

## Fetch data client-side

> In fetching content on the server (SSR), or at build time (SSG) is preferred and faster but in some cases you may still want to get data client-side at runtime.

Here's an example of data-fetching client-side, on a React site

```jsx
import { useState, useEffect } from 'react'
import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../PathToTina/.tina/client'
// This query can be any query
const query = `
query ContentQuery($relativePath: String!) {
  <collection.name>(relativePath: $relativePath) {
    body
    title
  }
}
`

// Variables used in the GraphQL query;
const variables = {
  relativePath: 'HelloWorld.md',
}

export default function BlogPostPage() {
  const [initialData, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      const data = await client.request({ query, variables })
      setData(data?.data)
      setLoading(false)
    }
    fetchContent()
  }, [query, JSON.stringify(variables)])

  const { data } = useTina({ query, variables, data: initialData })

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return <div>{JSON.stringify(data)}</div>
}
```
