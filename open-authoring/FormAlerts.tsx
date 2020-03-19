import { useCMS } from 'tinacms'
import { useCallback, useState, useEffect } from 'react'
import OpenAuthoringError from './OpenAuthoringError'
import interpretError from './error-interpreter'
import Cookies from 'js-cookie'
import OpenAuthoringErrorProps from './OpenAuthoringErrorProps'
import createDecorator from 'final-form-submit-listener'
import { OpenAuthoringModalContainer } from './OpenAuthoringModalContainer'

const FormAlerts = ({ form }) => {
  const cms = useCMS()
  const [interpretedError, setInterpretedError] = useState(null)

  // show feedback onSave
  const updateUIWithError = useCallback(
    async (err: OpenAuthoringError) => {
      const errorUIDescriptor: OpenAuthoringErrorProps = await interpretError(
        err
      )
      if (errorUIDescriptor.asModal) {
        setInterpretedError(errorUIDescriptor)
      } else {
        cms.alerts.error(errorUIDescriptor.message)
      }
    },
    [cms, setInterpretedError]
  )

  useEffect(() => {
    const submitListener = createDecorator({
      afterSubmitSucceeded: () =>
        cms.alerts.success(
          `Saved Successfully: Changes committed to ${Cookies.get(
            'fork_full_name'
          )}`
        ),
      afterSubmitFailed: async failedForm => {
        updateUIWithError(failedForm.getState().submitError)
      },
    })

    const undecorateSaveListener = submitListener(form.finalForm)

    return undecorateSaveListener
  }, [form])

  return <OpenAuthoringModalContainer openAuthoringErrorUI={interpretedError} />
}

export default FormAlerts
