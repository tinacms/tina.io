import React from 'react'

export interface ActionableModalOptions {
  title: string
  message: string
  actions: Array<{ name: string; action(): void }>
}

interface ModalProps {
  modal?: ActionableModalOptions
  setModal?: (modal: ActionableModalOptions) => void
}

export const ActionableModalContext = React.createContext<ModalProps | null>(
  null
)

export function useActionableModal() {
  const modalContext = React.useContext(ActionableModalContext)

  if (!modalContext) {
    throw new Error(
      'useActionableModal must be within an ActionableModalContext'
    )
  }

  return modalContext
}
