import * as React from 'react'
import { useCMS } from 'tinacms'

export function AlertTest({ type, message, timeout, buttonText }) {
  const cms = useCMS()
  const sendAlert = React.useCallback(() => {
    cms.alerts[type](message, timeout)
  }, [type, message, timeout])
  return <button onClick={sendAlert}>{buttonText || 'Try it'}</button>
}
