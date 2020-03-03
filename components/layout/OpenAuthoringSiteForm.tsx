import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { OpenAuthoringModalContainer } from '../../open-authoring/OpenAuthoringModalContainer'
import {
  InlineControls,
  EditToggle,
  DiscardButton,
} from '../../components/ui/inline'
import { useEffect } from 'react'

import { useCMS, Form, TinaCMS } from 'tinacms'
import Cookies from 'js-cookie'
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
   * Toolbar Plugins
   */
  useEffect(() => {
    const plugins = [
      {
        __type: 'toolbar:tool',
        name: 'create-pr',
        component: () => <button>Pull Request</button>,
      },
      {
        __type: 'toolbar:status',
        name: 'current-fork',
        component: () => <div>{Cookies.get('fork_full_name')}</div>,
      },
      {
        __type: 'toolbar:form-actions',
        name: 'base-form-actions',
        component: () => (
          <>
            <button onClick={form.reset}>Reset</button>
            <button onClick={form.submit}>Save</button>
          </>
        ),
      },
    ] as any

    const removePlugins = () => {
      plugins.forEach(plugin => cms.plugins.remove(plugin))
    }

    if (editMode) {
      plugins.forEach(plugin => cms.plugins.add(plugin))
    } else {
      removePlugins()
    }

    return removePlugins
  }, [editMode, form])

  useFormStatusPlugin(form, cms, editMode)

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

const useFormStatusPlugin = (
  form: Form<any>,
  cms: TinaCMS,
  editMode: boolean
) => {
  useEffect(() => {
    const plugin = {
      __type: 'toolbar:status',
      name: 'form-state-dirty',
      component: () => (
        <>
          {form.finalForm.getState().dirty ? (
            <div>Dirty</div>
          ) : (
            <div>No changes</div>
          )}
        </>
      ),
    }

    if (editMode) {
      cms.plugins.add(plugin)
    }

    return () => cms.plugins.remove(plugin)
  }, [editMode, form, form.finalForm.getState().dirty])
}

export default OpenAuthoringSiteForm
