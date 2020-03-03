import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { OpenAuthoringModalContainer } from '../../open-authoring/OpenAuthoringModalContainer'
import {
  InlineControls,
  EditToggle,
  DiscardButton,
} from '../../components/ui/inline'
import { useEffect, useState } from 'react'
import createDecorator from 'final-form-submit-listener'

import { useCMS } from 'tinacms'
interface Props extends InlineFormProps {
  editMode: boolean
  previewError?: string
  children: any
}

const OpenAuthoringSiteForm = ({
  form,
  editMode,
  previewError,
  children,
}: Props) => {
  const [statefulPreviewError, setStatefulPreviewError] = useState(previewError)
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

  // show feedback onSave
  useEffect(() => {
    const submitListener = createDecorator({
      afterSubmitSucceeded: () => cms.alerts.success('Save Successful'),
    })

    const undecorateSaveListener = submitListener(form.finalForm)

    return undecorateSaveListener
  }, [form])

  useEffect(() => {
    const failedListener = createDecorator({
      afterSubmitFailed: () => setStatefulPreviewError('Failed to save data. Your fork may have been deleted.')
    })

    const undecorateSaveListener = failedListener(form.finalForm)
    return undecorateSaveListener
  }, [form])

  return (
    <InlineForm
      form={form}
      initialStatus={
        typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
      }
    >
      <OpenAuthoringModalContainer previewError={statefulPreviewError} />
      <InlineControls>
        {editMode && <EditToggle />}
        <DiscardButton />
      </InlineControls>
      {children}
    </InlineForm>
  )
}

export default OpenAuthoringSiteForm
