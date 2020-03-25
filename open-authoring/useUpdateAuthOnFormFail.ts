import { Form } from 'tinacms'
import { useEffect } from 'react'
import createDecorator from 'final-form-submit-listener'
import { useOpenAuthoring } from './OpenAuthoringProvider'

// Hook to update root openAuthoring state when form fails.
// We need to perform to check before an action is clicked (e.g start auth flow)
// Because if it is perform on-the-fly, the window may be blocked.
const useUpdateAuthOnFormFail = (form: Form) => {
  const openAuthoring = useOpenAuthoring()
  useEffect(() => {
    const submitListener = createDecorator({
      afterSubmitFailed: async () => {
        openAuthoring.updateAuthChecks()
      },
    })

    const undecorateSaveListener = submitListener(form.finalForm)

    return undecorateSaveListener
  }, [form])
}

export default useUpdateAuthOnFormFail
