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
  forkValid: boolean
  authenticated: boolean
  updateAuthChecks: () => void
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

export const OpenAuthoringProvider = ({
  children,
  authenticate,
  enterEditMode,
  exitEditMode,
}: ProviderProps) => {
  const [forkValid, setForkValid] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  const cms = useCMS()

  const [authorizing, setAuthorizing] = useState(false)

  const updateAuthChecks = async () => {
    const user = await cms.api.github.getUser()
    if (user) {
      setAuthenticated(true)
      const forkName = getForkName() || (user.login || "") + "/" + process.env.REPO_FULL_NAME.split("/")[1]
      if (await cms.api.github.getBranch(forkName, getHeadBranch())) {
        setForkValid(true)
        if (!getForkName()) {
          setForkName(forkName)
        }
      } else {
        setForkValid(false)
      }      
    } else {
      setAuthenticated(false)
      setForkValid(false)
    }
  }

  const tryEnterEditMode = async () => {
    await updateAuthChecks()
    if (authenticated && forkValid) {
      enterEditMode()
    } else {
      setAuthorizing(true)
    }
  }

  const onUpdateAuthState = async () => {
    //TODO replace this with a hook that updates when cookies change?
    await updateAuthChecks()
  }

  useEffect(() => {
    if (authorizing && forkValid && authenticated) {
      enterEditMode()
    }
  }, [authorizing, forkValid, authenticated])

  // Hook to update root openAuthoring state when form fails.
  // We need to perform to check before an action is clicked (e.g start auth flow)
  // Because if it is perform on-the-fly, the window may be blocked.
  useEffect(() => {
    updateAuthChecks()
  }, [error])

  return (
    <OpenAuthoringContext.Provider
      value={{
        forkValid,
        authenticated,
        updateAuthChecks,
        authenticate,
        enterEditMode: tryEnterEditMode,
        exitEditMode,
        setError,
      }}
    >
      {error && <OpenAuthoringErrorModal error={error} />}
      {authorizing && (
        <OpenAuthoringAuthModal
          onUpdateAuthState={onUpdateAuthState}
          close={() => {
            setAuthorizing(false)
          }}
        />
      )}
      {children}
    </OpenAuthoringContext.Provider>
  )
}

const OpenAuthoringAuthModal = ({ onUpdateAuthState, close }) => {
  let modalProps

  const openAuthoring = useOpenAuthoring()
  const cms = useCMS()

  if (!openAuthoring.authenticated) {
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
  } else if (!openAuthoring.forkValid) {
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
