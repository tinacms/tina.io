import OpenAuthoringError from '../../OpenAuthoringError'
import { isForkValid } from '../../github/api'
import OpenAuthoringContextualErrorUI from '../../OpenAuthoringContextualErrorUI'
import { enterAuthFlow, refresh, justClose } from '../actions'
import Cookies from 'js-cookie'

export default async function interpretNotFoundError(
  error: OpenAuthoringError
) {
  if (await isForkValid(Cookies.get('fork_full_name'))) {
    // drill down further in the future
    return new OpenAuthoringContextualErrorUI(
      true,
      '404 Not Found',
      'Failed to get some content.',
      [
        {
          message: 'Continue',
          action: refresh,
        },
      ]
    )
  }
  return new OpenAuthoringContextualErrorUI(
    true,
    '404 Not Found',
    'You are missing a fork.',
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
