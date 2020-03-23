import OpenAuthoringError from '../OpenAuthoringError'
import { enterAuthFlow, refresh } from './actions'
import interpretClientError from './client-side'
import interpretServerError from './server-side'
import { ActionableModalOptions } from '../../components/ui/ActionableModal/ActionableModalContext'

export default async function interpretError(
  error: OpenAuthoringError,
  github: any
): Promise<ActionableModalOptions> {
  if (!error || !error.code) {
    console.warn('Error Interpreter: called without an error')
    const message = error?.message || 'An error occured.'
    return {
      title: 'Error',
      message,
      actions: [
        {
          name: 'Continue',
          action: () => enterAuthFlow(github),
        },
        {
          name: 'Cancel',
          action: refresh,
        },
      ], // Action buttons
    }
  }

  switch (parseInt(error.code.toString()[0])) {
    case 4: {
      return await interpretClientError(error, github)
    }
    case 5: {
      return interpretServerError(error)
    }
  }
  console.warn('Error Interpreter: Could not interpret error ' + error.code)
  return {
    title: `Error  ${error.code}`,
    message: error.message,
    actions: [
      {
        name: 'Continue',
        action: () => enterAuthFlow(github),
      },
      {
        name: 'Cancel',
        action: refresh,
      },
    ],
  }
}
