import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
/*
 ** A few Prism themes to choose from
 ** that I thought looked fine. I think
 ** the og prism one looks best.
 ** once we know what were goin with, let's
 ** delete the unused imports.
 **/
import {
  base16AteliersulphurpoolLight,
  coy,
  duotoneLight,
  tomorrow,
  prism,
  hopscotch,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Code from '../styles/Code'

interface MarkdownContentProps {
  content: string
}

function WithCodeStyles({ language, value }) {
  return (
    <SyntaxHighlighter language={language} style={prism}>
      {value}
    </SyntaxHighlighter>
  )
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return <ReactMarkdown source={content} renderers={{ code: WithCodeStyles }} />
}
