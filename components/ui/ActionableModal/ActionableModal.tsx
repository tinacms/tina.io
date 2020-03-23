import React, { useState } from 'react'
import styled from 'styled-components'
import { TinaReset } from '@tinacms/styles'
import { Modal, ModalPopup, ModalBody, ModalProvider } from 'tinacms'
import { AuthLayout } from '../../layout'
import { Button } from '../Button'
import { ActionableModalOptions } from './ActionableModalContext'

export const ActionableModal = ({
  title,
  message,
  actions,
}: ActionableModalOptions) => {
  const buttons = actions.map(individualAction => (
    <Button color="primary" onClick={individualAction.action}>
      {individualAction.name}
    </Button>
  ))

  return (
    <ModalProvider>
      <TinaReset>
        <Modal>
          <ModalPopup>
            <ModalBody padded>
              <AuthLayout>
                <h2>{title}</h2>
                <p>{message}</p>
                <Center>{buttons}</Center>
              </AuthLayout>
            </ModalBody>
          </ModalPopup>
        </Modal>
      </TinaReset>
    </ModalProvider>
  )
}

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
