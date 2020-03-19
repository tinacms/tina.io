import OpenAuthoringError from '../../OpenAuthoringError'
import OpenAuthoringErrorProps from '../../OpenAuthoringErrorProps'
import { enterAuthFlow, refresh, justClose } from '../actions'

export default function interpretUnauthorizedError(error: OpenAuthoringError) {
  // if authentication is not valid they need to re-authenticate
  return new OpenAuthoringErrorProps(
    true,
    '401 Unauthenticated',
    'Authentication is invalid',
    [
      {
        message: 'Continue',
        action: enterAuthFlow,
      },
      {
        message: 'Cancel',
        action: refresh,
      },
    ]
  )
}
