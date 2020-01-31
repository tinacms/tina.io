import matter from 'gray-matter'

export default async function fetchBlogs() {
  const posts = (context => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((key: string, index: number) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const post = matter(value.default)
      console.log(JSON.stringify(post))
      return {
        data: { ...post.data, slug },
        content: post.content,
      }
    })

    return data
  })((require as any).context('../content/blog', true, /\.md$/))

  return posts
}
