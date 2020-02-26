import React, { useState } from 'react'
import styled from 'styled-components'
import { TinaReset } from '@tinacms/styles'
import { Modal, ModalPopup, ModalBody, ModalProvider } from 'tinacms'
import { AuthLayout } from '../layout'
import { Button } from './Button'

interface ActionableModalOptions {
  title: string
  message: string
  actions: Array<{ name: string, action(): void }>
}

export const ActionableModal = ({ title, message, actions }: ActionableModalOptions) => {

  const [open, setOpen] = useState(true)

  const closeModal = () => {
    setOpen(false)
  }

  const getButtons = () => {
    var buttons = []
    actions.forEach( individualAction => {
      if (individualAction.action) {
        buttons.push(
          <Button color="primary" onClick={individualAction.action}>
            {individualAction.name}
          </Button>
        )
      } else {
        buttons.push(
          <Button color="primary" onClick={closeModal}>
            {individualAction.name}
          </Button>
        )
      }
      
    })
    return buttons
  }

  if (!open) return (<></>)

  return (
    <ModalProvider>
      <TinaReset>
        <Modal>
          <ModalPopup>
            <ModalBody padded>
              <AuthLayout>
                <h2>{title}</h2>
                <p>{message}</p>
                <Center>
                  {getButtons()}
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
