import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import styled, { css } from 'styled-components'
import RightArrowSvg from '../../public/svg/right-arrow.svg'

const Toc = ({ tocItems }: { tocItems: string }) => {
  const [isOpen, setIsOpen] = useState(false)

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
    <>
      <TocWrapper>
        <TocButtom isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <span>{isOpen ? 'Hide' : 'Show'} Table of Contents</span>{' '}
          <RightArrowSvg />
        </TocButtom>
        <TocContent isOpen={isOpen}>
          <ReactMarkdown source={tocItems} />
        </TocContent>
      </TocWrapper>
    </>
  )
}
export default Toc

const TocWrapper = styled.div`
  margin-bottom: -0.375rem;
`

const TocButtom = styled.button<{ isOpen: boolean }>`
  display: block;
  padding: 0;
  outline: none;
  border: none;
  color: var(--color-secondary);
  opacity: 0.65;
  background: transparent;
  cursor: pointer;
  transition: opacity 185ms ease-out;
  display: flex;
  align-items: center;
  line-height: 1;

  span {
    margin-right: 0.5rem;
  }

  svg {
    position: relative;
    width: 1.25rem;
    height: auto;
    fill: var(--color-grey);
    transform-origin: 50% 50%;
    transition: opacity 180ms ease-out, transform 180ms ease-out;
    opacity: 0.5;
  }

  :hover,
  :focus {
    opacity: 1;

    svg {
      opacity: 1;
    }
  }

  ${props =>
    props.isOpen
      ? css`
          color: var(--color-primary);

          svg {
            transform: rotate(90deg);
            opacity: 1;
          }
        `
      : ``};
`

const TocContent = styled.div<{ isOpen: boolean }>`
  display: block;
  width: 100%;
  line-height: 1.25;
  height: auto;
  max-height: 0;
  overflow: hidden;
  transition: all 500ms ease-out;

  ${props =>
    props.isOpen
      ? css`
          transition: all 750ms ease-in;
          max-height: 1500px;
        `
      : ``};

  @media (min-width: 1000px) {
  }

  /* Top Level Styles */

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  > ul {
    padding: 0.5rem 0;
  }

  li {
    display: block;
    margin: 0;
    padding: 0.375rem 3.5rem 0.375rem 0;
  }

  a {
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
      padding: 0.125rem 0 0.125rem 0.75rem;

      li {
        padding: 0.25rem 1.5rem 0.25rem 0;

        &:last-child {
          padding-bottom: 0rem;
        }
      }

      a {
        font-size: 0.9375rem;
        font-family: var(--font-primary);
      }
    }
  }
`
