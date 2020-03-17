import { OpenAuthoringModalContainer } from './OpenAuthoringModalContainer'

export const withErrorModal = BaseComponent => (props: { previewError }) => {
  if (props.previewError) {
    return (
      <OpenAuthoringModalContainer openAuthoringError={props.previewError} />
    )
  } else {
    return <BaseComponent {...props} />
  }
}
