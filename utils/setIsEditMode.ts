import { useCMS } from 'tinacms'

export function setIsEditMode(editMode: boolean) {
  const cms = useCMS()
  /*
   ** Random Fix: sidebar state isn't updated properly
   ** without this timeout. If and when the 'preview'
   ** state is accessible in _app, we'd like to move
   ** the editMode/sidebar.hidden stuff to _app
   */
  setTimeout(() => (cms.sidebar.hidden = !editMode), 1)
}
