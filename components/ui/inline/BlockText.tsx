import * as React from 'react'
import {
  InlineField,
  InlineFieldRenderProps,
  InlineTextFieldProps,
  useInlineBlock,
} from 'react-tinacms-inline'

export interface BlockFieldProps {
  name: string
  children(props: BlockFieldRenderProps): any
}

interface BlockFieldRenderProps extends InlineFieldRenderProps {
  name: string
}

export function BlockField({ name, children }: BlockFieldProps) {
  const block = useInlineBlock()
  const fieldName = `${block.name}.${name}`
  return <InlineField name={fieldName}>{children}</InlineField>
}

/**
 * InlineTextField
 */
interface BlockText {
  name: string
}
export function BlockText({ name }: InlineTextFieldProps) {
  return (
    <BlockField name={name}>
      {({ input, status }) => {
        if (status === 'active') {
          return <input type="text" {...input} />
        }
        return <>{input.value}</>
      }}
    </BlockField>
  )
}
