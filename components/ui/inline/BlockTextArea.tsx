import * as React from 'react'
import {
  InlineField,
  InlineFieldRenderProps,
  InlineTextFieldProps,
  useInlineBlock,
} from 'react-tinacms-inline'
import styled from 'styled-components'
import { BlockFieldProps, BlockField } from './BlockText'

/**
 * InlineTextAreaField
 */
interface BlockTextArea {
  name: string
}
export function BlockTextArea({ name }: InlineTextFieldProps) {
  return (
    <BlockField name={name}>
      {({ input, status }) => {
        if (status === 'active') {
          return <Input type="text" {...input} />
        }
        return <>{input.value}</>
      }}
    </BlockField>
  )
}

const Input = styled.textarea`
  width: 100%;
  word-wrap: break-word;
  font-size: inherit;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0 auto;
  max-width: inherit;
  background-color: inherit;
  text-align: inherit;
`
