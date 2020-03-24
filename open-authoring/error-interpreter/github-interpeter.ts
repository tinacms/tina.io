import { getForkName, getHeadBranch } from '../utils/repository'
import { exitEditMode } from '../authFlow'
import { ActionableModalOptions } from '../../components/ui'

export const getModalProps = async (
  error,
  sourceProvider,
  startEditing
): Promise<ActionableModalOptions> => {
  const reauthenticateAction = {
    name: 'Continue',
    action: startEditing,
  }
  const cancelEditModeAction = {
    name: 'Cancel',
    action: exitEditMode,
  }

  switch (error.code) {
    case 401: {
      // Unauthorized
      return {
        title: '401 Unauthenticated',
        message: 'Authentication is invalid',
        actions: [reauthenticateAction, cancelEditModeAction],
      }
    }
    case 404: {
      // Not Found
      if (await sourceProvider.getBranch(getForkName(), getHeadBranch())) {
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
        actions: [reauthenticateAction, cancelEditModeAction],
      }
    }
    case 500: {
      return {
        title: 'Error 500',
        message: error.message,
        actions: [reauthenticateAction],
      }
    }
  }

  return {
    title: `Error  ${error.code}`,
    message: error.message,
    actions: [reauthenticateAction, cancelEditModeAction],
  }
}
