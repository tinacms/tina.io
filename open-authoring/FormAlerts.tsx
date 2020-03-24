import { useCMS, Form } from 'tinacms'
import { useCallback, useEffect, useState } from 'react'
import OpenAuthoringError from './OpenAuthoringError'
import interpretError from './error-interpreter'
import createDecorator from 'final-form-submit-listener'
import { getForkName } from './utils/repository'
import { ActionableModal, ActionableModalOptions } from '../components/ui'

interface Props {
  form: Form
}
// Show feedback on form submission
const FormAlerts = ({ form }: Props) => {
  const cms = useCMS()

  const [errorModalProps, setErrorModalProps] = useState<
    ActionableModalOptions
  >(null)

  // show feedback onSave
  const updateUIWithError = useCallback(
    async (err: OpenAuthoringError) => {
      const errorUIDescriptor = await interpretError(err, cms.api.github)
      setErrorModalProps(errorUIDescriptor)
    },
    [cms]
  )

  useEffect(() => {
    const submitListener = createDecorator({
      afterSubmitSucceeded: () =>
        cms.alerts.success(
          `Saved Successfully: Changes committed to ${getForkName()}`
        ),
      afterSubmitFailed: async failedForm => {
        updateUIWithError(failedForm.getState().submitError)
      },
    })

    const undecorateSaveListener = submitListener(form.finalForm)

    return undecorateSaveListener
  }, [form])

  return <>{errorModalProps && <ActionableModal {...errorModalProps} />}</>
}

export default FormAlerts
