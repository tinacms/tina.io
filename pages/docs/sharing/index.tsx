import React from 'react'
import { Form, ActionButton } from 'tinacms'
import { post, get } from './http'

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
