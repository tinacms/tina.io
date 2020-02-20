import { useCMS } from 'tinacms'

export function isEditMode() {
  const cms = useCMS()

  return !cms.sidebar.hidden
}

export function setIsEditMode(editMode: boolean) {
  const cms = useCMS()

  cms.sidebar.hidden = !editMode
}
