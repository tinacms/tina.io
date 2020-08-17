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
    return (
      <InlineWysiwyg
        {...props}
        sticky={'calc(var(--tina-toolbar-height) + var(--tina-padding-small))'}
        imageProps={{
          directory: 'public/img/',
          parse: filename => 'img/' + filename,
          previewSrc(src: string) {
            return cms.api.github.getDownloadUrl('public/' + src)
          },
        }}
      />
    )
  }

  return props.children
}
