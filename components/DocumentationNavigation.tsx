import { useState } from 'react'
import { Overlay } from './ui/Overlay'
import { DocsNav } from './ui/DocsNav'
import { DocsMobileTinaIcon } from 'pages/docs/[...slug]'
import { NavToggle } from './ui/NavToggle'
import styled from 'styled-components'
import { DocsHeaderNav } from './ui/DocsHeaderNav'

interface Props {
  navItems: any
  docs?: boolean
}

export function DocumentationNavigation({ docs, navItems }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <DocsNavToggle open={open} onClick={() => setOpen(!open)} />
      <DocsMobileTinaIcon docs={docs} />
      <DocsNav open={open} navItems={navItems} />
      <Overlay open={open} onClick={() => setOpen(false)} />
      <DocsHeaderNav color={'light'} open={open} />
    </>
  )
}

const DocsNavToggle = styled(NavToggle)`
  position: fixed;
  margin-top: 1.25rem;
  left: 1rem;
  z-index: 500;

  @media (min-width: 999px) {
    display: none;
  }
`
