import OpenAuthoringError from '../../OpenAuthoringError'
import OpenAuthoringContextualErrorUI from '../../OpenAuthoringContextualErrorUI'
import { enterAuthFlow, refresh, justClose } from '../actions'
import Cookies from 'js-cookie'

export default function interpretUnauthorizedError(error: OpenAuthoringError) {
  // if authentication is not valid they need to re-authenticate
  const fork = Cookies.get('fork_full_name')
  const branch = Cookies.get('head_branch')

  if (!fork) {
    // TODO - this should be abstracted somewhere
    return new OpenAuthoringContextualErrorUI(
      true,
      'Authentication Required',
      'In order to save your changes, you need to authenticate with a github account.',
      [
        {
          message: 'Login',
          action: enterAuthFlow,
        },
        {
          message: 'Cancel',
          action: justClose,
        },
      ]
    )
  }
  return new OpenAuthoringContextualErrorUI(
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
