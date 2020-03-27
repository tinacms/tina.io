import { useCMS, Form } from 'tinacms'
import { useEffect, useState } from 'react'
import createDecorator from 'final-form-submit-listener'
import { getForkName } from '../open-authoring/repository'
import OpenAuthoringErrorModal from './OpenAuthoringErrorModal'

interface Props {
  form: Form
}
// Show success/fail feedback on form submission
const FormAlerts = ({ form }: Props) => {
  const cms = useCMS()

  const [error, setError] = useState(null)

  useEffect(() => {
    const submitListener = createDecorator({
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
