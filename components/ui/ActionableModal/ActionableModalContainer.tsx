import { useEffect, useState } from 'react'
import { ActionableModal } from './ActionableModal'
import { enterEditMode } from '../../../open-authoring/authFlow'
import { useOpenAuthoring } from '../../layout/OpenAuthoring'
import {
  ActionableModalContext,
  ActionableModalOptions,
} from './ActionableModalContext'

export const ActionableModalContainer = ({ children }) => {
  const [modal, setModal] = useState<ActionableModalOptions>()

  const openAuthoring = useOpenAuthoring()

  useEffect(() => {
    if (modal) {
      openAuthoring.updateAuthChecks() //recheck if we need to open auth window as result of error
    }
  }, [modal])

  return (
    <ActionableModalContext.Provider value={{ modal, setModal }}>
      {modal && <ActionableModal {...modal} />}
      {children}
      {/* TODO - we may want to show modal over top of children */}
    </ActionableModalContext.Provider>
  )
}
