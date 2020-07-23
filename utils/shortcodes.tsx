import * as React from 'react'
import styled from 'styled-components'
import { useCMS } from 'tinacms'
import { Button } from 'components/ui'

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
