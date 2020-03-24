import OpenAuthoringError from '../../OpenAuthoringError'
import { enterAuthFlow } from '../actions'
import { getForkName, getHeadBranch } from '../../utils/repository'
import { ActionableModalOptions } from '../../../components/ui'
import { exitEditMode } from '../../authFlow'

export default async function interpretNotFoundError(
  error: OpenAuthoringError,
  github: any
): Promise<ActionableModalOptions> {
  if (await github.getBranch(getForkName(), getHeadBranch())) {
    // drill down further in the future
    return {
      title: '404 Not Found',
      message: 'Failed to get some content.',
      actions: [
        {
          name: 'Continue',
          action: exitEditMode,
        },
      ],
    }
  }
  return {
    title: '404 Not Found',
    message: 'You are missing a fork.',
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
