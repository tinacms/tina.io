import React from 'react'
import { useCMS } from 'tinacms'

export function InlineWysiwyg(props: any) {
  const cms = useCMS()
  const [{ InlineWysiwyg }, setEditor] = React.useState<any>({})

  React.useEffect(() => {
    if (!InlineWysiwyg && cms.enabled) {
      import('react-tinacms-editor').then(setEditor)
    }
  }, [cms.enabled])

  if (InlineWysiwyg) {
    return <InlineWysiwyg {...props} />
  }

  return props.children
}
