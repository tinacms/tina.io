import get from 'lodash.get'

export function flattenFormData(form) {
  let flatData = {}
  let values = form.getState().values
  form.getRegisteredFields().forEach(field => {
    let data = get(values, field)
    if (typeof data === 'object') return
    flatData[field] = data
  })
  return flatData
}
