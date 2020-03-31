import React, { useState, useEffect, useCallback } from 'react'
import { getForkName, getHeadBranch, setForkName } from './repository'
import { useCMS } from 'tinacms'
import OpenAuthoringErrorModal from '../github-error/OpenAuthoringErrorModal'
import { TinaReset, Button as TinaButton } from '@tinacms/styles'
import {
  Modal,
  ModalPopup,
  ModalBody,
  ModalActions,
  ModalHeader,
} from 'tinacms'

export interface OpenAuthoringContext {
  authenticate: () => Promise<void>
  enterEditMode: () => void
  exitEditMode: () => void
  setError: (err) => void
}

export const OpenAuthoringContext = React.createContext<OpenAuthoringContext | null>(
  null
)

export function useOpenAuthoring() {
  const openAuthoringContext = React.useContext(OpenAuthoringContext)

  if (!openAuthoringContext) {
    throw new Error('useOpenAuthoring must be within an OpenAuthoringContext')
  }

  return openAuthoringContext
}

interface ProviderProps {
  children: any
  authenticate: () => Promise<void>
  enterEditMode: () => void
  exitEditMode: () => void
}

interface AuthState {
  authenticated: true
  forkValid: true
}

export const OpenAuthoringProvider = ({
  children,
  authenticate,
  enterEditMode,
  exitEditMode,
}: ProviderProps) => {
  const [error, setError] = useState(null)
  const cms = useCMS()
  const [authorizingState, setAuthorizingState] = useState<AuthState>(null)

  const tryEnterEditMode = async () => {
    const authenticated =
      authorizingState?.authenticated || (await cms.api.github.getUser())
    const forkValid =
      authorizingState?.forkValid ||
      (await cms.api.github.getBranch(getForkName(), getHeadBranch()))

    if (authenticated && forkValid) {
      enterEditMode()
    } else {
      setAuthorizingState({
        authenticated,
        forkValid,
      })
    }
  }

  return (
    <OpenAuthoringContext.Provider
      value={{
        authenticate,
        enterEditMode: tryEnterEditMode,
        exitEditMode,
        setError,
      }}
    >
      {error && <OpenAuthoringErrorModal error={error} />}
      {authorizingState && (
        <OpenAuthoringAuthModal
          onUpdateAuthState={tryEnterEditMode}
          authState={authorizingState}
          close={() => {
            setAuthorizingState(null)
          }}
        />
      )}
      {children}
    </OpenAuthoringContext.Provider>
  )
}

const OpenAuthoringAuthModal = ({ onUpdateAuthState, close, authState }) => {
  let modalProps

  const openAuthoring = useOpenAuthoring()
  const cms = useCMS()

  if (!authState.authenticated) {
    modalProps = {
      title: 'GitHub Authorization',
      message:
        'To save edits, Tina requires GitHub authorization. On save, changes will get commited to GitHub using your account.',
      actions: [
        {
          name: 'Cancel',
          action: close,
        },
        {
          name: 'Continue to GitHub',
          action: async () => {
            await openAuthoring.authenticate()
            onUpdateAuthState()
          },
          primary: true,
        },
      ],
    }
  } else if (!authState.forkValid) {
    modalProps = {
      title: 'GitHub Authorization',
      message: 'A fork of this website is required to save changes.',
      actions: [
        {
          name: 'Cancel',
          action: close,
        },
        {
          name: 'Create Fork',
          action: async () => {
            const { full_name } = await cms.api.github.createFork()
            setForkName(full_name)
            onUpdateAuthState()
          },
          primary: true,
        },
      ],
    }
  } else {
    return null
  }

  return (
    <TinaReset>
      <Modal>
        <ModalPopup>
          <ModalHeader close={close}>{modalProps.title}</ModalHeader>
          <ModalBody padded>
            <p>{modalProps.message}</p>
          </ModalBody>
          <ModalActions>
            {modalProps.actions.map(action => (
              <AsyncButton {...action} />
            ))}
          </ModalActions>
        </ModalPopup>
      </Modal>
    </TinaReset>
  )
}

interface ButtonProps {
  name: string
  action(): Promise<void>
  primary: boolean
}
const AsyncButton = ({ name, primary, action }: ButtonProps) => {
  const [submitting, setSubmitting] = useState(false)

  const onClick = useCallback(async () => {
    setSubmitting(true)
    await action()
    setSubmitting(false)
  }, [action, setSubmitting])

  return (
    <TinaButton primary={primary} onClick={onClick} busy={submitting}>
      {name}
    </TinaButton>
  )
}
