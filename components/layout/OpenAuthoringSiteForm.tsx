import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { useOpenAuthoringToolbarPlugins } from '../../open-authoring/useOpenAuthoringToolbarPlugins'
import { useLocalStorageCache } from '../../utils/plugins/useLocalStorageCache'
import FormAlerts from '../../open-authoring/FormAlerts'
import useUpdateAuthOnFormFail from '../../open-authoring/useUpdateAuthOnFormFail'
import AutoAuthModal from '../../open-authoring/AutoAuthModal'

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

  useUpdateAuthOnFormFail(form)

  return (
    <>
      <FormAlerts form={form} />
      <AutoAuthModal />
      <InlineForm
        form={form}
        initialStatus={
          typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
        }
      >
        {children}
      </InlineForm>
    </>
  )
}

export default OpenAuthoringSiteForm
