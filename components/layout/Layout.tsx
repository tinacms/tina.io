import React, { useMemo } from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { usePlugin } from 'tinacms'
import { MarkdownCreatorPlugin } from '../../utils/plugins'
import { fileToUrl, slugify } from '../../utils'
import { Header, Footer } from '../layout'
import moment from 'moment'

interface LayoutProps {
  children: any[]
  color?: 'white' | 'secondary' | 'seafoam'
  preview: boolean
}

export const Layout = styled(
  ({ children, color, preview, ...styleProps }: LayoutProps) => {
    const router = useRouter()

    const CreateBlogPlugin = useMemo(
      () =>
        new MarkdownCreatorPlugin({
          label: 'New Blog Post',
          filename: form => {
            const slug = slugify(form.title)
            return `content/blog/${slug}.md`
          },
          fields: [
            {
              name: 'title',
              component: 'text',
              label: 'Title',
              placeholder: 'My New Post',
              description: 'The title of the new blog post.',
            },
            {
              label: 'Date',
              name: 'date',
              component: 'date',
              description: 'The default will be today',
            },
            {
              label: 'Author',
              description: 'Who wrote this, yo?',
              name: 'author',
              component: 'text',
            },
          ],
          frontmatter: postInfo => ({
            title: postInfo.title,
            date: moment(postInfo.date ? postInfo.date : new Date()).format(),
            author: postInfo.author ? postInfo.author : `Jane Doe`,
          }),
          body: postInfo => `New post, who dis?`,
          afterCreate: response => {
            let url = fileToUrl(
              response.content.path.split('content')[1],
              'blog'
            )

            window.location.href = `/blog/${url}`
          },
        }),
      [preview]
    )

    usePlugin(CreateBlogPlugin)
    usePlugin(ReleaseNotesCreatorPlugin)

    return (
      <div {...styleProps}>
        <DefaultSeo
          openGraph={{
            url: 'https://tinacms.org' + router.asPath,
          }}
        />
        <Header color={color} />
        {children}
        <Footer preview={preview} />
      </div>
    )
  }
)`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 auto;
  min-height: 100%;
`

const ReleaseNotesCreatorPlugin = new MarkdownCreatorPlugin({
  label: 'New Release Notes',
  filename: form => {
    console.log(form.date)
    const slug = slugify(form.title)
    return `content/blog/${slug}.md`
  },
  fields: [
    {
      name: 'title',
      component: 'text',
      label: 'Title',
      placeholder: 'My New Post',
    },
    {
      label: 'Date',
      name: 'date',
      component: 'date',
      description: 'The default will be today',
    },
    {
      label: 'Author',
      name: 'author',
      component: 'text',
      validate(name) {
        if (!name) return "Please enter the author's name."
      },
    },
  ],
  frontmatter: postInfo => ({
    title: postInfo.title,
    date: moment(postInfo.date ? postInfo.date : new Date()).format(),
    author: postInfo.author ? postInfo.author : `Jane Doe`,
  }),
  body: () => DEFAULT_RELEASE_NOTES_BODY,
  afterCreate: response => {
    let url = fileToUrl(response.content.path.split('content')[1], 'blog')

    window.location.href = `/blog/${url}`
  },
})
const DEFAULT_RELEASE_NOTES_BODY = `

* What is the core team's current objectives?
* What was accomplished in the last week?
* What's next for the core team?
* Link to any relevant projects

## Changes

### New Packages

### Features

### Bug Fixes

### Deprecations

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
| | |
| | |
| | |
| | |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/1?closed=1) for all the details on this weeks release!
`
