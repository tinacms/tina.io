import { Form } from 'tinacms'
import { useEffect } from 'react'
import createDecorator from 'final-form-submit-listener'
import { useOpenAuthoring } from '../components/layout/OpenAuthoring'

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
