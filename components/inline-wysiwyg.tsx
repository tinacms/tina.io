import { useInlineForm } from 'react-tinacms-inline'
import React from 'react'

export function InlineWysiwyg(props: any) {
  const { status } = useInlineForm()
  const [{ InlineWysiwyg }, setEditor] = React.useState<any>({})

  React.useEffect(() => {
    if (!InlineWysiwyg && status === 'active') {
      import('react-tinacms-editor').then(setEditor)
    }
  }, [status])

  if (InlineWysiwyg) {
    return <InlineWysiwyg {...props} />
  }

  return props.children
}
