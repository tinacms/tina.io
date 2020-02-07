import Link, { LinkProps } from 'next/link'
import { string } from 'prop-types'

type ExtraProps = Omit<LinkProps, 'as' | 'href'>

interface DynamicLinkProps extends ExtraProps {
  href: string
  children: any
}

export const DynamicLink = ({ children, href, ...props }: DynamicLinkProps) => {
  const dynamicHref = getDynamicUrl(href)
  return (
    <Link href={dynamicHref} as={href} {...props}>
      {children}
    </Link>
  )
}

const getDynamicUrl = (url: string) => {
  const docsPattern = new RegExp('(.)?/docs/(.)+')
  if (docsPattern.test(url)) {
    return '/docs/[...slug]'
  }

  const blogIndexPattern = new RegExp('(.)?/blog/page/[0-9]+')
  if (blogIndexPattern.test(url)) {
    return '/blog/page/[page_index]'
  }

  const blogPattern = new RegExp('(.)?/blog/(.)+')
  if (blogPattern.test(url)) {
    return '/blog/[slug]'
  }

  return url
}
