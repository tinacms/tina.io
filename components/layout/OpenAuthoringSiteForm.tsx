import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { OpenAuthoringModalContainer } from '../../open-authoring/OpenAuthoringModalContainer'
import {
  InlineControls,
  EditToggle,
  DiscardButton,
} from '../../components/ui/inline'
import { useEffect, useCallback } from 'react'
import { useCMS, useWatchFormValues } from 'tinacms'
import createDecorator from 'final-form-submit-listener'
import Cookies from 'js-cookie'

interface Props extends InlineFormProps {
  editMode: boolean
  previewError?: string
  children: any
  path: string
}

const OpenAuthoringSiteForm = ({
  form,
  editMode,
  previewError,
  path,
  children,
}: Props) => {
  const cms = useCMS()
  useEffect(() => {
    /*
     ** Random Fix: sidebar state isn't updated properly
     ** without this timeout. If and when the 'preview'
     ** state is accessible in _app, we'd like to move
     ** the editMode/sidebar.hidden stuff to _app
     */
    setTimeout(() => (cms.sidebar.hidden = !editMode), 1)
  }, [])

  /**
   * persist pending changes to localStorage
   */

  const saveToStorage = useCallback(formData => {
    cms.api.storage.save(path, formData.values)
  }, [])

  // save to storage on change
  useWatchFormValues(form, saveToStorage)

  // load from storage on boot
  useEffect(() => {
    if (!editMode) return

    const values = cms.api.storage.load(path)
    if (values) {
      form.updateValues(values)
    }
  }, [form, editMode])
  // show feedback onSave
  useEffect(() => {
    const submitListener = createDecorator({
      afterSubmitSucceeded: () =>
        cms.alerts.success(
          `Saved Successfully: Changes committed to ${Cookies.get(
            'fork_full_name'
          )}`
        ),
    })

    const undecorateSaveListener = submitListener(form.finalForm)

    return undecorateSaveListener
  }, [form])

  return (
    <InlineForm
      form={form}
      initialStatus={
        typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
      }
    >
      <OpenAuthoringModalContainer previewError={previewError} />
      <InlineControls>
        {editMode && <EditToggle />}
        <DiscardButton />
      </InlineControls>
      {children}
    </InlineForm>
  )
}

export default OpenAuthoringSiteForm
