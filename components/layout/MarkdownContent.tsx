import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
// import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import CodeStyle from '../styles/Code'

import LinkSvg from '../../public/svg/link.svg'
import styled from 'styled-components'

var GithubSlugger = require('github-slugger')

interface MarkdownContentProps {
  content: string
  escapeHtml?: boolean // eq:false --> if the component needs to render html
  skipHtml?: boolean
}

function WithCodeStyles({ language, value }) {
  return (
    <SyntaxHighlighter language={language} style={CodeStyle}>
      {value}
    </SyntaxHighlighter>
  )
}

function WithHeadings({ children, level }) {
  const HeadingTag = `h${level}` as any
  const value = children[0].props.value
  var slugger = new GithubSlugger()
  const slug = slugger.slug(value)
  return (
    <HeadingTag id={slug}>
      <HeadingLink href={`#${slug}`} aria-label={value} className="anchor">
        <LinkSvg />
      </HeadingLink>
      {value}
    </HeadingTag>
  )
}

const HeadingLink = styled.a`
  fill: var(--color-secondary);
  opacity: 0;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
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

export function MarkdownContent({
  content,
  escapeHtml,
  skipHtml,
}: MarkdownContentProps) {
  return (
    <ReactMarkdown
      escapeHtml={escapeHtml === false ? escapeHtml : true}
      skipHtml={skipHtml ? skipHtml : false}
      source={content}
      renderers={{ code: WithCodeStyles, heading: WithHeadings }}
    />
  )
}

MarkdownContent.defaultProps = {
  escapeHtml: true,
  skipHtml: false,
}
