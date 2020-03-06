import { Wysiwyg } from 'tinacms'
import { InlineField } from 'react-tinacms-inline'

interface InlineWysiwygFieldProps {
  name: string
  children: any
}

export function InlineWysiwyg({ name, children }: InlineWysiwygFieldProps) {
  return (
    <InlineField name={name}>
      {({ input, status }) => {
        if (status === 'active') {
          return <Wysiwyg sticky={'72px'} input={input} />
        }
        return <>{children}</>
      }}
    </InlineField>
  )
}
