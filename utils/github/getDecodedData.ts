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

  if ((response?.response?.status || 0) == 404) {
    throw new ContentNotFoundError(
      'Content not found. Your fork may have been deleted.'
    )
  }

  return { ...data, content: b64DecodeUnicode(data.content) }
}

export default getDecodedData
