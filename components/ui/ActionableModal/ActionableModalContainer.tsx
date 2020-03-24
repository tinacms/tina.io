import { useState } from 'react'
import { ActionableModal } from './ActionableModal'
import {
  ActionableModalContext,
  ActionableModalOptions,
} from './ActionableModalContext'

export const ActionableModalContainer = ({ children }) => {
  const [modal, setModal] = useState<ActionableModalOptions>()

  return (
    <ActionableModalContext.Provider value={{ modal, setModal }}>
      {modal && <ActionableModal {...modal} />}
      {children}
      {/* TODO - we may want to show modal over top of children */}
    </ActionableModalContext.Provider>
  )
}
