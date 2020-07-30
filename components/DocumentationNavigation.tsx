import { Overlay } from './ui/Overlay'
import { DocsNav } from './ui/DocsNav'
import { DocsMobileTinaIcon } from 'pages/docs/[...slug]'
import { NavToggle } from './ui/NavToggle'
import styled from 'styled-components'

interface Props {
  docs?: boolean
  open?: boolean
  setOpen(open: boolean): void
  navItems: any
}

export function DocumentationNavigation({
  docs,
  open,
  setOpen,
  navItems,
}: Props) {
  return (
    <>
      <DocsNavToggle open={open} onClick={() => setOpen(!open)} />
      <DocsMobileTinaIcon docs={docs} />
      <DocsNav open={open} navItems={navItems} />
      <Overlay open={open} onClick={() => setOpen(false)} />
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
