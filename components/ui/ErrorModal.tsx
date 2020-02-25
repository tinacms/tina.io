import React from 'react'
import styled from 'styled-components'
import { TinaReset } from '@tinacms/styles'
import { Modal, ModalPopup, ModalBody, ModalProvider } from 'tinacms'
import { AuthLayout } from '../layout'
import { Button } from './Button'

interface ErrorModalOptions {
  message: string
  action(): void
}

export const ErrorModal = ({ message, action }: ErrorModalOptions) => {
  return (
    <ModalProvider>
      <TinaReset>
        <Modal>
          <ModalPopup>
            <ModalBody padded>
              <AuthLayout>
                <h2>Error</h2>
                <p>{message}</p>
                <Center>
                  <Button color="primary" onClick={action}>
                    Continue
                  </Button>
                </Center>
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
