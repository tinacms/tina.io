import { InlineField } from 'react-tinacms-inline'
import styled from 'styled-components'

/**
 * InlineTextField
 */
export interface InlineTextFieldProps {
  name: string
}

export function InlineTextField({ name }: InlineTextFieldProps) {
  return (
    <InlineField name={name}>
      {({ input, status }) => {
        if (status === 'active') {
          return <Input type="text" {...input} />
        }
        return <>{input.value}</>
      }}
    </InlineField>
  )
}

const Input = styled.input`
  color: inherit;
  width: 100%;
`
