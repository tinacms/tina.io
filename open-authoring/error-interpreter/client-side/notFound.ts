import OpenAuthoringError from '../../OpenAuthoringError'
import OpenAuthoringErrorProps from '../../OpenAuthoringErrorProps'
import { enterAuthFlow, refresh } from '../actions'
import { getForkName, getHeadBranch } from '../../utils/repository'

export default async function interpretNotFoundError(
  error: OpenAuthoringError,
  github: any
) {
  if (await github.getBranch(getForkName(), getHeadBranch())) {
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
