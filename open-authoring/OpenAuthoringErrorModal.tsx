import { ActionableModalOptions, ActionableModal } from '../components/ui'
import { useEffect, useState } from 'react'
import { useCMS } from 'tinacms'
import getModalProps from './error-interpreter'
import OpenAuthoringError from './OpenAuthoringError'

interface Props {
  error: OpenAuthoringError
}

const OpenAuthoringErrorModal = (props: Props) => {
  const [errorModalProps, setErrorModalProps] = useState<
    ActionableModalOptions
  >(null)
  const { github } = useCMS().api

  useEffect(() => {
    ;(async () => {
      if (props.error) {
        const modalProps = await getModalProps(props.error, github)
        setErrorModalProps(modalProps)
      }
    })()
  }, [props.error])

  return errorModalProps ? <ActionableModal {...errorModalProps} /> : <></>
}

export default OpenAuthoringErrorModal
