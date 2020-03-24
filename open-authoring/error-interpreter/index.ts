import OpenAuthoringError from '../OpenAuthoringError'
import { enterAuthFlow, refresh } from './actions'
import interpretClientError from './client-side'
import interpretServerError from './server-side'
import { ActionableModalOptions } from '../../components/ui'

export default async function interpretError(
  error: OpenAuthoringError,
  github: any
): Promise<ActionableModalOptions> {
  if (error.code) {
    switch (parseInt(error.code.toString()[0])) {
      case 4: {
        return await interpretClientError(error, github)
      }
      case 5: {
        return interpretServerError(error)
      }
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
