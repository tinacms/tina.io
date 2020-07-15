import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

const Toc = ({ tocItems }: { tocItems: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!tocItems) {
    return
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
        Jump to Section
        <ArrowDown />
      </TocButtom>
      <TocContent isActive={isOpen}>
        <ReactMarkdown source={tocItems} />
      </TocContent>
    </TocWrapper>
  )
}
export default Toc

const TocWrapper = styled.div`
  position: relative;
  max-width: 176px;
  margin: 24px 0;
`
const TocButtom = styled.button`
  font-size: 16px;
  line-height: 24px;
  border-radius: 2px;
  /* border: solid 1px ${({ theme }) => theme.colors.highlightBorder}; */
  background-color: #eff6fe;
  text-align: left;
  padding: 10px 12px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:focus {
    outline: none;
  }
`

const TocContent = styled.div<{ isActive: boolean }>`
  position: absolute;
  margin-top: 1px;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  padding: 17px 15px;
  border-radius: 2px;
  backdrop-filter: blur(27px);
  box-shadow: 4px 6px 8px 0 rgba(0, 0, 0, 0.05);
  /* border: solid 1px ${({ theme }) => theme.colors.highlightBorder}; */
  background-color: #ffffff;
  width: max-content;
  z-index: 100;

  & > ul {
    padding-left: 24px;
  }

  ul {
    li {
      text-align: left;
      margin: 12px 0;
      a {
        font-size: 16px;
        text-decoration: none;
        color: #333;

        &:hover,
        &:focus {
          /* color: ${({ theme }) => theme.colors.primary}; */
        }
      }
    }
  }
`
const ArrowDown = styled.div`
  width: 0px;
  height: 0px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  /* border-top: 5px solid ${({ theme }) => theme.colors.primary}; */
  position: relative;
`
