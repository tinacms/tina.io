import { Modal, ModalPopup, ModalBody } from 'tinacms'
import { useGithubAuthRedirect } from 'react-tinacms-github'
import { TinaReset } from '@tinacms/styles'

export default function Authorizing() {
  useGithubAuthRedirect()

  return (
    <TinaReset>
      <Modal>
        <ModalPopup>
          <ModalBody padded>
            <p>Authorizing with Github, Please wait...</p>
          </ModalBody>
        </ModalPopup>
      </Modal>
    </TinaReset>
  )
}
