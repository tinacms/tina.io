import { InlineField } from 'react-tinacms-inline'
import styled from 'styled-components'

interface InlineTextFieldProps {
  name: string
}

export function InlineTextareaField({ name }: InlineTextFieldProps) {
  return (
    <InlineField name={name}>
      {({ input, status }) => {
        if (status === 'active') {
          return <Input type="textarea" {...input} />
        }
        return <>{input.value}</>
      }}
    </InlineField>
  )
}

const Input = styled.textarea`
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  font-size: inherit;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0 auto;
  max-width: inherit;
  background-color: inherit;
`
