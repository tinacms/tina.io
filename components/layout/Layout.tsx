import React, { useMemo } from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { usePlugin } from 'tinacms'
import { MarkdownCreatorPlugin } from '../../utils/plugins'
import { fileToUrl, slugify } from '../../utils'
import { Header, Footer } from '../layout'
import moment from 'moment'
import Cookies from 'js-cookie'

interface LayoutProps {
  children: any[]
  color?: 'white' | 'secondary' | 'seafoam'
  sourceProviderConnection: any
  editMode: boolean
}

export const Layout = styled(
  ({
    children,
    color,
    sourceProviderConnection,
    editMode,
    ...styleProps
  }: LayoutProps) => {
    const router = useRouter()

    const CreateBlogPlugin = useMemo(() => {
      return new MarkdownCreatorPlugin({
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
        githubOptions: sourceProviderConnection,
        isEditMode: editMode,
        frontmatter: postInfo => ({
          title: postInfo.title,
          date: moment(postInfo.date ? postInfo.date : new Date()).format(),
          author: postInfo.author ? postInfo.author : `Jane Doe`,
        }),
        body: postInfo => `New post, who dis?`,
        afterCreate: response => {
          let url = fileToUrl(response.content.path.split('content')[1], 'blog')

          window.location.href = `/blog/${url}`
        },
      })
    }, [editMode, sourceProviderConnection])

    if (Cookies.get('fork_full_name')) {
      usePlugin(CreateBlogPlugin)
    }

    return (
      <div {...styleProps}>
        <DefaultSeo
          openGraph={{
            url: 'https://tinacms.org' + router.asPath,
          }}
        />
        <Header color={color} />
        {children}
        <Footer editMode={editMode} />
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
