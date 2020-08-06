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
          async previewUrl(url: string) {
            try {
              return await cms.api.github.getDownloadUrl(url)
            } catch {
              return url
            }
          },
        }}
      />
    )
  }

  return props.children
}
