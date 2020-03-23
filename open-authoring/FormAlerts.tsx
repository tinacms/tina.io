import { useCMS } from 'tinacms'
import { useCallback, useEffect } from 'react'
import OpenAuthoringError from './OpenAuthoringError'
import interpretError from './error-interpreter'
import createDecorator from 'final-form-submit-listener'
import { getForkName } from './utils/repository'
import { useActionableModal } from '../components/ui/ActionableModal/ActionableModalContext'

//TODO - this no longer renders anything, so could just be a hook
const FormAlerts = ({ form }) => {
  const cms = useCMS()
  const modalContext = useActionableModal()

  // show feedback onSave
  const updateUIWithError = useCallback(
    async (err: OpenAuthoringError) => {
      const errorUIDescriptor = await interpretError(err, cms.api.github)
      modalContext.setModal(errorUIDescriptor)
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

  return <></>
}

export default FormAlerts
