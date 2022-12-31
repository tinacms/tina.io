import GithubSlugger from 'github-slugger'
import { Children, createElement, ReactNode } from 'react'
import type { HeadingProps } from 'react-markdown/lib/ast-to-react'
import styled from 'styled-components'
import LinkSvg from '../../public/svg/link.svg'

export const MarkdownHeading = ({ children, level }: HeadingProps) => {
  const value = textFromChildren(children)

  const slugger = new GithubSlugger()
  const slug = slugger.slug(value)

  return createElement(
    `h${level}`,
    { id: slug },
    <>
      <HeadingLink href={`#${slug}`} aria-label={value} className="anchor">
        <LinkSvg />
      </HeadingLink>
      {children}
    </>
  )
}

/**
 * Return the flattened text value for the specified children.
 *
 * @see https://github.com/remarkjs/react-markdown/issues/404#issuecomment-604019030
 */
const textFromChildren = (children: ReactNode | ReactNode[]): string => {
  const flatten = (text: string, child: JSX.Element) => {
    return typeof child === 'string'
      ? text + child
      : Children.toArray(child.props.children).reduce(flatten, text)
  }

  return Children.toArray(children).reduce(flatten, '')
}

const HeadingLink = styled.a`
  fill: var(--color-secondary);
  opacity: 0;
  display: flex;
  align-items: center;
  position: absolute;
  top: 1rem;
  left: -0.25rem;
  height: 1.3em;
  transform: translate3d(-100%, 0, 0);
  transition: all 180ms ease-out;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover,
  &:focus,
  *:hover > & {
    opacity: 1;
  }
`
