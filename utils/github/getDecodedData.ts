import { getContent } from '../../open-authoring/github/api'
import ContentNotFoundError from './ContentNotFoundError'
import { b64DecodeUnicode } from '../../open-authoring/utils/base64'

// TODO - this name kinda sucks,
// Throw a formatted error on 404, and decode github data properly
const getDecodedData = async (repoFullName, headBranch, path, accessToken) => {
  const { data, ...response } = await getContent(
    repoFullName,
    headBranch,
    path,
    accessToken
  )
  
  const errorStatus = response?.response?.status || 200
  if (errorStatus != 200) {
    switch (errorStatus) {
      case 404: {
        throw new ContentNotFoundError(
          'Content not found. Your fork may have been deleted.'
        )
      }
      case 401: {
        throw new ContentNotFoundError(
          'Authentication invalid. You will need to re-authenticate.'
        )
      }
    }
  }

  return { ...data, content: b64DecodeUnicode(data.content) }
}

export default getDecodedData
