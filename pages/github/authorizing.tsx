import {
  Modal,
  ModalPopup,
  ModalBody,
  ModalActions,
  ModalHeader,
} from 'tinacms'
import useGithubAuthRedirect from '../../open-authoring/github-auth/useGithubAuthRedirect'
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
