import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { useOpenAuthoringToolbarPlugins } from '../../open-authoring/useOpenAuthoringToolbarPlugins'
import { useLocalStorageCache } from '../../utils/plugins/useLocalStorageCache'
import useFormAlerts from '../../open-authoring/useFormAlerts'
import useAutoAuth from '../../open-authoring/useAutoAuth'

interface Props extends InlineFormProps {
  editMode: boolean
  children: any
  path: string
}

const OpenAuthoringSiteForm = ({ form, editMode, path, children }: Props) => {
  // Toolbar Plugins
  useOpenAuthoringToolbarPlugins(form, editMode)

  // Persist pending changes to localStorage
  useLocalStorageCache(path, form, editMode)

  // show feedback on save
  useFormAlerts(form)

  // start auth flow based on queryParam
  useAutoAuth()

  return (
    <InlineForm
      form={form}
      initialStatus={
        typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
      }
    >
      {children}
    </InlineForm>
  )
}

export default OpenAuthoringSiteForm
