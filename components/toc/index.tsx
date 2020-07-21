import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

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
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`
