import OpenAuthoringError from '../../OpenAuthoringError'
import { isForkValid } from '../../github/api'
import OpenAuthoringErrorProps from '../../OpenAuthoringErrorProps'
import { enterAuthFlow, refresh, justClose } from '../actions'

export default async function interpretNotFoundError(
  error: OpenAuthoringError,
  github: any
) {
  if (await isForkValid(null)) {
    // drill down further in the future
    return new OpenAuthoringErrorProps(
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
  return new OpenAuthoringErrorProps(
    true,
    '404 Not Found',
    'You are missing a fork.',
    [
      {
        message: 'Continue',
        action: () => enterAuthFlow(github),
      },
      {
        message: 'Cancel',
        action: refresh,
      },
    ]
  )
}
