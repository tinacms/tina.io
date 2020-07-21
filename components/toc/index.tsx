import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import styled, { css } from 'styled-components'

const Toc = ({ tocItems }: { tocItems: string }) => {
  const [isOpen, setIsOpen] = useState(true)

  if (!tocItems) {
    return null
  }

  useEffect(() => {
    const allLinks = document.querySelectorAll('a')
    if (allLinks.length > 0) {
      allLinks.forEach(a =>
        a.addEventListener('click', () => {
          setIsOpen(false)
        })
      )
    }
  }, [])

  return (
    <TocWrapper>
      <TocButtom onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide' : 'Show'} Table of Contents
      </TocButtom>
      <TocContent isOpen={isOpen}>
        <ReactMarkdown source={tocItems} />
      </TocContent>
    </TocWrapper>
  )
}
export default Toc

const TocWrapper = styled.div``
const TocButtom = styled.button``

const TocContent = styled.div<{ isOpen: boolean }>`
  display: none;

  ${props =>
    props.isOpen
      ? css`
          display: block;
        `
      : ``};

  @media (min-width: 1000px) {
  }

  /* Top Level Styles */
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: block;
    margin: 0;
    padding: 0;

    &:last-child {
      padding-bottom: 0.25rem;
    }
  }

  a {
    display: block;
    padding: 0.5rem 3.5rem 0.5rem 0;
    color: var(--color-secondary);
    font-family: var(--font-tuner);
  }

  /* Hide underline on top level links except on hover or focus */
  > ul > li > a {
    :not(:focus) {
      :not(:hover) {
        text-decoration-color: transparent !important;
      }
    }
  }

  /* Nested Styles */
  ul {
    ul {
      padding-left: 0.75rem;

      a {
        font-size: 0.9375rem;
        padding: 0.25rem 1.5rem 0.25rem 0;
        font-family: var(--font-primary);
      }
    }
  }
`
