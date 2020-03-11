import { getContent } from '../../open-authoring/github/api'
import ContentNotFoundError from './ContentNotFoundError'
import { b64DecodeUnicode } from '../../open-authoring/utils/base64'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'

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
  if (errorStatus < 200 || errorStatus > 299) {
    
    throw new OpenAuthoringError(response?.response?.message || "Failed to get content.", errorStatus)
  }

  return { ...data, content: b64DecodeUnicode(data.content) }
}

export default getDecodedData
