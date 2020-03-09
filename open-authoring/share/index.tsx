import React, { useState } from 'react'
import { Button as RawTinaButton } from '@tinacms/styles'
import { Form, ActionButton } from 'tinacms'
import styled from 'styled-components'
import { Modal, ModalPopup, ModalHeader, ModalBody } from 'tinacms'
import { DesktopLabel } from '../../components/ui/inline/DesktopLabel'
import { ToolbarButton } from '../../components/ui/inline/ToolbarButton'
import { post, get } from './http'
import useClipboard from './useCopy'

const sharePostUrl =
  'https://sykpj0iu94.execute-api.us-east-1.amazonaws.com/prod/items'
const shareUrl = 'https://dekqqd9gssaup.cloudfront.net'

// To the server
interface SharingPost {
  id: string
  values: object
  url: string
}

// From the server
interface SharingPostResponse {
  shareUrl: string
}

export function useSharing(form: Form) {
  React.useEffect(() => {
    const fetchAndUpdateForm = async () => {
      const url = new URL(window.location.href)
      const sharingUuid = url.searchParams.get('_tina')

      if (sharingUuid) {
        try {
          const response = await get<SharingPost>(`${shareUrl}/${sharingUuid}`)
          if (response.parsedBody.id === form.id) {
            form.updateValues(response.parsedBody.values)
            url.searchParams.delete('_tina')
            window.history.replaceState({}, document.title, url.href)
          }
        } catch (e) {
          console.error('Unable to fetch shared form data')
        }
      }
    }

    fetchAndUpdateForm()
  }, [form.id])
}

export const createShareLink = async form => {
  const url = window.location.href
  const response = await post<SharingPost, SharingPostResponse>(sharePostUrl, {
    id: form.id,
    values: form.values,
    url,
  })

  return response.parsedBody.shareUrl
}

export const ShareAction = ({ form }: { form: Form }) => {
  useSharing(form)

  return (
    <ActionButton
      onClick={async () => {
        const shareUrl = await createShareLink(form)
        alert(shareUrl)
      }}
    >
      Share
    </ActionButton>
  )
}

export const SharePlugin = form => ({
  __type: 'toolbar:git',
  name: 'share',
  component: () => {
    return <ShareButton form={form} />
  },
})

function ShareButton({ form }) {
  const [opened, setOpened] = useState(false)
  const close = () => setOpened(false)
  const [shareLink, setShareLink] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const share = async () => {
    setIsPending(true)
    const shareUrl = await createShareLink(form)
    setIsPending(false)
    setShareLink(shareUrl)
  }

  // This is a bit misleading - it's mounted thanks to the fact that toolbar
  // mounts this component, but if the user visited this link while the
  // toolbar wasn't mounted they wouldn't see any changes. That's not
  // clear from the naming used here.
  useSharing(form)

  const closeOnCopied = () => {
    setTimeout(() => {
      close()
    }, 1000)
  }

  return (
    <>
      <ToolbarButton onClick={() => setOpened(p => !p)}>
        <DesktopLabel> Share</DesktopLabel>
      </ToolbarButton>
      {opened && (
        <Modal>
          <ModalPopup>
            <ModalHeader close={close}>Share</ModalHeader>
            <PrModalBody>
              <ModalDescription>
                Anyone with this link will be able to view your changes to this
                page
                <div
                  style={{
                    height: '50px',
                    margin: '1rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {shareLink ? (
                    <Copy onCopied={closeOnCopied} text={shareLink} />
                  ) : (
                    <TinaButton
                      as="a"
                      primary
                      onClick={share}
                      target="_blank"
                      disabled={isPending}
                    >
                      Create Link
                    </TinaButton>
                  )}
                </div>
              </ModalDescription>
            </PrModalBody>
          </ModalPopup>
        </Modal>
      )}
    </>
  )
}

const Copy = ({ text, onCopied }) => {
  const [isCopied, setCopied] = useClipboard(text)

  const copyText = () => {
    setCopied()
    onCopied()
  }

  return (
    <CopyButton onClick={copyText}>
      <CopyText>{text}</CopyText>
      <CopyHint>{isCopied ? 'Copied!' : 'Click to copy'}</CopyHint>
    </CopyButton>
  )
}

const CopyText = styled.p`
  font-weight: bold;
`
const CopyHint = styled.p`
  font-size: smaller;
`

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

const TinaButton = styled(RawTinaButton)<{ disabled: boolean }>`
  height: auto;
  padding-top: 0.8125rem;
  padding-bottom: 0.8125rem;
  text-decoration: none;
  line-height: 1;

  &:disabled {
    opacity: 0.6;
    filter: grayscale(25%);
  }
`

const ModalDescription = styled.p`
  margin-bottom: 1rem;

  b {
    font-weight: bold;
  }
`

const PrModalBody = styled(ModalBody)`
  padding: 1.25rem 1.25rem 0 1.25rem;
`
