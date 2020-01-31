import matter from 'gray-matter'

export default async function fetchDocs() {
  const docs = (context => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((_key: string, index: number) => {
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const doc = matter(value.default)
      return doc
    })

    return data
  })((require as any).context('../content/docs', true, /\.md$/))

  return docs
}
