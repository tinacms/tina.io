import OpenAuthoringError from '../../OpenAuthoringError'
import OpenAuthoringErrorProps from '../../OpenAuthoringErrorProps'
import { enterAuthFlow, refresh } from '../actions'

export default function interpretServerError(error: OpenAuthoringError) {
  switch (error.code) {
    case 500: {
      return new OpenAuthoringErrorProps('Error 500', error.message, [
        {
          message: 'Continue',
          action: close,
        },
      ])
    }
  }
}
