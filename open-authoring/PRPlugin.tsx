import React, { useState } from 'react'
import { Modal, ModalPopup, ModalHeader, ModalBody } from 'tinacms'
import {
  ToolbarButton,
  DesktopLabel,
} from '../components/layout/OpenAuthoringSiteForm'
import PrIconSvg from '../public/svg/pr-icon.svg'
import { PRModal } from './PRModal'

interface PullRequestButtonOptions {
  baseRepoFullName: string
  forkRepoFullName: string
}

export const PRPlugin = (
  baseRepoFullName: string,
  forkRepoFullName: string
) => ({
  __type: 'toolbar:git',
  name: 'create-pr',
  component: () => {
    return (
      <PullRequestButton
        baseRepoFullName={baseRepoFullName}
        forkRepoFullName={forkRepoFullName}
      />
    )
  },
})

function PullRequestButton({
  baseRepoFullName,
  forkRepoFullName,
}: PullRequestButtonOptions) {
  const [opened, setOpened] = useState(false)
  const close = () => setOpened(false)
  return (
    <>
      <ToolbarButton onClick={() => setOpened(p => !p)}>
        <PrIconSvg />
        <DesktopLabel> Pull Request</DesktopLabel>
      </ToolbarButton>
      {opened && (
        <Modal>
          <ModalPopup>
            <ModalHeader close={close}>Pull Request</ModalHeader>
            <ModalBody>
              <PRModal
                baseRepoFullName={baseRepoFullName}
                forkRepoFullName={forkRepoFullName}
              />
            </ModalBody>
          </ModalPopup>
        </Modal>
      )}
    </>
  )
}
