import OpenAuthoringError from '../../OpenAuthoringError'
import { ActionableModalOptions } from '../../../components/ui'

export default function interpretServerError(
  error: OpenAuthoringError
): ActionableModalOptions {
  switch (error.code) {
    case 500: {
      return {
        title: 'Error 500',
        message: error.message,
        actions: [
          {
            name: 'Continue',
            action: close,
          },
        ],
      }
    }
  }
}
