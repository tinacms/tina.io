import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { OpenAuthoringModalContainer } from '../../open-authoring/OpenAuthoringModalContainer'
import {
  InlineControls,
  EditToggle,
  DiscardButton,
} from '../../components/ui/inline'
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
  return (
    <InlineForm form={form} initialStatus={editMode ? 'active' : 'inactive'}>
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
