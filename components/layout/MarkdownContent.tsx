import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
// Need this to render tables
import remarkGfm from 'remark-gfm'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import CodeStyle from '../styles/Code'

import LinkSvg from '../../public/svg/link.svg'
import styled from 'styled-components'

import * as shortcodeRenderers from '../../utils/shortcodes'

import GithubSlugger from 'github-slugger'

interface MarkdownContentProps {
  content: string
  escapeHtml?: boolean // eq:false --> if the component needs to render html
  skipHtml?: boolean
}

// export function WithCodeStyles({ language: tags, value, ...props }) {
//   const [language, ...other] = tags?.split(',') || []
//   const copy = other.includes('copy') || language === 'copy'
//   return (
//     <CodeWrapper>
//       <SyntaxHighlighter
//         {...props}
//         language={language}
//         style={CodeStyle}
//         PreTag="div"
//       >
//         {String(value).replace(/\n$/, '')}
//       </SyntaxHighlighter>
//       {copy ? <CopyCodeButton value={value} /> : null}
//     </CodeWrapper>
//   )
// }

export const copyToClipboard = (text: string) => {
  const el = document.createElement('textarea')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

interface copyButtonProps {
  value?: string
}

const CopyCodeButton = ({ value }: copyButtonProps) => {
  const [copied, setCopied] = React.useState(false)

  const clickEvent = () => {
    setCopied(true)
    copyToClipboard(value)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <StyledCopyCodeButton onClick={clickEvent}>
      {!copied ? 'Copy' : 'Copied!'}
    </StyledCopyCodeButton>
  )
}

const StyledCopyCodeButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  border: 1px solid var(--tina-color-grey-3);
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.03);
  color: var(--tina-color-grey-7);
  border-right-width: 0;
  transition: all 150ms ease-out;
  border-top-width: 0;
  font-size: var(--tina-font-size-1);
  border-radius: 0 0 0 5px;

  &:hover {
    color: var(--color-orange);
    opacity: 1;
  }
`

const CodeWrapper = styled.div`
  position: relative;
`
function WithHeadings({ children, level }) {
  const HeadingTag = `h${level}` as any
  const value = children
    .map(
      (child) =>
        child?.props?.value || child?.props?.children[0]?.props?.value || child
    )
    .join('')
  var slugger = new GithubSlugger()
  const slug = slugger.slug(value)

  return (
    <HeadingTag id={slug}>
      <HeadingLink href={`#${slug}`} aria-label={value} className="anchor">
        <LinkSvg />
      </HeadingLink>
      {children}
    </HeadingTag>
  )
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

// https://github.com/rexxars/react-markdown/issues/113#issuecomment-490060741
const ShortcodeRenderer = ({ identifier, attributes }) => {
  const Renderer = shortcodeRenderers[identifier]

  if (!Renderer) {
    console.warn(`No renderer for shortcode: ${identifier}`)
    return null
  }

  return <Renderer {...attributes} />
}

export function MarkdownContent({
  content,
  escapeHtml,
  skipHtml,
}: MarkdownContentProps) {
  /*
  There's an issue with referential integrity in DOM nodes when ReactMarkdown renders HTML.
  Rendering an empty tree in between updates seems to avoid the issue:
  https://github.com/remarkjs/react-markdown/issues/402#issuecomment-601609362
  */
  const [body, setBody] = React.useState('')
  React.useEffect(() => {
    setBody(content)
    return () => {
      setBody('')
    }
  }, [content])

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, remarkGfm]}
      skipHtml={skipHtml ? skipHtml : false}
      components={{
        pre({ node, ...props }) {
          return <>{props.children}</>
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '') || props.lang
          return !inline && match ? (
            <CodeWrapper>
              <SyntaxHighlighter style={CodeStyle} language={match[1]}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </CodeWrapper>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        h1: (props) => <WithHeadings level={1} {...props} />,
        h2: (props) => <WithHeadings level={2} {...props} />,
        h3: (props) => <WithHeadings level={3} {...props} />,
        h4: (props) => <WithHeadings level={5} {...props} />,
        h5: (props) => <WithHeadings level={5} {...props} />,
        h6: (props) => <WithHeadings level={6} {...props} />,
        // @ts-ignore
        shortcode: ShortcodeRenderer,
      }}
    >
      {body}
    </ReactMarkdown>
  )
}

MarkdownContent.defaultProps = {
  escapeHtml: true,
  skipHtml: false,
}
