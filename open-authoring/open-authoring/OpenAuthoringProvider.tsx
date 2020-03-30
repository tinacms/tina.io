import React, { useState, useEffect } from 'react'
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
  userIsAuthenticated: () => Promise<boolean>
  forkIsValid: () => Promise<boolean>
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
  const [error, setError] = useState(null)

  const cms = useCMS()

  const [authorizing, setAuthorizing] = useState(false)

  const userIsAuthenticated = async () => !!(await cms.api.github.getUser())
  const forkIsValid = async () => await cms.api.github.getBranch(getForkName(), getHeadBranch())

  const tryEnterEditMode = async () => {
    if (await userIsAuthenticated() && await forkIsValid()) {
      enterEditMode()
    } else {
      setAuthorizing(true)
    }
  }

  useEffect(() => {
    (async () => {
      if (authorizing && await forkIsValid() && await userIsAuthenticated()) {
        enterEditMode()
      }
    })()
  }, [authorizing])

  
  
  return (
    <OpenAuthoringContext.Provider
      value={{
        userIsAuthenticated,
        forkIsValid,
        authenticate,
        enterEditMode: tryEnterEditMode,
        exitEditMode,
        setError,
      }}
    >
      {error && <OpenAuthoringErrorModal error={error} />}
      {authorizing && (
        <OpenAuthoringAuthModal
          close={async () => {
            setAuthorizing(false)
            if (authorizing && await forkIsValid() && await userIsAuthenticated()) {
              enterEditMode()
            }
          }}
        />
      )}
      {children}
    </OpenAuthoringContext.Provider>
  )
}

const OpenAuthoringAuthModal = ({ close }) => {
  const [modalProps, setModalProps] = useState({
    title: 'Loading...',
    message:
      '',
    actions: [
      {
        name: 'Cancel',
        action: close,
      },
      {
        name: 'Loading...',
        action: async () => {
          
        },
        primary: true,
      },
    ],
  })

  const openAuthoring = useOpenAuthoring()
  const cms = useCMS()

  openAuthoring.userIsAuthenticated().then( isAuthenticated => {
    if (isAuthenticated) {
      openAuthoring.forkIsValid().then( isValid => {
        if (isValid) {
          return null
        } else {
          setModalProps({
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

                  // Auth complete
                  close()
                },
                primary: true,
              },
            ],
          })
        }
      })
    } else {
      setModalProps({
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
            },
            primary: true,
          },
        ],
      })
    }
  })



  

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
              <TinaButton primary={action.primary} onClick={action.action}>
                {action.name}
              </TinaButton>
            ))}
          </ModalActions>
        </ModalPopup>
      </Modal>
    </TinaReset>
  )
}
