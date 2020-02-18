import React from 'react'

export interface EditModeContext {
  isEditMode: boolean
  setIsEditMode(isEditMode: boolean): void
}

export const EditModeContext = React.createContext<EditModeContext | null>(null)

export function useEditContext() {
  const editModeContext = React.useContext(EditModeContext)

  if (!editModeContext) {
    throw new Error('useEditContext must be within an EditModeContext')
  }

  return editModeContext
}
