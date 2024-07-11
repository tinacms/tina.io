import React from 'react'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import { Disclosure } from '@headlessui/react'
import {
  MinusSmIcon as MinusSmallIcon,
  PlusSmIcon as PlusSmallIcon,
} from '@heroicons/react/outline'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
// Need this to render tables
import remarkGfm from 'remark-gfm'

import { Prism } from '../styles/Prism'

import LinkSvg from '../../public/svg/link.svg'
import styled from 'styled-components'

import * as shortcodeRenderers from '../../utils/shortcodes'

import GithubSlugger from 'github-slugger'
import Image from 'next/image'

interface MarkdownContentProps {
  content: string
  escapeHtml?: boolean // eq:false --> if the component needs to render html
  skipHtml?: boolean
}

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

const CodeSnippets = (props) => {
  return (
    <div className="my-8 code-snippets">
      <style>{`.code-snippets .prism-code {height: 100%; margin: 0}`}</style>
      <style>{`.code-snippets .code-wrapper { height: 100% }`}</style>
      <style>{`.code-snippets h3 { margin-bottom: 0; }`}</style>
      <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
        {props.children}
      </dl>
    </div>
  )
}
const CodeSnippet = (props) => {
  const headingIndex = props.node.children.findIndex(
    (child) => child.tagName === 'h3'
  )
  const descriptionIndex = props.node.children.findIndex(
    (child) => child.tagName === 'p'
  )
  const codeIndex = props.node.children.findIndex(
    (child) => child.tagName === 'pre'
  )
  return (
    <Disclosure defaultOpen={props.open} as="div" className="pt-6">
      {({ open }) => (
        <>
          <dt>
            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
              {props.children[headingIndex]}
              <span className="ml-6 flex h-7 items-center">
                {open ? (
                  <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-2 pr-12">
            {
              <div className="py-4 text-base leading-7">
                {descriptionIndex !== -1
                  ? props.children[descriptionIndex]
                  : null}
              </div>
            }
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">{props.children[codeIndex]}</div>
              <div className="flex-1 bg-gray-50 bg-[#f6f6f9] border border-gray-100 rounded-md overflow-hidden">
                <Image src={props.url} alt={props.children} height={1200} width={1200} />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
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
      remarkPlugins={[remarkDirective, remarkDirectiveRehype]}
      skipHtml={skipHtml ? skipHtml : false}
      components={{
        ul: ({ node, ...props }) => {
          return <ul className="list-disc ml-6" {...props} />
        },
        ol: ({ node, ...props }) => {
          return <ul className="list-decimal ml-6" {...props} />
        },
        pre({ node, ...props }) {
          return <>{props.children}</>
        },
        // @ts-ignore
        'code-snippet': CodeSnippet,
        // @ts-ignore
        'code-snippets': CodeSnippets,
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '') || props.lang
          return !inline && match ? (
            <CodeWrapper className="code-wrapper">
              <Prism
                lang={match[1]}
                theme="nightOwl"
                value={String(children).replace(/\n$/, '')}
              />
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
