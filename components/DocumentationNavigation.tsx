import { Overlay } from './ui/Overlay'
import { DocsNav } from './ui/DocsNav'

export function DocumentationNavigation({ open, setOpen, navItems }) {
  return (
    <>
      <DocsNav open={open} navItems={navItems} />
      <Overlay open={open} onClick={() => setOpen(false)} />
    </>
  )
}
