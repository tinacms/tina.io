import { getContent } from './getContent'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'
const atob = require('atob')

const b64DecodeUnicode = str => {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

// TODO - this name kinda sucks,
// Throw a formatted error on 404, and decode github data properly
const getDecodedData = async (repoFullName, headBranch, path, accessToken) => {
  let data = null

  try {
    ;({ data } = await getContent(repoFullName, headBranch, path, accessToken))
  } catch (e) {
    const errorStatus = e.response?.status || 500
    throw new OpenAuthoringError('Failed to get data.', errorStatus)
  }

  return { ...data, content: b64DecodeUnicode(data.content) }
}

export default getDecodedData
