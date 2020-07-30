import { Overlay } from './ui/Overlay'
import { DocsNav } from './ui/DocsNav'
import { DocsMobileTinaIcon } from 'pages/docs/[...slug]'

export interface DocumentationNavigationProps {
  docs?: boolean
  open?: boolean
  setOpen(open: boolean): void
  navItems: any
}
export function DocumentationNavigation({ docs, open, setOpen, navItems }) {
  return (
    <>
      <DocsMobileTinaIcon docs={docs} />
      <DocsNav open={open} navItems={navItems} />
      <Overlay open={open} onClick={() => setOpen(false)} />
    </>
  )
}
