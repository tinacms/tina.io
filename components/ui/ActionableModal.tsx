import React, { useState } from 'react'
import styled from 'styled-components'
import { StyleReset, Button as TinaButton } from '@tinacms/styles'
import {
  Modal,
  PopupModal,
  ModalBody,
  ModalActions,
  ModalHeader,
} from 'tinacms'

export interface ActionableModalOptions {
  title: string
  message: string
  actions: Array<{ name: string; action(): void; primary?: boolean }>
}

export const ActionableModal = ({
  title,
  message,
  actions,
}: ActionableModalOptions) => {
  if (!open) {
    return null
  }

  return (
    <StyleReset>
      <Modal>
        <PopupModal>
          <ModalHeader close={null}>{title}</ModalHeader>
          <ModalBody padded>
            <p>{message}</p>
          </ModalBody>
          <ModalActions>
            {actions.map((action, index) => (
              <TinaButton key={index} primary={action.primary} onClick={action.action}>
                {action.name}
              </TinaButton>
            ))}
          </ModalActions>
        </PopupModal>
      </Modal>
    </StyleReset>
  )
}

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
