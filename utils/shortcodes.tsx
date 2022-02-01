import * as React from 'react'
import styled from 'styled-components'
// import { useCMS } from 'tinacms'
// import { WarningIcon } from '@tinacms/icons'
import { Button } from 'components/ui'
import ReactMarkdown from 'react-markdown'

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
  // TODO: investigate what removing this broke and if it needs to be added in
  // const cms = useCMS()
  // const sendAlert = React.useCallback(() => {
  //   cms.alerts[type](message, timeout)
  // }, [type, message, timeout])
  return (
    <DemoButtonWrapper>
      <Button color="primary" onClick={() => {}}>
        {buttonText || 'Try it'}
      </Button>
    </DemoButtonWrapper>
  )
}

export const WarningCallout = styled(({ text, ...styleProps }) => {
  // TODO: investigate what removing the  <WarningIcon /> under the div did
  return (
    <div {...styleProps}>
      <div>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  )
})`
  position: relative;
  display: block;
  font-size: 1.125rem;
  background-color: var(--color-warning);
  border: 1px solid var(--color-warning-dark);
  border-left-width: 6px;
  border-radius: 3px;
  padding: 1rem 1rem 1rem 3.5rem;

  *:first-child {
    margin-top: 0;
  }

  *:last-child {
    margin-bottom: 0;
  }

  a,
  a:visited {
    color: var(--color-tina-blue-dark) !important;
    font-weight: bold;
  }

  svg {
    position: absolute;
    top: 1.25rem;
    left: 1rem;
    width: 1.5rem;
    height: auto;
    fill: var(--color-orange);
  }
`
