import OpenAuthoringError from '../../OpenAuthoringError'
import { enterAuthFlow } from '../actions'
import { ActionableModalOptions } from '../../../components/ui'
import { exitEditMode } from '../../authFlow'

export default function interpretUnauthorizedError(
  error: OpenAuthoringError,
  github: any
): ActionableModalOptions {
  // if authentication is not valid they need to re-authenticate
  return {
    title: '401 Unauthenticated',
    message: 'Authentication is invalid',
    actions: [
      {
        name: 'Continue',
        action: () => enterAuthFlow(github),
      },
      {
        name: 'Cancel',
        action: exitEditMode,
      },
    ],
  }
}
