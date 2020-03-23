import { useCMS } from 'tinacms'
import { useCallback, useState, useEffect } from 'react'
import OpenAuthoringError from './OpenAuthoringError'
import interpretError from './error-interpreter'
import OpenAuthoringErrorProps from './OpenAuthoringErrorProps'
import createDecorator from 'final-form-submit-listener'
import { ActionableModalContainer } from '../components/ui/ActionableModalContainer'
import { getForkName } from './utils/repository'

const FormAlerts = ({ form }) => {
  const cms = useCMS()
  const [interpretedError, setInterpretedError] = useState(null)

  // show feedback onSave
  const updateUIWithError = useCallback(
    async (err: OpenAuthoringError) => {
      const errorUIDescriptor: OpenAuthoringErrorProps = await interpretError(
        err,
        cms.api.github
      )
      setInterpretedError(errorUIDescriptor)
    },
    [cms, setInterpretedError]
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

  return <ActionableModalContainer openAuthoringErrorUI={interpretedError} />
}

export default FormAlerts
