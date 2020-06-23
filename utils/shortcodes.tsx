import * as React from 'react'
import styled from 'styled-components'
import { useCMS, FormBuilder, FieldsBuilder, useForm } from 'tinacms'
import { Button } from '../components/ui'

const DemoButtonWrapper = styled.div`
  display: block;
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  button {
    margin-left: auto;
    margin-right: auto;
  }
`

export function AlertTest({ type, message, timeout, buttonText }) {
  const cms = useCMS()
  const sendAlert = React.useCallback(() => {
    cms.alerts[type](message, timeout)
  }, [type, message, timeout])
  return (
    <DemoButtonWrapper>
      <Button color="primary" onClick={sendAlert}>
        {buttonText || 'Try it'}
      </Button>
    </DemoButtonWrapper>
  )
}

export const FieldExample = styled(({ className, ...field }) => {
  const [isBrowser, setIsBrowser] = React.useState(false)

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  const [, form] = useForm({
    id: 'example',
    label: 'Example',
    onSubmit() {},
    fields: [field],
  })

  if (!isBrowser) {
    return null
  }

  return (
    <FormBuilder form={form}>
      {() => {
        return (
          <>
            <div className={className}>
              <h3>Example</h3>
              <FieldsBuilder form={form} fields={form.fields} />
            </div>
          </>
        )
      }}
    </FormBuilder>
  )
})`
  border: 5px solid pink;
  background: limegreen;
  margin: 3.1415rem;
`

export const DateFieldExample = () => {
  return (
    <FieldExample
      {...{
        label: 'Date',
        name: 'created_at',
        component: 'date',
        dateFormat: 'MMMM DD YYYY',
        timeFormat: false,
      }}
    />
  )
}

export const ColorFieldExample = () => {
  return (
    <FieldExample
      {...{
        name: 'rawFrontmatter.background_color',
        component: 'color',
        label: 'Background Color',
        description: 'Edit the page background color here',
        colorFormat: 'hex',
        colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
        widget: 'sketch',
      }}
    />
  )
}
