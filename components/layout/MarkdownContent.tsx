import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
// import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface MarkdownContentProps {
  content: string
  escapeHtml?: boolean // eq:false --> if the component needs to render html
  skipHtml?: boolean
}

function WithCodeStyles({ language, value }) {
  return (
    <SyntaxHighlighter language={language} style={prism}>
      {value}
    </SyntaxHighlighter>
  )
}

export function MarkdownContent({
  content,
  escapeHtml,
  skipHtml,
}: MarkdownContentProps) {
  return (
    <ReactMarkdown
      escapeHtml={escapeHtml ? escapeHtml : true}
      skipHtml={skipHtml ? skipHtml : false}
      source={content}
      renderers={{ code: WithCodeStyles }}
    />
  )
}
