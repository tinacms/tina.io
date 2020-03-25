import { ActionableModalOptions, ActionableModal } from '../components/ui'
import { useEffect, useState, useCallback } from 'react'
import { useCMS } from 'tinacms'
import OpenAuthoringError from './OpenAuthoringError'
import { enterEditMode } from './authFlow'
import { useOpenAuthoring } from './OpenAuthoringProvider'
import { getModalProps } from './error-interpreter/github-interpeter'

interface Props {
  error: OpenAuthoringError
}

// When an open authoring error is caught, we don't immedietly know the cause
// We have to perform a few extra checks and render a modal with options
const OpenAuthoringErrorModal = (props: Props) => {
  const [errorModalProps, setErrorModalProps] = useState<
    ActionableModalOptions
  >(null)
  const { github } = useCMS().api

  const openAuthoring = useOpenAuthoring()

  const startEditing = useCallback(
    () =>
      enterEditMode(openAuthoring.githubAuthenticated, openAuthoring.forkValid),
    [openAuthoring.githubAuthenticated, openAuthoring.forkValid]
  )

  useEffect(() => {
    ;(async () => {
      if (props.error) {
        const modalProps = await getModalProps(
          props.error,
          github,
          startEditing
        )
        setErrorModalProps(modalProps)
      } else {
        setErrorModalProps(null)
      }
    })()
  }, [props.error, startEditing])

  return errorModalProps ? <ActionableModal {...errorModalProps} /> : <></>
}

export default OpenAuthoringErrorModal
