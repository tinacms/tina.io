import { useCMS, Form } from 'tinacms'
import { useEffect, useState } from 'react'
import createDecorator from 'final-form-submit-listener'
import { getForkName } from './utils/repository'
import OpenAuthoringErrorModal from './OpenAuthoringErrorModal'

interface Props {
  form: Form
}
// Show feedback on form submission
const FormAlerts = ({ form }: Props) => {
  const cms = useCMS()

  const [error, setError] = useState(null)

  useEffect(() => {
    const submitListener = createDecorator({
      afterSubmitSucceeded: () =>
        cms.alerts.success(
          `Saved Successfully: Changes committed to ${getForkName()}`
        ),
      afterSubmitFailed: async failedForm => {
        setError(failedForm.getState().submitError)
      },
    })

    const undecorateSaveListener = submitListener(form.finalForm)

    return undecorateSaveListener
  }, [form])

  return <>{error && <OpenAuthoringErrorModal error={error} />}</>
}

export default FormAlerts
