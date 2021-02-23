import { Modal, PopupModal, ModalBody } from 'tinacms'
import { useGithubAuthRedirect } from 'react-tinacms-github'
import { StyleReset } from '@tinacms/styles'

export default function Authorizing() {
  useGithubAuthRedirect()

  return (
    <StyleReset>
      <Modal>
        <PopupModal>
          <ModalBody padded>
            <p>Authorizing with Github, Please wait...</p>
          </ModalBody>
        </PopupModal>
      </Modal>
    </StyleReset>
  )
}
