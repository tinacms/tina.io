import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { OpenAuthoringModalContainer } from '../../open-authoring/OpenAuthoringModalContainer'
import { useEffect, useCallback, useState } from 'react'
import { useCMS } from 'tinacms'
import createDecorator from 'final-form-submit-listener'
import Cookies from 'js-cookie'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'
import interpretError from '../../open-authoring/error-interpreter'
import OpenAuthoringContextualErrorUI from '../../open-authoring/OpenAuthoringContextualErrorUI'
import { useLocalStorageCache } from '../../utils/plugins/useLocalStorageCache'
import { useOpenAuthoringToolbarPlugins } from '../../open-authoring/useOpenAuthoringToolbarPlugins'

interface Props extends InlineFormProps {
  editMode: boolean
  error?: OpenAuthoringError
  children: any
  path: string
}

const OpenAuthoringSiteForm = ({
  form,
  editMode,
  error,
  path,
  children,
}: Props) => {
  const [interpretedError, setInterpretedError] = useState(null)
  const cms = useCMS()

  // Toolbar Plugins
  useOpenAuthoringToolbarPlugins(form, editMode)

  // Persist pending changes to localStorage
  useLocalStorageCache(path, form, editMode)

  // Show feedback onSave
  const updateUIWithError = useCallback(
    async (err: OpenAuthoringError) => {
      const errorUIDescriptor: OpenAuthoringContextualErrorUI = await interpretError(
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

  useEffect(() => {
    ;(async () => {
      if (error) {
        updateUIWithError(error)
      }
    })()
  }, [error])

  return (
    <InlineForm
      form={form}
      initialStatus={
        typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
      }
    >
      <OpenAuthoringModalContainer error={interpretedError} />
      {children}
    </InlineForm>
  )
}

export default OpenAuthoringSiteForm
