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
          /** uploadDir is path from 'public'
           * as NextGithubMediaStore prepends public
           * to the paths. `imageProps` can be overridden
           * on the component, see blog/[slug].
           */
          uploadDir: () => 'img/',
          parse: media => 'img/' + media.filename,
          ...props.imageProps,
        }}
      />
    )
  }

  return props.children
}
