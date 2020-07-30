import { Overlay } from './ui/Overlay'

export function DocumentationNavigation({ open, setOpen }) {
  return (
    <>
      <Overlay open={open} onClick={() => setOpen(false)} />
    </>
  )
}
