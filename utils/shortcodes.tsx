import * as React from 'react'
import { useCMS } from 'tinacms'
import { Button } from '../components/ui'

export function AlertTest({ type, message, timeout, buttonText }) {
  const cms = useCMS()
  const sendAlert = React.useCallback(() => {
    cms.alerts[type](message, timeout)
  }, [type, message, timeout])
  return (
    <Button color="primary" onClick={sendAlert}>
      {buttonText || 'Try it'}
    </Button>
  )
}
