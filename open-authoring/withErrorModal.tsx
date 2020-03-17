import { OpenAuthoringModalContainer } from './OpenAuthoringModalContainer'
import { useEffect, useState } from 'react'
import getErrorUIFrom from './error-interpreter'

export const withErrorModal = BaseComponent => (props: { previewError }) => {
  const [openAuthoringErrorUI, setOpenAuthoringErrorUI] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (props.previewError) {
        const contextualError = await getErrorUIFrom(props.previewError)
        if (contextualError.asModal) {
          setOpenAuthoringErrorUI(contextualError)
        }
      }
    })()
  }, [props.previewError])

  if (props.previewError) {
    return (
      <OpenAuthoringModalContainer
        openAuthoringErrorUI={openAuthoringErrorUI}
      />
    )
  } else {
    return <BaseComponent {...props} />
  }
}
